// app/api/counter/route.ts
import { Redis } from "@upstash/redis";
import { RateLimiter } from "@/lib/rate-limit";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const rateLimiter = new RateLimiter({
  interval: 1000,
  limit: 1,
});

// Track last cleanup time to reduce cleanup frequency
let lastCleanup = Date.now();

async function cleanOldSessions() {
  // Only clean up if it's been more than 3 minutes since last cleanup
  if (Date.now() - lastCleanup < 3 * 60 * 1000) {
    return;
  }
  const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
  await redis.zremrangebyscore("active_sessions", 0, fiveMinutesAgo);
  lastCleanup = Date.now();
}

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";

    const isAllowed = await rateLimiter.check(ip);
    if (!isAllowed) {
      const count = await redis.zcard("active_sessions");
      return Response.json(
        {
          success: false,
          error: "Too many requests",
          count: Number(count),
        },
        { status: 429 },
      );
    }

    const { sessionId } = await request.json();
    const key = `${ip}-${sessionId}`;
    const now = Date.now();

    // Add/update session
    await redis.zadd("active_sessions", { score: now, member: key });

    // Clean old sessions
    await cleanOldSessions();

    // Get current count
    const count = await redis.zcard("active_sessions");

    rateLimiter.cleanup();

    return Response.json({
      count: Number(count),
      success: true,
    });
  } catch (error) {
    console.error("Redis error:", error);
    const count = await redis.zcard("active_sessions");
    return Response.json(
      {
        count: Number(count),
        success: false,
        error: "Failed to process request",
      },
      { status: 400 },
    );
  }
}

export async function GET() {
  const count = await redis.zcard("active_sessions");
  return Response.json({ count: Number(count) });
}
