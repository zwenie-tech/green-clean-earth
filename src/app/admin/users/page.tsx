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

ModuleRegistry.registerModules([ClientSideRowModelModule]);
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
const AdminGrid = () => {
  const router = useRouter();
  const [rowData, setRowData] = useState([]);
  const token = Cookies.get("adtoken");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [totalcount, setTotalcount] = useState("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCntry, setSelectedCntry] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [selectedLsgd, setSelectedLsgd] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [lsgd, setLsgd] = useState<Lsgd[]>([]);
  const [corporation, setCorporation] = useState<Corp[]>([]);
  const [coordinator, setCoordinator] = useState("");
  const [email, setEmail] = useState("");
  const [userid, setUserid] = useState("");
  const [mobile, setMobile] = useState("");
  const itemsPerPage = 10;
  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
    }
  }, [token, router]);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "us_id", headerName: "User Id" },
    { field: "us_name", headerName: "Name" },
    { field: "us_email", headerName: "Email" },
    { field: "us_mobile", headerName: "Mobile" },
    { field: "cntry_name", headerName: "Country" },
    { field: "st_name", headerName: "State" },
    { field: "dis_name", headerName: "District" },
    { field: "us_address", headerName: "Address" },
    { field: "created_on", headerName: "Registered date" },
    { field: "gp_name", headerName: "Group name" },
    { field: "co_ord_name", headerName: "Coordinator name" },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: false,
    };
  }, []);
  const onRowClicked = (event: RowClickedEvent) => {

    const id = event.data.us_id;
    router.push(`users/${id}`);
  };
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {

      setCurrentPage(newPage);
    }
  }

  useEffect(() => {
    async function fetchdata() {
      if (token) {

        const response = await axios.post(`${apiURL}/admin/adminUserList?page=${currentPage}&limit=${itemsPerPage}`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        try {

          if (response.data.success && response.status != 203) {
            setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage));
            setTotalcount(response.data.totalCount);
            setRowData(response.data.userList);
          } else {
            setRowData([]);

          }

        } catch (error) {
          console.error("Error:", error);

        }
      };
    }
    fetchdata();
  }, [currentPage, token]);

  const handleExportToExcel = async () => {
    try {
      const response = await axios.post(`${apiURL}/admin/adminUserList`, {
        "isExcel": true
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.data.success && response.status != 203) {
        // Convert response zoneList into Excel
        const datalist = response.data.userList

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
  }, [selectedCountry]);

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


  const handleFilterCoordName = (e: any) => {
    
    if(e != ""){
      setFilterValue(e); // Update dropdown value
      fetchFilteredCoordName(e);
      setCurrentPage(1); // Reset to first page
    }
  };

  const handleFilterEmail = (e: any) => {
    
    if(e != ""){
      setFilterValue(e); // Update dropdown value
      fetchFilteredEmail(e);
      setCurrentPage(1); // Reset to first page
    }
  };
  const handleFilterId = (e: any) => {
    
    if(e != ""){
      setFilterValue(e); // Update dropdown value
      fetchFilteredId(e);
      setCurrentPage(1); // Reset to first page
    }
  };
  const handleFilterMobile = (e: any) => {
    
    if(e != ""){
      setFilterValue(e); // Update dropdown value
      fetchFilteredMobile(e);
      setCurrentPage(1); // Reset to first page
    }
  };
  
  const handleFilterChangeCntry = (e: any) => {
    
    
    setSelectedCntry(e.target.value); // Update dropdown value
    fetchFilteredCntry(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  const handleFilterChangeState = (e: any) => {
    
    
    setSelectedState(e.target.value); // Update dropdown value
    fetchFilteredState(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

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
  const handleFilterChangeWard = (e: any) => {
    
    
    setSelectedWard(e); // Update dropdown value
    fetchFilteredWard(e);
    setCurrentPage(1); // Reset to first page
  };



  const fetchFilteredCntry = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminUserList`,
        {countryId:countries.find((item) => item.cntry_name === value)?.cntry_id},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      try {
        if (response.data.success && response.status !== 203) {
        
          const filteredData = response.data.userList.filter(
            (item: { cntry_name: string; }) => item.cntry_name === value
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

  const fetchFilteredState = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminUserList`,
        {stateId:states.find((item) => item.st_name === value)?.st_id},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      try {
        if (response.data.success && response.status !== 203) {
         
          const filteredData = response.data.userList.filter(
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

  const fetchFilteredDistrict = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminUserList`,
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
          
          const filteredData = response.data.userList.filter(
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
        `${apiURL}/admin/adminUserList`,
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
          
          const filteredData = response.data.userList.filter(
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
        `${apiURL}/admin/adminUserList`,
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
        
          const filteredData = response.data.userList.filter(
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
  const fetchFilteredWard = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminUserList`,
        {wardNo:parseInt(value)},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      try {
        if (response.data.success && response.status !== 203) {
         
          

          setTotalPages(Math.ceil(response.data.userList.length / itemsPerPage));
          setRowData(response.data.userList);
        } else {
          setRowData([]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const fetchFilteredCoordName = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminUserList`,
        {cordinatorName:value},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      try {
        if (response.data.success && response.status !== 203) {
          

          const filteredData = response.data.userList.filter(
            (item: { co_ord_name: string; }) => item.co_ord_name === value
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

  const fetchFilteredEmail = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminUserList`,
        {email:value},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      try {
        if (response.data.success && response.status !== 203) {
         

          const filteredData = response.data.userList.filter(
            (item: { us_email: string; }) => item.us_email === value
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

  const fetchFilteredId = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminUserList`,
        {userId:parseInt(value)},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      try {
        if (response.data.success && response.status !== 203) {
         
          

          setTotalPages(Math.ceil(response.data.userList.length / itemsPerPage));
          setRowData(response.data.userList);
        } else {
          setRowData([]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const fetchFilteredMobile = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminUserList`,
        {mobile:value},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      try {
        if (response.data.success && response.status !== 203) {
         
          const filteredData = response.data.userList.filter(
            (item: { us_mobile: string; }) => item.us_mobile === value
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
      <button
        className="text-white m-3 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"

        onClick={handleExportToExcel}
      >
        Export To Excel
      </button>
      <div>
        <label>User Id</label>
        <div className="flex mb-3">
          <input
            className="border px-2 h-10 text-sm border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 "
            value={userid}
            onChange={(e) => setUserid(e.target.value)} // Update the state directly
          />
          <button
            className="text-white ml-2 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
            onClick={() => handleFilterId(userid)}
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
      <div>
        <label>Email</label>
        <div className="flex mb-3">
          <input
            className="border px-2 h-10 text-sm border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 "
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update the state directly
          />
          <button
            className="text-white ml-2 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
            onClick={() => handleFilterEmail(email)}
          >
            Search
          </button>
        </div>
      </div>

      <div>
        <label>Mobile</label>
        <div className="flex mb-3">
          <input
            className="border px-2 h-10 text-sm border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 "
            value={mobile}
            onChange={(e) => setMobile(e.target.value)} // Update the state directly
          />
          <button
            className="text-white ml-2 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
            onClick={() => handleFilterMobile(mobile)}
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
      
      <><div className="flex items-center mb-3 space-x-2">
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
                    </div><div>
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
                      </div></>
      :''}
      </>:''}
      </>:''}
      </>:''}
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
