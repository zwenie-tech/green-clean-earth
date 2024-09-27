"use client";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Uploadform } from "./uploadform";
import axios from "axios";
import { apiURL, imageURL } from "@/app/requestsapi/request";
import Cookies from 'js-cookie';

interface UploadData {
  up_file: string;
  up_file_2: string;
  up_file_3: string;
  up_file_4: string;
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

        const response = await axios.get(`${apiURL}/adminFrame/uploadDetails/${Id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        try {

          if (response.data.success && response.status != 203) {
            const udata = response.data.uploadDetails[0];
            console.log(udata)
            // Get all cookies
            const allCookies = Cookies.get();

            // Remove all cookies
            Object.keys(allCookies).forEach(cookieName => {
                Cookies.remove(cookieName);
            });

           Cookies.set('adtoken', token, { expires: 1 });
            Cookies.set('up_file', udata.up_file, { expires: 1 });
            Cookies.set('up_file_2', udata.up_file_2, { expires: 1 });
            Cookies.set('up_file_3', udata.up_file_3, { expires: 1 });
            Cookies.set('up_file_4', udata.up_file_4, { expires: 1 });
            Cookies.set('up_id', udata.up_id, { expires: 1 });
            Cookies.set('us_id', udata.us_id, { expires: 1 });
            Cookies.set('us_name', udata.us_name, { expires: 1 });
            Cookies.set('up_planter', udata.up_planter, { expires: 1 });
            Cookies.set('cntry_name', udata.cntry_name, { expires: 1 });
            Cookies.set('st_name', udata.st_name, { expires: 1 });
            Cookies.set('dis_name', udata.dis_name, { expires: 1 });
            Cookies.set('cop_name', udata.cop_name, { expires: 1 });
            Cookies.set('lsg_name', udata.lsg_name, { expires: 1 });
            Cookies.set('source_name', udata.source_name, { expires: 1 });
            Cookies.set('up_landmark_details', udata.up_landmark_details, { expires: 1 });
            Cookies.set('up_tree_name', udata.up_tree_name, { expires: 1 });
            Cookies.set('co_ord_name', udata.co_ord_name, { expires: 1 });
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
            Cookies.set('city', udata.city, { expires: 1 });
            Cookies.set('up_ward', udata.up_ward, { expires: 1 });
            
            setUploadData(response.data.uploadDetails);
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
          <span className="text-base">Manage Uploads</span>
        </div>

        <Uploadform />
      </div>
      {uploadData[0] ?
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 p-2 md:p-5 md:border md:shadow-md md:rounded-lg">
          {uploadData[0].up_file ?
            <div className="">
              <p className="text-sm text-gray-500">Image1</p>
              <p className="w-20 h-35"><img src={`${imageURL}${uploadData[0].up_file}`} ></img></p>
            </div>
            : ''}
          {uploadData[0].up_file_2 ?
            <div className="">
              <p className="text-sm text-gray-500">Image2</p>
              <p className="w-20 h-35"><img src={`${imageURL}${uploadData[0].up_file_2}`} ></img></p>
            </div>
            : ''}
          {uploadData[0].up_file_3 ?
            <div className="">
              <p className="text-sm text-gray-500">Image3</p>
              <p className="w-20 h-35"><img src={`${imageURL}${uploadData[0].up_file_3}`} ></img></p>
            </div>
            : ''}
          {uploadData[0].up_file_4 ?
            <div className="">
              <p className="text-sm text-gray-500">Image4</p>
              <p className="w-20 h-35"><img src={`${imageURL}${uploadData[0].up_file_4}`} ></img></p>
            </div>
            : ''}
          {uploadData[0].up_id ?
            <div className="">
              <p className="text-sm text-gray-500">Tree Number</p>
              <p className="text-base">{uploadData[0].up_id}</p>
            </div>
            : ''}
          {uploadData[0].us_id ?
            <div className="">
              <p className="text-sm text-gray-500">Uploader ID</p>
              <p className="text-base">{uploadData[0].us_id}</p>
            </div>
            : ''}
          {uploadData[0].us_name ?
            <div className="">
              <p className="text-sm text-gray-500">Uploader Name</p>
              <p className="text-base">{uploadData[0].us_name}</p>
            </div>
            : ''}
          {uploadData[0].up_planter ?
            <div className="">
              <p className="text-sm text-gray-500">Planter Name</p>
              <p className="text-base">{uploadData[0].up_planter}</p>
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
          {uploadData[0].source_name ?
            <div className="">
              <p className="text-sm text-gray-500">Source</p>
              <p className="text-base">{uploadData[0].source_name}</p>
            </div>
            : ''}
          {uploadData[0].up_landmark_details ?
            <div className="">
              <p className="text-sm text-gray-500">Landmark</p>
              <p className="text-base">{uploadData[0].up_landmark_details}</p>
            </div>
            : ''}
          {uploadData[0].up_tree_name ?
            <div className="">
              <p className="text-sm text-gray-500">Tree Name</p>
              <p className="text-base">{uploadData[0].up_tree_name}</p>
            </div>
            : ''}
          {uploadData[0].co_ord_name ?
            <div className="">
              <p className="text-sm text-gray-500">Coordinator Name</p>
              <p className="text-base">{uploadData[0].co_ord_name}</p>
            </div>
            : ''}
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
        </div> : ''}
    </div>
  );
}

export default Page;
