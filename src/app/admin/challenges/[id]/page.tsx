"use client";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "@/app/requestsapi/request";
import Cookies from 'js-cookie';
import { Challengesform } from "./challengesform";

interface UserData {
  edu_district : string;
  edu_sub_district_name : string;
  sahodaya_name : string;
  block_name : string;
  project_name : string;
  chapter_name : string;
  zone_name : string;
  co_ord_name: string;
  email: string;
  username: string;
  group_type: string;
  cntry_name: string;
  st_name: string;
  dis_name: string;
  cop_name: string;
  lsg_name: string;
  gp_ward_no: string;
  gp_name: string;
  gp_refferal_name: string;
  us_mobile: string;
  up_date : string;
  co_profession : string;
  type_name: string;
  gp_cat_name: string;
  co_username: string;
  us_email: string;
  us_name: string;
}
function Page() {

  const router = useRouter();
  const pathname = usePathname();
  const coId = pathname.split("/")[3];
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

        const response = await axios.get(`${apiURL}/adminFrame/challengeDetails/${coId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        try {

          if (response.data.success && response.status != 203) {
            const udata = response.data.challengeDetails[0];

            // Cookies.set('us_name', udata.us_name, { expires: 1 });
            // Cookies.set('us_email', udata.us_email, { expires: 1 });
            // Cookies.set('us_mobile', udata.us_mobile, { expires: 1 });
            // Cookies.set('cntry_name', udata.cntry_name, { expires: 1 });
            // Cookies.set('st_name', udata.st_name, { expires: 1 });
            // Cookies.set('dis_name', udata.dis_name, { expires: 1 });
            // Cookies.set('cop_name', udata.cop_name, { expires: 1 });
            // Cookies.set('lsg_name', udata.lsg_name, { expires: 1 });
            // Cookies.set('us_ward', udata.us_ward, { expires: 1 });
            // Cookies.set('us_address', udata.us_address, { expires: 1 });
            // Cookies.set('us_gender', udata.us_gender, { expires: 1 });
            // Cookies.set('us_city', udata.us_city, { expires: 1 });
            // Cookies.set('us_province', udata.us_province, { expires: 1 });
            // Cookies.set('co_ord_name', udata.co_ord_name, { expires: 1 });
            // Cookies.set('gp_name', udata.gp_name, { expires: 1 });

            setUserData(response.data.challengeDetails);
            console.log(udata)
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
          <span className="text-base">Manage Challenges</span>
        </div>

        <Challengesform />
      </div>
      {userData[0] ? 
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 p-2 md:p-5 md:border md:shadow-md md:rounded-lg">
        <div className="">
          <p className="text-sm text-gray-500">Name</p>
          <p className="text-base">{userData[0].co_ord_name}</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-base">{userData[0].us_email}</p>
        </div>
        {/* <div className="">
          <p className="text-sm text-gray-500">Usernamer</p>
          <p className="text-base">{userData[0].co_username}</p>
        </div> */}
        <div className="">
          <p className="text-sm text-gray-500">Contact Number</p>
          <p className="text-base">{userData[0].us_mobile}</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Created Date</p>
          <p className="text-base">{userData[0].up_date.split("T")[0].split('-').reverse().join('-')}</p>
        </div>
        {/* <div className="">
          <p className="text-sm text-gray-500">Profession</p>
          <p className="text-base">{userData[0].co_profession}</p>
        </div> */}
        {userData[0].gp_name ?
        <div className="">
          <p className="text-sm text-gray-500">Group Name</p>
          <p className="text-base">{userData[0].gp_name}</p>
        </div>
        :''}
         {userData[0].group_type ?
        <div className="">
          <p className="text-sm text-gray-500">Group Type</p>
          <p className="text-base">{userData[0].group_type}</p>
        </div>
        :''}
         {userData[0].type_name ?
        <div className="">
          <p className="text-sm text-gray-500">School Type</p>
          <p className="text-base">{userData[0].type_name}</p>
        </div>
        :''}
         {userData[0].gp_cat_name ?
        <div className="">
          <p className="text-sm text-gray-500">School Category</p>
          <p className="text-base">{userData[0].gp_cat_name}</p>
        </div>
        :''}
        {userData[0].edu_district ?
        <div className="">
          <p className="text-sm text-gray-500">Educational District</p>
          <p className="text-base">{userData[0].edu_district}</p>
        </div>
        :""}
        {userData[0].edu_sub_district_name ?
        <div className="">
          <p className="text-sm text-gray-500">Educational Subdistrict </p>
          <p className="text-base">{userData[0].edu_sub_district_name}</p>
        </div>
        :""}
        {userData[0].sahodaya_name?
        <div className="">
          <p className="text-sm text-gray-500">Sahodaya</p>
          <p className="text-base">{userData[0].sahodaya_name}</p>
        </div>
        :""}
        {userData[0].block_name?
        <div className="">
          <p className="text-sm text-gray-500">Block</p>
          <p className="text-base">{userData[0].block_name}</p>
        </div>
        :""}
        {userData[0].project_name?
        <div className="">
          <p className="text-sm text-gray-500">Project </p>
          <p className="text-base">{userData[0].project_name}</p>
        </div>
        :""}
        {userData[0].chapter_name?
        <div className="">
          <p className="text-sm text-gray-500">Chapter </p>
          <p className="text-base">{userData[0].chapter_name}</p>
        </div>
        :""}
        {userData[0].zone_name?
        <div className="">
          <p className="text-sm text-gray-500">Zone </p>
          <p className="text-base">{userData[0].zone_name}</p>
        </div>
        :""}
      </div>
      :''}
    </div>
  );
}

export default Page;
