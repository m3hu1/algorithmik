"use client";

import { Tree, TreeViewElement, File, Folder } from "@/components/ui/tree";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, BrainIcon } from "lucide-react";

interface TreeViewProps {
  data: TreeViewElement[];
  initialSelectedId?: string;
  initialExpandedItems?: string[];
}

function RenderTreeItem({ item, data }: { item: TreeViewElement, data: TreeViewElement[] }) {
  const [isSolved, setIsSolved] = useState(false);

  // Load solved state from localStorage on component mount
  useEffect(() => {
    const rootId = data[0]?.id || '';
    const storageKey = `solvedProblems_${rootId}`;
    const solvedProblems = JSON.parse(localStorage.getItem(storageKey) || '{}');
    setIsSolved(!!solvedProblems[item.id]);
  }, [item.id, data]);

  const toggleSolved = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newSolvedState = !isSolved;
    setIsSolved(newSolvedState);
    
    const rootId = data[0]?.id || '';
    const storageKey = `solvedProblems_${rootId}`;
    const solvedProblems = JSON.parse(localStorage.getItem(storageKey) || '{}');
    
    if (newSolvedState) {
      solvedProblems[item.id] = true;
    } else {
      delete solvedProblems[item.id];
    }
    
    localStorage.setItem(storageKey, JSON.stringify(solvedProblems));

    // Dispatch custom event with root ID
    window.dispatchEvent(
      new CustomEvent('problemSolved', {
        detail: { rootId }
      })
    );
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'text-[#1CBBBA]';
      case 'medium':
        return 'text-[#FFB700]';
      case 'hard':
        return 'text-[#F53837]';
      default:
        return '';
    }
  };

  if (!item.children?.length) {
    return (
      <File value={item.id} isSelectable>
        <div className="flex items-center gap-2 whitespace-nowrap">
          {item.link ? (
            <Link 
              href={item.link} 
              target="_blank"
              className="hover:text-primary transition-colors no-underline"
            >
              {item.name}
            </Link>
          ) : (
            item.name
          )}
          {item.difficulty && (
            <BrainIcon size={20} className={getDifficultyColor(item.difficulty)} />
          )}
          <button
            onClick={toggleSolved}
            className={`p-1 rounded-full border ${
              isSolved 
                ? 'bg-green-500 text-white border-green-500' 
                : 'bg-transparent border-gray-300 hover:border-gray-400'
            }`}
          >
            <Check size={12} />
          </button>
        </div>
      </File>
    );
  }

  return (
    <Folder element={item.name} value={item.id} isSelectable>
      {item.children.map((child) => (
        <RenderTreeItem key={child.id} item={child} data={data} />
      ))}
    </Folder>
  );
}

export default function TreeView({ 
  data, 
  initialSelectedId,
  initialExpandedItems 
}: TreeViewProps) {
  return (
    <div className="rounded-lg my-4 overflow-x-auto">
      {/* <ScrollArea className="h-full"> */}
        {/* <Tree
          elements={data}
          initialSelectedId={initialSelectedId}
          initialExpandedItems={initialExpandedItems}
        >
          {data.map((item) => (
            <RenderTreeItem key={item.id} item={item} />
          ))}
        </Tree> */}
      {/* </ScrollArea> */}
      <div className="inline-block min-w-full">
        <Tree
          elements={data}
          initialSelectedId={initialSelectedId}
          initialExpandedItems={initialExpandedItems}
        >
          {data.map((item) => (
            <RenderTreeItem key={item.id} item={item} data={data} />
          ))}
        </Tree>
      </div>
    </div>
  );
}