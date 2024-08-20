"use client";
import { apiURL, imageURL } from "@/app/requestsapi/request";
import axios from "axios";
import React, { useEffect, useState } from "react";

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
  const [categories, setCategories] = useState<{ [key: number]: string }>({});
  const nbPerPage = 5;
  const lastIndex = currentPage * nbPerPage;
  const startIndex = lastIndex - nbPerPage;
  const numberOfPages = Math.ceil(data.length / nbPerPage);
  const records = data.slice(startIndex, lastIndex);

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
                  <td className="border border-black">{d.participant_name}</td>
                  <td className="border border-black">{d.activity_title}{d.activity_description}</td>
                  <td className="border border-black">{categories[d.activity_category_id]}</td>
                  <td className="border border-black p-4">
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
