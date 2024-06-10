"use client";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { DialogUploadActivities } from "./dialog_upload_activities";
import Table from "@/components/table";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { fetchActivityData } from "@/app/requestsapi/request";

const headings = [
  "Sl No",
  // "Thumbnail",
  "Name",
  "Name of Art - Brief Description",
  "Category",
  "Views, Likes, Comments, and Shares",
  "Value",
];

export default function ActivitiesTab({token}:any) {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (token) {
        const d = await fetchActivityData(token);
        setActivity(d.activity);
      }
    }
    fetchData();
  }, [token]);

  return (
    <div className="">
      <DialogUploadActivities token={token}/>
      <p>Table</p>
      <Table data={activity} headings={headings} />
    </div>
  );
}