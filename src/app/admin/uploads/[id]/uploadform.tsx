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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {

    console.log(values)

    const formdata = {
      planterName: planter,
      countryId: countries.find((item) => item.cntry_name === selectedCountry)?.cntry_id,
      stateId: states.find((item) => item.st_name === selectedState)?.st_id?.toString(),
      corporationId: corporation.find((item) => item.cop_name === selectedCorp)?.cop_id?.toString(),
      districtId: districts.find((item) => item.dis_name === selectedDistrict)?.dis_id?.toString(),
      lsgdId: lsgd.find((item) => item.lsg_name === selectedLsgd)?.lsg_id || 0,
      wardNo: wardNo,
      city: city,
      sourceId: clubOptions.find((item) => item.name === souce)?.id,
      landmark: landmark,
      treeName: treename,
      treeNumber: userId
    }
    console.log(formdata)

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


          setTimeout(function() {
            window.location.reload();
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

                
                <div className="mb-4">
                  <label className="form-label">Planter Name</label>
                  <input
                    className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"

                    value={planter}
                    onChange={(e) => setPlanter(e.target.value)}
                  />
                </div>

                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <Select
                    onValueChange={(value) => {
                      // setCountry(value);
                      setSelectedCountry(value);
                    }}
                    value={selectedCountry || ""}
                    defaultValue={selectedCountry}
                  >
                    <SelectTrigger className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"
                    >
                      <SelectValue placeholder="Choose a country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.cntry_id} value={country.cntry_name}>
                          {country.cntry_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedCountry === 'India' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <Select
                      onValueChange={(value) => {
                        // setCountry(value);
                        setSelectedState(value);
                      }}
                      value={selectedState || ""}
                      defaultValue={selectedState}
                    >
                      <SelectTrigger className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"
                      >
                        <SelectValue placeholder="Choose a state" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state.st_id} value={state.st_name}>
                            {state.st_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {selectedCountry === 'India' && (
                  selectedState === "Kerala" ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                      <Select
                        onValueChange={(value) => {
                          // setCountry(value);
                          setSelectedDistrict(value);
                        }}
                        value={selectedDistrict || ""}
                        defaultValue={selectedDistrict}
                      >
                        <SelectTrigger className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"
                        >
                          <SelectValue placeholder="Choose a district" />
                        </SelectTrigger>
                        <SelectContent>
                          {districts.map((district) => (
                            <SelectItem key={district.dis_id} value={district.dis_name}>
                              {district.dis_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>) :
                    <div className="mb-4">
                      <label className="form-label">District</label>
                      <input
                        className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"

                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                      />
                    </div>
                )}
                {selectedState !== 'Kerala' && selectedCountry !== 'India' && (
                  <div className="mb-4">
                    <label className="form-label">City</label>
                    <input
                      className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"

                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                )}

                {selectedCountry === 'India' && (
                  selectedState === "Kerala" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Corporation/Municipality/Block Panchayat</label>
                      <Select
                        onValueChange={(value) => {
                          // setCountry(value);
                          setSelectedCorp(value);
                        }}
                        value={selectedCorp || ""}
                        defaultValue={selectedCorp}
                      >
                        <SelectTrigger className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"
                        >
                          <SelectValue placeholder="Choose a corporation" />
                        </SelectTrigger>
                        <SelectContent>
                          {corporation.map((corp) => (
                            <SelectItem key={corp.cop_id} value={corp.cop_name}>
                              {corp.cop_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>))}

                {selectedCountry === 'India' && (
                  selectedState === "Kerala" && selectedCorp != "" && (
                    <><div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">LSGD / Zone</label>
                      <Select
                        onValueChange={(value) => {
                          // setCountry(value);
                          setSelectedLsgd(value);
                        }}
                        value={selectedLsgd || ""}
                        defaultValue={selectedLsgd}
                      >
                        <SelectTrigger className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"
                        >
                          <SelectValue placeholder="Choose a lsgd" />
                        </SelectTrigger>
                        <SelectContent>
                          {lsgd && lsgd.map((lsg) => (
                            <SelectItem key={lsg.lsg_id} value={lsg.lsg_name}>
                              {lsg.lsg_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                      <div className="mb-4">
                        <label className="form-label">Ward No</label>
                        <input
                          className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"

                          value={wardNo}
                          onChange={(e) => setWardNo(e.target.value)} />
                      </div></>
                  ))}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                  <Select
                    onValueChange={(value) => {
                      // setCountry(value);
                      setSource(value);
                    }}
                    value={souce || ""}
                    defaultValue={souce}
                  >
                    <SelectTrigger className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"
                    >
                      <SelectValue placeholder="Choose a source" />
                    </SelectTrigger>
                    <SelectContent>
                      {clubOptions.map((club) => (
                        <SelectItem key={club.id}
                          value={club.name}>
                          {club.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-4">
                  <label className="form-label">Landmark</label>
                  <input
                    className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"

                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)} />
                </div>

                <div className="mb-4">
                  <label className="form-label">Tree Name</label>
                  <input
                    className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"

                    value={treename}
                    onChange={(e) => setTreename(e.target.value)} />
                </div>


              </div>

              <div className="mt-3 justify-center item-center">
                <Button type="submit">Submit</Button>
              </div>

            </form>
          </Form>
        </div>
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
