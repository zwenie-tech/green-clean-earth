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
import { AddLsgdform } from "./[id]/addlsgdform";
import PaginationComponent from "../PageComponent";

ModuleRegistry.registerModules([ClientSideRowModelModule]);
interface District {
  dis_id: number;
  dis_name: string;
}
type Corp = {
  cop_id: string;
  cop_name: string;
}
interface Lsgd {
  lsg_id: number;
  lsg_name: string;
}
const AdminGrid = () => {
  const router = useRouter();
  const [rowData, setRowData] = useState([]);
  const token = Cookies.get("adtoken");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districts, setDistricts] = useState<District[]>([]);
  const [corporation, setCorporation] = useState<Corp[]>([]);
  const [totalcount, setTotalcount] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [selectedLsgd, setSelectedLsgd] = useState("");
  const [lsgd, setLsgd] = useState<Lsgd[]>([]);

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
    // { field: "state", headerName: "State" },
    { field: "dis_name", headerName: "District" },
    { field: "cop_name", headerName: "Corporation" },
    { field: "lsg_name", headerName: "LSGD" },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: false,
    };
  }, []);
  const onRowClicked = (event: RowClickedEvent) => {

    const id = event.data.lsg_id;
    router.push(`lsgd/${id}`);
  };



  useEffect(() => {
    async function fetchdata() {
      if (token) {

        const response = await axios.post(`${apiURL}/admin/adminLsgdList?page=${currentPage}&limit=${itemsPerPage}`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        
        if (response.data.success && response.status!=203) {
          
          setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage));
    localStorage.setItem("lsgdData", JSON.stringify(response.data.lsgdList));

         
          setRowData(response.data.lsgdList);
        }
      }
    };
    fetchdata();
  }, [currentPage, token]);

  const handleExportToExcel = async () => {
    try {
      const response = await axios.post(`${apiURL}/admin/adminLsgdList`, {
        "isExcel": true
    },{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
      if (response.data.success && response.status!=203) {
        // Convert response zoneList into Excel
        const datalist = response.data.lsgdList
  
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


  useEffect(() => {
    async function fetchData() {

    
      const districtResponse = await fetch(`${apiURL}/district`);
      const districtData = await districtResponse.json();
      setDistricts(districtData.district);

    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchCorpData() {
      if ( selectedDistrict) {
        const dist_id = districts.find((item) => item.dis_name === selectedDistrict)?.dis_id;
        const corpResponse = await fetch(`${apiURL}/corporation/${dist_id}`);
        const corpData = await corpResponse.json();
        setCorporation(corpData.corporation);
      } else {
        setCorporation([]);
      }
    }
    fetchCorpData();
  }, [selectedDistrict, districts]);

  useEffect(() => {
    async function fetchLsgdData() {
      if (selectedCorp) {
        const corp_id = corporation.find((item) => item.cop_name === selectedCorp)?.cop_id;
        const lsgResponse = await fetch(`${apiURL}/lsg/${corp_id}`);
        const lsgData = await lsgResponse.json();
        setLsgd(lsgData.lsg);
      } else {
        setLsgd([]);
      }
      // setSelectedLsgd("");
      // setWardNo("");
    }
    fetchLsgdData();
  }, [ selectedCorp, corporation]);


  const handleFilterChangeDistrict = (e: any) => {
    

    setSelectedDistrict(e.target.value); // Update dropdown value
    fetchFilteredDistrict(e.target.value);
    setCurrentPage(1); // Reset to first page
  };
  const handleFilterChangeCorp = (e: any) => {
    

    setSelectedCorp(e.target.value); // Update dropdown value
    fetchFilteredCorp(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  const handleFilterChangeLsgd = (e: any) => {
    

    setSelectedLsgd(e.target.value); // Update dropdown value
    fetchFilteredLsgd(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  const fetchFilteredDistrict = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminLsgdList`,
        {districtId:districts.find((item) => item.dis_name === value)?.dis_id},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      try {
        if (response.data.success && response.status !== 203) {
          
          
         
          const filteredData = response.data.lsgdList.filter(
            (item: { dis_name: string; }) => item.dis_name === value
          );
          

          setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
          setRowData(filteredData);
        } else {
          setRowData([]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  const fetchFilteredCorp = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminLsgdList`,
        {corporationId:corporation.find((item) => item.cop_name === value)?.cop_id},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      try {
        if (response.data.success && response.status !== 203) {
          
          
         
          const filteredData = response.data.lsgdList.filter(
            (item: { cop_name: string; }) => item.cop_name === value
          );
          

          setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
          setRowData(filteredData);
        } else {
          setRowData([]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  const fetchFilteredLsgd = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminLsgdList`,
        {lsgdId:lsgd.find((item) => item.lsg_name === value)?.lsg_id},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      try {
        if (response.data.success && response.status !== 203) {
          
          
         
          const filteredData = response.data.lsgdList.filter(
            (item: { lsg_name: string; }) => item.lsg_name === value
          );
          

          setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
          setRowData(filteredData);
        } else {
          setRowData([]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  return (
    <div className=" bg-slate-100">
      <AddLsgdform/>
      <button
          className= "text-white m-3 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
          
          onClick={handleExportToExcel}
        >
          Export To Excel
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-3">
  <div className="flex items-center space-x-2">
    <label htmlFor="districtFilter" className="text-sm font-medium">
      District:
    </label>
    <select
      id="districtFilter"
      value={selectedDistrict}
      onChange={handleFilterChangeDistrict}
      className="flex-1 border border-gray-300 rounded p-1"
    >
      <option value="">Choose District</option>
      {districts.map((district) => (
        <option key={district.dis_id} value={district.dis_name}>
          {district.dis_name}
        </option>
      ))}
    </select>
  </div>

  {selectedDistrict !== "" && (
    <div className="flex items-center space-x-2">
      <label htmlFor="corpFilter" className="text-sm font-medium">
        Corporation:
      </label>
      <select
        id="corpFilter"
        value={selectedCorp}
        onChange={handleFilterChangeCorp}
        className="flex-1 border border-gray-300 rounded p-1"
      >
        <option value="">Choose Corporation</option>
        {corporation.map((corp) => (
          <option key={corp.cop_id} value={corp.cop_name}>
            {corp.cop_name}
          </option>
        ))}
      </select>
    </div>
  )}

  {selectedDistrict !== "" && (
    <div className="flex items-center space-x-2">
      <label htmlFor="lsgdFilter" className="text-sm font-medium">
        Lsgd:
      </label>
      <select
        id="lsgdFilter"
        value={selectedLsgd}
        onChange={handleFilterChangeLsgd}
        className="flex-1 border border-gray-300 rounded p-1"
      >
        <option value="">Choose Lsgd</option>
        {lsgd && lsgd.map((lsg) => (
          <option key={lsg.lsg_id} value={lsg.lsg_name}>
            {lsg.lsg_name}
          </option>
        ))}
      </select>
    </div>
  )}
</div>


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
