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
      { title: "Array", href: "/array" },
    ],
  },
  {
    title: "Miscellaneous",
    href: "/misc",
    items: [
      {
        title: "Complexity of Various Algorithms",
        href: "/complexity-of-algos",
      },
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
