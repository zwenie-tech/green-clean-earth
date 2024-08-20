"use client";
import React, { useEffect, useState } from "react";
import NavigationBar from "@/components/navigationBar";
import Footer from "@/components/footer";
import { apiURL, imageURL } from "@/app/requestsapi/request";
import { setgid } from "process";
import axios from "axios";

interface Participant {
  up_id: number,
  up_reg_id: number,
  up_name: string,
  up_planter: string,
  up_tree_name: string,
  up_cord_id: number,
  up_date: string,
  up_file: string,
  us_corporation: number,
  gp_name: string
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

const Participant = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
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
  const [selecteduDistrict, setSelecteduDistrict] = useState('');
  const [selecteduSubDistrict, setSelecteduSubDistrict] = useState('');
  const [subcategoryOptions, setSubCategoryOptions] = useState<SubCategory[]>([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [selectedLsgd, setSelectedLsgd] = useState("");
  const [selectedGrpType, setSelectedGrpType] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [wardNo, setWardNo] = useState("");
  const [treeNo, setTreeNo] = useState("");
  const [grpId, setGrpId] = useState("");
  const [selectedgrpName, setSelectedGrpName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const responsetype = await axios.get(`${apiURL}/schoolType`);
        setSchoolType(responsetype.data.schoolType);
        const dis_id = districts.find((item) => item.dis_name === selectedDistrict)?.dis_id;
        const responseedudistrict = dis_id ? await axios.get(`${apiURL}/eduDistrict/${dis_id}`) : null;
        responseedudistrict ? setEduDistrict(responseedudistrict.data.eduDistrict) : '';
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchClass();
  }, [districts, selectedDistrict]);

  useEffect(() => {
    const handleCbse = async () => {
      if(selectschoolType === 'CBSE'){
        try {
        const st_id = states.find((item) => item.st_name === selectedState)?.st_id;
          const response = await axios.get(`${apiURL}/sahodaya/${st_id}`);
          setSahodaya(response.data.sahodayaList);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      if(selectschoolType === 'ICDS'){
        try {
          const dis_id = districts.find((item) => item.dis_name === selectedDistrict)?.dis_id;
          const response = await axios.get(`${apiURL}/icdsBlock/${dis_id}`);
          setIcdsBlock(response.data.icdsBlockList);
        } catch (error) {
          console.error("Error fetching data:", error);
        }

      }
      if(selectschoolType === 'Malayalam Mission'){
        try {
          const response = await axios.get(`${apiURL}/malayalamMissionChapter`);
          setMissionChapter(response.data.chapterList);
        } catch (error) {
          console.error("Error fetching data:", error);
        }

      }
    };
    handleCbse();
  }, [districts, selectedDistrict, selectedState, selectschoolType, states]);

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
      const responseall = await fetch(`${apiURL}/uploads/filter?limit=100000000000`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const dataall = await responseall.json();

      setTotalPages(Math.ceil(dataall.Uploads.length / itemsPerPage));
    }
    fetchfirstData();
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {

      setCurrentPage(newPage);
    }
  }

  useEffect(() => {
    async function fetchInitialData() {
      const countryResponse = await fetch(`${apiURL}/country`);
      const countryData = await countryResponse.json();
      setCountries(countryData.country);
      try {
        const response = await fetch(`${apiURL}/uploads/filter?page=${currentPage}&limit=${itemsPerPage}`, {
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


          setParticipants(result.Uploads);
        } catch {
          setParticipants([]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
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
    async function fetchData() {
      if (selectedGrpType) {
        const groupId = category.find((item) => item.group_type === selectedGrpType)?.id;
        const Response = await fetch(`${apiURL}/common/groupName/${groupId}`);
        const Data = await Response.json();
        setGrpName(Data.stateMapData);

      }
    }
    fetchData();
  }, [category, grpName, selectedGrpType]);

  useEffect(() => {
    async function fetchStates() {
      if (selectedCountry === "India") {
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
  }, [selectedCountry]);

  useEffect(() => {
    async function fetchDistricts() {
      if (selectedCountry === "India" && selectedState === "Kerala") {
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
  }, [selectedCountry, selectedState]);

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

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dataWithIds: any = {};
    treeNo !== "" ? dataWithIds.treeNumber = parseInt(treeNo) : '';

    if (selectedGrpType !== "") {
      dataWithIds.groupTypeId = parseInt(category.find((item) => item.group_type === selectedGrpType)?.id!);
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
        dataWithIds.wardNo = wardNo ? parseInt(wardNo) || null : null;
      }
    }

        dataWithIds.subCategoryId    = subcategoryOptions ? subcategoryOptions.find((item) => item.gp_cat_name === selectedSubCategory)?.gp_cat_id || null : null;
        dataWithIds.schoolTypeId     =  schoolType ? schoolType.find((item) => item.type_name === selectschoolType)?.id || null : null;
        dataWithIds.eduDistrictId    = eduDistrict ? eduDistrict.find((item) => item.edu_district === selecteduDistrict)?.edu_district_id || null : null;
        dataWithIds.eduSubDistrictId = eduSubDistrict ? eduSubDistrict.find((item) => item.edu_sub_district_name === selecteduSubDistrict)?.edu_sub_district_id || null : null;
        dataWithIds.sahodayaId       = sahodaya ? sahodaya.find((item) => item.sahodaya_name === selectSahodaya)?.sahodaya_id || null : null;
        dataWithIds.blockId          = icdsBlock ? icdsBlock.find((item) => item.block_name === selectIcdsBlock)?.icds_block_id || null : null;
        dataWithIds.projectId        = icdsProject ? icdsProject.find((item) => item.project_name === selectIcdsProject)?.project_id || null : null;
        dataWithIds.chapterId        =  missionChapter ? missionChapter.find((item) => item.chapter_name === selectMission)?.chapter_id || null : null;
        dataWithIds.zoneId           = missionZone ? missionZone.find((item) => item.zone_name === selectZone)?.zone_id || null : null;

        console.log(dataWithIds)
    try {
      const response = await fetch(`${apiURL}/uploads/filter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataWithIds),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      try {
        const result = await response.json();
        console.log(result.Uploads)

        setParticipants(result.Uploads);
        setTreeNo('');
        setSelectedGrpType('');
        setSelectedGrpName('');
        setSelectedSubCategory('');
        setSelecteduDistrict('');
        setSelecteduSubDistrict('');
        setSelectschoolType('');
        setSelectSahodaya('');
        setSelectIcdsBlock('');
        setSelectIcdsProject('');
        setSelectedMission('');
        setSelectedZone('');
        setSelectedCountry('');
        setSelectedState('');
        setSelectedDistrict('');
        setSelectedCorp('');
        setSelectedLsgd('');
        setWardNo('');
      } catch {
        setParticipants([]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <NavigationBar />
      <div className="mt-6 mb-3">
        <h2 className="text-2xl font-bold text-center items-center text-[#3C6E1F]">Participants list</h2>
      </div>
      <form onSubmit={onSubmit}>
        <div className="flex flex-wrap p-2 md:p-4">
          <div className="w-1/2 mb-3 md:w-1/4 p-1 md:p-2">
            <label className="block ml-3 mb-1">Tree Number</label>
            <input
              type="text"
              className="w-full p-1 md:p-2 border rounded-md bg-white focus:border-2 focus:border-[#3C6E1F]"
              placeholder="Enter Tree Number"
              style={{ boxShadow: "1px 4px 5px 3px #00000040" }}
              value={treeNo}
              onChange={(e) => setTreeNo(e.target.value)}
            />
          </div>

          <div className="w-1/2 mb-3 md:w-1/3 p-1 md:p-2 bg-white">
            <label className="block ml-5 mb-1">Group Type</label>
            <select
              className="w-full p-1 md:p-2 border-0 rounded-md bg-white focus:border-2 focus:border-[#3C6E1F]"
              style={{ boxShadow: "1px 4px 5px 3px #00000040" }}
              value={selectedGrpType}
              onChange={(e) => setSelectedGrpType(e.target.value)}
            >
              <option value="">Select Group Type</option>
              {category.map((c) => (
                <option key={c.id} value={c.group_type}>
                  {c.group_type}
                </option>
              ))}
            </select>
          </div>
          {selectedGrpType !== "" && (
            <div className="w-1/2 mb-3 md:w-1/3 p-1 md:p-2 bg-white">
              <label className="block ml-5 mb-1">Group Id</label>
              <select
                className="w-full p-1 md:p-2 border-0 rounded-md bg-white focus:border-2 focus:border-[#3C6E1F]"
                style={{ boxShadow: "1px 4px 5px 3px #00000040" }}
                value={selectedgrpName}
                onChange={(e) => setSelectedGrpName(e.target.value)}
              >
                <option value="">Select Group Type</option>
                {grpName.map((c) => (
                  <option key={c.gp_id} value={c.gp_name}>
                    {c.gp_name}
                  </option>
                ))}
              </select>
            </div>

          )}

          <div className="w-1/2 mb-3 md:w-1/3 p-1 md:p-2 bg-white">
            <label className="block ml-5 mb-1">Select Sub Category</label>
            <select
              className="w-full p-1 md:p-2 border-0 rounded-md bg-white focus:border-2 focus:border-[#3C6E1F]"
              style={{ boxShadow: "1px 4px 5px 3px #00000040" }}
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
            >
              <option value="">Select Sub Category</option>
              {subcategoryOptions.map((category) => (
                <option key={category.gp_cat_id} value={category.gp_cat_name}>
                  {category.gp_cat_name}
                </option>
              ))}
            </select>
          </div>

          {selectedSubCategory !== 'College' && selectedSubCategory !== '' && (
            <div className="w-1/2 mb-3 md:w-1/3 p-1 md:p-2 bg-white">
              <label className="block ml-5 mb-1">Select School Type</label>
              <select
                className="w-full p-1 md:p-2 border-0 rounded-md bg-white focus:border-2 focus:border-[#3C6E1F]"
                style={{ boxShadow: "1px 4px 5px 3px #00000040" }}
                value={selectschoolType}
                onChange={(e) => setSelectschoolType(e.target.value)}
              >
                <option value="">Select School Type</option>
                {schoolType.map((s) => (
                  <option key={s.id} value={s.type_name}>
                    {s.type_name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedSubCategory !== 'College' && selectschoolType==='Malayalam Mission' && (
            <>
            <div className="w-1/2 mb-3 md:w-1/3 p-1 md:p-2 bg-white">
              <label className="block ml-5 mb-1">Select Mission Chapter</label>
              <select
                className="w-full p-1 md:p-2 border-0 rounded-md bg-white focus:border-2 focus:border-[#3C6E1F]"
                style={{ boxShadow: "1px 4px 5px 3px #00000040" }}
                value={selectMission}
                onChange={(e) => {
                  
                  setSelectedMission(e.target.value);
                  handleChapter(e.target.value);
                } }
              >
                <option value="">Select Mission Chapter</option>
                {missionChapter && missionChapter.map((e) => (
                                      <option key={e.chapter_id} value={e.chapter_name}>
                                        {e.chapter_name}
                                      </option>
                                    ))}
              </select>
            </div>

            <div className="w-1/2 mb-3 md:w-1/3 p-1 md:p-2 bg-white">
              <label className="block ml-5 mb-1">Select Mission Zone</label>
              <select
                className="w-full p-1 md:p-2 border-0 rounded-md bg-white focus:border-2 focus:border-[#3C6E1F]"
                style={{ boxShadow: "1px 4px 5px 3px #00000040" }}
                value={selectZone}
                onChange={(e) => {
                  
                  setSelectedZone(e.target.value);
                } }
              >
                <option value="">Select Mission Zone</option>
                {missionZone && missionZone.map((e) => (
                                        <option key={e.zone_id} value={e.zone_name}>
                                          {e.zone_name}
                                        </option>
                                      ))}
              </select>
            </div>
            </>
          )}

          



          <div className="w-1/2 mb-3 md:w-1/3 p-1 md:p-2 bg-white">
            <label className="block ml-5 mb-1">Country</label>
            <select
              className="w-full p-1 md:p-2 border-0 rounded-md bg-white focus:border-2 focus:border-[#3C6E1F]"
              style={{ boxShadow: "1px 4px 5px 3px #00000040" }}
              value={selectedCountry}
              onChange={handleCountryChange}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.cntry_id} value={country.cntry_name}>
                  {country.cntry_name}
                </option>
              ))}
            </select>
          </div>

          {((selectedCountry === "India") || (selectschoolType === 'General Education' && selectedSubCategory !== 'College')) && (
            <div className="w-1/2 mb-3 md:w-1/3 p-1 md:p-2">
              <label className="block ml-5 mb-1">State</label>
              <select
                className="w-full p-1 md:p-2 border rounded-md bg-white focus:border-2 focus:border-[#3C6E1F]"
                style={{ boxShadow: "1px 4px 5px 3px #00000040" }}
                value={selectedState}
                onChange={handleStateChange}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.st_id} value={state.st_name}>
                    {state.st_name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectschoolType === 'CBSE' && selectedSubCategory !== 'College' && (
            <div className="w-1/2 mb-3 md:w-1/3 p-1 md:p-2 bg-white">
              <label className="block ml-5 mb-1">Select Sahodaya</label>
              <select
                className="w-full p-1 md:p-2 border-0 rounded-md bg-white focus:border-2 focus:border-[#3C6E1F]"
                style={{ boxShadow: "1px 4px 5px 3px #00000040" }}
                value={selectSahodaya}
                onChange={(e) => setSelectSahodaya(e.target.value)}
              >
                <option value="">Select Sahodaya</option>
                {sahodaya && sahodaya.map((s) => (
                  <option key={s.sahodaya_id} value={s.sahodaya_name}>
                    {s.sahodaya_name}
                  </option>
                ))}
              </select>
            </div>
          )}


          {((selectedCountry === "India" && selectedState === "Kerala") || (selectschoolType === 'General Education' && selectedSubCategory !== 'College')) && (
            <>
              <div className="w-1/2 mb-3 md:w-1/3 p-1 md:p-2">
                <label className="block ml-5 mb-1">District</label>
                <select
                  className="w-full p-1 md:p-2 border rounded-md bg-white focus:border-2 focus:border-[#3C6E1F]"
                  style={{ boxShadow: "1px 4px 5px 3px #00000040" }}
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district.dis_id} value={district.dis_name}>
                      {district.dis_name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

{selectschoolType === 'ICDS' && selectedSubCategory !== 'College' && (
            <>
            <div className="w-1/2 mb-3 md:w-1/3 p-1 md:p-2">
              <label className="block ml-5 mb-1">Select ICDS Block</label>
              <select
                className="w-full p-1 md:p-2 border rounded-md bg-white focus:border-2 focus:border-[#3C6E1F]"
                style={{ boxShadow: "1px 4px 5px 3px #00000040" }}
                value={selectIcdsBlock}
                onChange={(e) => {
                  setSelectIcdsBlock(e.target.value)
                  handleIcds(e.target.value);
                }}
              >
                <option value="">Select ICDS Block</option>
                {icdsBlock && icdsBlock.map((e) => (
                                      <option key={e.icds_block_id} value={e.block_name}>
                                        {e.block_name}
                                      </option>
                                    ))}
              </select>
            </div>

            <div className="w-1/2 mb-3 md:w-1/3 p-1 md:p-2">
              <label className="block ml-5 mb-1">Select ICDS Project</label>
              <select
                className="w-full p-1 md:p-2 border rounded-md bg-white focus:border-2 focus:border-[#3C6E1F]"
                style={{ boxShadow: "1px 4px 5px 3px #00000040" }}
                value={selectIcdsProject}
                onChange={(e) => {
                  setSelectIcdsProject(e.target.value)
                }}
              >
                <option value="">Select ICDS Project</option>
                {icdsProject && icdsProject.map((e) => (
                                        <option key={e.project_id} value={e.project_name}>
                                          {e.project_name}
                                        </option>
                                      ))}
              </select>
            </div>
          </>
          )}

          {(selectschoolType === 'General Education' && selectedSubCategory !== 'College') && (
            <>
              <div className="w-1/2 mb-3 md:w-1/3 p-1 md:p-2 bg-white">
                <label className="block ml-5 mb-1">Select Education District</label>
                <select
                  className="w-full p-1 md:p-2 border-0 rounded-md bg-white focus:border-2 focus:border-[#3C6E1F]"
                  style={{ boxShadow: "1px 4px 5px 3px #00000040" }}
                  value={selecteduDistrict}
                  onChange={(e) => {
                    setSelecteduDistrict(e.target.value)
                    handleEduDistrict(e.target.value)
                  }}
                >
                  <option value="">Select Education District</option>
                  {eduDistrict && eduDistrict.map((e) => (
                    <option key={e.edu_district_id} value={e.edu_district}>
                      {e.edu_district}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-1/2 mb-3 md:w-1/3 p-1 md:p-2 bg-white">
                <label className="block ml-5 mb-1">Select Education SubDistrict</label>
                <select
                  className="w-full p-1 md:p-2 border-0 rounded-md bg-white focus:border-2 focus:border-[#3C6E1F]"
                  style={{ boxShadow: "1px 4px 5px 3px #00000040" }}
                  value={selecteduSubDistrict}
                  onChange={(e) => {
                    setSelecteduSubDistrict(e.target.value)
                  }}
                >
                  <option value="">Select Education SubDistrict</option>
                  {eduSubDistrict && eduSubDistrict.map((e) => (
                    <option key={e.edu_sub_district_id} value={e.edu_sub_district_name}>
                      {e.edu_sub_district_name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          {selectedCountry === "India" && selectedState === "Kerala" && (
            <>
              <div className="w-1/2 mb-3 md:w-1/4 p-1 md:p-2">
                <label className="block ml-5 mb-1">Corporation</label>
                <select
                  className="w-full p-1 md:p-2 border rounded-md bg-white focus:border-2 focus:border-[#3C6E1F]"
                  style={{ boxShadow: "1px 4px 5px 3px #00000040" }}
                  value={selectedCorp}
                  onChange={handleCorpChange}
                >
                  <option value="">Select Corporation</option>
                  {corporation.map((corp) => (
                    <option key={corp.cop_id} value={corp.cop_name}>
                      {corp.cop_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/2 mb-3 md:w-1/4 p-1 md:p-2 bg-white">
                <label className="block ml-5 mb-1">LSGD</label>
                <select
                  className="w-full p-1 md:p-2 border rounded-md bg-white focus:border-2 focus:border-[#3C6E1F]"
                  style={{ boxShadow: "1px 4px 5px 3px #00000040" }}
                  value={selectedLsgd}
                  onChange={(e) => setSelectedLsgd(e.target.value)}
                >
                  <option value="">Select LSGD</option>
                  {lsgd.map((lsg) => (
                    <option key={lsg.lsg_id} value={lsg.lsg_name}>
                      {lsg.lsg_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/2 mb-3 md:w-1/4 p-1 md:p-2">
                <label className="block ml-3 mb-1">Ward No</label>
                <input
                  type="text"
                  className="w-full p-1 md:p-2 border rounded-md bg-white focus:border-2 focus:border-[#3C6E1F]"
                  placeholder="Enter ward number"
                  style={{ boxShadow: "1px 4px 5px 3px #00000040" }}
                  value={wardNo}
                  onChange={(e) => setWardNo(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="w-full md:w-1/4 p-1 md:p-2 flex justify-center md:justify-start sm:items-center md:items-start">
            <button
              type="submit"
              className="w-1/2 md:w-full mt-7 p-1 md:p-2 bg-[#3C6E1F] text-white rounded-md"
              style={{ boxShadow: "1px 4px 5px 3px #00000040" }}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <div className="container mx-auto p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-gray-200 rounded-t-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left w-16 bd-2 rounded-tl-lg">Tree number</th>
                <th className="py-3 px-6 text-left">Planter name</th>
                <th className="py-3 px-6 text-left">Uploader name</th>
                <th className="py-3 px-6 text-left">Group code/count</th>
                <th className="py-3 px-6 text-left">Tree name/scientific name</th>
                <th className="py-3 px-6 text-left rounded-tr-lg">Image last uploaded</th>
              </tr>
            </thead>
            <tbody>
              {participants && participants.length > 0 ? (
                participants.map((participant) => (
                  <tr key={participant.up_id} className="border border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{participant.up_id || 'N/A'}</td>
                    <td className="py-3 px-6 text-left">{participant.up_planter || 'N/A'}</td>
                    <td className="py-3 px-6 text-left"><a href={`/user-page?u=${participant.up_name}&id=${participant.up_reg_id}`}>{participant.up_name || 'N/A'}</a></td>
                    <td className="py-3 px-6 text-left">{participant.gp_name || 'N/A'}</td>
                    <td className="py-3 px-6 text-left">{participant.up_tree_name || 'N/A'}</td>
                    <td className="py-3 px-6 text-left">
                      {participant.up_file ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={`${imageURL}${participant.up_file}`}
                          style={{ height: '100px', width: '110px' }}
                          alt="Tree"
                        // onError={(e) => {
                        //   e.currentTarget.src = '/path/to/fallback/image.jpg';
                        //   e.currentTarget.alt = 'Image not available';
                        // }}
                        />
                      ) : (
                        'No image available'
                      )}
                    </td>
                  </tr>
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
      </div>
      <Footer />
    </>
  );
};

export default Participant;