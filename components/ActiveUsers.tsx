// components/ActiveUsers.tsx
"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

export function ActiveUsers() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        const response = await fetch(
          "https://api.counter.dev/stats/ef652987-1028-44de-9a88-4c720e196593",
        );
        const data = await response.json();
        setCount(data.active || 0);
      } catch (error) {
        console.error("Error fetching active users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveUsers();
    // Update every minute
    const interval = setInterval(fetchActiveUsers, 60000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return null;
  if (count === 0) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Users className="h-4 w-4" />
      <span>{count} active now</span>
    </div>
  );
}
