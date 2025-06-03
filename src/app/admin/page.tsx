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
import React, { StrictMode, useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { apiURL, fetchClubData } from "../requestsapi/request";
import Cookies from 'js-cookie';
import * as XLSX from 'xlsx';
import PaginationComponent from "./PageComponent";

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
type GrpName = {
  gp_id: string;
  gp_name: string;
}
interface Club {
  id: string;
  name: string;
}
const GridExample = () => {
  const router = useRouter();
  const [rowData, setRowData] = useState([]);
  const token = Cookies.get("adtoken");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [totalcount, setTotalcount] = useState("");
  const [planter, setPlanter] = useState("");
  const [uploader, setUploader] = useState("");
  const [uploaderid, setUploaderId] = useState("");
  const [treeno, setTreeNo] = useState("");
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
  const [selectedgrpName, setSelectedGrpName] = useState("");
  const [grpName, setGrpName] = useState<GrpName[]>([]);
  const [filterdata, setFilterData] = useState({});
  const itemsPerPage = 10;

  const [clubs, setClubs] = useState<Club[]>([]);
  const [club, setClub] = useState("");

  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
    }
  }, [token, router]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const data = await fetchClubData();
        setClubs(data.clubs);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };
    fetchClubs();
  }, []);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    // { field: "slno", headerName: "Sl No" },
    { field: "up_id", headerName: "Tree No", width: 100 },
    { field: "up_name", headerName: "Uploader name", width: 150 },
    { field: "up_planter", headerName: "Planter name", width: 140 },
    { field: "up_tree_name", headerName: "Tree name", width: 140 },
    {
      field: "up_date", headerName: "Date", width: 140,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      }
    },
    { field: "gp_name", headerName: "Group name", width: 140 },
    { field: "co_ord_name", headerName: "Coordinator name", width: 180 },
    { field: "group_type", headerName: "Group type", width: 120 },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      // filter: "agTextColumnFilter",
      floatingFilter: false,
      autoSizeStrategy: {
        type: 'fitContentWidth',
        // Optional: Limit column sizes
        defaultMinWidth: 100,
        defaultMaxWidth: 500
      },
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

      if (token && Object.keys(filterdata).length === 0) {
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
            const data = response.data.Uploads;



            // console.log('part1', data);  // Log the formatted data

            setRowData(data);  // Set the updated data to state

          } else {
            setTotalcount("0");

            setRowData([]);

          }

        } catch (error) {
          console.error("Error:", error);
        }
      }
    }

    fetchdata();
  }, [currentPage, filterdata, token]);


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

      setCategory(categoryData.category);
    }
    fetchData();
  }, []);

  const handleFilterGrpType = async (e: any) => {
    setGroupType(e.target.value); // Update dropdown value
    setCurrentPage(1); // Reset to first page
  };



  const handleFilterUpName = (e: any) => {

    if (e != "") {
      setFilterValue(e); // Update dropdown value
      fetchFilteredUpName(e);
      setCurrentPage(1); // Reset to first page
    }
  };
  const fetchFilteredUpName = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminUploads`,
        { uploaderName: value },
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
          setTotalcount(response.data.totalCount);
          setRowData(response.data.Uploads);
        } else {
          setTotalcount("0");
          setRowData([]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  const handleFilterUpId = (e: any) => {

    if (e != "") {

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
        `${apiURL}/admin/adminUploads`,
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
          setTotalcount(response.data.totalCount);
          setTotalPages(Math.ceil(response.data.Uploads.length / itemsPerPage));
          setRowData(response.data.Uploads);
        } else {
          setTotalcount("0");
          setRowData([]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  const handleFilterTreeNo = (e: any) => {

    if (e != "") {

      fetchFilteredTreeNo(e);
      setCurrentPage(1); // Reset to first page
    }
  };
  const fetchFilteredTreeNo = async (value: string) => {
    const filterdata = {
      treeNumber: parseInt(value)
    }
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminUploads`,
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
          setTotalcount(response.data.totalCount);
          setRowData(response.data.Uploads);
        } else {
          setTotalcount("0");
          setRowData([]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  const handleFilterPlanterName = (e: any) => {

    if (e != "") {
      setFilterValue(e); // Update dropdown value
      fetchFilteredPlanterName(e);
      setCurrentPage(1); // Reset to first page
    }
  };
  const fetchFilteredPlanterName = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminUploads`,
        { planterName: value },
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
          setTotalcount(response.data.totalCount);
          setRowData(response.data.Uploads);
        } else {
          setTotalcount("0");
          setRowData([]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };




  const handleFilterCoordName = (e: any) => {

    if (e != "") {
      setFilterValue(e); // Update dropdown value
      fetchFilteredCoordName(e);
      setCurrentPage(1); // Reset to first page
    }
  };
  const fetchFilteredCoordName = async (value: string) => {
    if (token) {
      const response = await axios.post(
        `${apiURL}/admin/adminUploads`,
        { cordinatorName: value },
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
          setTotalcount(response.data.totalCount);
          setRowData(response.data.Uploads);
        } else {
          setTotalcount("0");
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


    setSelectedCntry(e.target.value); // Update dropdown value
    // fetchFilteredCntry(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  const handleFilterChangeState = (e: any) => {


    setSelectedState(e.target.value); // Update dropdown value
    // fetchFilteredState(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  const handleFilterChangeDistrict = (e: any) => {


    setSelectedDistrict(e.target.value); // Update dropdown value
    // fetchFilteredDistrict(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  const handleFilterChangeCorp = (e: any) => {


    setSelectedCorp(e.target.value); // Update dropdown value
    // fetchFilteredCorp(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  const handleFilterChangeLsgd = (e: any) => {


    setSelectedLsgd(e.target.value); // Update dropdown value
    // fetchFilteredLsgd(e.target.value);
    setCurrentPage(1); // Reset to first page
  };
  const handleFilterChangeWard = (e: any) => {


    setSelectedWard(e); // Update dropdown value
    // fetchFilteredWard(e);
    setCurrentPage(1); // Reset to first page
  };




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

  const handleFilterSchoolType = (e: any) => {

    if (e.target.value != "") {
      setSelectedSchoolType(e.target.value);
      e.target.value === 'CBSE' ? setSelectedCountryGrp('India') : ''
      e.target.value === 'General Education' || 'ICDS' ? setSelectedCountryGrp('India') : ''
      e.target.value === 'General Education' || 'ICDS' ? setSelectedStateGrp('Kerala') : ''

      // fetchFilteredSchoolType(e.target.value);
      setCurrentPage(1); // Reset to first page
    }
  };



  const handleFilterSchoolCategory = (e: any) => {

    if (e.target.value != "") {
      setSelectedSubCategory(e.target.value);
      // fetchFilteredSchoolCategory(e.target.value);

      setCurrentPage(1); // Reset to first page
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

      // fetchFilteredSahodaya(e.target.value);
      setCurrentPage(1); // Reset to first page
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

      // fetchFilteredEduSubDistrict(e.target.value);
      setCurrentPage(1); // Reset to first page
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


      // fetchFilteredIcdsProject(e.target.value);
      setCurrentPage(1); // Reset to first page
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


      // fetchFilteredMissionZone(e.target.value);
      setCurrentPage(1); // Reset to first page
    }
  };

  const handleFilterClub = (e: any) => {

    if (e.target.value != "") {
      setClub(e.target.value);
      // fetchFilteredGrpName(e.target.value);
      // setCurrentPage(1); // Reset to first page
    }
  };

  const handleFilterGrpName = (e: any) => {

    if (e.target.value != "") {
      setSelectedGrpName(e.target.value);
      // fetchFilteredGrpName(e.target.value);
      setCurrentPage(1); // Reset to first page
    }
  };


  const fetchgrpname = useCallback(async () => {
    try {
      // Clear group name to empty array before fetching
      setGrpName([]);

      const response = await axios.post(
        `${apiURL}/common/groupName/`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setGrpName(response.data.groupList);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  }, []); // Empty dependency array ensures this only runs once

  // Call fetchgrpname only once when the component mounts
  useEffect(() => {
    fetchgrpname();
  }, [fetchgrpname]);

  // Define handleGrpName using useCallback to memoize it
  const handleGrpName = useCallback(async () => {
    if (grouptype) {
      const groupId = category.find((item) => item.group_type === grouptype)?.id;
      const subcatid = subcategoryOptions.find((item) => item.gp_cat_name === selectedSubCategory)?.gp_cat_id;
      const schooltypeid = schoolType.find((item) => item.type_name === selectedschoolType)?.id;
      const sahodayaid = sahodaya.find((item) => item.sahodaya_name === selectSahodaya)?.sahodaya_id;
      const edudistid = eduDistrict.find((item) => item.edu_district === selecteduDistrict)?.edu_district_id;
      const edusubid = eduSubDistrict.find((item) => item.edu_sub_district_name === selecteduSubDistrict)?.edu_sub_district_id;
      const blockid = icdsBlock.find((item) => item.block_name === selectIcdsBlock)?.icds_block_id;
      const projectid = icdsProject.find((item) => item.project_name === selectIcdsProject)?.project_id;
      const chapterid = missionChapter.find((item) => item.chapter_name === selectMission)?.chapter_id;
      const zoneid = missionZone.find((item) => item.zone_name === selectZone)?.zone_id;

      const apidata = {
        groupTypeId: groupId,
        subCategoryId: subcatid,
        schoolTypeId: schooltypeid,
        eduDistrictId: edudistid,
        eduSubDistrictId: edusubid,
        sahodayaId: sahodayaid,
        blockId: blockid,
        projectId: projectid,
        chapterId: chapterid,
        zoneId: zoneid
      };


      try {
        // Clear group name to empty array before fetching
        setGrpName([]);

        const response = await axios.post(
          `${apiURL}/common/groupName/`,
          apidata,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const GroupList = response.data.groupList;

        setGrpName(GroupList);
      } catch (error) {
        console.error("Error fetching group names:", error);
      }
    }
  }, [
    grouptype,
    category,
    subcategoryOptions,
    schoolType,
    sahodaya,
    eduDistrict,
    eduSubDistrict,
    icdsBlock,
    icdsProject,
    missionChapter,
    missionZone,
    selectedSubCategory,
    selectedschoolType,
    selectSahodaya,
    selecteduDistrict,
    selecteduSubDistrict,
    selectIcdsBlock,
    selectIcdsProject,
    selectMission,
    selectZone
  ]);

  // Trigger handleGrpName whenever dependencies change
  useEffect(() => {
    if (grouptype) {
      handleGrpName();
    }
  }, [
    grouptype,
    selectedSubCategory,
    selectedschoolType,
    selectSahodaya,
    selecteduDistrict,
    selecteduSubDistrict,
    selectIcdsBlock,
    selectIcdsProject,
    selectMission,
    selectZone,
    handleGrpName
  ]);





  useEffect(() => {
    async function fetchFilterData() {

      const payload = {
        sourceId: club != "" ? parseInt(clubs.find((item) => item.name === club)?.id!) : null,

        countryId: countries.find((item) => item.cntry_name === selectedCntry)?.cntry_id,
        stateId: states.find((item) => item.st_name === selectedState)?.st_id,
        districtId: districts.find((item) => item.dis_name === selectedDistrict)?.dis_id,
        corporationId: corporation.find((item) => item.cop_name === selectedCorp)?.cop_id,
        lsgdId: lsgd.find((item) => item.lsg_name === selectedLsgd)?.lsg_id,
        wardNo: parseInt(selectedWard),
        groupTypeId: category.find((item) => item.group_type === grouptype)?.id,
        schoolTypeId: schoolType.find((item) => item.type_name === selectedschoolType)?.id,
        subCategoryId: subcategoryOptions.find((item) => item.gp_cat_name === selectedSubCategory)?.gp_cat_id,
        sahodayaId: sahodaya.find((item) => item.sahodaya_name === selectSahodaya)?.sahodaya_id,
        eduDistrictId: eduDistrict.find((item) => item.edu_district === selecteduDistrict)?.edu_district_id,
        eduSubDistrictId: eduSubDistrict.find((item) => item.edu_sub_district_name === selecteduSubDistrict)?.edu_sub_district_id,
        blockId: icdsBlock.find((item) => item.block_name === selectIcdsBlock)?.icds_block_id,
        projectId: icdsProject.find((item) => item.project_name === selectIcdsProject)?.project_id,
        chapterId: missionChapter.find((item) => item.chapter_name === selectMission)?.chapter_id,
        zoneId: missionZone.find((item) => item.zone_name === selectZone)?.zone_id,
        groupId: grpName.find((item) => item.gp_name === selectedgrpName)?.gp_id,
      }
      setFilterData(payload);

      const response = await axios.post(
        `${apiURL}/admin/adminUploads?page=${currentPage}&limit=${itemsPerPage}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      try {
        if (response.data.success && response.status !== 203) {
          setRowData(response.data.Uploads);
          setTotalcount(response.data.totalCount);
          setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage));
        } else {
          setRowData([]);
          setTotalcount("0");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchFilterData();
  }, [category, club, clubs, corporation, countries, currentPage, districts, eduDistrict, eduSubDistrict, grouptype, grpName, icdsBlock, icdsProject, lsgd, missionChapter, missionZone, sahodaya, schoolType, selectIcdsBlock, selectIcdsProject, selectMission, selectSahodaya, selectZone, selectedCntry, selectedCorp, selectedDistrict, selectedLsgd, selectedState, selectedSubCategory, selectedWard, selectedgrpName, selectedschoolType, selecteduDistrict, selecteduSubDistrict, states, subcategoryOptions, token]);


  return (
    <div className=" bg-slate-100">
      <button
        className="text-white m-3 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"

        onClick={handleExportToExcel}
      >
        Export To Excel
      </button>
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="flex flex-col w-full sm:w-[48%] lg:w-[32%] max-w-[300px]">
          <label>User Id</label>
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
        <div className="flex flex-col w-full sm:w-[48%] lg:w-[32%] max-w-[300px]">
          <label>Tree No</label>
          <div className="flex mb-3">
            <input
              className="border px-2 h-10 text-sm border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 "
              value={treeno}
              onChange={(e) => setTreeNo(e.target.value)}
              type="number"
            />
            <button
              className="text-white ml-2 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
              onClick={() => handleFilterTreeNo(treeno)}
            >
              Search
            </button>
          </div>
        </div>
        <div className="flex flex-col w-full sm:w-[48%] lg:w-[32%] max-w-[300px]">
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
        <div className="flex flex-col w-full sm:w-[48%] lg:w-[32%] max-w-[300px]">
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
        <div className="flex flex-col w-full sm:w-[48%] lg:w-[32%] max-w-[300px]">
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
      </div>
      {/* country section  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Country Field */}
        <div className="flex flex-col mb-3 w-full">
          <label htmlFor="groupFilter" className="text-sm font-medium">
            Country:
          </label>
          <select
            id="groupFilter"
            value={selectedCntry}
            onChange={handleFilterChangeCntry}
            className="border border-gray-300 rounded p-1 w-full"
          >
            <option value="">Choose Country</option>
            {countries.map((country) => (
              <option key={country.cntry_id} value={country.cntry_name}>
                {country.cntry_name}
              </option>
            ))}
          </select>
        </div>

        {/* State Field (Visible if selected country is India) */}
        {selectedCntry === "India" && (
          <div className="flex flex-col mb-3 w-full">
            <label htmlFor="stateFilter" className="text-sm font-medium">
              State:
            </label>
            <select
              id="stateFilter"
              value={selectedState}
              onChange={handleFilterChangeState}
              className="border border-gray-300 rounded p-1 w-full"
            >
              <option value="">Choose State</option>
              {states.map((state) => (
                <option key={state.st_id} value={state.st_name}>
                  {state.st_name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* District Field (Visible if selected state is Kerala) */}
        {selectedState === "Kerala" && (
          <div className="flex flex-col mb-3 w-full">
            <label htmlFor="districtFilter" className="text-sm font-medium">
              District:
            </label>
            <select
              id="districtFilter"
              value={selectedDistrict}
              onChange={handleFilterChangeDistrict}
              className="border border-gray-300 rounded p-1 w-full"
            >
              <option value="">Choose District</option>
              {districts.map((district) => (
                <option key={district.dis_id} value={district.dis_name}>
                  {district.dis_name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Corporation Field (Visible if a district is selected) */}
        {selectedDistrict && (
          <div className="flex flex-col mb-3 w-full">
            <label htmlFor="corpFilter" className="text-sm font-medium">
              Block:
            </label>
            <select
              id="corpFilter"
              value={selectedCorp}
              onChange={handleFilterChangeCorp}
              className="border border-gray-300 rounded p-1 w-full"
            >
              <option value="">Choose Block</option>
              {corporation.map((corp) => (
                <option key={corp.cop_id} value={corp.cop_name}>
                  {corp.cop_name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Lsgd Field (Visible if a corporation is selected) */}
        {selectedDistrict && (
          <div className="flex flex-col mb-3 w-full">
            <label htmlFor="lsgdFilter" className="text-sm font-medium">
              Lsgd:
            </label>
            <select
              id="lsgdFilter"
              value={selectedLsgd}
              onChange={handleFilterChangeLsgd}
              className="border border-gray-300 rounded p-1 w-full"
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

        {/* Ward Field (Visible if an Lsgd is selected) */}
        {selectedDistrict && (
          <div className="flex flex-col mb-3 w-full">
            <label className="text-sm font-medium">Ward No</label>
            <div className="flex space-x-2">
              <input
                className="border px-2 h-10 text-sm border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 w-full"
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
              />
              {/* <button
                className="text-white text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
                onClick={() => handleFilterChangeWard(selectedWard)}
              >
                Search
              </button> */}
            </div>
          </div>
        )}
      </div>


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
      {grouptype === 'Educational Institution' && (
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
      {selectedschoolType === 'CBSE' && selectedSubCategory !== 'College' && grouptype === 'Educational Institution' && (
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
      {(selectedschoolType === 'General Education' && selectedSubCategory !== 'College') && grouptype === 'Educational Institution' && (
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
      {selectedschoolType === 'ICDS' && selectedSubCategory !== 'College' && grouptype === 'Educational Institution' && (
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
      {selectedSubCategory !== 'College' && selectedschoolType === 'Malayalam Mission' && grouptype === 'Educational Institution' && (
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

      <div className="flex items-center mb-3 space-x-2">
        <label htmlFor="groupFilter" className="text-sm font-medium">
          Group Name :
        </label>
        <select
          id="groupFilter"
          value={selectedgrpName}
          onChange={handleFilterGrpName}
          className="border border-gray-300 rounded p-1"
        >
          <option value="">Select Group Name</option>

          {grpName.map((c) => (
            <option key={c.gp_id} value={c.gp_name}>
              {c.gp_name}
            </option>
          ))}
        </select>
      </div>



      <div className="flex items-center mb-3 space-x-2">
        <label htmlFor="groupFilter" className="text-sm font-medium">
          Source :
        </label>
        <select
          id="groupFilter"
          value={club}
          onChange={handleFilterClub}
          className="border border-gray-300 rounded p-1"
        >
          <option value="">Select Source Name</option>

          {clubs.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-center font-bold">Total Count : {totalcount}</div>

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

      {/* <div className="flex justify-center items-center space-x-2 my-4">
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
      </div> */}
    </div>
  );
};
export default GridExample;
