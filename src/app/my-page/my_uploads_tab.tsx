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
}

interface TreeDetailsCardProps {
  tree: TreeDetails;
}

const TreeDetailsCard: React.FC<TreeDetailsCardProps> = ({ tree }) => {
  function formatDateTime(isoString: string) {
    const date = new Date(isoString);
  
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getUTCFullYear();
  
    const formattedDate = `${day}/${month}/${year}`;
  
    return formattedDate;
  }

  const formattedDateTime = formatDateTime(tree.up_date);

  return (
    <div className="bg-white p-4 rounded-lg overflow-hidden border shadow transform transition-transform hover:border-green-600 hover:shadow-lg">
      <img className="w-full h-48 object-cover" src={imageURL + tree.up_file} alt={tree.up_tree_name} />
      <div className="p-4">
        <div className="text-sm text-gray-600">Tree number: </div>
        <div className="text-xl mb-4">{tree.up_id}</div>
        <div className="text-sm text-gray-600">Tree name: </div>
        <div className="text-xl mb-4">{tree.up_tree_name}</div>
        <div className="text-sm text-gray-600">Planter name: </div>
        <div className="text-xl mb-4">{tree.up_planter}</div>
        <p className="text-gray-600 text-sm">{formattedDateTime}</p>
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
      setUpload(response.Uploads);
    };
    fetchTrees();
  }, [token]);
  
  return (
    <div>
      <DialogUploadPlant token={token} />
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {upload.length > 0 ? (
          upload
            .slice()
            .reverse()
            .map((tree, index) => <TreeDetailsCard key={index} tree={tree} />)
        ) : (
          "No Tree Details Found"
        )}
      </div>
    </div>
  );
}
