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
import { AddProjectForm } from "./[id]/addprojectform";

ModuleRegistry.registerModules([ClientSideRowModelModule]);
interface IcdsBlock {
  icds_block_id: string;
  block_name: string;
}
interface District {
  dis_id: number;
  dis_name: string;
}
interface IcdsProject {
  project_id: string;
  project_name: string;
}
const AdminGrid = () => {
  const router = useRouter();
  const [rowData, setRowData] = useState([]);
  const token = Cookies.get("adtoken");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const [selectedDistrictGrp, setSelectedDistrictGrp] = useState("");
  const [icdsBlock, setIcdsBlock] = useState<IcdsBlock[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectIcdsBlock, setSelectIcdsBlock] = useState('');
  const [totalcount, setTotalcount] = useState("");
  const [icdsProject, setIcdsProject] = useState<IcdsProject[]>([]);
  const [selectIcdsProject, setSelectIcdsProject] = useState('');


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
    { field: "block_name", headerName: "Icds Block Name" },
    { field: "project_name", headerName: "Icds Block Project" },
    
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: false,
    };
  }, []);

  const onRowClicked = (event: RowClickedEvent) => {
   
    const id = event.data.project_id;
    router.push(`icdsproject/${id}`);
  };

  useEffect(() => {
    async function fetchdata() {
      if (token) {

        const response = await axios.post(`${apiURL}/admin/adminIcdsProject?page=${currentPage}&limit=${itemsPerPage}`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        
        if (response.data.success && response.status!=203) {
          setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage));
          setTotalcount(response.data.totalCount)
    localStorage.setItem("projectData", JSON.stringify(response.data.projectList));

          setRowData(response.data.projectList); 
        }
      }
    };
    fetchdata();
  }, [currentPage, token]);
  const handleExportToExcel = async () => {
    try {
      const response = await axios.post(`${apiURL}/admin/adminIcdsProject`, {
        "isExcel": true
    },{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
      if (response.data.success && response.status!=203) {
        // Convert response zoneList into Excel
        const datalist = response.data.projectList
  
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

  const handleIcds = async (e: any) => {
    try {
        const icdsid = icdsBlock.find((item) => item.block_name === e)?.icds_block_id
        const response = await axios.get(`${apiURL}/icdsProject/${icdsid}`);
        setIcdsProject(response.data.icdsProjectList);

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
  const handleFilterEDistrict = (e: any) => {
    
    if (e.target.value != "") {
        setSelectedDistrictGrp(e.target.value);
        fetchFilteredIcdsBlockDistrict(e.target.value);
        setCurrentPage(1); // Reset to first page
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

const handleFilterIcdsBlock = (e: any) => {
  
  if (e.target.value != "") {
      setSelectIcdsBlock(e.target.value);
      handleIcds(e.target.value);
      fetchFilteredIcdsBlock(e.target.value);
      setCurrentPage(1); // Reset to first page
  }
};

const handleFilterIcdsProject = (e: any) => {
  
  if (e.target.value != "") {
      setSelectIcdsProject(e.target.value);
      fetchFilteredIcdsProject(e.target.value);
      setCurrentPage(1); // Reset to first page
  }
};
const fetchFilteredIcdsProject = async (value: string) => {
  if (token) {
      const response = await axios.post(
          `${apiURL}/admin/adminIcdsProject?limit=${totalcount}`,
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
              
              
              const filteredData = response.data.projectList.filter(
                  (item: { project_name: string; }) => item.project_name === value
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
const fetchFilteredIcdsBlockDistrict = async (value: string) => {
  if (token) {
      const response = await axios.post(
          `${apiURL}/admin/adminIcdsProject?limit=${totalcount}`,
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
             

              const filteredData = response.data.projectList.filter(
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
const fetchFilteredIcdsBlock = async (value: string) => {
  if (token) {
      const response = await axios.post(
          `${apiURL}/admin/adminIcdsProject?limit=${totalcount}`,
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
              
              const filteredData = response.data.projectList.filter(
                  (item: { block_name: string; }) => item.block_name === value
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

useEffect(() => {
  const handleCbse = async () => {
     
      if ( selectedDistrictGrp) {

          try {
              const dis_id = districts.find((item) => item.dis_name === selectedDistrictGrp)?.dis_id;


              const response = await axios.get(`${apiURL}/icdsBlock/${dis_id}`);

              setIcdsBlock(response.data.icdsBlockList);
          } catch (error) {
              console.error("Error fetching data:", error);
          }

      }
      
  };
  handleCbse();
}, [districts, selectedDistrictGrp]);





  return (
    <div className=" bg-slate-100">
      <AddProjectForm/>
     <button
          className= "text-white m-3 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
          
          onClick={handleExportToExcel}
        >
          Export To Excel
        </button>

        <div className="flex items-center mb-3 space-x-2">
                        <label htmlFor="groupFilter" className="text-sm font-medium">
                            District:
                        </label>
                        <select
                            id="groupFilter"
                            value={selectedDistrictGrp}
                            onChange={handleFilterEDistrict}
                            className="border border-gray-300 rounded p-1"
                        >
                            <option value="">Choose District</option>

                            {districts.map((district) => (
                                <option key={district.dis_id} value={district.dis_name}>
                                    {district.dis_name}
                                </option>
                            ))}

                        </select>
                    </div>

                    <div className="flex items-center mb-3 space-x-2">
                        <label htmlFor="groupFilter" className="text-sm font-medium">
                            Icds Block :
                        </label>
                        <select
                            id="groupFilter"
                            value={selectIcdsBlock}
                            onChange={handleFilterIcdsBlock}
                            className="border border-gray-300 rounded p-1"
                        >
                            <option value="">Choose Icds Block</option>

                            {icdsBlock && icdsBlock.map((e) => (
                                <option key={e.icds_block_id} value={e.block_name}>
                                    {e.block_name}
                                </option>
                            ))}


                        </select>
                    </div>

                    <div className="flex items-center mb-3 space-x-2">
                        <label htmlFor="groupFilter" className="text-sm font-medium">
                            Icds Project :
                        </label>
                        <select
                            id="groupFilter"
                            value={selectIcdsProject}
                            onChange={handleFilterIcdsProject}
                            className="border border-gray-300 rounded p-1"
                        >
                            <option value="">Choose Icds Project</option>

                            {icdsProject && icdsProject.map((e) => (
                                <option key={e.project_id} value={e.project_name}>
                                    {e.project_name}
                                </option>
                            ))}
                        </select>
                    </div>


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
