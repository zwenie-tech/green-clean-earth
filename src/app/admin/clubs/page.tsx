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
import * as XLSX from 'xlsx';
import { AddClubForm } from "./[id]/addclub";
import PaginationComponent from "../PageComponent";

ModuleRegistry.registerModules([ClientSideRowModelModule]);
interface IcdsBlock {
  icds_block_id: string;
  block_name: string;
}
interface District {
  dis_id: number;
  dis_name: string;
}
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
    { field: "id", headerName: "Id" },
    { field: "name", headerName: "Name" },
    
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: false,
    };
  }, []);

  const onRowClicked = (event: RowClickedEvent) => {
   
    const id = event.data.id;
    router.push(`clubs/${id}`);
  };

  useEffect(() => {
    async function fetchdata() {
      if (token) {

        const response = await axios.get(`${apiURL}/admin/getClubs`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        
        if (response.data.success && response.status!=203) {
          setTotalPages(Math.ceil(response.data.count.length / itemsPerPage));
   
    localStorage.setItem("clubs", JSON.stringify(response.data.count));

          setRowData(response.data.count); 
        }
      }
    };
    fetchdata();
  }, [currentPage, token]);

  // const handleExportToExcel = async () => {
  //   try {
  //     const response = await axios.post(`${apiURL}/admin/adminIcdsBlock`, {
  //       "isExcel": true
  //   },{
  //     headers: {
  //       'Authorization': `Bearer ${token}`,
  //       'Content-Type': 'application/json'
  //     }
  //   });
  //     if (response.data.success && response.status!=203) {
  //       // Convert response zoneList into Excel
  //       const datalist = response.data.blockList
  
  //       // Create a worksheet from the zoneList data
  //       const worksheet = XLSX.utils.json_to_sheet(datalist);
  
  //       // Create a new workbook and append the worksheet
  //       const workbook = XLSX.utils.book_new();
  //       XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
  
  //       // Export the workbook to Excel
  //       XLSX.writeFile(workbook, 'data.xlsx');
  //     } else {
  //       console.error("Failed to export data");
  //     }
  //   } catch (error) {
  //     console.error("Error during exporting:", error);
  //   }
  // };

  

  return (
    <div className=" bg-slate-100">
      <AddClubForm/>
     <button
          className= "text-white m-3 text-sm py-2 px-4 bg-grey rounded-xl "
          disabled
          // onClick={handleExportToExcel}
        >
          Export To Excel
        </button>
        
      <div className={"ag-theme-quartz"} style={{ height: 600 }}>
      <AgGridReact
          rowData={rowData}
          columnDefs={[
            {
              headerName: "SL No", // Column header
              valueGetter: (params) => {
                const itemsPerPage = 10; // Number of items per page
                
                const startIndex = (currentPage - 1) * itemsPerPage; // Calculate the start index for pagination
                // Calculate the serial number
                return startIndex + params.node!.rowIndex! + 1;
              },
              width: 70, // Optional: Adjust the width of the serial number column
              suppressMenu: true, // Optional: Hide the column menu
              sortable: false, // Optional: Disable sorting for the serial number column
              filter: false, // Optional: Disable filtering for the serial number column
              pinned: "left", // Optional: Pin the serial number column to the left (optional)
            },
            ...columnDefs, // Other columns (e.g., from your `columnDefs` array)
          ]}
          defaultColDef={defaultColDef}
          onRowClicked={onRowClicked}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          pagination={false}
        // paginationPageSize={10}
        // paginationPageSizeSelector={[10, 25, 50]}
        />
      </div>
      <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

     
    </div>
  );
};
export default AdminGrid;