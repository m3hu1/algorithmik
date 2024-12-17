"use client";

import { useEffect } from "react";

export default function NoOverscroll() {
  useEffect(() => {
    // Add no-scroll class to html and body
    document.documentElement.classList.add("no-scroll");
    document.body.classList.add("no-scroll");

    // Cleanup: remove the class when unmounting
    return () => {
      document.documentElement.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return null;
}
