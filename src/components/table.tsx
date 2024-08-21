"use client";
import { apiURL, imageURL } from "@/app/requestsapi/request";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useToast } from "./ui/use-toast";

interface TableProps {
  headings: string[];
  data: Array<{
    activity_category_id: number;
    activity_description: string;
    activity_likes: string;
    activity_on: string;
    activity_social_media_link: string;
    activity_thumbnail: string;
    activity_title: string;
    activity_value: string;
    activity_views: string;
    login_id: number;
    participant_name: string;
    personal_activity_id: number;
  }>;
}

const Table: React.FC<TableProps> = ({ headings, data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [views, setViews] = useState('');
  const [likes, setLikes] = useState('');
  const [actId, setActId] = useState('');
  const [categories, setCategories] = useState<{ [key: number]: string }>({});
  const nbPerPage = 5;
  const lastIndex = currentPage * nbPerPage;
  const startIndex = lastIndex - nbPerPage;
  const numberOfPages = Math.ceil(data.length / nbPerPage);
  const records = data.slice(startIndex, lastIndex);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const token = Cookies.get('token');
  const { toast } = useToast();


const handleEdit = async ()=>{
    

    try {
    const total = parseInt(likes)+parseInt(views)
    const apidata = {
      likes:parseInt(likes),
      views:parseInt(views),
      total: total,
      activityId:parseInt(actId)
    }
      const response = await axios.post(`${apiURL}/activity/updateActivity`, apidata, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status===200) {
        toast({
          title: "Profile Successfully Updated.",
          description: "",
        });
        location.reload();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops, Something went wrong!",
        description: "Please try again...",
      });
    }
}
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiURL}/activity_category`);
        const categoriesData = response.data.activity_category;
        const categoriesMap = categoriesData.reduce((acc: any, category: any) => {
          acc[category.activity_category_id] = category.activity_category;
          return acc;
        }, {});
        setCategories(categoriesMap);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  function removejpg(path: string) {
    let p = path.replace('.jpg', '');
    let img = imageURL + p;
    return img;
  }

  return (
    <div className="overflow-scroll">
      {data.length === 0 ? (
        <div className="text-center py-5">No data available</div>
      ) : (
        <div className="w-full overflow-x-scroll">
          <table className="mx-auto table-fixed border border-black border-collapse">
            <thead>
              <tr className="">
                {headings.map((h, i) => (
                  <th
                    key={i}
                    className="border border-black capitalize py-3 px-2 text-sm font-normal"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((d, i) => (
                <tr
                  key={d.personal_activity_id}
                  className={`text-center capitalize`}
                >
                  <td className="border border-black">{startIndex + i + 1}</td>
                  <td className="border border-black">
                    <a href={`${d.activity_social_media_link}`} className="flex place-content-center">
                      <img className="max-h-56" src={`${imageURL}${d.activity_thumbnail}`} alt="Thumbnail" />
                    </a>
                  </td>
                  <td>{d.participant_name}</td>
                  <td>{d.activity_title}{d.activity_description}</td>
                  <td>{categories[d.activity_category_id]}</td>
                  <td className="p-4" onClick={() => {setShowDialog(true)
                    setActId(d.personal_activity_id.toString())
                  }}>
                    {d.activity_views} Views, {d.activity_likes} Likes
                  </td>
                  <td className="border border-black">{d.activity_value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="w-full flex flex-row items-center p-5">
            <div className="flex flex-row items-center gap-4">
              <span className="cursor-pointer font-semibold" onClick={prevPage}>
                prev
              </span>
              <div className="flex flex-row items-center">
                <span>{currentPage}</span>
                <span>/</span>
                <span>{numberOfPages}</span>
              </div>
              <span className="cursor-pointer font-semibold" onClick={nextPage}>
                next
              </span>
            </div>
          </div>
          {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Edit</h2>
            <div className="justify-start m-4">
            <div className="mb-4">
            <label className="block ml-3 mb-1">Views</label>
            <input
              type="text"
              className="w-full p-1  border rounded-md bg-white focus:border-2 focus:border-[#3C6E1F]"
              placeholder="Enter Views"
              style={{ boxShadow: "1px 4px 5px 3px #00000040" }}
              value={views}
              onChange={(e) => {setViews(e.target.value)}}
            />
          </div>
          <div className="mb-5">
            <label className="block ml-3 mb-1">Likes</label>
            <input
              type="text"
              className="w-full p-1  border rounded-md bg-white focus:border-2 focus:border-[#3C6E1F]"
              placeholder="Enter Likes"
              style={{ boxShadow: "1px 4px 5px 3px #00000040" }}
              value={likes}
              onChange={(e) => {setLikes(e.target.value)}}
            />
          </div>
              
              <button
                className="w-1/2 bg-green-600 text-white py-2 px-4 rounded"
                onClick={() => handleEdit()}
              >
                Edit
              </button>
              <button
                className="w-1/2 bg-red-600 text-white py-2 px-4 rounded"
                onClick={() => setShowDialog(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
           )}
        </div>
      )}
    </div>
  );

  function nextPage() {
    if (currentPage !== numberOfPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }
};

export default Table;
