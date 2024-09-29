"use client";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import Cookies from 'js-cookie';
import { Eduform } from "./blockform";
import { imageURL } from "@/app/requestsapi/request";

interface ActivityData {

  location : string;
  image_link: string;
  event_heading: string;
  event_body: string;
  created_time: string;
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
        const retrievedData = JSON.parse(localStorage.getItem("newsData") || "[]");
        const itemdata = retrievedData.find((item: { id  : string; }) => item.id == coId)
        console.log([itemdata][0])
          // Get all cookies
          const allCookies = Cookies.get();

          // Remove all cookies
          Object.keys(allCookies).forEach(cookieName => {
              Cookies.remove(cookieName);
          });

         Cookies.set('adtoken', token, { expires: 1 });
        Cookies.set('event_body', [itemdata][0].event_body, { expires: 1 });
        Cookies.set('event_heading', [itemdata][0].event_heading, { expires: 1 });
        Cookies.set('image_link', [itemdata][0].image_link, { expires: 1 });
        Cookies.set('location', [itemdata][0].location, { expires: 1 });
        

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
          <span className="text-base">Manage Icds Block</span>
        </div>

        <Eduform />
      </div>
      {userData[0] &&
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 p-2 md:p-5 md:border md:shadow-md md:rounded-lg">
        <div className="">
          <p className="text-sm text-gray-500">Image</p>
          <p className="text-base"><img src={`${userData[0].image_link}`} ></img></p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Head</p>
          <p className="text-base">{userData[0].event_heading}</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">News Description</p>
          <p className="text-base">{userData[0].event_body}</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Location</p>
          <p className="text-base">{userData[0].location}</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">News Description</p>
          <p className="text-base">{userData[0].created_time.split("T")[0].split('-').reverse().join('-')}</p>
        </div>
        
       
      </div>
      }
    </div>
  );
}

export default Page;
