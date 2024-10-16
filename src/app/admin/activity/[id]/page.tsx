"use client";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Activityforms } from "./activityform"
import Cookies from 'js-cookie';
import axios from "axios";
import { apiURL } from "@/app/requestsapi/request";
import DeleteBtn from "./deletebtn";


interface ActivityData {
  participant_name:string;
  activity_social_media_link : string;
  activity_description : string;
  activity_views : string;
  activity_likes : string;
  activity_value : string;
  activity_on : string;
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
  co_ord_contact: string;
  co_ord_created_on : string;
  co_profession : string;
  type_name: string;
  gp_cat_name: string;
  co_username: string;
  co_email_id: string;
  participant_address:string;
  activity_title:string;
  activity_category:string;
  activity_sub_category:string;
  earnings: string;
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

        const response = await axios.get(`${apiURL}/adminFrame/activityDetails/${coId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        try {

          if (response.data.success && response.status != 203) {
            const udata = response.data.activityDetails[0];
             // Get all cookies
             const allCookies = Cookies.get();

             // Remove all cookies
             Object.keys(allCookies).forEach(cookieName => {
                 Cookies.remove(cookieName);
             });

            Cookies.set('adtoken', token, { expires: 1 });
            Cookies.set('activity_title', udata.activity_title, { expires: 1 });
            Cookies.set('participant_name', udata.participant_name, { expires: 1 });
            Cookies.set('activity_social_media_link', udata.activity_social_media_link, { expires: 1 });
            Cookies.set('participant_address', udata.participant_address, { expires: 1 });
            Cookies.set('activity_description', udata.activity_description, { expires: 1 });
            Cookies.set('activity_category', udata.activity_category, { expires: 1 });
            Cookies.set('activity_sub_category', udata.activity_sub_category, { expires: 1 });
            Cookies.set('activity_views', udata.activity_views, { expires: 1 });
            Cookies.set('activity_likes', udata.activity_likes, { expires: 1 });
            Cookies.set('activity_value', udata.activity_value, { expires: 1 });
            Cookies.set('earnings', udata.earnings, { expires: 1 });
          

            setUserData(response.data.activityDetails);
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
          <span className="text-base">Manage Activity</span>
        </div>
        <div className="flex justify-between">

        <Activityforms />
          <DeleteBtn />
        </div>

      </div>
      {userData[0] ?
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 p-2 md:p-5 md:border md:shadow-md md:rounded-lg">
        <div className="">
          <p className="text-sm text-gray-500">Activity Title</p>
          <p className="text-base">{userData[0].activity_title}</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Participant Name</p>
          <p className="text-base">{userData[0].participant_name}</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Activity Link</p>
          <p className="text-base">{userData[0].activity_social_media_link}</p>
        </div>
        {userData[0].earnings ?
        <div className="">
          <p className="text-sm text-gray-500">Description</p>
          <p className="text-base">{userData[0].activity_description}</p>
        </div>
        : ''}
        <div className="">
          <p className="text-sm text-gray-500">Category</p>
          <p className="text-base">{userData[0].activity_category}</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Sub Category</p>
          <p className="text-base">{userData[0].activity_sub_category}</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">View</p>
          <p className="text-base">{userData[0].activity_views}</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Likes</p>
          <p className="text-base">{userData[0].activity_likes}</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Value</p>
          <p className="text-base">{userData[0].activity_value}</p>
        </div>
        {userData[0].earnings ?
        <div className="">
          <p className="text-sm text-gray-500">Earning</p>
          <p className="text-base">{userData[0].earnings}</p>
        </div>
        :''}
        <div className="">
          <p className="text-sm text-gray-500">Address</p>
          <p className="text-base">{userData[0].participant_address}</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-500">Created Date</p>
          <p className="text-base">{userData[0].activity_on.split("T")[0].split('-').reverse().join('-')}</p>
        </div>
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

export default ActivityLabel;