import { buttonVariants } from "@/components/ui/button";
// import { RainbowButton } from "@/components/ui/rainbow-btn";
import { page_routes } from "@/lib/routes-config";
import { MoveRight, MoveUpRightIcon } from "lucide-react";
import Link from "next/link";
import { AnimatedGridPattern } from "@/components/animated-grid";
import { ProblemsFolderButton } from "@/components/ProblemsFolderButton";
import { StartLearningButton } from "@/components/StartLearningButton";

export default function Home() {
  return (
    <div className="relative">
      <div className="hero-section relative flex sm:min-h-[92vh] min-h-[85vh] flex-col items-center justify-center text-center px-2 py-8">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className="absolute inset-0 -z-10 hidden sm:block [mask-image:radial-gradient(700px_circle_at_center,white,transparent)]"
        />
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
          This is a comprehensive guide to mastering data structures and
          algorithms. It covers a wide range of topics, from the basics to
          advanced concepts.
        </p>
        <div className="flex flex-row items-center gap-5">
          <Link
            href={`/guide${page_routes[0].href}`}
            className={buttonVariants({
              variant: "expandIcon",
              className: "px-6",
              size: "lg",
            })}
          >
            Start Learning
            <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100">
              <MoveRight className="h-4 w-4" />
            </div>
          </Link>
          {/* <StartLearningButton href={`/guide${page_routes[0].href}`} /> */}
          {/* <Link
            href="/guide/problem-sets/"
            className={buttonVariants({
              variant: "problems",
              className: "px-6",
              size: "lg",
            })}
          >
            Problems Folder
          </Link> */}
          <ProblemsFolderButton />
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
    </div>
  );
}
