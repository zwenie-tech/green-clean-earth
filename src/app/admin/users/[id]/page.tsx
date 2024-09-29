"use client";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { EditForm } from "./edit-form";
import Cookies from 'js-cookie';
import axios from "axios";
import { apiURL } from "@/app/requestsapi/request";

interface UserData {
  us_name: string;
  us_email: string;
  us_mobile: string;
  cntry_name: string;
  st_name: string;
  dis_name: string;
  cop_name: string;
  lsg_name: string;
  us_ward: string;
  us_address: string;
  us_gender: string;
  created_on: string;
  us_city: string;
  us_province: string;
  co_ord_name: string;
  gp_name: string;
}


function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const userId = pathname.split("/")[3];
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];
  const token = Cookies.get("adtoken");
  const [userData, setUserData] = useState<UserData[]>([]);

  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
    }
  }, [token, router]);
  useEffect(() => {
    async function fetchdata() {

      if (token) {
        location.reload();

        const response = await axios.get(`${apiURL}/adminFrame/userDetails/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }) 
        try {

          if (response.data.success && response.status != 203) {
            const udata = response.data.userDetails[0];
            // Get all cookies
            const allCookies = Cookies.get();

            // Remove all cookies
            Object.keys(allCookies).forEach(cookieName => {
                Cookies.remove(cookieName);
            });
           

           Cookies.set('adtoken', token, { expires: 1 });
            Cookies.set('us_name', udata.us_name, { expires: 1 });
            Cookies.set('us_email', udata.us_email, { expires: 1 });
            Cookies.set('us_mobile', udata.us_mobile, { expires: 1 });
            Cookies.set('cntry_name', udata.cntry_name, { expires: 1 });
            Cookies.set('st_name', udata.st_name, { expires: 1 });
            Cookies.set('dis_name', udata.dis_name, { expires: 1 });
            Cookies.set('cop_name', udata.cop_name, { expires: 1 });
            Cookies.set('lsg_name', udata.lsg_name, { expires: 1 });
            Cookies.set('us_ward', udata.us_ward, { expires: 1 });
            Cookies.set('us_address', udata.us_address, { expires: 1 });
            Cookies.set('us_gender', udata.us_gender, { expires: 1 });
            Cookies.set('us_city', udata.us_city, { expires: 1 });
            Cookies.set('us_province', udata.us_province, { expires: 1 });
            Cookies.set('co_ord_name', udata.co_ord_name, { expires: 1 });
            Cookies.set('gp_name', udata.gp_name, { expires: 1 });
        location.reload();
            
            setUserData(response.data.userDetails);
          } else {

          }

        } catch (error) {
          console.error("Error:", error);

        }
      };
    }
    fetchdata();
  }, [token, userId]);
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
        {userData[0] ? 
        <EditForm data={userData[0]}/>
        :''}
      </div>
      {userData[0] ? 
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 p-2 md:p-5 md:border md:shadow-md md:rounded-lg">
        <div className="">
          <p className="text-sm text-gray-500">Name</p>
          <p className="text-base">{userData[0].us_name}</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-base">{userData[0].us_email}</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Phone number</p>
          <p className="text-base">{userData[0].us_mobile}</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Country</p>
          <p className="text-base">{userData[0].cntry_name}</p>
        </div>
        {userData[0].st_name ? 
        <div className="">
          <p className="text-sm text-gray-500">State</p>
          <p className="text-base">{userData[0].st_name}</p>
        </div>:""}
        {userData[0].dis_name ? 
        <div className="">
          <p className="text-sm text-gray-500">District</p>
          <p className="text-base">{userData[0].dis_name}</p>
        </div>:""}
        {userData[0].cop_name ? 
        <div className="">
          <p className="text-sm text-gray-500">Corporation</p>
          <p className="text-base">{userData[0].cop_name}</p>
        </div>:''}
        {userData[0].lsg_name ? 
        <div className="">
          <p className="text-sm text-gray-500">Lsgd</p>
          <p className="text-base">{userData[0].lsg_name}</p>
        </div>:''}
        {userData[0].us_ward ? 
        <div className="">
          <p className="text-sm text-gray-500">Ward</p>
          <p className="text-base">{userData[0].us_ward}</p>
        </div>
        :''}
        <div className="">
          <p className="text-sm text-gray-500">Address</p>
          <p className="text-base">
            {userData[0].us_address}
          </p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Gender</p>
          <p className="text-base">{userData[0].us_gender}</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Created Date</p>
          <p className="text-base">{userData[0].created_on.split("T")[0].split('-').reverse().join('-')}</p>
        </div>
        {userData[0].us_city ? 
        <div className="">
          <p className="text-sm text-gray-500">City</p>
          <p className="text-base">{userData[0].us_city}</p>
        </div>:''}

        {userData[0].us_province ? 
        <div className="">
          <p className="text-sm text-gray-500">Province</p>
          <p className="text-base">{userData[0].us_province}</p>
        </div>:''}
        <div className="">
          <p className="text-sm text-gray-500">Coordinator Name</p>
          <p className="text-base">{userData[0].co_ord_name}</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Group Name</p>
          <p className="text-base">{userData[0].gp_name}</p>
        </div>
      </div>
      :''
      }
    </div>
  );
}

export default Page;
