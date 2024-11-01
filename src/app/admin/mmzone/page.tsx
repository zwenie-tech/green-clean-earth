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
import { AddZoneForm } from "./[id]/addmmzform";

ModuleRegistry.registerModules([ClientSideRowModelModule]);
interface MissionChapter {
  chapter_id: string;
  chapter_name: string;
}
interface MissionZone {
  zone_id: string;
  zone_name: string;
}
const AdminGrid = () => {
  const router = useRouter();
  const [rowData, setRowData] = useState([]);
  const token = Cookies.get("adtoken");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const [missionChapter, setMissionChapter] = useState<MissionChapter[]>([]);
  const [selectMissionarea, setSelectMissionarea] = useState('');
  const [selectMission, setSelectedMission] = useState('');
  const [totalcount, setTotalcount] = useState("");
  const [missionZone, setMissionZone] = useState<MissionZone[]>([]);
  const [selectZone, setSelectedZone] = useState('');

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
    { field: "chapter_type_name", headerName: "Chapter Type" },
    { field: "chapter_name", headerName: "Chapter Name" },
    { field: "zone_name", headerName: "Zone Name" },


  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: false,
    };
  }, []);

  const onRowClicked = (event: RowClickedEvent) => {

    const id = event.data.zone_id;
    router.push(`mmzone/${id}`);
  };

  const handleExportToExcel = async () => {


    try {
      const response = await axios.post(`${apiURL}/admin/adminMMZone`, {
        "isExcel": true
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.data.success && response.status != 203) {
        // Convert response zoneList into Excel
        const updatedChapterList = response.data.zoneList.map((chapter: { chapter_type_id: number; }) => ({
          ...chapter,
          chapter_type_name: chapter.chapter_type_id === 1 ? 'Global' : 'India'
        }));


        // Create a worksheet from the zoneList data
        const worksheet = XLSX.utils.json_to_sheet(updatedChapterList);

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

        const response = await axios.post(`${apiURL}/admin/adminMMZone?page=${currentPage}&limit=${itemsPerPage}`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (response.data.success && response.status != 203) {
          setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage));
          setTotalcount(response.data.totalCount);

          const updatedChapterList = response.data.zoneList.map((chapter: { chapter_type_id: number; }) => ({
            ...chapter,
            chapter_type_name: chapter.chapter_type_id === 1 ? 'Global' : 'India'
          }));
          console.log(updatedChapterList)
          localStorage.setItem("mmzData", JSON.stringify(updatedChapterList));

          setRowData(updatedChapterList);
        }
      }
    };
    fetchdata();
  }, [currentPage, token]);


  const handleFilterMissionArea = (e: any) => {
    console.log(e.target.value)
    if (e.target.value != "") {
      setSelectMissionarea(e.target.value);
      fetchFilteredMissionArea(e.target.value);
      setCurrentPage(1); // Reset to first page
    }
  };

  const handleFilterMissionChapter = (e: any) => {
    console.log(e.target.value)
    if (e.target.value != "") {
      setSelectedMission(e.target.value);
      handleChapter(e.target.value);
      fetchFilteredMissionChapter(e.target.value);
      setCurrentPage(1); // Reset to first page
    }
  };

  const fetchFilteredMissionArea = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminMMZone?limit=${totalcount}`,
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
          console.log('filter')
          console.log(value)
          console.log(response.data)

          const updatedChapterList = response.data.zoneList.map((chapter: { chapter_type_id: number; }) => ({
            ...chapter,
            chapter_type_name: chapter.chapter_type_id === 1 ? 'Global' : 'India'
          }));
          const filteredData = updatedChapterList.filter(
            (item: { chapter_type_id: string; }) => item.chapter_type_id == value
          );
          console.log(updatedChapterList)

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

  const fetchFilteredMissionChapter = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminMMZone?limit=${totalcount}`,
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
          console.log('filter')
          console.log(value)
          console.log(response.data)

          const updatedChapterList = response.data.zoneList .map((chapter: { chapter_type_id: number; }) => ({
            ...chapter,
            chapter_type_name: chapter.chapter_type_id === 1 ? 'Global' : 'India'
          }));
          const filteredData = updatedChapterList.filter(
            (item: { chapter_name: string; }) => item.chapter_name == value
          );
          console.log(updatedChapterList)

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

      if (selectMissionarea) {

        try {
          const response = await axios.get(`${apiURL}/malayalamMissionChapter/${selectMissionarea}`);
          setMissionChapter(response.data.chapterList);
        } catch (error) {
          console.error("Error fetching data:", error);
        }

      }
    };
    handleCbse();
  }, [selectMissionarea]);

  const handleChapter = async (e: any) => {
    try {
        const chapterid = missionChapter.find((item) => item.chapter_name === e)?.chapter_id
        const response = await axios.get(`${apiURL}/malayalamMissionZone/${chapterid}`);
        setMissionZone(response.data.zoneList);


    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const handleFilterMissionZone = (e: any) => {
  console.log(e.target.value)
  if (e.target.value != "") {
      setSelectedZone(e.target.value);
      fetchFilteredMissionZone(e.target.value);
      setCurrentPage(1); // Reset to first page
  }
};

const fetchFilteredMissionZone = async (value: string) => {
  if (token) {
    const response = await axios.post(
      `${apiURL}/admin/adminMMZone?limit=${totalcount}`,
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
        console.log('filter')
        console.log(value)
        console.log(response.data)

        const updatedChapterList = response.data.zoneList .map((chapter: { chapter_type_id: number; }) => ({
          ...chapter,
          chapter_type_name: chapter.chapter_type_id === 1 ? 'Global' : 'India'
        }));
        const filteredData = updatedChapterList.filter(
          (item: { zone_name: string; }) => item.zone_name == value
        );
        console.log(updatedChapterList)

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
      <AddZoneForm />
      <button
        className="text-white m-3 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"

        onClick={handleExportToExcel}
      >
        Export To Excel
      </button>

      <div className="flex items-center mb-3 space-x-2">
        <label htmlFor="groupFilter" className="text-sm font-medium">
          Mission Area :
        </label>
        <select
          id="groupFilter"
          value={selectMissionarea}
          onChange={handleFilterMissionArea}
          className="border border-gray-300 rounded p-1"
        >
          <option value="">Choose Mission Area</option>

          <option key='1' value="1">
            Global
          </option>
          <option key='2' value="2">
            India
          </option>
        </select>
      </div>

      <div className="flex items-center mb-3 space-x-2">
        <label htmlFor="groupFilter" className="text-sm font-medium">
          Mission Chapter :
        </label>
        <select
          id="groupFilter"
          value={selectMission}
          onChange={handleFilterMissionChapter}
          className="border border-gray-300 rounded p-1"
        >
          <option value="">Choose Mission Chapter</option>

          {missionChapter && missionChapter.map((e) => (
            <option key={e.chapter_id} value={e.chapter_name}>
              {e.chapter_name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center mb-3 space-x-2">
                        <label htmlFor="groupFilter" className="text-sm font-medium">
                            Mission Zone :
                        </label>
                        <select
                            id="groupFilter"
                            value={selectZone}
                            onChange={handleFilterMissionZone}
                            className="border border-gray-300 rounded p-1"
                        >
                            <option value="">Choose Mission Zone</option>

                            {missionZone && missionZone.map((e) => (
                                <option key={e.zone_id} value={e.zone_name}>
                                    {e.zone_name}
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

        {Array.from({ length: totalPages >= 3 ? 3 : totalPages }, (_, index) => currentPage < 4 ? index + 1 : currentPage + index - 2).map((page) => (
          <span
            key={page}
            className={`text-xl cursor-pointer text-gray-600 ${page === currentPage ? 'font-bold' : 'underline'}`}
            onClick={() => handlePageChange(page)}
          >
            {page > 0 ? page : ''}
          </span>
        ))}

        {currentPage > 1 && totalPages > 3 && currentPage != totalPages && <span className="text-xl text-gray-600">...</span>}
        {currentPage === 1 && totalPages > 3 && currentPage != totalPages && <span className="text-xl text-gray-600">...</span>}


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
