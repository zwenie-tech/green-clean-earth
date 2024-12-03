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
import { AddEduSubform } from "./[id]/addeduform";
import PaginationComponent from "../PageComponent";

ModuleRegistry.registerModules([ClientSideRowModelModule]);
interface EduDistrict {
  edu_district_id: string;
  edu_district: string;
}
interface District {
  dis_id: number;
  dis_name: string;
}
interface EduSubDistrict {
  edu_sub_district_id: string;
  edu_sub_district_name: string;
}
const AdminGrid = () => {
  const router = useRouter();
  const [rowData, setRowData] = useState([]);
  const token = Cookies.get("adtoken");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const [selectedDistrictGrp, setSelectedDistrictGrp] = useState("");
  const [eduDistrict, setEduDistrict] = useState<EduDistrict[]>([]);
  const [selecteduDistrict, setSelecteduDistrict] = useState('');
  const [districts, setDistricts] = useState<District[]>([]);
  const [totalcount, setTotalcount] = useState("");
  const [selecteduSubDistrict, setSelecteduSubDistrict] = useState('');
  const [eduSubDistrict, setEduSubDistrict] = useState<EduSubDistrict[]>([]);

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
    { field: "dis_name", headerName: "District Name" },
    { field: "edu_district", headerName: "Edu District Name" },
    { field: "edu_sub_district_name", headerName: "Edu SubDistrict Name" },
    
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: false,
    };
  }, []);

  const onRowClicked = (event: RowClickedEvent) => {
   
    const id = event.data.edu_sub_district_id;
    router.push(`edusubdistrict/${id}`);
  };
  const handleExportToExcel = async () => {
    try {
      const response = await axios.post(`${apiURL}/admin/adminEduSubDistrict`, {
        "isExcel": true
    },{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
      if (response.data.success && response.status!=203) {
        // Convert response zoneList into Excel
        const datalist = response.data.eduSubDistrict
  
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
    async function fetchdata() {
      if (token) {

        const response = await axios.post(`${apiURL}/admin/adminEduSubDistrict?page=${currentPage}&limit=${itemsPerPage}`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        
        if (response.data.success && response.status!=203) {
          setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage));
          
          setTotalcount(response.data.totalCount);
    localStorage.setItem("edusubData", JSON.stringify(response.data.eduSubDistrict));

          setRowData(response.data.eduSubDistrict); 
        }
      }
    };
    fetchdata();
  }, [currentPage, token]);


  useEffect(() => {
    async function fetchData() {

       
        const districtResponse = await fetch(`${apiURL}/district`);
        const districtData = await districtResponse.json();
        setDistricts(districtData.district);

    }
    fetchData();
}, []);

useEffect(() => {
  const fetchClass = async () => {
      try {
          
          const dis_id = districts.find((item) => item.dis_name === selectedDistrictGrp)?.dis_id;
          const responseedudistrict = dis_id ? await axios.get(`${apiURL}/eduDistrict/${dis_id}`) : null;
          responseedudistrict ? setEduDistrict(responseedudistrict.data.eduDistrict) : '';
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  };
  fetchClass();
}, [districts, selectedDistrictGrp]);

  const handleFilterEDistrict = (e: any) => {
    
    if (e.target.value != "") {
        setSelectedDistrictGrp(e.target.value);
        fetchFilteredDistrict(e.target.value);
        setCurrentPage(1); // Reset to first page
    }
};

const handleFilterEduDistrict = (e: any) => {
    
    if (e.target.value != "") {
        setSelecteduDistrict(e.target.value);
        fetchFilteredEduDistrict(e.target.value);
        handleEduDistrict(e.target.value);
        setCurrentPage(1); // Reset to first page
    }
};

const handleEduDistrict = async (e: any) => {
  try {
      const eduid = eduDistrict.find((item) => item.edu_district === e)?.edu_district_id
      const responseedusubdistrict = await axios.get(`${apiURL}/eduSubDistrict/${eduid}`);
      setEduSubDistrict(responseedusubdistrict.data.eduSubDistrict);
  } catch (error) {
      console.error("Error fetching data:", error);
  }
}

const fetchFilteredDistrict = async (value: string) => {
  if (token) {
      const response = await axios.post(
          `${apiURL}/admin/adminEduSubDistrict?limit=${totalcount}`,
          {},
          {
              headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
              },
          }
      );
      try {
          if (response.data.success && response.status !== 203) {
              
              
              const filteredData = response.data.eduSubDistrict.filter(
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

const fetchFilteredEduDistrict = async (value: string) => {
  if (token) {
      const response = await axios.post(
          `${apiURL}/admin/adminEduSubDistrict?limit=${totalcount}`,
          {},
          {
              headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
              },
          }
      );
      try {
          if (response.data.success && response.status !== 203) {
              
              
              const filteredData = response.data.eduSubDistrict.filter(
                  (item: { edu_district: string; }) => item.edu_district === value
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


const handleFilterEduSubDistrict = (e: any) => {
  
  if (e.target.value != "") {
      setSelecteduSubDistrict(e.target.value);
      fetchFilteredEduSubDistrict(e.target.value);
      setCurrentPage(1); // Reset to first page
  }
};

const fetchFilteredEduSubDistrict = async (value: string) => {
  if (token) {
      const response = await axios.post(
          `${apiURL}/admin/adminEduSubDistrict?limit=${totalcount}`,
          {},
          {
              headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
              },
          }
      );
      try {
          if (response.data.success && response.status !== 203) {
              
              
              const filteredData = response.data.eduSubDistrict.filter(
                  (item: { edu_sub_district_name: string; }) => item.edu_sub_district_name === value
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
      <AddEduSubform/>
     <button
          className= "text-white m-3 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
          
          onClick={handleExportToExcel}
        >
          Export To Excel
        </button>
        <div className="flex flex-col md:flex-row gap-4">
  <div className="flex flex-1 items-center mb-3 space-x-2">
    <label htmlFor="districtFilter" className="text-sm font-medium">
      District:
    </label>
    <select
      id="districtFilter"
      value={selectedDistrictGrp}
      onChange={handleFilterEDistrict}
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

  <div className="flex flex-1 items-center mb-3 space-x-2">
    <label htmlFor="eduDistrictFilter" className="text-sm font-medium">
      Education District:
    </label>
    <select
      id="eduDistrictFilter"
      value={selecteduDistrict}
      onChange={handleFilterEduDistrict}
      className="flex-1 border border-gray-300 rounded p-1"
    >
      <option value="">Choose Education District</option>
      {eduDistrict && eduDistrict.map((e) => (
        <option key={e.edu_district_id} value={e.edu_district}>
          {e.edu_district}
        </option>
      ))}
    </select>
  </div>

  <div className="flex flex-1 items-center mb-3 space-x-2">
    <label htmlFor="eduSubDistrictFilter" className="text-sm font-medium">
      Education Sub District:
    </label>
    <select
      id="eduSubDistrictFilter"
      value={selecteduSubDistrict}
      onChange={handleFilterEduSubDistrict}
      className="flex-1 border border-gray-300 rounded p-1"
    >
      <option value="">Choose Education Sub District</option>
      {eduSubDistrict && eduSubDistrict.map((e) => (
        <option key={e.edu_sub_district_id} value={e.edu_sub_district_name}>
          {e.edu_sub_district_name}
        </option>
      ))}
    </select>
  </div>
</div>

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
