export type EachRoute = {
  title: string;
  href: string;
  noLink?: true;
  items?: EachRoute[];
  description?: string;
};

export const ROUTES: EachRoute[] = [
  {
    title: "Introduction",
    href: "/introduction",
    items: [
      {
        title: "About",
        href: "/about",
      },
    ],
  },
  {
    title: "Getting Started",
    href: "/getting-started",
    description: "This section tells you how to navigate this guide effectively.",
    items: [
      { title: "Structure of This Guide", href: "/structure" },
      {
        title: "Choosing a Language",
        href: "/programming-language",
      },
      {
        title: "Algorithmic Complexity",
        href: "/complexity",
      },
    ],
  },
  {
    title: "Problem Sets",
    href: "/problem-sets",
    description: "A list of various problem sets that you can use to practice.",
    items: [
      { title: "Problems Folder", href: "/problems-folder" },
      { title: "LeetCode Problem Lists", href: "/leetcode-list" },
    ],
  },
  {
    title: "Data Structures",
    href: "/data-structures",
    description: "List of various data structures to learn.",
    items: [
      { title: "Arrays", href: "/array" },
      { title: "Strings", href: "/string"},
      { title: "Stacks", href: "/stack"},
      { title: "Queues", href: "/queue"},
      { title: "Linked Lists", href: "/linked-lists", items: [
        { title: "Singly Linked List", href: "/singly-linked-list" },
        { title: "Doubly Linked List", href: "/doubly-linked-list" },
      ]},
      { title: "Hash Tables", href: "/hash-tables", items: [
        { title: "Hash Map", href: "/hashmap" },
        { title: "Hash Set", href: "/hashset" },
      ] },
      { title: "Heaps", href: "/heaps", items: [
        { title: "Min Heap", href: "/minheap" },
        { title: "Max Heap", href: "/maxheap" },
      ]},
      { title: "Trees", href: "/trees", items: [
        { title: "Binary Tree", href: "/binary-tree" },
        { title: "Binary Search Tree", href: "/BST" },
        { title: "Trie", href: "/trie" },
        { title: "Segment Tree", href: "/segment-tree" },
      ]}
    ],
  },
  {
    title: "Algorithms",
    href: "/algorithms",
    description: "List of various algorithms to learn.",
    items: [
      { title: "Sorting", href: "/sorting" },
      { title: "Binary Search", href: "/binary-search" },
      { title: "Two Pointers", href: "/two-pointers" },
      { title: "Greedy", href: "/greedy" },
      { title: "Sliding Window", href: "/sliding-window" },
      { title: "Depth-First Search", href: "/DFS" },
      { title: "Breadth-First Search", href: "/BFS" },
      { title: "Backtracking", href: "/backtracking" },
      { title: "Dynamic Programming", href: "/DP" },
      { title: "Bit Manipulation", href: "/bit-manipulation" },
    ]
  },
  {
    title: "Prerequisites",
    href: "/prerequisites",
    description: "Things to know before or during learning data structures & algorithms.",
    items: [
      { title: "Pointers", href: "/pointers" },
      { title: "Recursion", href: "/recursion" },
    ]
  },
  {
    title: "Miscellaneous",
    href: "/misc",
    description: "This section contains miscellaneous topics.",
    items: [
      {  title: "Complexity of Various Algorithms", href: "/complexity-of-algos", },
    ],
  },
];

type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecurrsiveAllLinks(temp));
  });
  return ans;
}

export const page_routes = ROUTES.map((it) => getRecurrsiveAllLinks(it)).flat();
