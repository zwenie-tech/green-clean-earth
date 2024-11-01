"use client";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  ColDef,
  ModuleRegistry,
  RowClickedEvent,
} from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
// import "@ag-grid-community/styles/ag-grid.css";
// import "@ag-grid-community/styles/ag-theme-quartz.css";
import "./ag-grid-theme-builder.css";
import { useRouter } from "next/navigation";
import React, { StrictMode, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { apiURL } from "../requestsapi/request";
import Cookies from 'js-cookie';
import * as XLSX from 'xlsx';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

type Category = {
  id: string;
  group_type: string;
}
interface Country {
  cntry_id: number;
  cntry_name: string;
}
interface State {
  st_id: number;
  st_name: string;
}

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
const GridExample = () => {
  const router = useRouter();
  const [rowData, setRowData] = useState([]);
  const token = Cookies.get("adtoken");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [totalcount, setTotalcount] = useState("");
  const [category, setCategory] = useState<Category[]>([]);
  const [planter, setPlanter] = useState("");
  const [uploader, setUploader] = useState("");
  const [uploaderid, setUploaderId] = useState("");
  const [coordinator, setCoordinator] = useState("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedCntry, setSelectedCntry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [selectedLsgd, setSelectedLsgd] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [lsgd, setLsgd] = useState<Lsgd[]>([]);
  const [corporation, setCorporation] = useState<Corp[]>([]);

  const itemsPerPage = 10;
  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
    }
  }, [token, router]);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "up_id", headerName: "Uploader Id" },
    { field: "up_name", headerName: "Uploader name" },
    { field: "up_planter", headerName: "Planter name" },
    { field: "up_tree_name", headerName: "Tree name" },
    { field: "gp_name", headerName: "Group name" },
    { field: "co_ord_name", headerName: "Coordinator name" },
    { field: "group_type", headerName: "Group type" },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: false,
    };
  }, []);

  const onRowClicked = (event: RowClickedEvent) => {

    const id = event.data.up_id;
    window.location.href = `admin/uploads/${id}`;
    // router.push(`admin/uploads/${id}`);
  };
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {

      setCurrentPage(newPage);
    }
  }
  useEffect(() => {
    async function fetchdata() {
      if (token) {
        const response = await axios.post(`${apiURL}/admin/adminUploads?page=${currentPage}&limit=${itemsPerPage}`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        try {

          if (response.data.success && response.status != 203) {
            setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage));
            setTotalcount(response.data.totalCount);
            setRowData(response.data.Uploads);
          } else {
            setRowData([]);

          }

        } catch (error) {
          console.error("Error:", error);
        }
      }
    }

    fetchdata();
  }, [currentPage, token]);

  const handleExportToExcel = async () => {
    try {
      const response = await axios.post(`${apiURL}/admin/adminUploads`, {
        "isExcel": true
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.data.success && response.status != 203) {
        // Convert response zoneList into Excel
        const datalist = response.data.Uploads

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
      const categoryResponse = await fetch(`${apiURL}/category`);
      const categoryData = await categoryResponse.json();
      console.log(categoryData.category)
      setCategory(categoryData.category);
    }
    fetchData();
  }, []);

  const handleFilterGrpType = (e: any) => {
    console.log(e.target.value)
    
    setFilterValue(e.target.value); // Update dropdown value
    fetchFilteredGrpType(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  const fetchFilteredGrpType = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminUploads?limit=${totalcount}`,
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
          console.log(response.data)
          console.log(filterValue)
          const filteredData = response.data.Uploads.filter(
            (item: { group_type: string; }) => item.group_type === value
          );
          console.log(filteredData)

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

  const handleFilterUpName = (e: any) => {
    console.log(e)
    if(e != "")
      {
        setFilterValue(e); // Update dropdown value
        fetchFilteredUpName(e);
        setCurrentPage(1); // Reset to first page
      }
  };
  const fetchFilteredUpName = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminUploads?limit=${totalcount}`,
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
          console.log(response.data.Uploads)
          console.log(value)

          const filteredData = response.data.Uploads.filter(
            (item: { up_name: string; }) => item.up_name === value
          );
          console.log(filteredData)

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
  const handleFilterUpId = (e: any) => {
    console.log(e)
    if(e != "")
      {
        console.log(e)
        fetchFilteredUpId(e);
        setCurrentPage(1); // Reset to first page
      }
  };
  const fetchFilteredUpId = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminUploads?limit=${totalcount}`,
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
          console.log(response.data.Uploads)
          console.log(value)

          const filteredData = response.data.Uploads.filter(
            (item: { up_id: string; }) => item.up_id == value
          );
          console.log(filteredData)

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
  const handleFilterPlanterName = (e: any) => {
    console.log(e)
    if(e != "")
      {
        setFilterValue(e); // Update dropdown value
        fetchFilteredPlanterName(e);
        setCurrentPage(1); // Reset to first page
      }
  };
  const fetchFilteredPlanterName = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminUploads?limit=${totalcount}`,
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
          console.log(response.data.Uploads)
          console.log(value)

          const filteredData = response.data.Uploads.filter(
            (item: { up_planter: string; }) => item.up_planter === value
          );
          console.log(filteredData)

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


  

  const handleFilterCoordName = (e: any) => {
    console.log(e)
    if(e != ""){
      setFilterValue(e); // Update dropdown value
      fetchFilteredCoordName(e);
      setCurrentPage(1); // Reset to first page
    }
  };
  const fetchFilteredCoordName = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminUploads?limit=${totalcount}`,
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
          console.log(response.data.Uploads)
          console.log(value)

          const filteredData = response.data.Uploads.filter(
            (item: { co_ord_name: string; }) => item.co_ord_name === value
          );
          console.log(filteredData)

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

      const countryResponse = await fetch(`${apiURL}/country`);
      const countryData = await countryResponse.json();
      setCountries(countryData.country);


      const stateResponse = await fetch(`${apiURL}/state`);
      const stateData = await stateResponse.json();
      setStates(stateData.state);

      const districtResponse = await fetch(`${apiURL}/district`);
      const districtData = await districtResponse.json();
      setDistricts(districtData.district);

    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchCorpData() {
      if (selectedCntry === "India" && selectedState === "Kerala" && selectedDistrict) {
        const dist_id = districts.find((item) => item.dis_name === selectedDistrict)?.dis_id;
        const corpResponse = await fetch(`${apiURL}/corporation/${dist_id}`);
        const corpData = await corpResponse.json();
        setCorporation(corpData.corporation);
      } else {
        setCorporation([]);
      }
    }
    fetchCorpData();
  }, [selectedCntry, selectedState, selectedDistrict, districts]);

  useEffect(() => {
    async function fetchLsgdData() {
      if (selectedCntry === "India" && selectedState === "Kerala" && selectedCorp) {
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
  }, [selectedCntry, selectedState, selectedCorp, corporation]);

  const handleFilterChangeCntry = (e: any) => {
    console.log(e.target.value)
    
    setSelectedCntry(e.target.value); // Update dropdown value
    fetchFilteredCntry(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  const handleFilterChangeState = (e: any) => {
    console.log(e.target.value)
    
    setSelectedState(e.target.value); // Update dropdown value
    fetchFilteredState(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  const handleFilterChangeDistrict = (e: any) => {
    console.log(e.target.value)
    
    setSelectedDistrict(e.target.value); // Update dropdown value
    fetchFilteredDistrict(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  const handleFilterChangeCorp = (e: any) => {
    console.log(e.target.value)
    
    setSelectedCorp(e.target.value); // Update dropdown value
    fetchFilteredCorp(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  const handleFilterChangeLsgd = (e: any) => {
    console.log(e.target.value)
    
    setSelectedLsgd(e.target.value); // Update dropdown value
    fetchFilteredLsgd(e.target.value);
    setCurrentPage(1); // Reset to first page
  };
  // const handleFilterChangeWard = (e: any) => {
  //   console.log(e.target.value)
  //   
  //   setSelectedWard(e.target.value); // Update dropdown value
  //   fetchFilteredWard(e.target.value);
  //   setCurrentPage(1); // Reset to first page
  // };



  const fetchFilteredCntry = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminUploads?limit=${totalcount}`,
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
          console.log(response.data)
          console.log(response.data.Uploads)
          const filteredData = response.data.Uploads.filter(
            (item: { cntry_name: string; }) => item.cntry_name === value
          );
          console.log(filteredData)

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

  const fetchFilteredState = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminUploads?limit=${totalcount}`,
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
          console.log(response.data)
          console.log(response.data.Uploads)
          const filteredData = response.data.Uploads.filter(
            (item: { st_name: string; }) => item.st_name === value
          );
          console.log(filteredData)

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

  const fetchFilteredDistrict = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminUploads?limit=${totalcount}`,
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
          console.log(response.data)
          console.log(response.data.Uploads)
          const filteredData = response.data.Uploads.filter(
            (item: { dis_name: string; }) => item.dis_name === value
          );
          console.log(filteredData)

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
        `${apiURL}/admin/adminUploads?limit=${totalcount}`,
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
          console.log(response.data)
          console.log(response.data.Uploads)
          const filteredData = response.data.Uploads.filter(
            (item: { cop_name: string; }) => item.cop_name === value
          );
          console.log(filteredData)

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
        `${apiURL}/admin/adminUploads?limit=${totalcount}`,
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
          console.log(response.data)
          console.log(response.data.Uploads)
          const filteredData = response.data.Uploads.filter(
            (item: { lsg_name: string; }) => item.lsg_name === value
          );
          console.log(filteredData)

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
  // const fetchFilteredWard = async (value: string) => {
  //   if (token) {
  //     const response = await axios.post(
  //       `${apiURL}/admin/adminUploads?limit=${totalcount}`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     try {
  //       if (response.data.success && response.status !== 203) {
  //         console.log('filter')
  //         console.log(response.data)
  //         console.log(response.data.Uploads)
  //         const filteredData = response.data.Uploads.filter(
  //           (item: { dis_name: string; }) => item.dis_name === value
  //         );
  //         console.log(filteredData)

  //         setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
  //         setRowData(filteredData);
  //       } else {
  //         setRowData([]);
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   }
  // };


  return (
    <div className=" bg-slate-100">
      <button
        className="text-white m-3 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"

        onClick={handleExportToExcel}
      >
        Export To Excel
      </button>
      <div>
        <label>Uploader Id</label>
        <div className="flex mb-3">
          <input
            className="border px-2 h-10 text-sm border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 "
            value={uploaderid}
            onChange={(e) => setUploaderId(e.target.value)}
            type="number"
          />
          <button
            className="text-white ml-2 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
            onClick={() => handleFilterUpId(uploaderid)}
          >
            Search
          </button>
        </div>
      </div>
      <div>
        <label>Uploader Name</label>
        <div className="flex mb-3">
          <input
            className="border px-2 h-10 text-sm border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 "
            value={uploader}
            onChange={(e) => setUploader(e.target.value)} // Update the state directly
          />
          <button
            className="text-white ml-2 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
            onClick={() => handleFilterUpName(uploader)}
          >
            Search
          </button>
        </div>
      </div>
      <div>
        <label>Planter Name</label>
        <div className="flex mb-3">
          <input
            className="border px-2 h-10 text-sm border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 "
            value={planter}
            onChange={(e) => setPlanter(e.target.value)} // Update the state directly
          />
          <button
            className="text-white ml-2 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
            onClick={() => handleFilterPlanterName(planter)}
          >
            Search
          </button>
        </div>
      </div>
      
      <div>
        <label>Coordinator Name</label>
        <div className="flex mb-3">
          <input
            className="border px-2 h-10 text-sm border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 "
            value={coordinator}
            onChange={(e) => setCoordinator(e.target.value)} // Update the state directly
          />
          <button
            className="text-white ml-2 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
            onClick={() => handleFilterCoordName(coordinator)}
          >
            Search
          </button>
        </div>
      </div>

      {/* country section  */}
      <div className="flex items-center mb-3 space-x-2">
        <label htmlFor="groupFilter" className="text-sm font-medium">
          Country:
        </label>
        <select
          id="groupFilter"
          value={selectedCntry}
          onChange={handleFilterChangeCntry}
          className="border border-gray-300 rounded p-1"
        >
          <option value="">Choose Country</option>
          {countries.map((country) => (
            <option key={country.cntry_id} value={country.cntry_name}>
              {country.cntry_name}
            </option>
          ))}
        </select>
      </div>

      {selectedCntry == "India" ?
      <>
      <div className="flex items-center mb-3 space-x-2">
        <label htmlFor="groupFilter" className="text-sm font-medium">
          State:
        </label>
        <select
          id="groupFilter"
          value={selectedState}
          onChange={handleFilterChangeState}
          className="border border-gray-300 rounded p-1"
        >
          <option value="">Choose State</option>
          {states.map((state) => (
            <option key={state.st_id} value={state.st_name}>
              {state.st_name}
            </option>
          ))}
        </select>
      </div>

      {selectedState == "Kerala" ? 
      <>
      <div className="flex items-center mb-3 space-x-2">
        <label htmlFor="groupFilter" className="text-sm font-medium">
          District:
        </label>
        <select
          id="groupFilter"
          value={selectedDistrict}
          onChange={handleFilterChangeDistrict}
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

      {selectedDistrict != "" ? 
      <>
      <div className="flex items-center mb-3 space-x-2">
        <label htmlFor="groupFilter" className="text-sm font-medium">
          Corporation:
        </label>
        <select
          id="groupFilter"
          value={selectedCorp}
          onChange={handleFilterChangeCorp}
          className="border border-gray-300 rounded p-1"
        >
          <option value="">Choose Corporation</option>
          {corporation.map((corp) => (
            <option key={corp.cop_id} value={corp.cop_name}>
              {corp.cop_name}
            </option>
          ))}
        </select>
      </div>

      {selectedDistrict != "" ? 
      <div className="flex items-center mb-3 space-x-2">
        <label htmlFor="groupFilter" className="text-sm font-medium">
          Lsgd:
        </label>
        <select
          id="groupFilter"
          value={selectedLsgd}
          onChange={handleFilterChangeLsgd}
          className="border border-gray-300 rounded p-1"
        >
          <option value="">Choose Lsgd</option>
          {lsgd && lsgd.map((lsg) => (
            <option key={lsg.lsg_id} value={lsg.lsg_name}>
              {lsg.lsg_name}
            </option>
          ))}
        </select>
      </div>
      :''}
      </>:''}
      </>:''}
      </>:''
}
      {/* <div>
        <label>Ward No</label>
        <div className="flex mb-3">
          <input
            className="border px-2 h-10 text-sm border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 "
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)} // Update the state directly
          />
          <button
            className="text-white ml-2 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
            onClick={() => handleFilterChangeWard(selectedWard)}
          >
            Search
          </button>
        </div>
      </div> */}
      <div className="flex items-center mb-3 space-x-2">
        <label htmlFor="groupFilter" className="text-sm font-medium">
          Group Type:
        </label>
        <select
          id="groupFilter"
          value={filterValue}
          onChange={handleFilterGrpType}
          className="border border-gray-300 rounded p-1"
        >
          <option value="">All</option>

          {category.map((c, i) => (
            <option key={c.id} value={c.group_type}>
              {c.group_type}
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
export default GridExample;
