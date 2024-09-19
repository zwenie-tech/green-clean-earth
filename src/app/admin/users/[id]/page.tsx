"use client";
import { usePathname } from "next/navigation";
import React from "react";

function Page() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];
  return <div className="text-4xl">
    {lastSegment}

    
    </div>;
}

export default Page;
