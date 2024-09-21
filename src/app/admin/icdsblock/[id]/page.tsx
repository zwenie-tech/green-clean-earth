"use client";
import { ChevronLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { ICDSFrom } from "./icdsform";

function Page() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];
  return (
    <div className="">
      {/* {lastSegment} */}
      <div className="flex justify-between">
        <div
          className="flex items-center justify-start gap-2 my-4 cursor-pointer text-primary"
          onClick={() => {
            window.history.back();
          }}
        >
          <ChevronLeft />
          <span className="text-base">Manage ICDS</span>
        </div>

        <ICDSFrom />
      </div>
      <div className="grid gap-4 grid-cols-1 p-2 md:p-5 md:border md:shadow-md md:rounded-lg">
        <div className="">
          <p className="text-sm text-gray-500">District</p>
          <p className="text-base">Malappuram</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">ICDS block</p>
          <p className="text-base">Lsgd 123</p>
        </div>
      </div>
    </div>
  );
}

export default Page;
