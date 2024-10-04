"use client";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import Cookies from 'js-cookie';
import { Eduform } from "./mmcform";

interface ActivityData {

  chapter_type_name : string;
  chapter_name: string;
  zone_name:string;
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
        const retrievedData = JSON.parse(localStorage.getItem("mmzData") || "[]");
        const itemdata = retrievedData.find((item: { zone_id  : string; }) => item.zone_id == coId)
        console.log([itemdata][0])
          // Get all cookies
          const allCookies = Cookies.get();

          // Remove all cookies
          Object.keys(allCookies).forEach(cookieName => {
              Cookies.remove(cookieName);
          });

         Cookies.set('adtoken', token, { expires: 1 });
        Cookies.set('chapter_name', [itemdata][0].chapter_name, { expires: 1 });
        Cookies.set('chapter_type_id', [itemdata][0].chapter_type_id, { expires: 1 });
        Cookies.set('zone_name', [itemdata][0].zone_name, { expires: 1 });
        

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
          <span className="text-base">Manage Malayalam Mission Zone</span>
        </div>

        <Eduform />
      </div>
      {userData[0] &&
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 p-2 md:p-5 md:border md:shadow-md md:rounded-lg">
        <div className="">
          <p className="text-sm text-gray-500">Chapter</p>
          <p className="text-base">{userData[0].chapter_name}</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Chapter</p>
          <p className="text-base">{userData[0].zone_name}</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Type</p>
          <p className="text-base">{userData[0].chapter_type_name}</p>
        </div>
       
      </div>
      }
    </div>
  );
}

export default Page;
