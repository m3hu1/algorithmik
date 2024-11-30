import { buttonVariants } from "@/components/ui/button";
// import { RainbowButton } from "@/components/ui/rainbow-btn";
import { page_routes } from "@/lib/routes-config";
import { MoveRight, MoveUpRightIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex sm:min-h-[92vh] min-h-[85vh] flex-col items-center justify-center text-center px-2 py-8">
      <Link
        href="https://github.com/m3hu1/algorithmik"
        target="_blank"
        className="mb-5 sm:text-lg flex items-center gap-2 underline underline-offset-4 sm:-mt-12"
      >
        Support me by starring the repository{" "}
        <MoveUpRightIcon className="w-4 h-4 font-extrabold" />
      </Link>
      <h1 className="text-3xl font-bold mb-4 sm:text-6xl pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-transparent dark:from-white dark:to-slate-900/10 pb-2">
      Mastering Data Structure & Algorithms
</h1>
      <p className="mb-8 sm:text-xl max-w-[800px] text-muted-foreground">
      This is a comprehensive guide to mastering data structures and algorithms. It covers a wide range of topics, from the basics to advanced concepts.
      </p>
      <div className="flex flex-row items-center gap-5">
        {/* <Link
          href={`/guide${page_routes[0].href}`}
          className={buttonVariants({ className: "px-6", size: "lg" })}
        >
          Start Learning
        </Link> */}
        <Link
          href={`/guide${page_routes[0].href}`}
          className={buttonVariants({ 
            variant: "expandIcon",
            className: "px-6", 
            size: "lg" 
          })}
        >
          Start Learning
          <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
            <MoveRight className="h-4 w-4" />
          </div>
        </Link>
        {/* <Link href={`/guide${page_routes[0].href}`}><RainbowButton className="px-6">Start Learning</RainbowButton></Link> */}
        {/* <Link
          href="/blog"
          className={buttonVariants({
            variant: "secondary",
            className: "px-6",
            size: "lg",
          })}
        >
          Read Blog
        </Link> */}
      </div>
    </div>
  );
}
