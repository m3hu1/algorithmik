export type EachRoute = {
  title: string;
  href: string;
  noLink?: true;
  items?: EachRoute[];
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
    title: "Data Structures",
    href: "/data-structures",
    items: [
      { title: "Arrays", href: "/array" },
      { title: "Strings", href: "/string"},
      { title: "Stacks", href: "/stack"},
      { title: "Queues", href: "/q"},
      { title: "Linked Lists", href: "/linked-lists", items: [
        { title: "Singly Linked List", href: "/singly" },
        { title: "Doubly Linked List", href: "/doubly" },
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
        { title: "Binary Tree", href: "/binary" },
        { title: "Binary Search Tree", href: "/bst" },
        { title: "Trie", href: "/trie" },
        { title: "Segment Tree", href: "/segment-tree" },
      ]}
    ],
  },
  {
    title: "Algorithms",
    href: "/algorithms",
    items: [
      { title: "Sorting", href: "/sorting" },
      { title: "Binary Search", href: "/binary-search" },
      { title: "Two Pointers", href: "/two-pointers" },
      { title: "Greedy", href: "/greedy" },
      { title: "Sliding Window", href: "/sliding-window" },
      { title: "Depth-First Search", href: "/dfs" },
      { title: "Breadth-First Search", href: "/bfs" },
      { title: "Backtracking", href: "/backtracking" },
      { title: "Dynamic Programming", href: "/dp" },
      { title: "Bit Manipulation", href: "/bit-manipulation" },
    ]
  },
  {
    title: "Prerequisites",
    href: "/prerequisites",
    items: [
      { title: "Pointers", href: "/pointers" },
      { title: "Recursion", href: "/recursion" },
    ]
  },
  {
    title: "Miscellaneous",
    href: "/misc",
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
