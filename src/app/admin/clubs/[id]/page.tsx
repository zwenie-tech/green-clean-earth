"use client";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import Cookies from 'js-cookie';
import { EditClub } from "./editclub";
import { DeleteBtn } from "./deletebtn";

interface ActivityData {

  name: string;
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
        const retrievedData = JSON.parse(localStorage.getItem("clubs") || "[]");
        const itemdata = retrievedData.find((item: { id: string; }) => item.id == coId)

        setUserData([itemdata]);
      }
    }
    fetchdata();
  }, [coId, token]);

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
          <span className="text-base">Manage Clubs</span>
        </div>
        <div className="flex justify-between">

          <EditClub />
          <DeleteBtn />
        </div>
      </div>
      {userData[0] &&
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 p-2 md:p-5 md:border md:shadow-md md:rounded-lg">
          <div className="">
            <p className="text-sm text-gray-500">Club Name</p>
            <p className="text-base">{userData[0].name}</p>
          </div>
          

        </div>
      }
    </div>
  );
}

export default Page;
