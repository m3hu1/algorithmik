import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
import Link from "next/link";
  import { Fragment } from "react";
  
  export default function DocsBreadcrumb({ paths }: { paths: string[] }) {
    return (
      <div className="pb-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
              <Link href="/guide/introduction">Guide</Link></BreadcrumbLink>
            </BreadcrumbItem>
            {paths.map((path, index) => {
            // Construct the href by joining all paths up to current index
            const href = `/guide/${paths.slice(0, index + 1).join("/")}`;
            
            return (
              <Fragment key={path}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {index < paths.length - 1 ? (
                    <BreadcrumbLink asChild>
                      <Link href={href}>{toTitleCase(path)}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{toTitleCase(path)}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </Fragment>
            );
          })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    );
  }
  
  function toTitleCase(input: string): string {
    const words = input.split("-");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  }
  