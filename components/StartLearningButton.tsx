// components/StartLearningButton.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function StartLearningButton({ href }: { href: string }) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (event.key.toLowerCase() === "l" && !event.metaKey && !event.ctrlKey) {
        router.push(href);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [router, href]);

  return (
    <Link
      href={href}
      className="group select-none text-sm tracking-tight rounded-sm flex gap-2 items-center justify-center text-nowrap border transition-colors duration-75 text-black dark:text-white border-offgray-200/50 dark:border-offgray-700/50 bg-white/80 dark:bg-zinc-900/80 hover:bg-gray-100/90 dark:hover:bg-zinc-800/90 [box-shadow:hsl(218,_13%,_50%,_0.1)_0_-2px_0_0_inset] dark:[box-shadow:hsl(218,_13%,_30%,_0.1)_0_-2px_0_0_inset] hover:[box-shadow:none] dark:hover:[box-shadow:none] px-6 h-11 data-kbd:pr-1.5 w-full sm:w-fit sm:shrink-0 backdrop-blur-[0px]"
    >
      Start Learning
      <kbd className="h-5 px-1.5 max-w-max rounded-xs items-center gap-0.5 text-[.6875rem] font-bold text-gray-500 dark:text-gray-400 border border-gray-500/20 dark:border-gray-600/20 bg-gray-50/80 dark:bg-zinc-800/80 hidden sm:flex">
        L
      </kbd>
    </Link>
  );
}
