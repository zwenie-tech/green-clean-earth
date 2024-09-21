"use client";
import { ChevronLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { Coordinatorform } from "./coordinatorform";

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
          <span className="text-base">Manage coordinator</span>
        </div>

        <Coordinatorform />
      </div>
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 p-2 md:p-5 md:border md:shadow-md md:rounded-lg">
        <div className="">
          <p className="text-sm text-gray-500">Name</p>
          <p className="text-base">Lorem, ipsum dolor.</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-base">Lorem, ipsum dolor.</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Usernamer</p>
          <p className="text-base">lorem</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Contact Number</p>
          <p className="text-base">99989767.</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Created Date</p>
          <p className="text-base">98787676</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Profession</p>
          <p className="text-base">Lorem, ipsum dolor.</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Group Name</p>
          <p className="text-base">Lorem, ipsum dolor.</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Group Type</p>
          <p className="text-base">Lorem, ipsum dolor.</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">School Type</p>
          <p className="text-base">Lorem, ipsum dolor.</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">School Category</p>
          <p className="text-base">primary</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Educational District</p>
          <p className="text-base">Lorem, ipsum dolor.</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Educational Subdistrict </p>
          <p className="text-base">Lorem, ipsum dolor.</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Sahodaya</p>
          <p className="text-base">Lorem, ipsum dolor.</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Block</p>
          <p className="text-base">Lorem, ipsum dolor.</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Project </p>
          <p className="text-base">Lorem, ipsum dolor.</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Chapter </p>
          <p className="text-base">Lorem, ipsum dolor.</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Zone </p>
          <p className="text-base">Lorem, ipsum dolor.</p>
        </div>
      </div>
    </div>
  );
}

export default Page;
