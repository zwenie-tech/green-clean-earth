"use client";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { DialogUploadActivities } from "./dialog_upload_activities";
import Table from "@/components/table";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchActivityData } from "@/app/requestsapi/request";

const headings = [
  "Sl No",
  "Thumbnail",
  "Name",
  "Name of Art - Brief Description",
  "Category",
  "Views, Likes, Comments, and Shares",
  "Value",
];

export default function ActivitiesTab({ token }: any) {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    async function fetchData() {
      if (token) {
        try {
          const d = await fetchActivityData(token, id);
          if (d && d.activity) {
            setActivity(d.activity);
          } else {
            setActivity([]);
          }
        } catch (error) {
          setError("Error fetching activity data");
        } finally {
          setLoading(false);
        }
      }
    }
    fetchData();
  }, [token, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="">
      <DialogUploadActivities token={token} />
      <p>Table</p>
      {activity.length === 0 ? (
        <div>No activity data available</div>
      ) : (
        <Table data={activity} headings={headings} />
      )}
    </div>
  );
}
