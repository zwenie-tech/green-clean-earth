"use client";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import Cookies from 'js-cookie';
import { Eduform } from "./projectform";

interface ActivityData {

  dis_name : string;
  block_name: string;
  project_name: string;
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
      if(token){
        const retrievedData = JSON.parse(localStorage.getItem("projectData") || "[]");
        const itemdata = retrievedData.find((item: { project_id  : string; }) => item.project_id == coId)
        console.log([itemdata][0])
          // Get all cookies
          const allCookies = Cookies.get();

          // Remove all cookies
          Object.keys(allCookies).forEach(cookieName => {
              Cookies.remove(cookieName);
          });

         Cookies.set('adtoken', token, { expires: 1 });
        Cookies.set('dis_name', [itemdata][0].dis_name, { expires: 1 });
        Cookies.set('block_name', [itemdata][0].block_name, { expires: 1 });
        Cookies.set('project_name', [itemdata][0].project_name, { expires: 1 });
        

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
          <span className="text-base">Manage Icds Project</span>
        </div>

        <Eduform />
      </div>
      {userData[0] &&
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 p-2 md:p-5 md:border md:shadow-md md:rounded-lg">
        <div className="">
          <p className="text-sm text-gray-500">District</p>
          <p className="text-base">{userData[0].dis_name}</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Block</p>
          <p className="text-base">{userData[0].block_name}</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Project</p>
          <p className="text-base">{userData[0].project_name}</p>
        </div>
       
      </div>
      }
    </div>
  );
}

export default Page;
