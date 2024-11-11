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
type Category = {
  id: string;
  group_type: string;
}
interface SchoolType {
  id: string;
  type_name: string;
}
interface EduDistrict {
  edu_district_id: string;
  edu_district: string;
}
interface EduSubDistrict {
  edu_sub_district_id: string;
  edu_sub_district_name: string;
}
interface SubCategory {
  gp_cat_id: string;
  gp_cat_name: string;
}
interface Sahodaya {
  sahodaya_id: string;
  sahodaya_name: string;
}
interface IcdsBlock {
  icds_block_id: string;
  block_name: string;
}
interface IcdsProject {
  project_id: string;
  project_name: string;
}
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
  const [partname, setPartname] = useState("");
  const [hasEarning, setHasEarning] = useState(false);
  const [email, setEmail] = useState("");
  const [actid, setActid] = useState("");
  const [userid, setUserId] = useState("");
  const [mobile, setMobile] = useState("");
  const [grouptype, setGroupType] = useState("");
  const [selectedschoolType, setSelectedSchoolType] = useState("");
  const [category, setCategory] = useState<Category[]>([]);
  const [schoolType, setSchoolType] = useState<SchoolType[]>([]);
  const [selectedDistrictGrp, setSelectedDistrictGrp] = useState("");
  const [eduDistrict, setEduDistrict] = useState<EduDistrict[]>([]);
  const [eduSubDistrict, setEduSubDistrict] = useState<EduSubDistrict[]>([]);
  const [selectedCountryGrp, setSelectedCountryGrp] = useState("");
  const [selectedStateGrp, setSelectedStateGrp] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [subcategoryOptions, setSubCategoryOptions] = useState<SubCategory[]>([]);
  const [selectSahodaya, setSelectSahodaya] = useState('');
  const [sahodaya, setSahodaya] = useState<Sahodaya[]>([]);
  const [icdsBlock, setIcdsBlock] = useState<IcdsBlock[]>([]);
  const [missionChapter, setMissionChapter] = useState<MissionChapter[]>([]);
  const [selectMissionarea, setSelectMissionarea] = useState('');
  const [selecteduDistrict, setSelecteduDistrict] = useState('');
  const [selecteduSubDistrict, setSelecteduSubDistrict] = useState('');
  const [selectIcdsBlock, setSelectIcdsBlock] = useState('');
  const [selectIcdsProject, setSelectIcdsProject] = useState('');
  const [missionZone, setMissionZone] = useState<MissionZone[]>([]);
  const [icdsProject, setIcdsProject] = useState<IcdsProject[]>([]);
  const [selectMission, setSelectedMission] = useState('');
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
    { field: "personal_activity_id", headerName: "Activity Id" },
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
      floatingFilter: false,
    };
  }, []);

  const onRowClicked = (event: RowClickedEvent) => {

    const id = event.data.personal_activity_id;
    router.push(`activity/${id}`);
  };
  const handleExportToExcel = async () => {
    try {
      const response = await axios.post(`${apiURL}/admin/adminActivityList`, {
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
    async function fetchdata() {
      if (token) {

        const response = await axios.post(`${apiURL}/admin/adminActivityList?page=${currentPage}&limit=${itemsPerPage}`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (response.data.success && response.status != 203) {
          setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage));
          
          setRowData(response.data.userList);
        }
      }
    };
    fetchdata();
  }, [currentPage, token]);

  useEffect(() => {
    const fetchCategory = async () => {
      if (token && hasEarning) {
        const response = await axios.post(
          `${apiURL}/admin/adminActivityList`,
          { hasEarnings: hasEarning },
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
    fetchCategory();
  }, [hasEarning, token]);

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

  useEffect(() => {
    async function fetchData() {
      const categoryResponse = await fetch(`${apiURL}/category`);
      const categoryData = await categoryResponse.json();
      
      setCategory(categoryData.category);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const responsetype = await axios.get(`${apiURL}/schoolType`);
        setSchoolType(responsetype.data.schoolType);
        const dis_id = districts.find((item) => item.dis_name === selectedDistrictGrp)?.dis_id;

        const responseedudistrict = dis_id ? await axios.get(`${apiURL}/eduDistrict/${dis_id}`) : null;
        responseedudistrict ? setEduDistrict(responseedudistrict.data.eduDistrict) : '';
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchClass();
  }, [districts, selectedDistrictGrp]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${apiURL}/schoolCategory`);

        setSubCategoryOptions(response.data.subCategory);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };
    fetchCategory();
  }, []);
  useEffect(() => {
    const handleCbse = async () => {
      if (selectedschoolType === 'CBSE' && selectedStateGrp) {
        try {
          const st_id = states.find((item) => item.st_name === selectedStateGrp)?.st_id;
          const response = await axios.get(`${apiURL}/sahodaya/${st_id}`);
          setSahodaya(response.data.sahodayaList);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      if (selectedschoolType === 'ICDS' && selectedDistrictGrp) {

        try {
          const dis_id = districts.find((item) => item.dis_name === selectedDistrictGrp)?.dis_id;


          const response = await axios.get(`${apiURL}/icdsBlock/${dis_id}`);

          setIcdsBlock(response.data.icdsBlockList);
        } catch (error) {
          console.error("Error fetching data:", error);
        }

      }
      if (selectedschoolType === 'Malayalam Mission' && selectMissionarea) {

        try {
          const response = await axios.get(`${apiURL}/malayalamMissionChapter/${selectMissionarea}`);
          setMissionChapter(response.data.chapterList);
        } catch (error) {
          console.error("Error fetching data:", error);
        }

      }
    };
    handleCbse();
  }, [districts, selectedschoolType, states, selectMissionarea, selectedStateGrp, selectedDistrictGrp]);

  const handleIcds = async (e: any) => {
    try {
      const icdsid = icdsBlock.find((item) => item.block_name === e)?.icds_block_id
      const response = await axios.get(`${apiURL}/icdsProject/${icdsid}`);
      setIcdsProject(response.data.icdsProjectList);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const handleChapter = async (e: any) => {
    try {
      const chapterid = missionChapter.find((item) => item.chapter_name === e)?.chapter_id
      const response = await axios.get(`${apiURL}/malayalamMissionZone/${chapterid}`);
      setMissionZone(response.data.zoneList);


    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleEduDistrict = async (e: any) => {
    try {
      const eduid = eduDistrict.find((item) => item.edu_district === e)?.edu_district_id
      const responseedusubdistrict = await axios.get(`${apiURL}/eduSubDistrict/${eduid}`);
      setEduSubDistrict(responseedusubdistrict.data.eduSubDistrict);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleFilterGrpName = (e: any) => {
    
    if (e != "") {
      fetchFilteredGrpName(e);
      setCurrentPage(1); // Reset to first page
    }
  };

  const handleFilterEmail = (e: any) => {
    
    if (e != "") {

      fetchFilteredEmail(e);
      setCurrentPage(1); // Reset to first page
    }
  };
  const handleFilterId = (e: any) => {
    
    if (e != "") {

      fetchFilteredId(e);
      setCurrentPage(1); // Reset to first page
    }
  };
  const handleFilterMobile = (e: any) => {
    
    if (e != "") {

      fetchFilteredMobile(e);
      setCurrentPage(1); // Reset to first page
    }
  };
  const handleFilterUpId = (e: any) => {
   
    if(e != "")
      {
       
        fetchFilteredUpId(e);
        setCurrentPage(1); // Reset to first page
      }
  };
  const fetchFilteredUpId = async (value: string) => {
    const filterdata = {
      userId: parseInt(value)
    }
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminActivityList`,
        filterdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      try {
        
        if (response.data.success && response.status !== 203) {

          setTotalPages(Math.ceil(response.data.Uploads.length / itemsPerPage));
          setRowData(response.data.Uploads);
        } else {
          setRowData([]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  

  const fetchFilteredGrpName = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminActivityList`,
        {participantName:value},
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

  const fetchFilteredEmail = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminActivityList`,
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
         

          const filteredData = response.data.userList.filter(
            (item: { co_email_id: string; }) => item.co_email_id === value
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
        `${apiURL}/admin/adminActivityList`,
        {activityId:parseInt(value)},
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
        `${apiURL}/admin/adminActivityList`,
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
         
        

          const filteredData = response.data.userList.filter(
            (item: { co_ord_contact: string; }) => item.co_ord_contact == value
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
        `${apiURL}/admin/adminActivityList`,
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

  const fetchFilteredState = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminActivityList`,
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

  const fetchFilteredDistrict = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminActivityList`,
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
  const fetchFilteredCorp = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminActivityList`,
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
  const fetchFilteredLsgd = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminActivityList`,
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
  const fetchFilteredWard = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminActivityList`,
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

  

  

  const handleFilterGrpType = (e: any) => {
    
    if (e != "") {
      setGroupType(e.target.value);
      fetchFilteredGrpType(e.target.value);
      setCurrentPage(1); // Reset to first page
    }
  };

  const fetchFilteredGrpType = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminActivityList`,
        {groupTypeId:category.find((item) => item.group_type === value)?.id},
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

  const handleFilterSchoolType = (e: any) => {
    
    if (e.target.value != "") {
      setSelectedSchoolType(e.target.value);
      e.target.value === 'CBSE' ? setSelectedCountryGrp('India') : ''
      e.target.value === 'General Education' || 'ICDS' ? setSelectedCountryGrp('India') : ''
      e.target.value === 'General Education' || 'ICDS' ? setSelectedStateGrp('Kerala') : ''
      fetchFilteredSchoolType(e.target.value);
      setCurrentPage(1); // Reset to first page
    }
  };

  const fetchFilteredSchoolType = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminActivityList`,
        {schoolTypeId:schoolType.find((item) => item.type_name === value)?.id},
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

  const handleFilterSchoolCategory = (e: any) => {
    
    if (e.target.value != "") {
      setSelectedSubCategory(e.target.value);
      fetchFilteredSchoolCategory(e.target.value);
      setCurrentPage(1); // Reset to first page
    }
  };

  const fetchFilteredSchoolCategory = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminActivityList`,
        {subCategoryId:subcategoryOptions.find((item) => item.gp_cat_name === value)?.gp_cat_id},
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

  const handleFilterSahodayaState = (e: any) => {
    
    if (e.target.value != "") {
      setSelectedStateGrp(e.target.value);
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

  const fetchFilteredSahodaya = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminActivityList`,
        {sahodayaId:sahodaya.find((item) => item.sahodaya_name === value)?.sahodaya_id},
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


  const handleFilterEDistrict = (e: any) => {
    
    if (e.target.value != "") {
      setSelectedDistrictGrp(e.target.value);
      // fetchFilteredSahodaya(e.target.value);
      setCurrentPage(1); // Reset to first page
    }
  };

  const handleFilterEduDistrict = (e: any) => {
    
    if (e.target.value != "") {
      setSelecteduDistrict(e.target.value);
      handleEduDistrict(e.target.value);
      setCurrentPage(1); // Reset to first page
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
        `${apiURL}/admin/adminActivityList`,
        {eduSubDistrictId:eduSubDistrict.find((item) => item.edu_sub_district_name === value)?.edu_sub_district_id},
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


  const handleFilterIcdsBlock = (e: any) => {
    
    if (e.target.value != "") {
      setSelectIcdsBlock(e.target.value);
      handleIcds(e.target.value);
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
        `${apiURL}/admin/adminActivityList`,
        {projectId:icdsProject.find((item) => item.project_name === value)?.project_id},
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

  const handleFilterMissionArea = (e: any) => {
    
    if (e.target.value != "") {
      setSelectMissionarea(e.target.value);
      setCurrentPage(1); // Reset to first page
    }
  };

  const handleFilterMissionChapter = (e: any) => {
    
    if (e.target.value != "") {
      setSelectedMission(e.target.value);
      handleChapter(e.target.value);
      setCurrentPage(1); // Reset to first page
    }
  };

  const handleFilterMissionZone = (e: any) => {
    
    if (e.target.value != "") {
      setSelectedZone(e.target.value);
      fetchFilteredMissionZone(e.target.value);
      setCurrentPage(1); // Reset to first page
    }
  };

  const fetchFilteredMissionZone = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminActivityList`,
        {zoneId:missionZone.find((item) => item.zone_name === value)?.zone_id},
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

  return (
    <div className=" bg-slate-100">
      <button
        className="text-white m-3 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"

        onClick={handleExportToExcel}
      >
        Export To Excel
      </button>
      <div>
        <label>Activity Id</label>
        <div className="flex mb-3">
          <input
            className="border px-2 h-10 text-sm border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 "
            value={actid}
            onChange={(e) => setActid(e.target.value)} // Update the state directly
          />
          <button
            className="text-white ml-2 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
            onClick={() => handleFilterId(actid)}
          >
            Search
          </button>
        </div>
      </div>
      <div>
        <label>User Id</label>
        <div className="flex mb-3">
          <input
            className="border px-2 h-10 text-sm border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 "
            value={userid}
            onChange={(e) => setUserId(e.target.value)} // Update the state directly
          />
          <button
            className="text-white ml-2 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
            onClick={() => handleFilterUpId(userid)}
          >
            Search
          </button>
        </div>
      </div>
      <div>
        <label>Participant Name</label>
        <div className="flex mb-3">
          <input
            className="border px-2 h-10 text-sm border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 "
            value={partname}
            onChange={(e) => setPartname(e.target.value)} // Update the state directly
          />
          <button
            className="text-white ml-2 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
            onClick={() => handleFilterGrpName(partname)}
          >
            Search
          </button>
        </div>
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="hasEarning"
          checked={hasEarning}
          onChange={(e) => setHasEarning(e.target.checked)}
          className="mr-2"
        />
        <label htmlFor="hasEarning" className="text-sm font-medium text-gray-700">
          Has Earning
        </label>
      </div>
      {/* <div>
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
      </div> */}

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
                    //  <div>
                    //   <label>Ward No</label>
                    //   <div className="flex mb-3">
                    //     <input
                    //       className="border px-2 h-10 text-sm border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 "
                    //       value={selectedWard}
                    //       onChange={(e) => setSelectedWard(e.target.value)} // Update the state directly
                    //     />
                    //     <button
                    //       className="text-white ml-2 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
                    //       onClick={() => handleFilterChangeWard(selectedWard)}
                    //     >
                    //       Search
                    //     </button>
                    //   </div> 
                    // </div>
                    : ''}
                </> : ''}
            </> : ''}
        </> : ''}
      {/* group type  */}
      <div className="flex items-center mb-3 space-x-2">
        <label htmlFor="groupFilter" className="text-sm font-medium">
          Group Type:
        </label>
        <select
          id="groupFilter"
          value={grouptype}
          onChange={handleFilterGrpType}
          className="border border-gray-300 rounded p-1"
        >
          <option value="">Choose Group Type</option>

          {category.map((c, i) => (
            <option key={c.id} value={c.group_type}>
              {c.group_type}
            </option>
          ))}

        </select>
      </div>
      {selectedSubCategory !== 'College' && grouptype === 'School' && (
        <>
          <div className="flex items-center mb-3 space-x-2">
            <label htmlFor="groupFilter" className="text-sm font-medium">
              School Type:
            </label>
            <select
              id="groupFilter"
              value={selectedschoolType}
              onChange={handleFilterSchoolType}
              className="border border-gray-300 rounded p-1"
            >
              <option value="">Choose School Type</option>

              {schoolType.map((s) => (
                <option key={s.id} value={s.type_name}>
                  {s.type_name}
                </option>
              ))}

            </select>
          </div>

          <div className="flex items-center mb-3 space-x-2">
            <label htmlFor="groupFilter" className="text-sm font-medium">
              School Category:
            </label>
            <select
              id="groupFilter"
              value={selectedSubCategory}
              onChange={handleFilterSchoolCategory}
              className="border border-gray-300 rounded p-1"
            >
              <option value="">Choose School Category</option>

              {subcategoryOptions.map((category) => (
                <option key={category.gp_cat_id} value={category.gp_cat_name}>
                  {category.gp_cat_name}
                </option>
              ))}

            </select>
          </div>
        </>)}
      {/* CBSE  */}
      {selectedschoolType === 'CBSE' && selectedSubCategory !== 'College' && grouptype === 'School' && (
        <>
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
        </>)}
      {/* GENERAL EDUCATION  */}
      {(selectedschoolType === 'General Education' && selectedSubCategory !== 'College') && grouptype === 'School' && (
        <>
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
              Education District:
            </label>
            <select
              id="groupFilter"
              value={selecteduDistrict}
              onChange={handleFilterEduDistrict}
              className="border border-gray-300 rounded p-1"
            >
              <option value="">Choose Education District</option>

              {eduDistrict && eduDistrict.map((e) => (
                <option key={e.edu_district_id} value={e.edu_district}>
                  {e.edu_district}
                </option>
              ))}

            </select>
          </div>

          <div className="flex items-center mb-3 space-x-2">
            <label htmlFor="groupFilter" className="text-sm font-medium">
              Education Sub District:
            </label>
            <select
              id="groupFilter"
              value={selecteduSubDistrict}
              onChange={handleFilterEduSubDistrict}
              className="border border-gray-300 rounded p-1"
            >
              <option value="">Choose Education Sub District</option>

              {eduSubDistrict && eduSubDistrict.map((e) => (
                <option key={e.edu_sub_district_id} value={e.edu_sub_district_name}>
                  {e.edu_sub_district_name}
                </option>
              ))}

            </select>
          </div>
        </>)}

      {/* ICDS  */}
      {selectedschoolType === 'ICDS' && selectedSubCategory !== 'College' && grouptype === 'School' && (
        <>
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
        </>)}

      {/* MALAYALAM MISSION  */}
      {selectedSubCategory !== 'College' && selectedschoolType === 'Malayalam Mission' && grouptype === 'School' && (
        <>
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
        </>)}

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
