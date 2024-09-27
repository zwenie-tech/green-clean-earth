"use client";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CoordinatorForm } from "./coordinatorform";
import axios from "axios";
import { apiURL } from "@/app/requestsapi/request";
import Cookies from 'js-cookie';

interface UserData {
  edu_district: string;
  edu_sub_district_name: string;
  sahodaya_name: string;
  block_name: string;
  project_name: string;
  chapter_name: string;
  zone_name: string;
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
  co_ord_created_on: string;
  co_profession: string;
  type_name: string;
  gp_cat_name: string;
  co_username: string;
  co_email_id: string;
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

        const response = await axios.get(`${apiURL}/adminFrame/cordinatorDetails/${coId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        try {

          if (response.data.success && response.status != 203) {
            const udata = response.data.cordinatorDetails[0];
            // Get all cookies
            const allCookies = Cookies.get();

            // Remove all cookies
            Object.keys(allCookies).forEach(cookieName => {
              Cookies.remove(cookieName);
            });

            Cookies.set('adtoken', token, { expires: 1 });
            Cookies.set('co_ord_name', udata.co_ord_name, { expires: 1 });
            Cookies.set('co_email_id', udata.co_email_id, { expires: 1 });
            Cookies.set('co_username', udata.co_username, { expires: 1 });
            Cookies.set('co_ord_contact', udata.co_ord_contact, { expires: 1 });
            Cookies.set('co_profession', udata.co_profession, { expires: 1 });
            Cookies.set('gp_name', udata.gp_name, { expires: 1 });
            Cookies.set('group_type', udata.group_type, { expires: 1 });
            Cookies.set('type_name', udata.type_name, { expires: 1 });
            Cookies.set('gp_cat_name', udata.gp_cat_name, { expires: 1 });
            Cookies.set('edu_district', udata.edu_district, { expires: 1 });
            Cookies.set('edu_sub_district_name', udata.edu_sub_district_name, { expires: 1 });
            Cookies.set('sahodaya_name', udata.sahodaya_name, { expires: 1 });
            Cookies.set('block_name', udata.block_name, { expires: 1 });
            Cookies.set('project_name', udata.project_name, { expires: 1 });
            Cookies.set('chapter_name', udata.chapter_name, { expires: 1 });
            Cookies.set('zone_name', udata.zone_name, { expires: 1 });
            Cookies.set('st_name', udata.st_name, { expires: 1 });
            Cookies.set('dis_name', udata.dis_name, { expires: 1 });


            setUserData(response.data.cordinatorDetails);
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
          <span className="text-base">Manage coordinator</span>
        </div>

        <CoordinatorForm />
      </div>
      {userData[0] ?
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 p-2 md:p-5 md:border md:shadow-md md:rounded-lg">
          <div className="">
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-base">{userData[0].co_ord_name}</p>
          </div>
          <div className="">
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-base">{userData[0].co_email_id}</p>
          </div>
          <div className="">
            <p className="text-sm text-gray-500">Usernamer</p>
            <p className="text-base">{userData[0].co_username}</p>
          </div>
          <div className="">
            <p className="text-sm text-gray-500">Contact Number</p>
            <p className="text-base">{userData[0].co_ord_contact}</p>
          </div>
          <div className="">
            <p className="text-sm text-gray-500">Created Date</p>
            <p className="text-base">{userData[0].co_ord_created_on}</p>
          </div>
          <div className="">
            <p className="text-sm text-gray-500">Profession</p>
            <p className="text-base">{userData[0].co_profession}</p>
          </div>
          <div className="">
            <p className="text-sm text-gray-500">Group Name</p>
            <p className="text-base">{userData[0].gp_name}</p>
          </div>
          <div className="">
            <p className="text-sm text-gray-500">Group Type</p>
            <p className="text-base">{userData[0].group_type}</p>
          </div>
          <div className="">
            <p className="text-sm text-gray-500">School Type</p>
            <p className="text-base">{userData[0].type_name}</p>
          </div>
          <div className="">
            <p className="text-sm text-gray-500">School Category</p>
            <p className="text-base">{userData[0].gp_cat_name}</p>
          </div>
          {userData[0].edu_district ?
            <div className="">
              <p className="text-sm text-gray-500">Educational District</p>
              <p className="text-base">{userData[0].edu_district}</p>
            </div>
            : ""}
          {userData[0].edu_sub_district_name ?
            <div className="">
              <p className="text-sm text-gray-500">Educational Subdistrict </p>
              <p className="text-base">{userData[0].edu_sub_district_name}</p>
            </div>
            : ""}
          {userData[0].sahodaya_name ?
            <div className="">
              <p className="text-sm text-gray-500">Sahodaya</p>
              <p className="text-base">{userData[0].sahodaya_name}</p>
            </div>
            : ""}
          {userData[0].block_name ?
            <div className="">
              <p className="text-sm text-gray-500">Block</p>
              <p className="text-base">{userData[0].block_name}</p>
            </div>
            : ""}
          {userData[0].project_name ?
            <div className="">
              <p className="text-sm text-gray-500">Project </p>
              <p className="text-base">{userData[0].project_name}</p>
            </div>
            : ""}
          {userData[0].chapter_name ?
            <div className="">
              <p className="text-sm text-gray-500">Chapter </p>
              <p className="text-base">{userData[0].chapter_name}</p>
            </div>
            : ""}
          {userData[0].zone_name ?
            <div className="">
              <p className="text-sm text-gray-500">Zone </p>
              <p className="text-base">{userData[0].zone_name}</p>
            </div>
            : ""}
        </div>
        : ''}
    </div>
  );
}

export default Page;
