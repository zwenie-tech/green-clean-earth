"use client";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  ColDef,
  ModuleRegistry,
  RowClickedEvent,
} from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import "@/app/admin/ag-grid-theme-builder.css"
import { usePathname, useRouter } from "next/navigation";
import React, { StrictMode, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { apiURL, fetchClubData } from "@/app/requestsapi/request";
import Cookies from 'js-cookie';
import * as XLSX from 'xlsx';
import { toast, useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";

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

interface Lsgd {
  lsg_id: number;
  lsg_name: string;
}

type Corp = {
  cop_id: string;
  cop_name: string;
}


type Category = {
  id: string;
  group_type: string;
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
interface Club {
  id: string;
  name: string;
}

const DeleteBtn = () => {
  const router = useRouter();
  const token = Cookies.get("adtoken");
  const pathname = usePathname();
  const userId = pathname.split("/")[3];
  const { toast } = useToast();




  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [lsgd, setLsgd] = useState<Lsgd[]>([]);
  const [corporation, setCorporation] = useState<Corp[]>([]);
  const [grpName, setGrpName] = useState<GrpName[]>([]);



  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [selectedCorp, setSelectedCorp] = useState("");
  const [selectedLsgd, setSelectedLsgd] = useState("");
  const [wardNo, setWardNo] = useState("");
  const [clubOptions, setClubOptions] = useState<Club[]>([]);

  const [city, setCity] = useState("");
  const [souce, setSource] = useState("");
  const [planter, setPlanter] = useState("");
  const [landmark, setLandmark] = useState("");
  const [treename, setTreename] = useState("");

  useEffect(() => {
    async function fetchData() {
      const categoryResponse = await fetch(`${apiURL}/category`);
      const categoryData = await categoryResponse.json();
      setCategory(categoryData.category);
    }
    fetchData();
  }, []);
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
    }
    fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    async function fetchDistricts() {
      if ((selectedCountry === "India" && selectedState === "Kerala")) {
        const districtResponse = await fetch(`${apiURL}/district`);
        const districtData = await districtResponse.json();
        setDistricts(districtData.district);
      } else {
        setDistricts([]);
      }
     
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
      
    }
    fetchLsgdData();
  }, [selectedCountry, selectedState, selectedCorp, corporation]);

  useEffect(() => {
    async function fetchData() {

      const countryResponse = await fetch(`${apiURL}/country`);
      const countryData = await countryResponse.json();
      setCountries(countryData.country);

    }
    fetchData();
  }, [selectedCountry]);
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
    async function fetchdata() {
      if (token) {

        const response = await axios.get(`${apiURL}/adminFrame/uploadDetails/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        try {

          if (response.data.success && response.status != 203) {
            const udata = response.data.uploadDetails;
            const {source_name,lsg_name,up_ward,cop_name,city,dis_name,st_name,cntry_name,up_planter,us_name,up_landmark_details,up_tree_name} = udata[0];
            
            console.log("test",lsg_name)
            setSource(source_name || "");
            setWardNo(up_ward || "");
            setSelectedCorp(cop_name || "");
            setCity(city || "");
            setSelectedDistrict(dis_name || "");
            setSelectedState(st_name || "");
            setSelectedCountry(cntry_name || "");
            setPlanter(up_planter || "");
            setLandmark(up_landmark_details || "");
            setTreename(up_tree_name || "");
            setSelectedLsgd(lsg_name || "");

          } else {
            console.error("Error:", response.data);

          }

        } catch (error) {
          console.error("Error:", error);

        }
      };
    }
    fetchdata();
  }, [token, userId]);

  const handleDelete = async () => {
    const formdata = {
      planterName: planter,
      countryId: countries.find((item) => item.cntry_name === selectedCountry)?.cntry_id,
      stateId: states.find((item) => item.st_name === selectedState)?.st_id?.toString(),
      corporationId: corporation.find((item) => item.cop_name === selectedCorp)?.cop_id?.toString(),
      districtId: districts.find((item) => item.dis_name === selectedDistrict)?.dis_id?.toString(),
      lsgdId: lsgd.find((item) => item.lsg_name === selectedLsgd)?.lsg_id,
      wardNo: wardNo,
      city: city,
      sourceId: clubOptions.find((item) => item.name === souce)?.id,
      landmark: landmark,
      treeName: treename,
      treeNumber: userId,
      isdeleted: true
    }
    try {
      const response = await axios.post(`${apiURL}/adminEdit/updateUpload`, formdata,{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
      if (response.data.success && response.status!=203) {
        toast({
            title: "Delete Successfully.",
            description: "",
          });


          setTimeout(function() {
            window.history.back();
          }, 1800);
      } else {
        toast({
          variant: "destructive",
          title: "Oops, Something went wrong!",
          description: "Please try again...",
      });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops, Something went wrong!",
        description: "Please try again...",
    });
    }
  };
  return (
    <div className="flex items-center justify-start gap-2 my-4 cursor-pointer text-primary ml-3" onClick={handleDelete}>
          <Trash2 />
          <span className="text-base">Delete</span>
        </div>
  );
};
export default DeleteBtn;
