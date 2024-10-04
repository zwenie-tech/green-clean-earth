"use client";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { EditForm } from "./edit-form";
import Cookies from 'js-cookie';
import axios from "axios";
import { apiURL } from "@/app/requestsapi/request";

interface UploadData {
  up_id: string;
  us_id: string;
  us_name: string;
  up_planter: string;
  cntry_name: string;
  st_name: string;
  dis_name: string;
  cop_name: string;
  lsg_name: string;
  source_name: string;
  up_landmark_details: string;
  up_tree_name: string;
  co_ord_name: string;
  gp_name: string;
  group_type: string;
  type_name: string;
  gp_cat_name: string;
  edu_district: string;
  edu_sub_district_name: string;
  sahodaya_name: string;
  block_name: string;
  project_name: string;
  chapter_name: string;
  zone_name: string;
  city: string;
  gp_ward_no:string;
  total_members: string;
  gp_location:string
}

function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const Id = pathname.split("/")[3];
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];
  const token = Cookies.get("adtoken");
  const [uploadData, setUploadData] = useState<UploadData[]>([]);

  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
    }
  }, [token, router]);


  useEffect(() => {
    async function fetchdata() {
      if (token) {

        const response = await axios.get(`${apiURL}/adminFrame/groupDetails/${Id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        try {

          if (response.data.success && response.status != 203) {
            console.log(response.data.groupDetails[0])
            setUploadData(response.data.groupDetails);
          } else {

          }

        } catch (error) {
          console.error("Error:", error);

        }
      };
    }
    fetchdata();
  }, [token, Id]);

  
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
          <span className="text-base">Manage Group</span>
        </div>

        <EditForm />
      </div>
      {uploadData[0] ?
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 p-2 md:p-5 md:border md:shadow-md md:rounded-lg">
        {uploadData[0].gp_name ?
            <div className="">
              <p className="text-sm text-gray-500">Group Name</p>
              <p className="text-base">{uploadData[0].gp_name}</p>
            </div>
            : ''}
          {uploadData[0].group_type ?
            <div className="">
              <p className="text-sm text-gray-500">Group Type</p>
              <p className="text-base">{uploadData[0].group_type}</p>
            </div>
            : ''}
          {uploadData[0].type_name ?
            <div className="">
              <p className="text-sm text-gray-500">School Type</p>
              <p className="text-base">{uploadData[0].type_name}</p>
            </div>
            : ''}
          {uploadData[0].gp_cat_name ?
            <div className="">
              <p className="text-sm text-gray-500">School Category</p>
              <p className="text-base">{uploadData[0].gp_cat_name}</p>
            </div>
            : ''}
          {uploadData[0].edu_district ?
            <div className="">
              <p className="text-sm text-gray-500">Educational DIstrict</p>
              <p className="text-base">{uploadData[0].edu_district}</p>
            </div>
            : ''}
          {uploadData[0].edu_sub_district_name ?
            <div className="">
              <p className="text-sm text-gray-500">Educational Subdistrict</p>
              <p className="text-base">{uploadData[0].edu_sub_district_name}</p>
            </div>
            : ''}
          {uploadData[0].sahodaya_name ?
            <div className="">
              <p className="text-sm text-gray-500">Sahodaya</p>
              <p className="text-base">{uploadData[0].sahodaya_name}</p>
            </div>
            : ''}
          {uploadData[0].block_name ?
            <div className="">
              <p className="text-sm text-gray-500">Block</p>
              <p className="text-base">{uploadData[0].block_name}</p>
            </div>
            : ''}
          {uploadData[0].project_name ?
            <div className="">
              <p className="text-sm text-gray-500">Project</p>
              <p className="text-base">{uploadData[0].project_name}</p>
            </div>
            : ''}
          {uploadData[0].chapter_name ?
            <div className="">
              <p className="text-sm text-gray-500">Chapter</p>
              <p className="text-base">{uploadData[0].chapter_name}</p>
            </div>
            : ''}
          {uploadData[0].zone_name ?
            <div className="">
              <p className="text-sm text-gray-500">Zone</p>
              <p className="text-base">{uploadData[0].zone_name}</p>
            </div>
            : ''}
            {uploadData[0].co_ord_name ?
            <div className="">
              <p className="text-sm text-gray-500">Coordinator Name</p>
              <p className="text-base">{uploadData[0].co_ord_name}</p>
            </div>
            : ''}
            {uploadData[0].cntry_name ?
            <div className="">
              <p className="text-sm text-gray-500">Country</p>
              <p className="text-base">{uploadData[0].cntry_name}</p>
            </div>
            : ''}
          {uploadData[0].st_name ?
            <div className="">
              <p className="text-sm text-gray-500">State</p>
              <p className="text-base">{uploadData[0].st_name}</p>
            </div>
            : ''}
          {uploadData[0].dis_name ?
            <div className="">
              <p className="text-sm text-gray-500">District</p>
              <p className="text-base">{uploadData[0].dis_name}</p>
            </div>
            : ''}
          {uploadData[0].cop_name ?
            <div className="">
              <p className="text-sm text-gray-500">Corporation </p>
              <p className="text-base">{uploadData[0].cop_name}</p>
            </div>
            : ''}
          {uploadData[0].lsg_name ?
            <div className="">
              <p className="text-sm text-gray-500">LSGD</p>
              <p className="text-base">{uploadData[0].lsg_name}</p>
            </div>
            : ''}
            {uploadData[0].gp_ward_no ?
            <div className="">
              <p className="text-sm text-gray-500">Ward No</p>
              <p className="text-base">{uploadData[0].gp_ward_no}</p>
            </div>
            : ''}
            {uploadData[0].total_members ?
            <div className="">
              <p className="text-sm text-gray-500">Ward No</p>
              <p className="text-base">{uploadData[0].total_members}</p>
            </div>
            : ''}
            {uploadData[0].gp_location ?
            <div className="">
              <p className="text-sm text-gray-500">Location</p>
              <p className="text-base">{uploadData[0].gp_location}</p>
            </div>
            : ''}
       
      
      </div>:''}
    </div>
  );
}

export default Page;
