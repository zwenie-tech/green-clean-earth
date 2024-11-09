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
import { apiURL, fetchClubData } from "@/app/requestsapi/request";
import Cookies from 'js-cookie';
import * as XLSX from 'xlsx';

ModuleRegistry.registerModules([ClientSideRowModelModule]);
interface Club {
    id: string;
    name: string;
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
const EditType = () => {
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
    const [numberStudent, setNumberStudent] = useState("");
    const [email, setEmail] = useState("");
    const [listClasses, setListClasses] = useState("");
    const [mobile, setMobile] = useState("");
    const [grouptype, setGroupType] = useState("");
    const [selectclub, setSelectClub] = useState("");
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
    const [clubOptions, setClubOptions] = useState<Club[]>([]);

    
    

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
        const fetchClubs = async () => {
          try {
    
            const data = await fetchClubData();
            setClubOptions(data.clubs);
          } catch (error) {
            console.error("Error fetching clubs:", error);
          }
        };
        fetchClubs();
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

    
    const handleFilterClub = (e: any) => {
        
        if (e != "") {
            setSelectClub(e.target.value);
        }
    };

   

    const handleFilterSchoolType = (e: any) => {
        
        if (e.target.value != "") {
            setSelectedSchoolType(e.target.value);
            e.target.value === 'CBSE' ? setSelectedCountryGrp('India') : ''
            e.target.value === 'General Education' || 'ICDS' ? setSelectedCountryGrp('India') : ''
            e.target.value === 'General Education' || 'ICDS' ? setSelectedStateGrp('Kerala') : ''
            
        }
    };

   

    const handleFilterSchoolCategory = (e: any) => {
        
        if (e.target.value != "") {
            setSelectedSubCategory(e.target.value);
           
        }
    };

    

    const handleFilterSahodayaState = (e: any) => {
        
        if (e.target.value != "") {
            setSelectedStateGrp(e.target.value);
          
        }
    };

    const handleFilterSahodaya = (e: any) => {
        
        if (e.target.value != "") {
            setSelectSahodaya(e.target.value);
            
        }
    };

   


    const handleFilterEDistrict = (e: any) => {
        
        if (e.target.value != "") {
            setSelectedDistrictGrp(e.target.value);
           
        }
    };

    const handleFilterEduDistrict = (e: any) => {
        
        if (e.target.value != "") {
            setSelecteduDistrict(e.target.value);
            handleEduDistrict(e.target.value);
            
        }
    };

    const handleFilterEduSubDistrict = (e: any) => {
        
        if (e.target.value != "") {
            setSelecteduSubDistrict(e.target.value);
            
        }
    };

    


    const handleFilterIcdsBlock = (e: any) => {
        
        if (e.target.value != "") {
            setSelectIcdsBlock(e.target.value);
            handleIcds(e.target.value);
            
        }
    };

    const handleFilterIcdsProject = (e: any) => {
        
        if (e.target.value != "") {
            setSelectIcdsProject(e.target.value);
            
        }
    };

   

    const handleFilterMissionArea = (e: any) => {
        
        if (e.target.value != "") {
            setSelectMissionarea(e.target.value);
           
        }
    };

    const handleFilterMissionChapter = (e: any) => {
        
        if (e.target.value != "") {
            setSelectedMission(e.target.value);
            handleChapter(e.target.value);
            
        }
    };

    const handleFilterMissionZone = (e: any) => {
        
        if (e.target.value != "") {
            setSelectedZone(e.target.value);
            
        }
    };

   


    return (
        <div className=" bg-slate-100">
            
            <div>
                <label>List of Classes</label>
                <div className="flex mb-3">
                    <input
                        className="border px-2 h-10 text-sm border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 "
                        value={listClasses}
                        onChange={(e) => setListClasses(e.target.value)} // Update the state directly
                    />
                    
                </div>
            </div>
            <div>
                <label>Number of students</label>
                <div className="flex mb-3">
                    <input
                        className="border px-2 h-10 text-sm border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 "
                        value={numberStudent}
                        onChange={(e) => setNumberStudent(e.target.value)} // Update the state directly
                    />
                    
                </div>
            </div>
            

            
            {/* group type  */}
            <div className="flex items-center mb-3 space-x-2">
                <label htmlFor="groupFilter" className="text-sm font-medium">
                    Clubs:
                </label>
                <select
                    id="groupFilter"
                    value={selectclub}
                    onChange={handleFilterClub}
                    className="border border-gray-300 rounded p-1"
                >
                    <option value="">Choose Club</option>

                    {clubOptions.map((club) => (
                            <option key={club.id}
                              value={club.name}>
                              {club.name}
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
            

        </div>
    );
};
export default EditType;
