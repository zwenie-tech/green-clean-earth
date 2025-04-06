"use client";
import React, { useState, useEffect, useCallback } from 'react';
import NavigationBar from '@/components/navigationBar';
import Footer from '@/components/footer';
import { useForm } from "react-hook-form";
import { apiURL, imageURL } from '@/app/requestsapi/request';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import axios from 'axios';
import { ArrowDown, ArrowUp, Trash2, LinkIcon, ExternalLink } from 'lucide-react';
import PaginationComponent from '../PageComponent';
interface Acivitylist {
  personal_activity_id: number,
  login_id: number,
  participant_name: string,
  activity_category_id: number,
  activity_title: string,
  activity_description: string,
  activity_social_media_link: string,
  activity_likes: string,
  activity_views: string,
  activity_value: string,
  activity_on: string,
  earnings: number,
  gp_name: string,
  us_name:string,
  activity_category: string,
  gp_id: number,
  group_type: string,
  co_ord_name: string,
}

type Country = {
  cntry_id: string;
  cntry_name: string;
}

type State = {
  st_id: string;
  st_name: string;
}

type District = {
  dis_id: string;
  dis_name: string;
}

type Category = {
  id: string;
  group_type: string;
}

type Lsgd = {
  lsg_id: string;
  lsg_name: string;
}

type Corp = {
  cop_id: string;
  cop_name: string;
}

type GrpName = {
  gp_id: string;
  gp_name: string;
}
interface SchoolType {
  id: string;
  type_name: string;
}
interface SubCategory {
  gp_cat_id: string;
  gp_cat_name: string;
}
interface EduDistrict {
  edu_district_id: string;
  edu_district: string;
}
interface Sahodaya {
  sahodaya_id: string;
  sahodaya_name: string;
}

interface EduSubDistrict {
  edu_sub_district_id: string;
  edu_sub_district_name: string;
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

interface ActivityCategory {
  activity_category: string;
  activity_category_id: string;
}


const ActivityList = () => {
  const [categories, setCategories] = useState<{ [key: number]: string }>({});
  const [actcategories, setActCategories] = useState<ActivityCategory[]>([]);
  const [activitylist, setActivityList] = useState<Acivitylist[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [lsgd, setLsgd] = useState<Lsgd[]>([]);
  const [corporation, setCorporation] = useState<Corp[]>([]);
  const [grpName, setGrpName] = useState<GrpName[]>([]);

  const [missionZone, setMissionZone] = useState<MissionZone[]>([]);
  const [selectZone, setSelectedZone] = useState('');
  const [missionChapter, setMissionChapter] = useState<MissionChapter[]>([]);
  const [selectMission, setSelectedMission] = useState('');
  const [icdsProject, setIcdsProject] = useState<IcdsProject[]>([]);
  const [selectIcdsProject, setSelectIcdsProject] = useState('');
  const [icdsBlock, setIcdsBlock] = useState<IcdsBlock[]>([]);
  const [selectIcdsBlock, setSelectIcdsBlock] = useState('');
  const [sahodaya, setSahodaya] = useState<Sahodaya[]>([]);
  const [selectSahodaya, setSelectSahodaya] = useState('');
  const [eduDistrict, setEduDistrict] = useState<EduDistrict[]>([]);
  const [eduSubDistrict, setEduSubDistrict] = useState<EduSubDistrict[]>([]);
  const [schoolType, setSchoolType] = useState<SchoolType[]>([]);
  const [selectschoolType, setSelectschoolType] = useState('');
  const [selectMissionarea, setSelectMissionarea] = useState('');
  const [selecteduDistrict, setSelecteduDistrict] = useState('');
  const [selecteduSubDistrict, setSelecteduSubDistrict] = useState('');
  const [subcategoryOptions, setSubCategoryOptions] = useState<SubCategory[]>([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filterData, setFilterData] = useState({});
  const [orderdir1, setOrderDir1] = useState("DESC");
  const [orderdir2, setOrderDir2] = useState("DESC");
  const [orderdir3, setOrderDir3] = useState("DESC");
  const [orderdir4, setOrderDir4] = useState("DESC");
  const [orderfield, setOrderfield] = useState("");

  const [selectedCountryGrp, setSelectedCountryGrp] = useState("");
  const [selectedStateGrp, setSelectedStateGrp] = useState("");
  const [selectedDistrictGrp, setSelectedDistrictGrp] = useState("");

  const [selectedCorp, setSelectedCorp] = useState("");
  const [selectedLsgd, setSelectedLsgd] = useState("");
  const [selectedGrpType, setSelectedGrpType] = useState("new");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [wardNo, setWardNo] = useState("");
  const [treeNo, setTreeNo] = useState("");
  const [totalCount, setTotalCount] = useState("");
  const [coName, setConame] = useState("");
  const [Phone, setPhone] = useState("");
  const [grpId, setGrpId] = useState("");
  const [selectedgrpName, setSelectedGrpName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const formPersonal = useForm({
    defaultValues: {
      coname: '',
      phoneNumber: '',
      activity_category:''
    },
  });
  const formCountry = useForm({
    defaultValues: {
      country: '',
      state: '',
      district: '',
      corporation: '',
      lsg: '',
      wardNo: '',
      city: '',
    },
  });
  const form = useForm({
    defaultValues: {
      grptype: '',
      grpid: '',
      subCategory: '',
      schooltype: '',
      missionchapter: '',
      missionarea: '',
      missionzone: '',
      country: '',
      state: '',
      district: '',
      sahodaya: '',
      icdsblock: '',
      icdsproject: '',
      edudistrict: '',
      edusubdistrict: '',
    },
  });

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
    const handleCbse = async () => {
      if (selectschoolType === 'CBSE' && selectedStateGrp) {
        try {
          const st_id = states.find((item) => item.st_name === selectedStateGrp)?.st_id;
          const response = await axios.get(`${apiURL}/sahodaya/${st_id}`);
          setSahodaya(response.data.sahodayaList);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      if (selectschoolType === 'ICDS' && selectedDistrictGrp) {

        try {
          const dis_id = districts.find((item) => item.dis_name === selectedDistrictGrp)?.dis_id;


          const response = await axios.get(`${apiURL}/icdsBlock/${dis_id}`);

          setIcdsBlock(response.data.icdsBlockList);
        } catch (error) {
          console.error("Error fetching data:", error);
        }

      }
      if (selectschoolType === 'Malayalam Mission' && selectMissionarea) {

        try {
          const response = await axios.get(`${apiURL}/malayalamMissionChapter/${selectMissionarea}`);
          setMissionChapter(response.data.chapterList);
        } catch (error) {
          console.error("Error fetching data:", error);
        }

      }
    };
    handleCbse();
  }, [districts, selectschoolType, states, selectMissionarea, selectedStateGrp, selectedDistrictGrp]);

  const handleEduDistrict = async (e: any) => {
    try {
      const eduid = eduDistrict.find((item) => item.edu_district === e)?.edu_district_id
      const responseedusubdistrict = await axios.get(`${apiURL}/eduSubDistrict/${eduid}`);
      setEduSubDistrict(responseedusubdistrict.data.eduSubDistrict);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

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
  useEffect(() => {
    async function fetchfirstData() {
      if (Object.keys(filterData).length === 0 && orderfield == "") {
        try {
          const response = await fetch(`${apiURL}/activity/all?page=${currentPage}&limit=${itemsPerPage}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            }
          });

          if (!response.ok) {

            throw new Error("Network response was not ok");
          }
          try {
            const result = await response.json();
            console.log(result.activity)
            setTotalPages(Math.ceil(result.total / itemsPerPage));
            setTotalCount(result.total);
            setActivityList(result.activity);
          } catch {
            setActivityList([]);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    }
    fetchfirstData();
  }, [currentPage, filterData, orderfield]);

  useEffect(() => {
    async function fetchInitialData() {
      const countryResponse = await fetch(`${apiURL}/country`);
      const countryData = await countryResponse.json();
      setCountries(countryData.country);

      

    }
    fetchInitialData();
  }, [currentPage]);

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
    async function fetchData() {
      const categoryResponse = await fetch(`${apiURL}/category`);
      const categoryData = await categoryResponse.json();
      setCategory(categoryData.category);
    }
    fetchData();
  }, []);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiURL}/activity_category`);
        const categoriesData = response.data.activity_category;
        const categoriesMap = categoriesData.reduce((acc: any, category: any) => {
          acc[category.activity_category_id] = category.activity_category;
          return acc;
        }, {});
        console.log(categoriesData)

        setActCategories(categoriesData);
        setCategories(categoriesMap);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  // useEffect(() => {
  //   async function fetchData() {
  //     if (selectedGrpType) {
  //       const groupId = category.find((item) => item.group_type === selectedGrpType)?.id;
  //       const Response = await axios.get(`${apiURL}/common/groupName/${groupId}`);
  //       setGrpName(Response.data.stateMapData);

  //     }
  //   }
  //   fetchData();
  // }, [category, grpName, selectedGrpType]);

  useEffect(() => {
    async function fetchStates() {
      if (selectedCountry === "India" || selectedCountryGrp === "India") {
        const stateResponse = await fetch(`${apiURL}/state`);
        const stateData = await stateResponse.json();
        setStates(stateData.state);
      } else {
        setStates([]);
        setSelectedState("");
      }
      setDistricts([]);
      setCorporation([]);
      setLsgd([]);
      setSelectedDistrict("");
      setSelectedCorp("");
      setSelectedLsgd("");
      setWardNo("");
    }
    fetchStates();
  }, [selectedCountry, selectedCountryGrp]);

  useEffect(() => {
    async function fetchDistricts() {
      if ((selectedCountry === "India" && selectedState === "Kerala") || (selectedCountryGrp === "India" && selectedStateGrp === "Kerala")) {
        const districtResponse = await fetch(`${apiURL}/district`);
        const districtData = await districtResponse.json();
        setDistricts(districtData.district);
      } else {
        setDistricts([]);
      }
      setCorporation([]);
      setLsgd([]);
      setSelectedDistrict("");
      setSelectedCorp("");
      setSelectedLsgd("");
      setWardNo("");
    }
    fetchDistricts();
  }, [selectedCountry, selectedCountryGrp, selectedState, selectedStateGrp]);

  useEffect(() => {
    async function fetchCorpData() {
      if (selectedCountry === "India" && selectedState === "Kerala" && selectedDistrict) {
        const dist_id = districts.find((item) => item.dis_name === selectedDistrict)?.dis_id;
        const corpResponse = await fetch(`${apiURL}/corporation/${dist_id}`);
        const corpData = await corpResponse.json();
        setCorporation(corpData.corporation);
      } else {
        setCorporation([]);
      }
      setLsgd([]);
      setSelectedCorp("");
      setSelectedLsgd("");
      setWardNo("");
    }
    fetchCorpData();
  }, [selectedCountry, selectedState, selectedDistrict, districts]);

  useEffect(() => {
    async function fetchLsgdData() {
      if (selectedCountry === "India" && selectedState === "Kerala" && selectedCorp) {
        const corp_id = corporation.find((item) => item.cop_name === selectedCorp)?.cop_id;
        const lsgResponse = await fetch(`${apiURL}/lsg/${corp_id}`);
        const lsgData = await lsgResponse.json();
        setLsgd(lsgData.lsg);
      } else {
        setLsgd([]);
      }
      setSelectedLsgd("");
      setWardNo("");
    }
    fetchLsgdData();
  }, [selectedCountry, selectedState, selectedCorp, corporation]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    setSelectedCountry(selectedCountry);
    setSelectedState("");
    setSelectedDistrict("");
    setSelectedCorp("");
    setSelectedLsgd("");
    setWardNo("");
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedState = e.target.value;
    setSelectedState(selectedState);
    setSelectedDistrict("");
    setSelectedCorp("");
    setSelectedLsgd("");
    setWardNo("");
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDistrict = e.target.value;
    setSelectedDistrict(selectedDistrict);
    setSelectedCorp("");
    setSelectedLsgd("");
    setWardNo("");
  };

  const handleCorpChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCorp = e.target.value;
    setSelectedCorp(selectedCorp);
    setSelectedLsgd("");
    setWardNo("");
  };

  useEffect(() => {
    const onDataSubmit = async () => {
      if (Object.keys(filterData).length != 0 && orderfield == "") {
        try {

          const response = await fetch(`${apiURL}/activity/all?page=${currentPage}&limit=${itemsPerPage}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(filterData),
          });


          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          try {
            const result = await response.json();
            setTotalPages(Math.ceil(result.total / itemsPerPage));

            setTotalCount(result.total);
            setActivityList(result.activity);

          } catch {
            setTotalCount("0");
            setTotalPages(1);
            setActivityList([]);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };
    onDataSubmit();
  }, [currentPage, filterData, orderfield]);


  function sort(dir: string, field: string) {
    setOrderfield(field);
    field === "gp_name" ? setOrderDir1(dir) : "";
    field === "activity_on" ? setOrderDir2(dir) : "";
    field === "earnings" ? setOrderDir3(dir) : "";
    field === "activity_value" ? setOrderDir4(dir) : "";

  }
  useEffect(() => {
    const fetchClass = async () => {
      if (orderfield != "") {
        const payload = {
          ...filterData,
          orderByField: orderfield,
          orderDirection: orderfield === "gp_name" ? orderdir1
            : orderfield === "activity_on" ? orderdir2
              : orderfield === "earnings" ? orderdir3
                : orderfield === "activity_value" ? orderdir4 : ""
        }

        const response = await axios.post(
          `${apiURL}/activity/all?page=${currentPage}&limit=${itemsPerPage}`,
          payload,
          {
            headers: {

              "Content-Type": "application/json",
            },
          }
        );
        try {
          if (response.data.success && response.status !== 203) {
            const result = await response.data;
            setTotalPages(Math.ceil(result.total / itemsPerPage));

            setTotalCount(result.total);
            setActivityList(result.activity);
          } else {
            setTotalCount("0");
            setTotalPages(1);
            setActivityList([]);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };
    fetchClass();
  }, [currentPage, filterData, orderdir1, orderdir2, orderdir3, orderdir4, orderfield]);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Trigger data fetch with the updated page number
      // onDataSubmit(filterData, newPage);
    }
  };

  const handleFilterGrpName = (e: any) => {

    if (e.target.value != "") {
      setSelectedGrpName(e.target.value);
      // fetchFilteredGrpName(e.target.value);
      // setCurrentPage(1); // Reset to first page
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
    if (selectedGrpType) {
      const groupId = category.find((item) => item.group_type === selectedGrpType)?.id;
      const subcatid = subcategoryOptions.find((item) => item.gp_cat_name === selectedSubCategory)?.gp_cat_id;
      const schooltypeid = schoolType.find((item) => item.type_name === selectschoolType)?.id;
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
  }, [selectedGrpType, category, subcategoryOptions, schoolType, sahodaya, eduDistrict, eduSubDistrict, icdsBlock, icdsProject, missionChapter, missionZone, selectedSubCategory, selectschoolType, selectSahodaya, selecteduDistrict, selecteduSubDistrict, selectIcdsBlock, selectIcdsProject, selectMission, selectZone]);

  // Trigger handleGrpName whenever dependencies change
  useEffect(() => {
    if (selectedGrpType) {
      handleGrpName();
    }
  }, [
    selectedGrpType,
    selectedSubCategory,
    selectschoolType,
    selectSahodaya,
    selecteduDistrict,
    selecteduSubDistrict,
    selectIcdsBlock,
    selectIcdsProject,
    selectMission,
    selectZone,
    handleGrpName
  ]);

  const onSubmit = async (data: any) => {
    const dataWithIds: any = {};
    treeNo !== "" ? dataWithIds.treeNumber = parseInt(treeNo) : '';
    data.coname !== "" ? dataWithIds.name = data.coname : '';
    data.phoneNumber !== "" ? dataWithIds.phoneNumber = data.phoneNumber : '';
    data.activity_category !== "" ? dataWithIds.activityCategoryId = actcategories.find((item) => item.activity_category === data.activity_category)?.activity_category_id  : '';


    if (selectedGrpType !== "") {
      selectedGrpType ? dataWithIds.groupTypeId = parseInt(category.find((item) => item.group_type === selectedGrpType)?.id!) : null;
      selectedgrpName !== "" ? dataWithIds.groupId = parseInt(grpName.find((item) => item.gp_name === selectedgrpName)?.gp_id!) : '';

    }

    if (selectedCountry !== "") {
      dataWithIds.countryId = countries.find((item) => item.cntry_name === selectedCountry)?.cntry_id
    }

    if (selectedCountry === "India") {
      dataWithIds.stateId = states.find((item) => item.st_name === selectedState)?.st_id || null;

      if (selectedState === "Kerala") {
        dataWithIds.districtId = districts.find((item) => item.dis_name === selectedDistrict)?.dis_id || null;
        dataWithIds.corporationId = corporation.find((item) => item.cop_name === selectedCorp)?.cop_id || null;
        dataWithIds.lsgdId = lsgd.find((item) => item.lsg_name === selectedLsgd)?.lsg_id || null;
        dataWithIds.wardNo = data.wardNo ? parseInt(data.wardNo) || null : null;
      }
    }

    selectedSubCategory ? dataWithIds.subCategoryId = subcategoryOptions.find((item) => item.gp_cat_name === selectedSubCategory)?.gp_cat_id || null : null;
    selectschoolType ? dataWithIds.schoolTypeId = schoolType.find((item) => item.type_name === selectschoolType)?.id || null : null;
    selecteduDistrict ? dataWithIds.eduDistrictId = eduDistrict.find((item) => item.edu_district === selecteduDistrict)?.edu_district_id || null : null;
    selecteduSubDistrict ? dataWithIds.eduSubDistrictId = eduSubDistrict.find((item) => item.edu_sub_district_name === selecteduSubDistrict)?.edu_sub_district_id || null : null;
    selectSahodaya ? dataWithIds.sahodayaId = sahodaya.find((item) => item.sahodaya_name === selectSahodaya)?.sahodaya_id || null : null;
    selectIcdsBlock ? dataWithIds.blockId = icdsBlock.find((item) => item.block_name === selectIcdsBlock)?.icds_block_id || null : null;
    selectIcdsProject ? dataWithIds.projectId = icdsProject.find((item) => item.project_name === selectIcdsProject)?.project_id || null : null;
    selectMission ? dataWithIds.chapterId = missionChapter.find((item) => item.chapter_name === selectMission)?.chapter_id || null : null;
    selectZone ? dataWithIds.zoneId = missionZone.find((item) => item.zone_name === selectZone)?.zone_id || null : null;
    console.log(dataWithIds)
    setFilterData(dataWithIds);


  };

  return (
    <>
      <NavigationBar />
      <div className='relative flex justify-center p-4'>
        <h1 className='text-3xl text-center mt-2 font-bold'>Activities</h1>
      </div>

      {/* Search by Person Wise */}
      <div className='search1'>
        <h1 className='text-lg text-center m-3'>Search by Person Wise</h1>
        <div className="mx-5 md:mx-9 lg:mx-16 border-2 border-gray-300 shadow-lg flex bg-gray-100 rounded-lg justify-center items-cente">
          <Form {...formPersonal}>
            <form onSubmit={formPersonal.handleSubmit(onSubmit)} noValidate className="space-y-8 w-full md:w-2/3">
              <div className="flex m-2 flex-col gap-4 md:flex-row md:m-5 justify-center items-center">
                <FormField
                  control={formPersonal.control}
                  name="coname"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-2/3 md:w-1/3">
                      <FormControl>
                        <Input {...field} placeholder="Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formPersonal.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-2/3 md:w-1/3">
                      <FormControl>
                        <Input type="number" {...field} placeholder="Phone Number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                    control={formPersonal.control}
                    name="activity_category"
                    render={({ field }) => (
                      <FormItem className="flex-1 w-2/3 md:w-1/3">
                        <Select onValueChange={(value) => {
                          field.onChange(value);
                          // setSelectedDistrict(value);
                        }} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose activity category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {actcategories.map((c) => (
                              <SelectItem key={c.activity_category_id} value={c.activity_category}>
                                {c.activity_category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                <Button type="submit" className="w-full md:w-1/3 bg-primary mx-auto text-center">
                  Search
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>


      {/* Search by Country Wise */}
      <div className='search1'>
        <h1 className='text-lg text-center m-3'>Search by Country Wise</h1>
        <div className="mx-5 md:mx-9 lg:mx-16 border-2 border-gray-300 shadow-lg bg-gray-100 rounded-lg p-4 justify-center items-cente">
          <Form {...formCountry}>
            <form onSubmit={formCountry.handleSubmit(onSubmit)} noValidate className="space-y-4 w-full">
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center'>
                <FormField
                  control={formCountry.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Select onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedCountry(value);
                      }} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.cntry_id} value={country.cntry_name}>
                              {country.cntry_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {selectedCountry === 'India' && (
                  <FormField
                    control={formCountry.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <Select onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedState(value);
                        }} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {states.map((state) => (
                              <SelectItem key={state.st_id} value={state.st_name}>
                                {state.st_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {selectedState === 'Kerala' && (
                  <FormField
                    control={formCountry.control}
                    name="district"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <Select onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedDistrict(value);
                        }} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a district" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {districts.map((district) => (
                              <SelectItem key={district.dis_id} value={district.dis_name}>
                                {district.dis_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {selectedState !== 'Kerala' && selectedCountry === 'India' && (
                  <FormField
                    control={formCountry.control}
                    name="district"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input {...field} placeholder='District' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {selectedState === 'Kerala' && (
                  <FormField
                    control={formCountry.control}
                    name="corporation"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <Select onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedCorp(value);
                        }} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a block" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {corporation.map((corp) => (
                              <SelectItem key={corp.cop_id} value={corp.cop_name}>
                                {corp.cop_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {selectedState === 'Kerala' && (
                  <FormField
                    control={formCountry.control}
                    name="lsg"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <Select onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedLsgd(value);
                        }} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a LSG" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {lsgd ? lsgd.map((lsg) => (
                              <SelectItem key={lsg.lsg_id} value={lsg.lsg_name}>
                                {lsg.lsg_name}
                              </SelectItem>
                            )) : <SelectItem key={1} value={'lsg'}>
                              Choose a LSG
                            </SelectItem>}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {selectedState === 'Kerala' && (
                  <FormField
                    control={formCountry.control}
                    name="wardNo"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input type="number" {...field} placeholder='Ward Number' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                )}
                {selectedCountry != 'India' && (
                  <FormField
                    control={formCountry.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input {...field} placeholder='City / Province' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <Button type="submit" className="w-full bg-primary mx-auto text-center">
                  Search
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Search by Group Wise */}
      <div className='search1 mb-5'>
        <h1 className='text-lg text-center m-3'>Search by Group Wise</h1>
        <div className="mx-5 md:mx-9 lg:mx-16 border-2 border-gray-300 shadow-lg bg-gray-100 rounded-lg p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4 w-full">
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                <FormField
                  control={form.control}
                  name="grptype"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Select onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedGrpType(value);
                        handleGrpName();

                      }} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a group type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {category.map((c, i) => (
                            <SelectItem key={c.id} value={c.group_type}>
                              {c.group_type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedGrpType == 'Educational Institution' && selectedSubCategory !== 'College' && (
                  <FormField
                    control={form.control}
                    name="schooltype"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <Select onValueChange={(value) => {
                          field.onChange(value);
                          setSelectschoolType(value);
                          value === 'CBSE' ? setSelectedCountryGrp('India') : ''
                          value === 'General Education' || 'ICDS' ? setSelectedCountryGrp('India') : ''
                          value === 'General Education' || 'ICDS' ? setSelectedStateGrp('Kerala') : ''
                        }} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a school type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {schoolType.map((s) => (
                              <SelectItem key={s.id} value={s.type_name}>
                                {s.type_name}
                              </SelectItem>
                            ))}

                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {selectedSubCategory !== 'College' && selectschoolType === 'Malayalam Mission' && (
                  <>
                    <FormField
                      control={form.control}
                      name="missionarea"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <Select onValueChange={(value) => {
                            field.onChange(value);
                            setSelectMissionarea(value);

                          }} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose mission area" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>

                              <SelectItem key='1' value="1">
                                Global
                              </SelectItem>
                              <SelectItem key='2' value="2">
                                India
                              </SelectItem>


                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="missionchapter"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <Select onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedMission(value);
                            handleChapter(value);
                          }} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a mission chapter" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {missionChapter && missionChapter.map((e) => (
                                <SelectItem key={e.chapter_id} value={e.chapter_name}>
                                  {e.chapter_name}
                                </SelectItem>
                              ))}

                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="missionzone"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <Select onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedZone(value);

                          }} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a mission zone" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {missionZone && missionZone.map((e) => (
                                <SelectItem key={e.zone_id} value={e.zone_name}>
                                  {e.zone_name}
                                </SelectItem>
                              ))}

                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {selectschoolType === 'CBSE' && selectedSubCategory !== 'College' && (
                  <>

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <Select onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedStateGrp(value);
                          }} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {states.map((state) => (
                                <SelectItem key={state.st_id} value={state.st_name}>
                                  {state.st_name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sahodaya"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <Select onValueChange={(value) => {
                            field.onChange(value);
                            setSelectSahodaya(value);
                          }} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a sahodaya" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {sahodaya && sahodaya.map((s) => (
                                <SelectItem key={s.sahodaya_id} value={s.sahodaya_name}>
                                  {s.sahodaya_name}
                                </SelectItem>
                              ))}

                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                  </>)}

                {selectschoolType === 'ICDS' && selectedSubCategory !== 'College' && (
                  <>

                    {selectedStateGrp === 'Kerala' && (
                      <FormField
                        control={form.control}
                        name="district"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <Select onValueChange={(value) => {
                              field.onChange(value);
                              setSelectedDistrictGrp(value);
                            }} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose a district" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {districts.map((district) => (
                                  <SelectItem key={district.dis_id} value={district.dis_name}>
                                    {district.dis_name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <FormField
                      control={form.control}
                      name="icdsblock"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <Select onValueChange={(value) => {
                            field.onChange(value);
                            handleIcds(value);
                            setSelectIcdsBlock(value);
                          }} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a icds block" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {icdsBlock && icdsBlock.map((e) => (
                                <SelectItem key={e.icds_block_id} value={e.block_name}>
                                  {e.block_name}
                                </SelectItem>
                              ))}

                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="icdsproject"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <Select onValueChange={(value) => {
                            field.onChange(value);

                            setSelectIcdsProject(value);
                          }} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a icds project" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {icdsProject && icdsProject.map((e) => (
                                <SelectItem key={e.project_id} value={e.project_name}>
                                  {e.project_name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>)}


                {(selectschoolType === 'General Education' && selectedSubCategory !== 'College') && (
                  <>
                    {selectedStateGrp === 'Kerala' && (
                      <FormField
                        control={form.control}
                        name="district"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <Select onValueChange={(value) => {
                              field.onChange(value);
                              setSelectedDistrictGrp(value);
                            }} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose a district" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {districts.map((district) => (
                                  <SelectItem key={district.dis_id} value={district.dis_name}>
                                    {district.dis_name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <FormField
                      control={form.control}
                      name="edudistrict"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <Select onValueChange={(value) => {
                            field.onChange(value);
                            handleEduDistrict(value);
                            setSelecteduDistrict(value);
                          }} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a education district" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {eduDistrict && eduDistrict.map((e) => (
                                <SelectItem key={e.edu_district_id} value={e.edu_district}>
                                  {e.edu_district}
                                </SelectItem>
                              ))}

                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="edusubdistrict"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <Select onValueChange={(value) => {
                            field.onChange(value);

                            setSelecteduSubDistrict(value);
                          }} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a education subdistrict" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {eduSubDistrict && eduSubDistrict.map((e) => (
                                <SelectItem key={e.edu_sub_district_id} value={e.edu_sub_district_name}>
                                  {e.edu_sub_district_name}
                                </SelectItem>
                              ))}

                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                {selectedGrpType == 'Educational Institution' &&
                  <FormField
                    control={form.control}
                    name="subCategory"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <Select onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedSubCategory(value);
                        }} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a sub category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {subcategoryOptions.map((category) => (
                              <SelectItem key={category.gp_cat_id} value={category.gp_cat_name}>
                                {category.gp_cat_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                }
                {/* Group Name Select */}

                <div className="w-full sm:col-span-2 md:col-span-1">
                  <select
                    id="groupFilter"
                    value={selectedgrpName}
                    onChange={handleFilterGrpName}
                    className="w-full p-2 border border-black rounded-md bg-white focus:border-2 focus:border-[#3C6E1F]"
                  >
                    <option value="">Select Group Name</option>

                    {grpName.map((c) => (
                      <option key={c.gp_id} value={c.gp_name}>
                        {c.gp_name}
                      </option>
                    ))}
                  </select>
                </div>


                <Button type="submit" className="w-full bg-primary mx-auto text-center">
                  Search
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      <div className="flex justify-center font-bold my-4">
        <p>Total Count: {totalCount}</p>
      </div>
      <div className="mx-5 md:mx-9 lg:mx-16">
        <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-gray-200 rounded-t-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left w-16 bd-2 rounded-tl-lg">SL .No</th>
                <th className="py-3 px-6 text-left flex items-center gap-2">
                  Group Name
                  {orderdir1 === "DESC" ? (
                    <span
                      onClick={() => sort("ASC", "gp_name")}
                      className={orderfield === "gp_name" ? "text-green-600" : "text-gray-400"}
                    >
                      <ArrowUp />
                    </span>
                  ) : (
                    <span
                      onClick={() => sort("DESC", "gp_name")}
                      className={orderfield === "gp_name" ? "text-green-600" : "text-gray-400"}
                    >
                      <ArrowDown />
                    </span>
                  )}
                </th>
                <th className="py-3 px-6 text-left">User Name</th>
                <th className="py-3 px-6 text-left">Chest Number</th>
                {/* <th className="py-3 px-6 text-left">
                  <div className="flex items-center gap-2">
                    Upload Date
                    {orderdir2 === "DESC" ? (
                      <span
                        className={orderfield === "activity_on" ? "text-green-600" : "text-gray-400"}
                        onClick={() => sort("ASC", "activity_on")}
                      >
                        <ArrowUp />
                      </span>
                    ) : (
                      <span
                        className={orderfield === "activity_on" ? "text-green-600" : "text-gray-400"}
                        onClick={() => sort("DESC", "activity_on")}
                      >
                        <ArrowDown />
                      </span>
                    )}
                  </div>
                </th> */}
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left w-5">Name of Activity</th>
                {/* <th className="py-3 px-6 text-left">
                  <div className="flex items-center gap-2">
                    Value
                    {orderdir4 === "DESC" ? (
                      <span
                        className={orderfield === "activity_value" ? "text-green-600" : "text-gray-400"}
                        onClick={() => sort("ASC", "activity_value")}
                      >
                        <ArrowUp />
                      </span>
                    ) : (
                      <span
                        className={orderfield === "activity_value" ? "text-green-600" : "text-gray-400"}
                        onClick={() => sort("DESC", "activity_value")}
                      >
                        <ArrowDown />
                      </span>
                    )}
                  </div>
                </th> */}
                <th className="py-3 px-6 text-left">Activity Id</th>
                <th className="py-3 px-6 text-left">User Id</th>
                <th className="py-3 px-6 text-left">
                  <div className="flex items-center gap-2">
                    Earnings
                    {orderdir3 === "DESC" ? (
                      <span
                        className={orderfield === "earnings" ? "text-green-600" : "text-gray-400"}
                        onClick={() => sort("ASC", "earnings")}
                      >
                        <ArrowUp />
                      </span>
                    ) : (
                      <span
                        className={orderfield === "earnings" ? "text-green-600" : "text-gray-400"}
                        onClick={() => sort("DESC", "earnings")}
                      >
                        <ArrowDown />
                      </span>
                    )}
                  </div>
                </th>
                <th className="py-3 px-6 text-left rounded-tr-lg">Remarks</th>

                {/* <th className="py-3 px-6 text-left">Participant Name</th>
                <th className="py-3 px-6 text-left">Chest Number</th>
                <th className="py-3 px-6 text-left flex items-center gap-2">
                  Group Name
                  {orderdir1 === "DESC" ? (
                    <span
                      onClick={() => sort("ASC", "gp_name")}
                      className={orderfield === "gp_name" ? "text-green-600" : "text-gray-400"}
                    >
                      <ArrowUp />
                    </span>
                  ) : (
                    <span
                      onClick={() => sort("DESC", "gp_name")}
                      className={orderfield === "gp_name" ? "text-green-600" : "text-gray-400"}
                    >
                      <ArrowDown />
                    </span>
                  )}
                </th>
                <th className="py-3 px-6 text-left">
                  <div className="flex items-center gap-2">
                    Upload Date
                    {orderdir2 === "DESC" ? (
                      <span
                        className={orderfield === "activity_on" ? "text-green-600" : "text-gray-400"}
                        onClick={() => sort("ASC", "activity_on")}
                      >
                        <ArrowUp />
                      </span>
                    ) : (
                      <span
                        className={orderfield === "activity_on" ? "text-green-600" : "text-gray-400"}
                        onClick={() => sort("DESC", "activity_on")}
                      >
                        <ArrowDown />
                      </span>
                    )}
                  </div>
                </th>
                <th className="py-3 px-6 text-left">Name of Art - Brief Description</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Views and Likes</th>
                <th className="py-3 px-6 text-left">
                  <div className="flex items-center gap-2">
                    Earnings
                    {orderdir3 === "DESC" ? (
                      <span
                        className={orderfield === "earnings" ? "text-green-600" : "text-gray-400"}
                        onClick={() => sort("ASC", "earnings")}
                      >
                        <ArrowUp />
                      </span>
                    ) : (
                      <span
                        className={orderfield === "earnings" ? "text-green-600" : "text-gray-400"}
                        onClick={() => sort("DESC", "earnings")}
                      >
                        <ArrowDown />
                      </span>
                    )}
                  </div>
                </th> */}
                </tr>
            </thead>
            <tbody>
              {activitylist && activitylist.length > 0 ? (
                activitylist.map((activity, index) => (
                  <>
                    <tr key={activity.personal_activity_id} className="border border-gray-200 hover:bg-gray-100">

                      <td className="py-3 px-6 text-left">{startIndex + index + 1}</td>
                      <td className="py-3 px-6 text-left">
                        <a 
                          href={`/group-page?gname=${activity.gp_name}&gid=${activity.gp_id}&uc=${0}&cordinator=${activity.co_ord_name}&groupType=${activity.group_type}`} 
                          className="text-black hover:underline flex items-center gap-1"
                        >
                          {activity.gp_name}
                          <LinkIcon size={16} className="text-blue-600" />
                        </a>
                      </td>
                      <td className="py-3 px-6 text-left">
                        <a 
                          href={`/user-page?u=${activity.us_name}&id=${activity.login_id}`} 
                          className="text-black hover:underline flex items-center gap-1"
                        >
                          {activity.us_name}
                          <LinkIcon size={16} className="text-blue-600" />
                        </a>
                      </td>
                      <td className="py-3 px-6 text-left">{activity.activity_description}</td>
                      <td className="py-3 px-6 text-left">{activity.activity_category}</td>
                      {/* <td className="py-3 px-6 text-left">{activity.activity_on.split("T")[0].split('-').reverse().join('-')}</td> */}
                      <td className="py-3 px-6 text-left">
                        <a 
                          href={activity.activity_social_media_link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-black hover:underline flex items-center gap-1"
                        >
                          {activity.activity_title}
                          <ExternalLink size={16} className="text-blue-600" />
                        </a>
                      </td>
                      <td className="py-3 px-6 text-left">{activity.personal_activity_id}</td>
                      <td className="py-3 px-6 text-left">{activity.login_id}</td>
                      <td className="py-3 px-6 text-left ">{activity.earnings}</td>
                      <td className="py-3 px-6 text-left">{activity.activity_views} Views, {activity.activity_likes} Likes</td>
                    </tr>
                  </>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-3 px-6 text-center">No participants data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} /> */}
      {/* {totalPages &&
      } */}
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
        <span className="text-xl">{currentPage}</span>
        <button
          className={currentPage === totalPages ? 
            "text-white text-sm py-2 px-4 bg-[#6b6767] rounded-xl shadow-lg" 
          : "text-white text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
          }
          onClick={() => {
            handlePageChange(currentPage + 1) 
          }}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div> */}
      <Footer />
    </>
  );
}

export default ActivityList;