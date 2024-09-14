"use client";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  ColDef,
  ModuleRegistry,
  RowClickedEvent,
} from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import "@/app/admin/ag-grid-theme-builder.css"
import { useRouter } from "next/navigation";
import React, { StrictMode, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { apiURL } from "@/app/requestsapi/request";
import Cookies from 'js-cookie';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const AdminGrid = () => {
  const router = useRouter();
  const [rowData, setRowData] = useState([]);
  const token = Cookies.get("adtoken");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {

      setCurrentPage(newPage);
    }
  }
  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
    }
  }, [token, router]);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "participant_name", headerName: "Name" },
    { field: "activity_social_media_link", headerName: "Activity Link" },
    { field: "activity_description", headerName: "Description" },
    { field: "activity_views", headerName: "View" },
    { field: "activity_likes", headerName: "Like" },
    { field: "activity_value", headerName: "Value" },
    { field: "gp_name", headerName: "Group Name" },
    { field: "group_type", headerName: "Category" },
    { field: "activity_sub_category", headerName: "School Type" },
    { field: "edu_district", headerName: "Education District" },
    { field: "edu_sub_district_name", headerName: "Education Sub District" },
    { field: "sahodaya_name", headerName: "Sahodaya" },
    { field: "block_name", headerName: "Block" },
    { field: "project_name", headerName: "Project" },
    { field: "chapter_name", headerName: "Chapter" },
    { field: "cntry_name", headerName: "Country" },
    { field: "st_name", headerName: "State" },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    };
  }, []);

  const onRowClicked = (event: RowClickedEvent) => {
    // console.log(event.data);
    const id = event.data.id;
    router.push(`activity/edit-activity/${id}`);
  };

  useEffect(() => {
    async function fetchdata() {
      if (token) {

        const response = await axios.post(`${apiURL}/admin/adminActivityList?page=${currentPage}&limit=${itemsPerPage}`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        
        if (response.data.success && response.status!=203) {
          setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage));
         
          setRowData(response.data.userList); 
        }
      }
    };
    fetchdata();
  }, [currentPage, token]);
  return (
    <div className=" bg-slate-100">
     <button
          className= "text-white m-3 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
          
          // onClick={}
        >
          Export To Excel
        </button>
      <div className={"ag-theme-quartz"} style={{ height: 600 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onRowClicked={onRowClicked}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          pagination={false}
          // paginationPageSize={10}
          // paginationPageSizeSelector={[10, 25, 50]}
        />
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
        {currentPage >= 4 && totalPages > 3 && <span className="text-xl text-gray-600">...</span>}

        {Array.from({ length: totalPages >= 3 ? 3 : totalPages }, (_, index) => currentPage < 4 ? index+1:currentPage+index-2).map((page) => (
          <span
            key={page}
            className={`text-xl cursor-pointer text-gray-600 ${page === currentPage ? 'font-bold' : 'underline'}`}
            onClick={() => handlePageChange(page)}
          >
            {page > 0 ? page : ''}
          </span>
        ))}

        {currentPage > 1 && totalPages > 3 && currentPage!=totalPages && <span className="text-xl text-gray-600">...</span>}
        {currentPage === 1 && totalPages > 3 && currentPage!=totalPages && <span className="text-xl text-gray-600">...</span>}


        <button
          className={currentPage === totalPages || totalPages === 1 ?
            "text-white text-sm py-2 px-4 bg-[#6b6767] rounded-xl shadow-lg"
            : "text-white text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
          }
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default AdminGrid;
