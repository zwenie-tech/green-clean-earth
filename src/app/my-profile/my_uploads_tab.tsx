"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiURL, imageURL } from "@/app/requestsapi/request";
import { fetchPlantsData } from "@/app/requestsapi/request";
import { DialogUploadPlant } from "./dialog_upload_plant";

interface TreeDetails {
  up_id: string;
  up_tree_name: string;
  up_planter: string;
  up_date: string;
  up_file: string;
  up_name: string;
}

interface TreeDetailsCardProps {
  tree: TreeDetails;
}

const TreeDetailsCard: React.FC<TreeDetailsCardProps> = ({ tree }) => {
  function formatDate(isoString: string) {
    const date = new Date(isoString);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getUTCFullYear();
    

    const formattedDate = `${day}/${month}/${year}`;

    return `${formattedDate}`;
  }
  function formatTime(isoString: string) {
    const date = new Date(isoString);
    let hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    let hour = parseInt(hours) % 12;
    if (hour === 0) {
      hour = 12;
    }

    const formattedTime = `${hour}:${minutes} ${parseInt(hours) >= 12 ? 'PM' : 'AM'}`;

    return `${formattedTime}`;
  }

  const formattedDate = formatDate(tree.up_date);
  const formattedTime = formatTime(tree.up_date);

  return (
    <div className="bg-white p-4 rounded-lg overflow-hidden border shadow transform transition-transform hover:border-green-600 hover:shadow-lg">
      <img className="w-full h-48 object-cover" src={imageURL + tree.up_file} alt={tree.up_tree_name} />
      <div className="p-4">
        
        <div>
        <div className="text-sm text-gray-500">Tree number: </div>
        <div className="text-xl mb-2">{ tree.up_id }</div>
      </div>
      <div>
        <div className="text-sm text-gray-500">Tree name: </div>
        <div className="text-xl mb-2">{ tree.up_tree_name }</div>
      </div>
      <div>
        <div className="text-sm text-gray-500">Planter name: </div>
        <div className="text-xl mb-2">{ tree.up_planter }</div>
      </div>
      <div>
        <div className="text-sm text-gray-500">Uploader name: </div>
        <div className="text-xl mb-2">{ tree.up_name }</div>
      </div>
      <div className="text-sm text-gray-500">{ formattedDate }</div>
      <div className="text-sm text-gray-500">{ formattedTime }</div>
      </div>
    </div>
  );
};

export default function MyUploadsTab({ token }: any) {
  const [upload, setUpload] = useState<TreeDetails[]>([]);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

 
    useEffect(() => {
      async function fetchfirstData(){
        const responseall = await fetch(`${apiURL}/uploads/me?limit=100000000000`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); 
        const dataall = await responseall.json();
      
        setTotalPages(Math.ceil(dataall.Uploads.length / itemsPerPage));
      }
      fetchfirstData();
    }, [token]);

    const handlePageChange = (newPage: number) => {
      if (newPage > 0 && newPage <= totalPages) {
     
        setCurrentPage(newPage);
      }
    }
  
  useEffect(() => {
    const fetchTrees = async () => {
      const response = await fetch(`${apiURL}/uploads/me?page=${currentPage}&limit=${itemsPerPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (response.status===200) {
        setUpload(result.Uploads);
      } else {
        setUpload([]);
      }
    };
    fetchTrees();
  }, [token,currentPage]);
  
  return (
    <div>
      <DialogUploadPlant token={token} />
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.isArray(upload) && upload.length > 0 ? (
          upload
            .map((tree, index) => <TreeDetailsCard key={index} tree={tree} />)
        ) : (
          "No Tree Details Found"
        )}
      </div>
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
