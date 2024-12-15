// app/api/counter/route.ts
import { RateLimiter } from "@/lib/rate-limit";

interface Session {
  ip: string;
  sessionId: string;
  timestamp: number;
}

const sessions = new Map<string, Session>();

// Create rate limiter instance (1 request per second per IP)
const rateLimiter = new RateLimiter({
  interval: 1000, // 1 second
  limit: 1, // 1 request
});

function cleanOldSessions() {
  const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
  for (const [key, session] of sessions.entries()) {
    if (session.timestamp < fiveMinutesAgo) {
      sessions.delete(key);
    }
  }
}

export async function POST(request: Request) {
  try {
    // Get IP address
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";

    // Check rate limit
    const isAllowed = await rateLimiter.check(ip);
    if (!isAllowed) {
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

    // Clean old sessions
    cleanOldSessions();

    // Create unique key from IP and session ID
    const key = `${ip}-${sessionId}`;

    // Update session
    sessions.set(key, {
      ip,
      sessionId,
      timestamp: Date.now(),
    });

    // Clean up rate limiter
    rateLimiter.cleanup();

    return Response.json({
      count: sessions.size,
      success: true,
    });
  } catch (error) {
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
  cleanOldSessions();
  return Response.json({ count: sessions.size });
}
