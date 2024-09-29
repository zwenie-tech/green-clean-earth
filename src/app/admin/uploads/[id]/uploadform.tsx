import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

import Cookies from 'js-cookie';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DateTimePicker } from "@/components/ui/dateTimePicker";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { apiURL, fetchClubData } from "@/app/requestsapi/request";
import axios from "axios";
import imageCompression from "browser-image-compression";
const formSchema = z.object({
  image1: z
    .any()
    .refine((file) => file instanceof File, "Must be a file")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/gif"].includes(file?.type),
      "Invalid image format. Accepted formats: jpeg, png, gif."
    )
    .refine((file) => file?.size <= 5 * 1024 * 1024, "Max file size is 5MB").optional(), // max 5MB
  image2: z
    .any()
    .refine((file) => file instanceof File, "Must be a file")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/gif"].includes(file?.type),
      "Invalid image format. Accepted formats: jpeg, png, gif."
    )
    .refine((file) => file?.size <= 5 * 1024 * 1024, "Max file size is 5MB").optional(), // max 5MB
  image3: z
    .any()
    .refine((file) => file instanceof File, "Must be a file")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/gif"].includes(file?.type),
      "Invalid image format. Accepted formats: jpeg, png, gif."
    )
    .refine((file) => file?.size <= 5 * 1024 * 1024, "Max file size is 5MB").optional(), // max 5MB
  image4: z
    .any()
    .refine((file) => file instanceof File, "Must be a file")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/gif"].includes(file?.type),
      "Invalid image format. Accepted formats: jpeg, png, gif."
    )
    .refine((file) => file?.size <= 5 * 1024 * 1024, "Max file size is 5MB").optional(), // max 5MB
  treeno: z.string().min(2).max(255),
  uploadid: z.string().min(2).max(255),
  uploadname: z.string().min(2).max(255),
  plantername: z.string().min(2).max(255),
  country: z.string().min(2).max(255),
  state: z.string().min(2).max(255),
  district: z.string().min(2).max(255),
  corporation: z.string().min(2).max(255),
  lsgd: z.string().min(2).max(255),
  source: z.string().min(2).max(255),
  landmark: z.string().min(2).max(255),
  treename: z.string().min(2).max(255),
  // coordinatorname: z.string().min(2).max(255),
  // groupname: z.string().min(2).max(255),
  // grouptype: z.string().min(2).max(255).optional(),
  // schooltype: z.string().min(2).max(255).optional(),
  // schoolcategory: z.string().min(2).max(255).optional(),
  // edudistrict: z.string().min(2).max(255).optional(),
  // edusubdistrict: z.string().min(2).max(255).optional(),
  // sahodaya: z.string().min(2).max(255).optional(),
  // block: z.string().min(2).max(255).optional(),
  // project: z.string().min(2).max(255).optional(),
  // chapter: z.string().min(2).max(255).optional(),
  // zone: z.string().min(2).max(255).optional(),
  // missionarea: z.string().optional(),
  city: z.string().optional(),
  wardno: z.string().optional(),
  // edistrict: z.string().optional(),
  // sahostate: z.string().optional(),
  // bldistrict: z.string().optional(),
});

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

const MAX_FILE_SIZE = 1024 * 1024 * 100; // 100MB
const TARGET_FILE_SIZE = 1024 * 1024 * 4; // 4MB
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

async function resizeImage(file: File) {
  const options = {
    maxSizeMB: TARGET_FILE_SIZE / (1024 * 1024),
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  try {
    const resizedFile = await imageCompression(file, options);
    return resizedFile;
  } catch (error) {
    console.error('Error resizing the image:', error);
    throw error;
  }
}

export function Uploadform() {
  const router = useRouter();
  const pathname = usePathname();
  const userId = pathname.split("/")[3];
  const { toast } = useToast();
  const token = Cookies.get("adtoken");


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
  const [filterData, setFilterData] = useState({});

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [selectedCountryGrp, setSelectedCountryGrp] = useState("");
  const [selectedStateGrp, setSelectedStateGrp] = useState("");
  const [selectedDistrictGrp, setSelectedDistrictGrp] = useState("");

  const [selectedCorp, setSelectedCorp] = useState("");
  const [selectedLsgd, setSelectedLsgd] = useState("");
  const [selectedGrpType, setSelectedGrpType] = useState("new");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [wardNo, setWardNo] = useState("");
  const [totalCount, setTotalCount] = useState("");
  const [coName, setConame] = useState("");
  const [Phone, setPhone] = useState("");
  const [grpId, setGrpId] = useState("");
  const [selectedgrpName, setSelectedGrpName] = useState("");
  const [clubOptions, setClubOptions] = useState<Club[]>([]);

  const up_id = Cookies.get("up_id");
  const us_id = Cookies.get("us_id");
  const us_name = Cookies.get("us_name");
  const up_planter = Cookies.get("up_planter");
  const cntry_name = Cookies.get("cntry_name");
  const st_name = Cookies.get("st_name");
  const dis_name = Cookies.get("dis_name");
  const cop_name = Cookies.get("cop_name");
  const lsg_name = Cookies.get("lsg_name");
  const source_name = Cookies.get("source_name");
  const up_landmark_details = Cookies.get("up_landmark_details");
  const up_tree_name = Cookies.get("up_tree_name");
  const co_ord_name = Cookies.get("co_ord_name");
  const gp_name = Cookies.get("gp_name");
  const group_type = Cookies.get("group_type");
  const type_name = Cookies.get("type_name");
  const gp_cat_name = Cookies.get("gp_cat_name");
  const edu_district = Cookies.get("edu_district");
  const edu_sub_district_name = Cookies.get("edu_sub_district_name");
  const sahodaya_name = Cookies.get("sahodaya_name");
  const block_name = Cookies.get("block_name");
  const project_name = Cookies.get("project_name");
  const chapter_name = Cookies.get("chapter_name");
  const zone_name = Cookies.get("zone_name");
  const city = Cookies.get("city");
  const up_ward = Cookies.get("up_ward");
  useEffect(() => {
    async function fetchData() {

      cntry_name ? setSelectedCountry(cntry_name) : '';
      st_name ? setSelectedState(st_name) : '';
      dis_name ? setSelectedDistrict(dis_name) : '';
      cop_name ? setSelectedCorp(cop_name) : '';
      lsg_name ? setSelectedLsgd(lsg_name) : '';
    }
    fetchData();
  }, [cntry_name, cop_name, dis_name, lsg_name, st_name]);
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
    handleGrpName();
  }, [selectedGrpType]);


  async function handleGrpName() {
    if (selectedGrpType) {
      const groupId = category.find((item) => item.group_type === selectedGrpType)?.id;
      const Response = await axios.get(`${apiURL}/common/groupName/${groupId}`);
      setGrpName(Response.data.stateMapData);

    }
  }
  useEffect(() => {
    async function fetchData() {

      const countryResponse = await fetch(`${apiURL}/country`);
      const countryData = await countryResponse.json();
      setCountries(countryData.country);

      if (selectedCountry === 'India') {
        const stateResponse = await fetch(`${apiURL}/state`);
        const stateData = await stateResponse.json();
        setStates(stateData.state);

        const districtResponse = await fetch(`${apiURL}/district`);
        const districtData = await districtResponse.json();
        setDistricts(districtData.district);
      }
    }
    fetchData();
  }, [selectedCountry]);

  useEffect(() => {
    async function fetchCorpData() {
      if (selectedDistrict) {
        const dist_id = districts.find((item) => item.dis_name === selectedDistrict)?.dis_id;
        const corpResponse = await fetch(`${apiURL}/corporation/${dist_id}`);
        const corpData = await corpResponse.json();
        setCorporation(corpData.corporation);
      }
    }
    fetchCorpData();
  }, [selectedDistrict, districts]);

  useEffect(() => {
    async function fetchLsgdData() {
      if (selectedCorp) {
        const corp_id = corporation.find((item) => item.cop_name === selectedCorp)?.cop_id;
        const lsgResponse = await fetch(`${apiURL}/lsg/${corp_id}`);
        const lsgData = await lsgResponse.json();

        setLsgd(lsgData.lsg);
      }
    }
    fetchLsgdData();
  }, [selectedCorp, corporation]);
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      treeno: up_id,
      uploadid: us_id,
      uploadname: us_name,
      plantername: up_planter,
      country: cntry_name,
      state: st_name,
      district: dis_name,
      // sahostate: 'null',
      // edistrict: 'null',
      // bldistrict: 'null',
      corporation: cop_name,
      lsgd: lsg_name,
      source: source_name,
      landmark: up_landmark_details,
      treename: up_tree_name,
      // coordinatorname: co_ord_name,
      // groupname: gp_name,
      // grouptype: group_type,
      // schooltype: type_name,
      // schoolcategory: gp_cat_name,
      // edudistrict: edu_district,
      // edusubdistrict: edu_sub_district_name,
      // sahodaya: sahodaya_name,
      // block: block_name,
      // project: project_name,
      // chapter: chapter_name,
      // zone: zone_name,
      // missionarea: 'null',
      city: city,
      wardno: up_ward
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {

    console.log(values)
    // if (values.missionarea !== 'null') {
    //   const dtm = {
    //     chapterName: values.chapter,
    //     chapterTypeId: values.missionarea,
    //   }
    //   if (token) {
    //     const response = await axios.post(`${apiURL}/adminEdit/modifyMMChapter`, dtm, {
    //       headers: {
    //         'Authorization': `Bearer ${token}`,
    //         'Content-Type': 'application/json'
    //       }
    //     })
    //     try {

    //       console.log(response)
    //       if (response.data.success && response.status != 203) {
    //         toast({
    //           title: "Data Successfully Updated.",
    //           description: "",
    //         });


    //       } else {
    //         toast({
    //           variant: "destructive",
    //           title: "Oops, Something went wrong!",
    //           description: "Please try again...",
    //         });
    //       }

    //     } catch (error) {
    //       toast({
    //         variant: "destructive",
    //         title: "Oops, Something went wrong!",
    //         description: "Please try again...",
    //       });
    //     }
    //   };
    //   if (values.zone !== 'null') {
    //     const dtz = {
    //       zoneName: values.zone,
    //       chapterId: missionChapter.find((item) => item.chapter_name === values.chapter)?.chapter_id,
    //     }

    //     if (token) {
    //       const response = await axios.post(`${apiURL}/adminEdit/modifyMMZone`, dtz, {
    //         headers: {
    //           'Authorization': `Bearer ${token}`,
    //           'Content-Type': 'application/json'
    //         }
    //       })
    //       try {

    //         console.log(response)
    //         if (response.data.success && response.status != 203) {
    //           toast({
    //             title: "Data Successfully Updated.",
    //             description: "",
    //           });


    //         } else {
    //           toast({
    //             variant: "destructive",
    //             title: "Oops, Something went wrong!",
    //             description: "Please try again...",
    //           });
    //         }

    //       } catch (error) {
    //         toast({
    //           variant: "destructive",
    //           title: "Oops, Something went wrong!",
    //           description: "Please try again...",
    //         });
    //       }
    //     };
    //   }

    // }

    // if (values.bldistrict !== 'null') {
    //   const dbl = {
    //     districtId: districts.find((item) => item.dis_name === values.bldistrict)?.dis_id,
    //     blockName: values.block
    //   }
    //   console.log(dbl)
    //   if (token) {
    //     const response = await axios.post(`${apiURL}/adminEdit/modifyIcdsBlock`, dbl, {
    //       headers: {
    //         'Authorization': `Bearer ${token}`,
    //         'Content-Type': 'application/json'
    //       }
    //     })
    //     try {

    //       console.log(response)
    //       if (response.data.success && response.status != 203) {
    //         toast({
    //           title: "Data Successfully Updated.",
    //           description: "",
    //         });


    //       } else {
    //         toast({
    //           variant: "destructive",
    //           title: "Oops, Something went wrong!",
    //           description: "Please try again...",
    //         });
    //       }

    //     } catch (error) {
    //       toast({
    //         variant: "destructive",
    //         title: "Oops, Something went wrong!",
    //         description: "Please try again...",
    //       });
    //     }
    //   };

    //   if(values.project!=='null'){
    //           const dtp = {
    //             blockId : icdsBlock.find((item) => item.block_name === values.block)?.icds_block_id?.toString(),
    //             projectName : values.project
    //           }
    //             console.log(dtp)
    //             if (token) {
    //                   const response = await axios.post(`${apiURL}/adminEdit/modifyIcdsProject`, dtp, {
    //                     headers: {
    //                       'Authorization': `Bearer ${token}`,
    //                       'Content-Type': 'application/json'
    //                     }
    //                   })
    //                   try {

    //                     if (response.data.success && response.status != 203) {
    //                       console.log(response.data)
    //                       toast({
    //                         title: "Data Successfully Updated.",
    //                         description: "",
    //                       });


    //                     } else {
    //                       toast({
    //                         variant: "destructive",
    //                         title: "Oops, Something went wrong!",
    //                         description: "Please try again...",
    //                       });
    //                     }

    //                   } catch (error) {
    //                     toast({
    //                       variant: "destructive",
    //                       title: "Oops, Something went wrong!",
    //                       description: "Please try again...",
    //                     });
    //                   }
    //                 };
    //         }
    // }

    // if(values.sahostate!=='null'){
    //   const d = {
    //     stateId : states.find((item) => item.st_name === values.sahostate)?.st_id?.toString(),
    //     sahodayaName : values.sahodaya
    //         }
    //         console.log(d)
    //         if (token) {
    //             const response = await axios.post(`${apiURL}/adminEdit/modifySahodaya`, d, {
    //               headers: {
    //                 'Authorization': `Bearer ${token}`,
    //                 'Content-Type': 'application/json'
    //               }
    //             })
    //             try {

    //               if (response.data.success && response.status != 203) {
    //                 console.log(response)
    //                 toast({
    //                   title: "Data Successfully Updated.",
    //                   description: "",
    //                 });


    //               } else {
    //                 toast({
    //                   variant: "destructive",
    //                   title: "Oops, Something went wrong!",
    //                   description: "Please try again...",
    //                 });
    //               }

    //             } catch (error) {
    //               toast({
    //                 variant: "destructive",
    //                 title: "Oops, Something went wrong!",
    //                 description: "Please try again...",
    //               });
    //             }
    //           };
    // }

    // if(values.edistrict!=='null'){
    //     const d = {
    //       districtId : districts.find((item) => item.dis_name === values.edistrict)?.dis_id?.toString(),
    //       eduDistrictName : values.edudistrict
    //     }
    //     console.log(d)
    //     if (token) {
    //         const response = await axios.post(`${apiURL}/adminEdit/modifyEduDistrict`, d, {
    //           headers: {
    //             'Authorization': `Bearer ${token}`,
    //             'Content-Type': 'application/json'
    //           }
    //         })
    //         try {

    //           if (response.data.success && response.status != 203) {
    //             console.log(response)
    //             toast({
    //               title: "Data Successfully Updated.",
    //               description: "",
    //             });


    //           } else {
    //             toast({
    //               variant: "destructive",
    //               title: "Oops, Something went wrong!",
    //               description: "Please try again...",
    //             });
    //           }

    //         } catch (error) {
    //           toast({
    //             variant: "destructive",
    //             title: "Oops, Something went wrong!",
    //             description: "Please try again...",
    //           });
    //         }
    //       };

    //     if(values.edusubdistrict!=='null'){
    //       const dt = {
    //         eduDistrictId : eduDistrict.find((item) => item.edu_district === values.edudistrict)?.edu_district_id?.toString(),
    //         eduSubDistrictName : values.edusubdistrict
    //       }
    //         console.log(dt)
    //         if (token) {
    //               const response = await axios.post(`${apiURL}/adminEdit/modifyEduSubDistrict`, dt, {
    //                 headers: {
    //                   'Authorization': `Bearer ${token}`,
    //                   'Content-Type': 'application/json'
    //                 }
    //               })
    //               try {

    //                 if (response.data.success && response.status != 203) {
    //                   console.log(response.data)
    //                   toast({
    //                     title: "Data Successfully Updated.",
    //                     description: "",
    //                   });


    //                 } else {
    //                   toast({
    //                     variant: "destructive",
    //                     title: "Oops, Something went wrong!",
    //                     description: "Please try again...",
    //                   });
    //                 }

    //               } catch (error) {
    //                 toast({
    //                   variant: "destructive",
    //                   title: "Oops, Something went wrong!",
    //                   description: "Please try again...",
    //                 });
    //               }
    //             };
    //     }
    // }

    const formdata = {
      planterName: values.plantername,
      countryId: countries.find((item) => item.cntry_name === values.country)?.cntry_id,
      stateId: states.find((item) => item.st_name === values.state)?.st_id?.toString(),
      corporationId: corporation.find((item) => item.cop_name === values.corporation)?.cop_id?.toString(),
      districtId: districts.find((item) => item.dis_name === values.district)?.dis_id?.toString(),
      lsgdId: lsgd.find((item) => item.lsg_name === values.lsgd)?.lsg_id || 0,
      wardNo : values.wardno, 
      city: values.city,
      sourceId: clubOptions.find((item) => item.name === values.source)?.id,
      landmark: values.landmark,
      treeName: values.treename,
      treeNumber: values.treeno,
    }
    if (token) {
      const response = await axios.post(`${apiURL}/adminEdit/updateUpload`, formdata, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      try {

        if (response.data.success && response.status != 203) {
          console.log(response)
          toast({
            title: "Data Successfully Updated.",
            description: "",
          });
          if(!values.image1 && !values.image2 && !values.image3 && !values.image4){

            // setTimeout(function() {
            //   window.location.reload();
            // }, 1800);
          }


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

    if(values.image1){
      const formData = new FormData();
    formData.append("imageNumber", '1');
    formData.append("treeNumber", values.treeno);
    if (values.image1) {
        const compressedImage = await resizeImage(values.image1);
        formData.append("image", compressedImage);
      }
      try {
        const response = await fetch(`${apiURL}/adminEdit/updateImage`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          body: formData,
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        if (result) {
          toast({
            title: "Plant Uploaded Successfully.",
            description: "Your plant image successfully updated",
          });
        }
        // Reload the page
        if(!values.image2 && !values.image3 && !values.image4){

          setTimeout(function() {
            window.location.reload();
          }, 1800);
        }

      } catch (error) {
        toast({
          variant: "destructive",
          title: "Oops, Something went wrong!",
          description: "Please try again...",
        });
        console.error("Error:", error);
      }
    }

    if(values.image2){
      const formData = new FormData();
    formData.append("imageNumber", '2');
    formData.append("treeNumber", values.treeno);
    if (values.image2) {
        const compressedImage = await resizeImage(values.image2);
        formData.append("image", compressedImage);
      }
      try {
        const response = await fetch(`${apiURL}/adminEdit/updateImage`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          body: formData,
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        if (result) {
          toast({
            title: "Plant Uploaded Successfully.",
            description: "Your plant image successfully updated",
          });
        }
        // Reload the page
        if(!values.image3 && !values.image4){

          setTimeout(function() {
            window.location.reload();
          }, 1800);
        }

      } catch (error) {
        toast({
          variant: "destructive",
          title: "Oops, Something went wrong!",
          description: "Please try again...",
        });
        console.error("Error:", error);
      }
    }
    if(values.image3){
      const formData = new FormData();
    formData.append("imageNumber", '3');
    formData.append("treeNumber", values.treeno);
    if (values.image3) {
        const compressedImage = await resizeImage(values.image3);
        formData.append("image", compressedImage);
      }
      try {
        const response = await fetch(`${apiURL}/adminEdit/updateImage`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          body: formData,
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        if (result) {
          toast({
            title: "Plant Uploaded Successfully.",
            description: "Your plant image successfully updated",
          });
        }
        // Reload the page
        if(!values.image4){

          setTimeout(function() {
            window.location.reload();
          }, 1800);
        }

      } catch (error) {
        toast({
          variant: "destructive",
          title: "Oops, Something went wrong!",
          description: "Please try again...",
        });
        console.error("Error:", error);
      }
    }
    if(values.image4){
      const formData = new FormData();
    formData.append("imageNumber", '4');
    formData.append("treeNumber", values.treeno);
    if (values.image4) {
        const compressedImage = await resizeImage(values.image4);
        formData.append("image", compressedImage);
      }
      try {
        const response = await fetch(`${apiURL}/adminEdit/updateImage`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          body: formData,
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        if (result) {
          toast({
            title: "Plant Uploaded Successfully.",
            description: "Your plant image successfully updated",
          });
        }
        // Reload the page
        setTimeout(function() {
          window.location.reload();
        }, 1800);

      } catch (error) {
        toast({
          variant: "destructive",
          title: "Oops, Something went wrong!",
          description: "Please try again...",
        });
        console.error("Error:", error);
      }
    }

  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center justify-start gap-2 my-4 cursor-pointer text-primary">
          <Edit />
          <span className="text-base">Edit</span>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl overflow-y-scroll max-h-[98%]">
        <DialogHeader>
          <DialogTitle>Edit Uploads</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="">
          <Form {...form}>
            <form
              noValidate
              onSubmit={form.handleSubmit(onSubmit)}
              className=""
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <FormField
                  control={form.control}
                  name="image1"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Image 1</FormLabel>
                      <FormControl>
                        <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image2"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Image 2</FormLabel>
                      <FormControl>
                        <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image3"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Image 3</FormLabel>
                      <FormControl>
                        <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image4"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Image 4</FormLabel>
                      <FormControl>
                        <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="treeno"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Tree Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="uploadid"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Uploader ID</FormLabel>
                      <FormControl >
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="uploadname"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Uploader Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="plantername"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Planter Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
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
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
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
                {selectedState === "Kerala" || st_name === "Kerala" ? (
                  <FormField
                    control={form.control}
                    name="district"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>District</FormLabel>
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
                ) :
                  (
                    <FormField
                      control={form.control}
                      name="district"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>District</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                {selectedState !== 'Kerala' && selectedCountry !== 'India' && (
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {selectedState === 'Kerala' || st_name === "Kerala" && (
                  <FormField
                    control={form.control}
                    name="corporation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Corporation/Municipality/Block Panchayat</FormLabel>
                        <Select onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedCorp(value);
                        }} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a Option" />
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
                {selectedState === 'Kerala' || st_name === "Kerala" && selectedCorp != "" && (
                  <><FormField
                    control={form.control}
                    name="lsgd"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LSGD / Zone</FormLabel>
                        <Select onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedLsgd(value);
                        }} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a LSGD" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {lsgd && lsgd.map((lsg) => (
                              <SelectItem key={lsg.lsg_id} value={lsg.lsg_name}>
                                {lsg.lsg_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} /><FormField
                      control={form.control}
                      name="wardno"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel>Ward No </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} /></>
                )}
                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Clubs</FormLabel>
                      <Select onValueChange={(value) => {
                        field.onChange(value);

                      }} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a Club" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {clubOptions.map((club) => (
                            <SelectItem key={club.id}
                              value={club.name}>
                              {club.name}
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
                  name="landmark"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Landmark </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="treename"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Tree Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="coordinatorname"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Coordinator Name</FormLabel>
                      <FormControl >
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                {/* <FormField
                  control={form.control}
                  name="grouptype"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Group Type</FormLabel>

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



                {selectedSubCategory !== 'College' && selectedGrpType === 'School' && (
                  <FormField
                    control={form.control}
                    name="schooltype"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>School Type</FormLabel>

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

                {selectedGrpType === 'School' && (
                  <FormField
                    control={form.control}
                    name="schoolcategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>School Category</FormLabel>

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
                )}

                {selectedSubCategory !== 'College' && selectschoolType === 'Malayalam Mission' && selectedGrpType === 'School' && (
                  <>
                    <FormField
                      control={form.control}
                      name="missionarea"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mission Area</FormLabel>

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
                      name="chapter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Chapter</FormLabel>

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
                      name="zone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Zone</FormLabel>

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

                {selectschoolType === 'CBSE' && selectedSubCategory !== 'College' && selectedGrpType === 'School' && (
                  <>

                    <FormField
                      control={form.control}
                      name="sahostate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>

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
                        <FormItem>
                          <FormLabel>Sahodaya</FormLabel>

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

                {selectschoolType === 'ICDS' && selectedSubCategory !== 'College' && selectedGrpType === 'School' && (
                  <>

                    {selectedStateGrp === 'Kerala' && (
                      <FormField
                        control={form.control}
                        name="bldistrict"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>District</FormLabel>

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
                      name="block"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Block</FormLabel>

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
                      name="project"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project</FormLabel>

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


                {(selectschoolType === 'General Education' && selectedSubCategory !== 'College') && selectedGrpType === 'School' && (
                  <>
                    {selectedStateGrp === 'Kerala' && (
                      <FormField
                        control={form.control}
                        name="edistrict"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>District</FormLabel>

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
                        <FormItem>
                          <FormLabel>Education District</FormLabel>

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
                        <FormItem>
                          <FormLabel>Education Subdistrict</FormLabel>

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


                {selectedGrpType !== "" && grpName && grpName.length > 0 && (
                  <FormField
                    control={form.control}
                    name="groupname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Group Name</FormLabel>

                        <Select onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedGrpName(value)
                        }} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a sub category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {grpName.map((c) => (
                              <SelectItem key={c.gp_id} value={c.gp_name}>
                                {c.gp_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />


                )} */}
              </div>

              <div className="mt-3 justify-center item-center">
                <Button type="submit">Submit</Button>
              </div>

            </form>
          </Form>
        </div>
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
