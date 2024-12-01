"use client";

import { useEffect, useState } from "react";
import { TreeViewElement } from "@/components/ui/tree";

interface ProblemProgressProps {
  data: TreeViewElement[];
}

function countProblems(items: TreeViewElement[]): number {
  let count = 0;
  items.forEach(item => {
    if (item.children?.length) {
      count += countProblems(item.children);
    } else if (item.link) {
      count++;
    }
  });
  return count;
}

export default function ProblemProgress({ data }: ProblemProgressProps) {
  const [solvedCount, setSolvedCount] = useState(0);
  const totalProblems = countProblems(data);
  
  // Get the root ID (either "problems" for important problems or company name)
  const rootId = data[0]?.id || '';
  const storageKey = `solvedProblems_${rootId}`;

  useEffect(() => {
    const updateSolvedCount = () => {
      const solvedProblems = JSON.parse(localStorage.getItem(storageKey) || '{}');
      setSolvedCount(Object.keys(solvedProblems).length);
    };

    // Initial count
    updateSolvedCount();

    // Update on problem solved/unsolved
    const handleSolvedUpdate = (event: CustomEvent<{ rootId: string }>) => {
      if (event.detail.rootId === rootId) {
        updateSolvedCount();
      }
    };

    window.addEventListener('problemSolved', handleSolvedUpdate as EventListener);
    
    // Handle updates from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === storageKey) {
        const updated = JSON.parse(e.newValue || '{}');
        setSolvedCount(Object.keys(updated).length);
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('problemSolved', handleSolvedUpdate as EventListener);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [storageKey, rootId]);

  const progressPercentage = Math.round((solvedCount / totalProblems) * 100);

  return (
    <div className="my-4 p-4 bg-gray-100 dark:bg-zinc-800/40 border border-gray-200 dark:border-zinc-200/10 rounded-lg shadow-sm">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">
          {solvedCount} / {totalProblems} problems solved
        </span>
        <span className="text-sm font-medium">{progressPercentage}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-zinc-700/20 rounded-full h-2.5">
        <div
          className="bg-primary h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}