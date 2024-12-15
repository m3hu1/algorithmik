// lib/rate-limit.ts
export interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  limit: number; // Maximum requests per interval
}

export class RateLimiter {
  private cache: Map<string, { count: number; timestamp: number }>;

  constructor(private config: RateLimitConfig) {
    this.cache = new Map();
  }

  async check(ip: string): Promise<boolean> {
    const now = Date.now();
    const record = this.cache.get(ip);

    if (!record) {
      this.cache.set(ip, { count: 1, timestamp: now });
      return true;
    }

    if (now - record.timestamp > this.config.interval) {
      // Reset if interval has passed
      this.cache.set(ip, { count: 1, timestamp: now });
      return true;
    }

    if (record.count >= this.config.limit) {
      return false;
    }

    record.count++;
    return true;
  }

  // Clean up old entries
  cleanup() {
    const now = Date.now();
    for (const [ip, record] of this.cache.entries()) {
      if (now - record.timestamp > this.config.interval) {
        this.cache.delete(ip);
      }
    }
  }
}
