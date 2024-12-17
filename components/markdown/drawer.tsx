// algorithmik/components/markdown/drawer.tsx
"use client";

import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Typography } from "../typography";

interface DrawerComponentProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function DrawerComponent({
  children,
  title,
  description,
}: DrawerComponentProps) {
  // Separate the trigger text and the drawer content
  const triggerText = React.Children.toArray(children)[0];
  const drawerContent = React.Children.toArray(children).slice(1);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <span className="underline cursor-pointer hover:text-primary transition-colors">
          {triggerText}
        </span>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-4xl h-full flex flex-col">
          <DrawerHeader>
            {title && <DrawerTitle>{title}</DrawerTitle>}
            {description && (
              <DrawerDescription>{description}</DrawerDescription>
            )}
          </DrawerHeader>
          <ScrollArea className="flex-1 px-4">
            <div className="pb-6">
              <Typography>{drawerContent}</Typography>
            </div>
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
