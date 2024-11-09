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
import { AddSahodayaForm } from "./[id]/addsahodayaform";

ModuleRegistry.registerModules([ClientSideRowModelModule]);
interface Sahodaya {
  sahodaya_id: string;
  sahodaya_name: string;
}
interface State {
  st_id: number;
  st_name: string;
}
const AdminGrid = () => {
  const router = useRouter();
  const [rowData, setRowData] = useState([]);
  const token = Cookies.get("adtoken");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const [sahodaya, setSahodaya] = useState<Sahodaya[]>([]);
  const [totalcount, setTotalcount] = useState("");
  const [selectSahodaya, setSelectSahodaya] = useState('');
  const [selectedStateGrp, setSelectedStateGrp] = useState("");
  const [states, setStates] = useState<State[]>([]);

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
    { field: "st_name", headerName: "State Name" },
    { field: "sahodaya_name", headerName: "Sahodaya Name" },
    
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: false,
    };
  }, []);

  const onRowClicked = (event: RowClickedEvent) => {
   
    const id = event.data.sahodaya_id;
    router.push(`sahodaya/${id}`);
  };

  useEffect(() => {
    async function fetchdata() {
      if (token) {

        const response = await axios.post(`${apiURL}/admin/adminSahodaya?page=${currentPage}&limit=${itemsPerPage}`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        
        if (response.data.success && response.status!=203) {
          setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage));
         
    localStorage.setItem("sahodayaData", JSON.stringify(response.data.sahodayaList));

          setRowData(response.data.sahodayaList); 
        }
      }
    };
    fetchdata();
  }, [currentPage, token]);
  const handleExportToExcel = async () => {
    try {
      const response = await axios.post(`${apiURL}/admin/adminSahodaya`, {
        "isExcel": true
    },{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
      if (response.data.success && response.status!=203) {
        // Convert response zoneList into Excel
        const datalist = response.data.sahodayaList
  
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

  const handleFilterSahodayaState = (e: any) => {
    
    if (e.target.value != "") {
        setSelectedStateGrp(e.target.value);
        fetchFilteredSahodayaState(e.target.value);
        setCurrentPage(1); // Reset to first page
    }
};

const handleFilterSahodaya = (e: any) => {
    
    if (e.target.value != "") {
        setSelectSahodaya(e.target.value);
        fetchFilteredSahodaya(e.target.value);
        setCurrentPage(1); // Reset to first page
    }
};

const fetchFilteredSahodayaState = async (value: string) => {
  if (token) {
      const response = await axios.post(
          `${apiURL}/admin/adminSahodaya?limit=${totalcount}`,
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
              
              
              const filteredData = response.data.sahodayaList.filter(
                  (item: { st_name: string; }) => item.st_name === value
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
const fetchFilteredSahodaya = async (value: string) => {
  if (token) {
      const response = await axios.post(
          `${apiURL}/admin/adminSahodaya?limit=${totalcount}`,
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
              
              
              const filteredData = response.data.sahodayaList.filter(
                  (item: { sahodaya_name: string; }) => item.sahodaya_name === value
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
  async function fetchData() {

     
      const stateResponse = await fetch(`${apiURL}/state`);
      const stateData = await stateResponse.json();
      setStates(stateData.state);

  

  }
  fetchData();
}, []);

useEffect(() => {
  const handleCbse = async () => {
      if (selectedStateGrp) {
          try {
              const st_id = states.find((item) => item.st_name === selectedStateGrp)?.st_id;
              const response = await axios.get(`${apiURL}/sahodaya/${st_id}`);
              setSahodaya(response.data.sahodayaList);
          } catch (error) {
              console.error("Error fetching data:", error);
          }
      }
      
  };
  handleCbse();
}, [states, selectedStateGrp]);

  return (
    <div className=" bg-slate-100">
      <AddSahodayaForm/>
     <button
          className= "text-white m-3 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
          
          onClick={handleExportToExcel}
        >
          Export To Excel
        </button>

        <div className="flex items-center mb-3 space-x-2">
                        <label htmlFor="groupFilter" className="text-sm font-medium">
                            Sahodaya State:
                        </label>
                        <select
                            id="groupFilter"
                            value={selectedStateGrp}
                            onChange={handleFilterSahodayaState}
                            className="border border-gray-300 rounded p-1"
                        >
                            <option value="">Choose Sahodaya State</option>

                            {states.map((state) => (
                                <option key={state.st_id} value={state.st_name}>
                                    {state.st_name}
                                </option>
                            ))}

                        </select>
                    </div>
                    <div className="flex items-center mb-3 space-x-2">
                        <label htmlFor="groupFilter" className="text-sm font-medium">
                            Sahodaya:
                        </label>
                        <select
                            id="groupFilter"
                            value={selectSahodaya}
                            onChange={handleFilterSahodaya}
                            className="border border-gray-300 rounded p-1"
                        >
                            <option value="">Choose Sahodaya</option>

                            {sahodaya && sahodaya.map((s) => (
                                <option key={s.sahodaya_id} value={s.sahodaya_name}>
                                    {s.sahodaya_name}
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
