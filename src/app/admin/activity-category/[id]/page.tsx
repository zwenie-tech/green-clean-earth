"use client";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import Cookies from 'js-cookie';
import { Eduform } from "./actcatform";
import { DeleteBtn } from "./deletebtn";

interface ActivityData {

  activity_category: string;
  activity_category_created_on: string;
}
function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const coId = pathname.split("/")[3];
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];
  const token = Cookies.get("adtoken");
  const [userData, setUserData] = useState<ActivityData[]>([]);

  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
    }
  }, [token, router]);
  useEffect(() => {
    async function fetchdata() {
      if (token) {
        const retrievedData = JSON.parse(localStorage.getItem("actcat") || "[]");
        const itemdata = retrievedData.find((item: { activity_category_id: string; }) => item.activity_category_id == coId)

        setUserData([itemdata]);
      }
    }
    fetchdata();
  }, []);

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
          <span className="text-base">Manage Activity Category</span>
        </div>
        <div className="flex justify-between">

          <Eduform />
          <DeleteBtn />
        </div>
      </div>
      {userData[0] &&
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 p-2 md:p-5 md:border md:shadow-md md:rounded-lg">
          <div className="">
            <p className="text-sm text-gray-500">Category</p>
            <p className="text-base">{userData[0].activity_category}</p>
          </div>
          <div className="">
            <p className="text-sm text-gray-500">Created On</p>
            <p className="text-base">{userData[0].activity_category_created_on.split("T")[0].split('-').reverse().join('-')}</p>
          </div>

        </div>
      }
    </div>
  );
}

export default Page;
