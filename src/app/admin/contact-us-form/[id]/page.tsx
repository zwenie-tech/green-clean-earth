"use client";
import { ChevronLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { Contactform } from "./contactform"

function ActivityLabel() {
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
          <span className="text-base">Manage Contact</span>
        </div>

        <Contactform />
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
          <p className="text-sm text-gray-500">Subject </p>
          <p className="text-base">9876543210</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Messege</p>
          <p className="text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
            repellat consequuntur rerum et saepe perferendis dignissimos quam
            soluta obcaecati
          </p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500"> Date</p>
          <p className="text-base">Lorem, ipsum dolor.</p>
        </div>
      </div>
    </div>
  );
}

export default ActivityLabel;
