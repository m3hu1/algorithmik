// components/ActiveUsers.tsx
"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
// import { toast } from "sonner"; // Or your preferred toast library

export function ActiveUsers() {
  const [count, setCount] = useState<number>(0);
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    const sessionId =
      sessionStorage.getItem("visitorId") ||
      Math.random().toString(36).substring(7);
    sessionStorage.setItem("visitorId", sessionId);

    const updateCount = async () => {
      if (isRateLimited) return;

      try {
        const response = await fetch("/api/counter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
        });

        const data = await response.json();

        if (response.status === 429) {
          setIsRateLimited(true);
          // toast.error("Too many requests. Please wait.");

          // Reset rate limit flag after 1 second
          setTimeout(() => setIsRateLimited(false), 1000);
          return;
        }

        if (data.success) {
          setCount(data.count);
        } else {
          console.error("Error:", data.error);
        }
      } catch (error) {
        console.error("Error updating counter:", error);
      }
    };

    // Initial update
    updateCount();

    // Update every minute
    const interval = setInterval(updateCount, 60000);

    return () => clearInterval(interval);
  }, [isRateLimited]);

  if (count === 0) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Users className="h-4 w-4" />
      <span>{count} active now</span>
    </div>
  );
}
