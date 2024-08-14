"use client";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { DialogUploadActivities } from "./dialog_upload_activities";
import Table from "@/components/table";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { apiURL, fetchActivityData } from "@/app/requestsapi/request";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

 
    useEffect(() => {
      async function fetchfirstData(){
        const responseall = await fetch(`${apiURL}/activity/${id}?limit=100000000000`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); 
        const dataall = await responseall.json();
        console.log('length', dataall.activity.length);
        setTotalPages(Math.ceil(dataall.activity.length / itemsPerPage));
      }
      fetchfirstData();
    }, [token,id]);

    const handlePageChange = (newPage: number) => {
      if (newPage > 0 && newPage <= totalPages) {
        console.log('working')
        setCurrentPage(newPage);
      }
    }

  useEffect(() => {
    async function fetchData() {
      if (token) {
        try {
          const responseall = await fetch(`${apiURL}/activity/${id}?page=${currentPage}&limit=${itemsPerPage}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }); 
          const d = await responseall.json();
          if (responseall.status===200) {
            setActivity(d.activity);
          } else {
            setActivity([]);
          }
        } catch (error) {
          setError("No activities");
        } finally {
          setLoading(false);
        }
      }
    }
    fetchData();
  }, [token, id,currentPage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
    <div>
      <DialogUploadActivities token={token} />
      <div className="p-4">
        {error}
      </div>
    </div>
  );
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
      <div className="flex justify-center items-center space-x-2 my-4">
        <button
        className={currentPage === 1 ? 
          "text-white text-sm py-2 px-4 bg-[#6b6767] rounded-xl shadow-lg" 
        : "text-white text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
        }
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-xl">{currentPage}</span>
        <button
          className={currentPage === totalPages ? 
            "text-white text-sm py-2 px-4 bg-[#6b6767] rounded-xl shadow-lg" 
          : "text-white text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
          }
          onClick={() => {
            handlePageChange(currentPage + 1) 
          }}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>

  );
}
