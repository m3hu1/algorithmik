// app/api/counter/route.ts
import { Redis } from "@upstash/redis";
import { RateLimiter } from "@/lib/rate-limit";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

interface Session {
  ip: string;
  sessionId: string;
  timestamp: number;
}

const sessions = new Map<string, Session>();
let useRedis = true;
let fallbackStartTime: number | null = null;
const FALLBACK_DURATION = 12 * 60 * 60 * 1000; // 6 hours in milliseconds

function cleanOldSessions() {
  const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
  for (const [key, session] of sessions.entries()) {
    if (session.timestamp < fiveMinutesAgo) {
      sessions.delete(key);
    }
  }
}

async function handleRedisError() {
  useRedis = false;
  fallbackStartTime = Date.now();
  console.log("Switching to in-memory storage due to Redis error");
}

async function checkSwitchBackToRedis() {
  if (!useRedis && fallbackStartTime) {
    const timeInFallback = Date.now() - fallbackStartTime;
    if (timeInFallback >= FALLBACK_DURATION) {
      try {
        // Test Redis connection
        await redis.ping();
        useRedis = true;
        fallbackStartTime = null;
        console.log("Switching back to Redis storage");
      } catch (error) {
        // If Redis is still not available, reset the fallback timer
        fallbackStartTime = Date.now();
      }
    }
  }
}

const rateLimiter = new RateLimiter({
  interval: 1000,
  limit: 1,
});

export async function POST(request: Request) {
  await checkSwitchBackToRedis();

  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";

    const isAllowed = await rateLimiter.check(ip);
    if (!isAllowed) {
      if (useRedis) {
        try {
          const count = await redis.zcard("active_sessions");
          return Response.json(
            {
              success: false,
              error: "Too many requests",
              count: Number(count),
            },
            { status: 429 },
          );
        } catch (error) {
          await handleRedisError();
        }
      }
      return Response.json(
        {
          success: false,
          error: "Too many requests",
          count: sessions.size,
        },
        { status: 429 },
      );
    }

    const { sessionId } = await request.json();
    const key = `${ip}-${sessionId}`;
    const now = Date.now();

    if (useRedis) {
      try {
        await redis.zadd("active_sessions", { score: now, member: key });
        const fiveMinutesAgo = now - 5 * 60 * 1000;
        await redis.zremrangebyscore("active_sessions", 0, fiveMinutesAgo);
        const count = await redis.zcard("active_sessions");

        rateLimiter.cleanup();
        return Response.json({
          count: Number(count),
          success: true,
        });
      } catch (error) {
        await handleRedisError();
      }
    }

    // Fallback to in-memory storage
    cleanOldSessions();
    sessions.set(key, {
      ip,
      sessionId,
      timestamp: now,
    });

    rateLimiter.cleanup();
    return Response.json({
      count: sessions.size,
      success: true,
    });
  } catch (error) {
    if (useRedis) {
      try {
        const count = await redis.zcard("active_sessions");
        return Response.json(
          {
            count: Number(count),
            success: false,
            error: "Failed to process request",
          },
          { status: 400 },
        );
      } catch (error) {
        await handleRedisError();
      }
    }
    return Response.json(
      {
        count: sessions.size,
        success: false,
        error: "Failed to process request",
      },
      { status: 400 },
    );
  }
}

export async function GET() {
  await checkSwitchBackToRedis();

  if (useRedis) {
    try {
      const count = await redis.zcard("active_sessions");
      return Response.json({ count: Number(count) });
    } catch (error) {
      await handleRedisError();
    }
  }
  cleanOldSessions();
  return Response.json({ count: sessions.size });
}
