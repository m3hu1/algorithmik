import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { HeartIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t w-full h-16">
      <div className="container flex items-center sm:justify-between justify-center sm:gap-0 gap-4 h-full text-muted-foreground text-sm flex-wrap sm:py-0 py-3 max-sm:px-4">
        <div className="flex items-center gap-3">
          <p className="text-center">
            Built with ❤️ by{" "}
            <Link
              className="underline underline-offset-2"
              target="_blank"
              href="https://github.com/m3hu1"
            >
              Mehul
            </Link>
            . Support me by starring the{" "}
            <Link
              className=" underline underline-offset-2"
              target="_blank"
              href="https://github.com/m3hu1/algorithmik"
            >
              repository
            </Link>
            .
          </p>
        </div>

        <div className="gap-4 items-center hidden md:flex">
          <FooterButtons />
        </div>
      </div>
    </footer>
  );
}

export function FooterButtons() {
  return (
    <>
      <Link
        href="https://github.com/sponsors/m3hu1"
        target="_blank"
        className={buttonVariants({ variant: "outline", size: "sm" })}
      >
        <HeartIcon className="h-4 w-4 mr-2 text-red-600 fill-current" />
        Sponsor
      </Link>
      <Link href="https://www.buymeacoffee.com/m3hu1" target="_blank">
          <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee <3&emoji=&slug=m3hu1&button_colour=FFDD00&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=ffffff" width={175}/>
        </Link>
    </>
  );
}
