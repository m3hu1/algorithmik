import { getDocsTocs } from "@/lib/markdown";
import { RailToc } from "@/components/ui/rail-toc";

export default async function Toc({ path }: { path: string }) {
  const tocs = await getDocsTocs(path);

  if (!tocs || tocs.length === 0) {
    return null;
  }

  const items = tocs.map(({ href, level, text }) => ({
    id: href.slice(1),
    label: text,
    depth: level - 2,
  }));

  return (
    <div className="lg:flex hidden toc flex-[1.5] min-w-[238px] py-9 pl-3 sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto">
      <RailToc
        items={items}
        title="On this page"
        offset={80}
        style={
          { "--rail": "hsl(var(--foreground) / 0.5)" } as React.CSSProperties
        }
      />
    </div>
  );
}
