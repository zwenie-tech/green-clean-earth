"use client";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { apiURL } from "@/app/requestsapi/request";
import { Activityforms } from "../../activity/[id]/activityform";
import { Corpform } from "./corpform";


interface ActivityData {
  cop_name:string;
  dis_name : string;
  st_name : string;
  
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
      if (token) {

        const response = await axios.get(`${apiURL}/adminFrame/corporationDetails/${coId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        try {

          if (response.data.success && response.status != 203) {

            setUserData(response.data.corpDetails);
          } else {

          }

        } catch (error) {
          console.error("Error:", error);

        }
      };
    }
    fetchdata();
  }, [token, coId]);
  
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
          <span className="text-base">Manage Corporation</span>
        </div>

        <Corpform />
      </div>
      {userData[0] ?
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 p-2 md:p-5 md:border md:shadow-md md:rounded-lg">
        
        <div className="">
          <p className="text-sm text-gray-500">State</p>
          <p className="text-base">{userData[0].st_name}</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">District</p>
          <p className="text-base">{userData[0].dis_name}</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Corporation Name</p>
          <p className="text-base">{userData[0].cop_name}</p>
        </div>
      </div>
      :''}
    </div>
  );
}

export default ActivityLabel;