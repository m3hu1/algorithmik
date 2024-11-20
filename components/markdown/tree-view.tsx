"use client";

import { Tree, TreeViewElement, File, Folder } from "@/components/ui/tree";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, ChevronUp } from "lucide-react";

interface TreeViewProps {
  data: TreeViewElement[];
  initialSelectedId?: string;
  initialExpandedItems?: string[];
}

function RenderTreeItem({ item }: { item: TreeViewElement }) {
  const [isSolved, setIsSolved] = useState(false);

  // Load solved state from localStorage on component mount
  useEffect(() => {
    const solvedProblems = JSON.parse(localStorage.getItem('solvedProblems') || '{}');
    setIsSolved(!!solvedProblems[item.id]);
  }, [item.id]);

  const toggleSolved = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newSolvedState = !isSolved;
    setIsSolved(newSolvedState);
    
    // Update localStorage
    const solvedProblems = JSON.parse(localStorage.getItem('solvedProblems') || '{}');
    if (newSolvedState) {
      solvedProblems[item.id] = true;
    } else {
      delete solvedProblems[item.id];
    }
    localStorage.setItem('solvedProblems', JSON.stringify(solvedProblems));
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
        <div className="flex items-center gap-2">
          {item.link ? (
            <Link 
              href={item.link} 
              target="_blank"
              className="hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ) : (
            item.name
          )}
          {/* <ChevronUp className="text-green-500"/> */}
          {/* <ChevronUp className="text-yellow-500"/> */}
          {item.difficulty && (
            <ChevronUp className={getDifficultyColor(item.difficulty)} />
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
        <RenderTreeItem key={child.id} item={child} />
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
    <div className="rounded-lg my-4">
      {/* <ScrollArea className="h-full"> */}
        <Tree
          elements={data}
          initialSelectedId={initialSelectedId}
          initialExpandedItems={initialExpandedItems}
        >
          {data.map((item) => (
            <RenderTreeItem key={item.id} item={item} />
          ))}
        </Tree>
      {/* </ScrollArea> */}
    </div>
  );
}