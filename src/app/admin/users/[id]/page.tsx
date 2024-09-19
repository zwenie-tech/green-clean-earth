"use client";
import { ChevronLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { EditForm } from "./edit-form";

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
          <span className="text-base">Manage users</span>
        </div>

        <EditForm />
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
          <p className="text-sm text-gray-500">Phone number</p>
          <p className="text-base">9876543210</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Country</p>
          <p className="text-base">Lorem, ipsum dolor.</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">State</p>
          <p className="text-base">Lorem, ipsum dolor.</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">District</p>
          <p className="text-base">Lorem, ipsum dolor.</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Corporation</p>
          <p className="text-base">Lorem, ipsum dolor.</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Lsgd</p>
          <p className="text-base">Lorem, ipsum dolor.</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Ward</p>
          <p className="text-base">Lorem, ipsum dolor.</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Address</p>
          <p className="text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
            repellat consequuntur rerum et saepe perferendis dignissimos quam
            soluta obcaecati
          </p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Gender</p>
          <p className="text-base">Lorem, ipsum dolor.</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Created Date</p>
          <p className="text-base">Lorem, ipsum dolor.</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">City</p>
          <p className="text-base">Lorem, ipsum dolor.</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Province</p>
          <p className="text-base">Lorem, ipsum dolor.</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Coordinator Name</p>
          <p className="text-base">Lorem, ipsum dolor.</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Group Name</p>
          <p className="text-base">Lorem, ipsum dolor.</p>
        </div>
      </div>
    </div>
  );
}

export default Page;
