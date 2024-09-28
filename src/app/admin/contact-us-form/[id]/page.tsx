"use client";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Contactform } from "./contactform"
import Cookies from 'js-cookie';
import axios from "axios";
import { apiURL } from "@/app/requestsapi/request";

interface ActivityData {
  email_id:string;
  message : string;
  name : string;
  requested_date : string;
  subject : string;
}
function ActivityLabel() {
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
        const retrievedData = JSON.parse(localStorage.getItem("myData") || "[]");
        console.log(retrievedData.find((item: { id: string; }) => item.id == coId))
      setUserData([retrievedData.find((item: { id: string; }) => item.id == coId)]);
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
          <span className="text-base">Manage Contact</span>
        </div>

        <Contactform />
      </div>
      {userData[0] ?
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 p-2 md:p-5 md:border md:shadow-md md:rounded-lg">
        <div className="">
          <p className="text-sm text-gray-500">Name</p>
          <p className="text-base">{userData[0].name}</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-base">{userData[0].email_id}</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Subject </p>
          <p className="text-base">{userData[0].subject}</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Messege</p>
          <p className="text-base">
          {userData[0].message}
          </p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500"> Date</p>
          <p className="text-base">{userData[0].requested_date.split("T")[0].split('-').reverse().join('-')}</p>
        </div>
      </div>:''}
    </div>
  );
}

export default ActivityLabel;
