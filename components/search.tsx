"use client";

import {
  CommandIcon,
  FileIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
} from "lucide-react";
import { MoonSat, SunLight, Page, KeyCommand } from "iconoir-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useMemo, useState } from "react";
import Anchor from "./anchor";
import { advanceSearch, cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "next-themes";

export default function Search() {
  const [searchedInput, setSearchedInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const filteredResults = useMemo(
    () => advanceSearch(searchedInput.trim()),
    [searchedInput],
  );

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-all duration-300",
          isOpen ? "opacity-90" : "opacity-0 pointer-events-none",
        )}
      />
      <div>
        <Dialog
          open={isOpen}
          onOpenChange={(open) => {
            if (!open) setSearchedInput("");
            setIsOpen(open);
          }}
        >
          <DialogTrigger asChild>
            <div className="relative flex-1 max-w-md cursor-pointer">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500 dark:text-stone-400" />
              <Input
                className="md:w-full rounded-md dark:bg-background/95 bg-background border h-9 pl-10 pr-0 sm:pr-4 text-sm shadow-sm overflow-ellipsis"
                placeholder="Search"
                type="search"
              />
              <div className="sm:flex hidden absolute top-1/2 -translate-y-1/2 right-2 text-xs font-medium font-mono items-center gap-0.5 dark:bg-stone-900 bg-stone-200/65 p-1 rounded-sm">
                {/* <CommandIcon className="w-3 h-3" /> */}
                <KeyCommand className="w-3 h-3" />
                <span>K</span>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="p-0 max-w-[650px] sm:top-[38%] top-[45%] !rounded-2xl">
            <DialogTitle className="sr-only">Search</DialogTitle>
            <DialogHeader>
              <input
                value={searchedInput}
                onChange={(e) => setSearchedInput(e.target.value)}
                placeholder="Type something to search..."
                autoFocus
                className="h-14 px-6 bg-transparent border-b text-[14px] outline-none"
              />
            </DialogHeader>
            {/* Theme Toggle Button */}
            <DialogClose asChild>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-full px-3 py-4 text-sm flex items-center gap-2.5 hover:bg-stone-100 dark:hover:bg-gray-600/25"
              >
                <div className="flex items-center w-fit gap-2 px-2 ml-2">
                  {theme === "dark" ? (
                    <>
                      {/* <SunIcon className="h-[1.1rem] w-[1.1rem]" /> */}
                      <SunLight className="h-[1.1rem] w-[1.1rem]" />
                      Turn light mode on
                    </>
                  ) : (
                    <>
                      {/* <MoonIcon className="h-[1.1rem] w-[1.1rem]" /> */}
                      <MoonSat className="h-[1.1rem] w-[1.1rem]" />
                      Turn dark mode on
                    </>
                  )}
                </div>
              </button>
            </DialogClose>
            {/* Separator */}
            <div className="h-px bg-border mx-0" />
            {/* Search Results */}
            {filteredResults.length == 0 && searchedInput && (
              <p className="text-muted-foreground mx-auto mt-2 text-sm">
                No results found for{" "}
                <span className="text-primary">{`"${searchedInput}"`}</span>
              </p>
            )}
            <ScrollArea className="max-h-[400px] overflow-y-auto group">
              <div className="flex flex-col items-start overflow-y-auto sm:px-2 px-1 pb-4">
                {filteredResults.map((item) => (
                  <DialogClose key={item.href} asChild>
                    <Anchor
                      className={cn(
                        "dark:hover:bg-gray-600/25 hover:bg-stone-100 w-full px-3 rounded-3xl text-sm flex items-center gap-2.5",
                      )}
                      href={`/guide${item.href}`}
                    >
                      <div className="flex items-center w-fit h-full py-3 gap-1.5 px-2">
                        {/* <FileIcon className="h-[1.1rem] w-[1.1rem] mr-1" />{" "} */}
                        <Page className="h-[1.1rem] w-[1.1rem] mr-1" />{" "}
                        {item.title}
                      </div>
                    </Anchor>
                  </DialogClose>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
