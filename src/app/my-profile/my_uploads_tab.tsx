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
  
  useEffect(() => {
    const fetchTrees = async () => {
      const response = await fetchPlantsData(token);
      if (response && response.Uploads) {
        setUpload(response.Uploads);
      } else {
        setUpload([]);
      }
    };
    fetchTrees();
  }, [token]);
  
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
    </div>
  );
}
