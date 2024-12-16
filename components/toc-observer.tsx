"use client";

import { getDocsTocs } from "@/lib/markdown";
import clsx from "clsx";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

type Props = { data: Awaited<ReturnType<typeof getDocsTocs>> };

export default function TocObserver({ data }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const headingElementsRef = useRef<{
    [key: string]: IntersectionObserverEntry;
  }>({});

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        headingElementsRef.current[entry.target.id] = entry;
      });

      // Get all headings that are currently intersecting
      const visibleHeadings = Object.values(headingElementsRef.current).filter(
        (entry) => entry.isIntersecting,
      );

      // If there are visible headings, select the one with the highest intersection ratio
      if (visibleHeadings.length > 0) {
        const mostVisible = visibleHeadings.reduce((prev, current) => {
          return prev.intersectionRatio > current.intersectionRatio
            ? prev
            : current;
        });
        setActiveId(mostVisible.target.id);
      }
    };

    observer.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "-20% 0px -35% 0px", // Adjusted margins for better detection
      threshold: [0, 0.25, 0.5, 0.75, 1], // Multiple thresholds for better accuracy
    });

    const elements = data.map((item) =>
      document.getElementById(item.href.slice(1)),
    );

    elements.forEach((el) => {
      if (el && observer.current) {
        observer.current.observe(el);
      }
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
      headingElementsRef.current = {};
    };
  }, [data]);

  return (
    <div className="flex flex-col gap-2.5 text-sm dark:text-stone-300/85 text-stone-800 ml-0.5">
      {data.map(({ href, level, text }) => {
        return (
          <Link
            key={href}
            href={href}
            className={clsx({
              "pl-0": level == 2,
              "pl-4": level == 3,
              "pl-8": level == 4,
              "font-medium text-primary": activeId == href.slice(1),
            })}
          >
            {text}
          </Link>
        );
      })}
    </div>
  );
}
