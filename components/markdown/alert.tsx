// algorithmik/components/markdown/alert.tsx
"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface AlertComponentProps {
  children: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  cancelText?: string;
}

export default function AlertComponent({
  children,
  title,
  description,
  actionText = "Continue",
  cancelText = "Close",
}: AlertComponentProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span className="underline cursor-pointer hover:text-primary transition-colors">
          {children}
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          {/* <AlertDialogAction>{actionText}</AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
