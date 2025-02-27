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
import { AddEvents } from "./[id]/addnewsform";
import PaginationComponent from "../PageComponent";

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
    { field: "id", headerName: "Id" },
    { field: "event_heading", headerName: "Heading" },
    { field: "event_body", headerName: "Body" },
    { field: "created_time", headerName: "Date" },
    { field: "location", headerName: "Place" },
    { field: "image_link", headerName: "Image" },
    { field: "show_in_main", headerName: "Show in Mainpage" },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      // filter: "agTextColumnFilter",
      floatingFilter: false,
    };
  }, []);

  const onRowClicked = (event: RowClickedEvent) => {

    const id = event.data.id;
    router.push(`news-and-events/${id}`);
  };

  useEffect(() => {
    async function fetchdata() {
      if (token) {

        const response = await axios.post(`${apiURL}/admin/adminEvents?page=${currentPage}&limit=${itemsPerPage}`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (response.data.success && response.status != 203) {
          setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage));
          localStorage.setItem("newsData", JSON.stringify(response.data.eventList));
          const events = response.data.eventList;
          
          const formattedEvents = events.map((event: {
            show_in_main: number; created_time: string | number | Date; 
}) => {
            const date = new Date(event.created_time);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const year = date.getFullYear();
            
            return {
                ...event,
                created_time: `${day}-${month}-${year}`,
                show_in_main:event.show_in_main === 1 ? true : false
            };
        });
        
          setRowData(formattedEvents);
        }
      }
    };
    fetchdata();
  }, [currentPage, token]);
  const handleExportToExcel = async () => {
    try {
      const response = await axios.post(`${apiURL}/admin/adminEvents`, {
        "isExcel": true
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.data.success && response.status != 203) {
        // Convert response zoneList into Excel
        const datalist = response.data.eventList

        // Create a worksheet from the zoneList data
        const worksheet = XLSX.utils.json_to_sheet(datalist);

        // Create a new workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

        // Export the workbook to Excel
        XLSX.writeFile(workbook, 'data.xlsx');
      } else {
        console.error("Failed to export data");
      }
    } catch (error) {
      console.error("Error during exporting:", error);
    }
  };
  return (
    <div className=" bg-slate-100">
      <AddEvents/>
      <button
        className="text-white m-3 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"

        onClick={handleExportToExcel}
      >
        Export To Excel
      </button>
      <div className={"ag-theme-quartz"} style={{ height: 500 }}>
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
