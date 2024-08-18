"use client";
import React, { useState, useEffect } from "react";
import NavigationBar from "@/components/navigationBar";
import Footer from "@/components/footer";
import { apiURL, fetchClubData } from "@/app/requestsapi/request";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/extension/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const groupDetailsSchema = z.object({
  gp_name: z.string().optional(),
  gp_cat_id: z.number().optional(),
  cntry_name: z.string().optional(),
  group_type: z.string().optional(),
  st_name: z.string().optional(),
  lsg_name: z.string().optional(),
  dis_name: z.string().optional(),
  cop_name: z.string().optional(),
  lsg_id: z.string().optional(),
  gp_ward_no: z.string().optional(),
  gp_location: z.string().optional(),
  gp_city: z.string().optional(),
  gp_province: z.string().optional(),
  co_ord_name: z.string().optional(),
  co_ord_contact: z.string().optional(),
  co_profession: z.string().optional(),
});

interface GroupDetails {
  gp_name?: string;
  gp_cat_id?: number;
  cntry_name?: string;
  group_type?: string;
  st_name?: string;
  lsg_name?: string;
  dis_name?: string;
  cop_name?: string;
  lsg_id?: string;
  gp_ward_no?: string;
  gp_location?: string;
  gp_city?: string;
  gp_province?: string;
  co_ord_name?: string;
  co_ord_contact?: string;
  co_profession?: string;
}

interface CoordinatorDetails {
  name?: string;
  contact?: string;
  profession?: string;
}

interface SchoolDetails {
  list_of_classes?: string;
  club_names?: string;
  no_of_students?: number;
}

interface PromoterDetails {
  city_name?: string,
  group_type?: string,
  total_members?: number,
}

interface ResidenceDetails {
  no_of_members?: number,
}

type Country = {
  cntry_id: string;
  cntry_name: string;
};

type State = {
  st_id: string;
  st_name: string;
};

type District = {
  dis_id: string;
  dis_name: string;
};

type Category = {
  id: string;
  group_type: string;
};

type Lsgd = {
  lsg_id: string;
  lsg_name: string;
};

type Corp = {
  cop_id: string;
  cop_name: string;
};
interface Club {
  id: string;
  name: string;
}

const formSchoolSchema = z.object({
  value: z.array(z.string()).nonempty("Please select at least one club"),
  no_of_students: z.coerce.number(),
  list_of_classes: z.string().min(3).max(255),
  sub_category: z.string().min(3).max(255)
});

type FormSchema = z.infer<typeof formSchoolSchema>;

const formNgoSchema = z.object({
  members: z.coerce.number(),
});
const formResidenceSchema = z.object(
  {
    no_of_members:z.coerce.number(),
  })
  
  
const formPromoterSchema = z.object({
  city_name: z.string().max(255),
  category: z.string().max(255),
  total_team: z.coerce.number(),
});

interface subCategory {
  gp_cat_id: string;
  gp_cat_name: string;
}

type FormPromoterSchema = z.infer<typeof formPromoterSchema>;

const DetailsEdit: React.FC = () => {
  const router = useRouter();
  const token = Cookies.get("token");
  if (!token) {
    router.push("/loginform");
  }
  const { toast } = useToast();

  const [clubOptions, setClubOptions] = useState<Club[]>([]);
  const [subcategoryOptions, setsubCategoryOptions] = useState<subCategory[]>([]);

  const [isEditing, setIsEditing] = useState(false);
  const [isGroupEditing, setgroupIsEditing] = useState(false);
  const [iscoordinatorEditing, setcoordinatorIsEditing] = useState(false);
  const [groupDetails, setGroupDetails] = useState({
    gp_name: '',
    group_type: '',
    cntry_name: '',
    st_name: '',
    dis_name: '',
    cop_name: '',
    lsg_name: '',
    gp_ward_no: '',
    gp_city: '',
    gp_location: ''
  });
  const [schoolDetails, setSchoolDetails] = useState<SchoolDetails>({});
  const [ngoDetails, setNgoDetails] = useState<SchoolDetails>({});
  const [residenceDetails, setResidenceDetails] = useState<ResidenceDetails>({});
  const [promoterDetail, setPromoterDetails] = useState<PromoterDetails>({});
  const [coordinatorDetails, setCoordinatorDetails] =
    useState<CoordinatorDetails>({});

  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [lsgd, setLsgd] = useState<Lsgd[]>([]);
  const [corporation, setCorporation] = useState<Corp[]>([]);
  const [selectedCorp, setSelectedCorp] = useState("");
  const [selectedLsgd, setSelectedLsgd] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [additionalmode, setadditionalmode] = useState(0);

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setGroupDetails({ ...groupDetails, [name]: value });
  };

  const handleSelectChange = (name: string, value: React.SetStateAction<string>) => {
    setGroupDetails({ ...groupDetails, [name]: value });
    if (name === 'cntry_name') {
      setSelectedCountry(value);
    } else if (name === 'st_name') {
      setSelectedState(value);
    } else if (name === 'dis_name') {
      setSelectedDistrict(value);
    } else if (name === 'cop_name') {
      setSelectedCorp(value);
    } else if (name === 'lsg_name') {
      setSelectedLsgd(value);
    }
  };
  const multiForm = useForm<FormSchema>({
    resolver: zodResolver(formSchoolSchema),
    defaultValues: {
      value: [schoolDetails.club_names],
      no_of_students: schoolDetails.no_of_students,
      list_of_classes: schoolDetails.list_of_classes,
      sub_category: 'try'
    },
  });

  const ngoform = useForm<z.infer<typeof formNgoSchema>>({
    resolver: zodResolver(formNgoSchema),
    defaultValues: {},
  });
  const residenceform = useForm<z.infer<typeof formResidenceSchema>>({
    resolver: zodResolver(formResidenceSchema),
    defaultValues: {
      no_of_members: residenceDetails.no_of_members
    },
  })


  const promoterform = useForm<FormPromoterSchema>({
    resolver: zodResolver(formPromoterSchema),
    defaultValues: {
      category: promoterDetail.group_type,
      city_name: promoterDetail.city_name,
      total_team: promoterDetail.total_members,
    },
  });



  const form = useForm({
    resolver: zodResolver(groupDetailsSchema),
    defaultValues: {
      gp_name: groupDetails.gp_name || "",
      cntry_name: groupDetails.cntry_name || "",
      group_type: groupDetails.group_type || "",
      st_name: groupDetails.st_name || "",
      lsg_name: groupDetails.lsg_name || "",
      dis_name: groupDetails.dis_name || "",
      cop_name: groupDetails.cop_name || "",
      gp_ward_no: groupDetails.gp_ward_no || "",
      gp_location: groupDetails.gp_location || "",
      gp_city: groupDetails.gp_city || "",
    },
  });
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const data = await fetchClubData();
        setClubOptions(data.clubs);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
      try {
        const response = await axios.get(`${apiURL}/schoolCategory`);
        setsubCategoryOptions(response.data.subCategory);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };
    fetchClubs();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const categoryResponse = await fetch(`${apiURL}/category`);
      const categoryData = await categoryResponse.json();
      setCategory(categoryData.category);

      const countryResponse = await fetch(`${apiURL}/country`);
      const countryData = await countryResponse.json();
      setCountries(countryData.country);
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      if(selectedState != 'Kerala'){
        const formset = {
          lsg_name: '',
          dis_name: '',
          cop_name: '',
          gp_ward_no: '',
        };
        form.reset(formset,{ keepDefaultValues: true });
      }
    }
    fetchData();
  }, [form, selectedState]);
 
  useEffect(() => {
    async function fetchData() {
      if (token) {
        const response = await fetch(`${apiURL}/coordinator/group-details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.groupDetails.length > 0) {
          setGroupDetails(data.groupDetails[0]);
          setCoordinatorDetails({
            name: data.groupDetails[0].co_ord_name,
            contact: data.groupDetails[0].co_ord_contact,
            profession: data.groupDetails[0].co_profession,
          });
          setadditionalmode(data.groupDetails[0].gp_cat_id);
          const formset = {
            gp_name: data.groupDetails[0].gp_name,
            cntry_name: data.groupDetails[0].cntry_name,
            group_type: data.groupDetails[0].group_type,
            st_name: data.groupDetails[0].st_name,
            lsg_name: data.groupDetails[0].lsg_name,
            dis_name: data.groupDetails[0].dis_name,
            cop_name: data.groupDetails[0].cop_name,
            gp_ward_no: data.groupDetails[0].gp_ward_no,
            gp_location: data.groupDetails[0].gp_location,
            gp_city: data.groupDetails[0].gp_city,
          };
          form.reset(formset);
          setSelectedCountry(data.groupDetails[0].cntry_name || "");
          setSelectedState(data.groupDetails[0].st_name || "");
          setSelectedDistrict(data.groupDetails[0].dis_name || "");
          setSelectedCorp(data.groupDetails[0].cop_name || "");
          setSelectedLsgd(data.groupDetails[0].lsg_name || "");

          // schoolDetailsform
          if (data.groupDetails[0].gp_cat_id === 1) {
            const schoolResponse = await fetch(
              `${apiURL}/coordinator/school-details`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if(schoolResponse.status == 200){
              const schoolData = await schoolResponse.json();
            
            if (schoolData.schoolDetails.length > 0) {
              const schooldetails = schoolData.schoolDetails[0]
              setSchoolDetails(schooldetails);
              multiForm.reset({
                value: schooldetails.club_names.split(", "),
                list_of_classes: schooldetails.list_of_classes,
                no_of_students: schooldetails.no_of_students,
                sub_category: schooldetails.gp_cat_name
                
              });
            }}
          }

          // NgoDetailform
          if (data.groupDetails[0].gp_cat_id === 2) {
            const ngoResponse = await fetch(
              `${apiURL}/coordinator/ngo-details`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if(ngoResponse.status == 200){
              const ngoData = await ngoResponse.json();
            
            if (ngoData.ngoDetails.length > 0) {
              
              const ngoset = {
                members: ngoData.ngoDetails[0].no_of_members,
              };

              ngoform.reset(ngoset);
            }}
          }

          // ResidenceDetailform
          if (data.groupDetails[0].gp_cat_id === 3) {
            const residenceResponse = await fetch(
              `${apiURL}/coordinator/residence-details`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if(residenceResponse.status == 200){
              const residenceData = await residenceResponse.json();
              // Check if ResidenceDetails is defined and is an array
              if (residenceData.residenceDetails && Array.isArray(residenceData.residenceDetails) && residenceData.residenceDetails.length > 0) {
                
                setResidenceDetails(residenceData.residenceDetails[0]);
            
                residenceform.reset({
                  no_of_members: residenceData.residenceDetails[0].no_of_members,
                });
              } else {
                console.error('ResidenceDetails is undefined or not an array');
              }
            }
            
          }

          // PromoterDetailform
          if (data.groupDetails[0].gp_cat_id === 4) {
            const promoterResponse = await fetch(
              `${apiURL}/coordinator/promoter-details`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if(promoterResponse.status == 200){
              const promoterData = await promoterResponse.json();

              
              if (promoterData.promoterDetails.length) {
                setPromoterDetails(promoterData.promoterDetails[0]);
                
              const proset = {
                city_name:promoterData.promoterDetails[0].city_name,
                category: promoterData.promoterDetails[0].group_type,
                total_team: promoterData.promoterDetails[0].total_members,
              };

              promoterform.reset(proset);
            }}
          }
          
        
        }
      }
    }
    fetchData();
  }, [token, form, multiForm,ngoform,promoterform,residenceform]);

  const handleAdditionEditClick = () => {
    setIsEditing(true);
  };
  const handleGroupEditClick = () => {
    setgroupIsEditing(true);
  };
  const handlecoordinatorEditClick = () => {
    setcoordinatorIsEditing(true);
  };

  useEffect(() => {
    async function fetchData() {
      if (selectedCountry === "India") {
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
        const dist_id = districts.find(
          (item) => item.dis_name === selectedDistrict
        )?.dis_id;
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
        const corp_id = corporation.find(
          (item) => item.cop_name === selectedCorp
        )?.cop_id;
        const lsgResponse = await fetch(`${apiURL}/lsg/${corp_id}`);
        const lsgData = await lsgResponse.json();
        setLsgd(lsgData.lsg);
      }
    }
    fetchLsgdData();
  }, [selectedCorp, corporation]);

  const handleSubmitGroup = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();


    const apidata_base = {
      name: groupDetails.gp_name,
      categoryId: category
        .find((item) => item.group_type === groupDetails.group_type)
        ?.id.toString(),
      countryId: countries.find((item) => item.cntry_name === groupDetails.cntry_name)
        ?.cntry_id,
      stateId: states.find((item) => item.st_name === groupDetails.st_name)?.st_id || '',
      districtId: districts.find((item) => item.dis_name === groupDetails.dis_name)
        ?.dis_id || '',
      corporationId: corporation
        .find((item) => item.cop_name === groupDetails.cop_name)
        ?.cop_id.toString() || '',
        lsgdId: groupDetails.lsg_name != '' ?  (lsgd.find((item) => item.lsg_name === groupDetails.lsg_name)?.lsg_id) : '',
      wardNo: groupDetails.gp_ward_no || '',
      location: groupDetails.gp_location || '',
      city: groupDetails.gp_city || '',
      province: groupDetails.gp_city || '',
    };


    const apidata_not_kerala = {
      name: groupDetails.gp_name,
      categoryId: category
        .find((item) => item.group_type === groupDetails.group_type)
        ?.id.toString(),
      countryId: countries.find((item) => item.cntry_name === groupDetails.cntry_name)
        ?.cntry_id,
      stateId: states.find((item) => item.st_name === groupDetails.st_name)?.st_id || '',
      
      location: groupDetails.gp_location || '',
    };

    const apidata_not_india = {
      name: groupDetails.gp_name,
      categoryId: category
        .find((item) => item.group_type === groupDetails.group_type)
        ?.id.toString(),
      countryId: countries.find((item) => item.cntry_name === groupDetails.cntry_name)
        ?.cntry_id,
      
        city: groupDetails.gp_city || '',
        province: groupDetails.gp_city || '',
      location: groupDetails.gp_location || '',
    };
    
    const apidata = groupDetails.cntry_name==='India' && groupDetails.st_name === 'Kerala' 
                    ? apidata_base : groupDetails.cntry_name==='India'? apidata_not_kerala : apidata_not_india
    
    
        try {
        const response = await fetch(`${apiURL}/coordinator/updateGroup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(apidata),
        });
  
        if (response.ok) {
          const data = await response.json();
          toast({
            title: "Group details updated successfully.",
          });
          setgroupIsEditing(false); // Exit edit mode after successful update
        } else {
          toast({
            variant: "destructive",
            title: "Oops, Something went wrong!",
            description: "Please try again...",
          });
          console.error("Error updating group details:", response.statusText);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Oops, Something went wrong!",
          description: "Please try again...",
        });
        console.error("Error updating group details:", error);
      }
  };

  const handleSubmitCoordinator = async (e: React.FormEvent) => {
    e.preventDefault();
    const apidata = {
      name: coordinatorDetails.name,
      number: coordinatorDetails.contact,
      profession: coordinatorDetails.profession,
    };
    
    try {
      const response = await fetch(`${apiURL}/coordinator/updateCoordinator`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(apidata),
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Coordinator details updated successfully.",
        });
        setcoordinatorIsEditing(false); // Exit edit mode after successful update
      } else {
        toast({
          variant: "destructive",
          title: "Oops, Something went wrong!",
          description: "Please try again...",
        });
        console.error(
          "Error updating coordinator details:",
          response.statusText
        );
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops, Something went wrong!",
        description: "Please try again...",
      });
      console.error("Error updating coordinator details:", error);
    }
  };

  async function handleAdditionSubmit(values: any) {
    
    // school submit
    if(additionalmode ===1 ){
      const selectedClubIds = clubOptions
        .filter((club) => values.value.includes(club.name))
        .map((club) => club.id);
  
      const apischooldata = {
        clubs: selectedClubIds.toString(),
        list_of_classes: values.list_of_classes,
        no_of_students: values.no_of_students,
        subCategoryId: subcategoryOptions.find((item) => item.gp_cat_name === values.sub_category)?.gp_cat_id
      };

      try {
        const response = await fetch(`${apiURL}/coordinator/updateSchool`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(apischooldata),
        });
  
        if (response.ok) {
          const data = await response.json();
          toast({
            title: "Additional details updated successfully.",
          });
          setIsEditing(false); // Exit edit mode after successful update
        } else {
          toast({
            variant: "destructive",
            title: "Oops, Something went wrong!",
            description: "Please try again...",
          });
          console.error("Error updating school details:", response.statusText);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Oops, Something went wrong!",
          description: "Please try again...",
        });
        console.error("Error updating school details:", error);
      }

    }

    // ngo submit

    if(additionalmode===2){
      const apingodata = {
        
        members: values.members,
      };
  
      try {
        const response = await fetch(`${apiURL}/coordinator/updateNgo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(apingodata),
        });
  
        if (response.ok) {
          const data = await response.json();
          toast({
            title: "Additional details updated successfully.",
          });
          setIsEditing(false); // Exit edit mode after successful update
        } else {
          toast({
            variant: "destructive",
            title: "Oops, Something went wrong!",
            description: "Please try again...",
          });
          console.error("Error updating school details:", response.statusText);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Oops, Something went wrong!",
          description: "Please try again...",
        });
        console.error("Error updating school details:", error);
      }
    }

    // residence submit

    if(additionalmode===3){
      const apiresdata = {
        
        members: values.no_of_members,
      };
  
      try {
        const response = await fetch(`${apiURL}/coordinator/updateResidence`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(apiresdata),
        });
  
        if (response.ok) {
          const data = await response.json();
          toast({
            title: "Additional details updated successfully.",
          });
          setIsEditing(false); // Exit edit mode after successful update
        } else {
          toast({
            variant: "destructive",
            title: "Oops, Something went wrong!",
            description: "Please try again...",
          });
          console.error("Error updating school details:", response.statusText);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Oops, Something went wrong!",
          description: "Please try again...",
        });
        console.error("Error updating school details:", error);
      }
    }

    // promoter submit

    if(additionalmode===4){
      const apipromoterdata = {
        cityName:values.city_name,
        categoryId:category.find((item) => item.group_type === values.category)?.id,
        totalMembers:values.total_team,
      };

      try {
        const response = await fetch(`${apiURL}/coordinator/updatePromoter`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(apipromoterdata),
        });
  
        if (response.ok) {
          const data = await response.json();
          toast({
            title: "Additional details updated successfully.",
          });
          setIsEditing(false); // Exit edit mode after successful update
        } else {
          toast({
            variant: "destructive",
            title: "Oops, Something went wrong!",
            description: "Please try again...",
          });
          console.error("Error updating school details:", response.statusText);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Oops, Something went wrong!",
          description: "Please try again...",
        });
        console.error("Error updating school details:", error);
      }
    }
  }

  return (
    <>
      <NavigationBar />
      <div className="container w-full justify-center mt-6">
        <div className="md:flex gap-6">
          {/* Form 1 */}
          <Form {...form}>
      <div className="w-full md:w-1/2 mb-4 md:mb-0 rounded-lg border-1 border-black shadow-xl bg-light-gray">
        <div className="card p-3">
          <form noValidate onSubmit={handleSubmitGroup}>
            <div className="flex items-center mb-3 gap-5">
              <h2 className="mb-0 text-left text-xl font-bold">
                Group details
              </h2>
              <button
                type="button"
                className="btn text-primary bg-light-gray py-3 px-4 rounded-lg btn-lg shadow-lg ml-auto"
                onClick={handleGroupEditClick}
              >
                Edit
              </button>
            </div>

            {selectedCountry && (
              <FormField
                name="gp_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={groupDetails.gp_name}
                        onChange={handleInputChange}
                        disabled={!isGroupEditing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {selectedCountry && (
              <FormField
                name="group_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={(value) => handleSelectChange('group_type', value)}
                      defaultValue={field.value}
                      disabled={true}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {category.map((cat) => (
                          <SelectItem key={cat.id} value={cat.group_type}>
                            {cat.group_type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {selectedCountry && (
              <FormField
                name="cntry_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={(value) => handleSelectChange('cntry_name', value)}
                      defaultValue={field.value}
                      disabled={!isGroupEditing}
                    >
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
            )}

            {selectedCountry === 'India' && (
              <FormField
                name="st_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <Select
                      onValueChange={(value) => handleSelectChange('st_name', value)}
                      defaultValue={field.value}
                      disabled={!isGroupEditing}
                    >
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
                name="dis_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District</FormLabel>
                    <Select
                      onValueChange={(value) => handleSelectChange('dis_name', value)}
                      defaultValue={field.value}
                      disabled={!isGroupEditing}
                    >
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

            {selectedState === 'Kerala' && (
              <FormField
                name="cop_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Corporation/Municipality/Block Panchayat</FormLabel>
                    <Select
                      onValueChange={(value) => handleSelectChange('cop_name', value)}
                      defaultValue={field.value}
                      disabled={!isGroupEditing}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an Option" />
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

            {selectedState === 'Kerala' && selectedCorp !== '' && (
              <FormField
                name="lsg_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LSGD / Zone</FormLabel>
                    <Select
                      onValueChange={(value) => handleSelectChange('lsg_name', value)}
                      defaultValue={field.value}
                      disabled={!isGroupEditing}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an LSG" />
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
                )}
              />
            )}

            {selectedState === 'Kerala' && (
              <FormField
                name="gp_ward_no"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ward Number</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        value={groupDetails.gp_ward_no}
                        onChange={handleInputChange}
                        disabled={!isGroupEditing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          {selectedCountry !== 'India' && (
            <FormField
              name="gp_city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City / Province</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      value={groupDetails.gp_city}
                      onChange={handleInputChange}
                      disabled={!isGroupEditing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />)}

            <FormField
            
              name="gp_location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      
                      value={groupDetails.gp_location}
                      onChange={handleInputChange}
                      disabled={!isGroupEditing}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

                  {isGroupEditing && (
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="btn m-3 text-white bg-primary py-2 px-5 rounded-sm shadow-lg"
                    >
                      Submit
                    </button>
                  </div>
                )}
          </form>
        </div>
      </div>
    </Form>
          {/* Form 2 */}
          <div className="w-full md:w-1/2 mb-4 md:mb-0 rounded-lg border-1 border-black bg-light-gray shadow-xl">
            <div className="card p-3">
              <form onSubmit={handleSubmitCoordinator}>
                <div className="flex items-center mb-3 gap-5">
                  <h2 className="mb-0 text-left text-xl font-bold">
                    Coordinator Details
                  </h2>
                  <button
                    type="button"
                    className="btn text-primary bg-light-gray py-3 px-4 rounded-lg btn-lg shadow-lg ml-auto"
                    onClick={handlecoordinatorEditClick}
                  >
                    Edit
                  </button>
                </div>
                <div className="mb-3 flex gap-3">
                  <label htmlFor="coordinator" className="text-lg w-1/3">
                    Coordinator Name
                  </label>
                  <input
                    type="text"
                    className="h-8 shadow-lg rounded-sm w-2/3"
                    id="coordinator"
                    value={coordinatorDetails.name || ""}
                    disabled={!iscoordinatorEditing}
                    onChange={(e) =>
                      setCoordinatorDetails({
                        ...coordinatorDetails,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3 flex justify-between gap-3">
                  <label htmlFor="contact" className="text-lg w-1/3">
                    Coordinator Contact
                  </label>
                  <input
                    type="text"
                    className="h-8 shadow-lg rounded-sm w-2/3"
                    id="contact"
                    value={coordinatorDetails.contact || ""}
                    disabled={!iscoordinatorEditing}
                    onChange={(e) =>
                      setCoordinatorDetails({
                        ...coordinatorDetails,
                        contact: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3 flex justify-between gap-3">
                  <label htmlFor="profession" className="text-lg w-1/3">
                    Coordinator Profession
                  </label>
                  <input
                    type="text"
                    className="h-8 shadow-lg rounded-sm w-2/3"
                    id="profession"
                    value={coordinatorDetails.profession || ""}
                    disabled={!iscoordinatorEditing}
                    onChange={(e) =>
                      setCoordinatorDetails({
                        ...coordinatorDetails,
                        profession: e.target.value,
                      })
                    }
                  />
                </div>
                {iscoordinatorEditing && (
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="btn text-white bg-primary py-2 px-5 rounded-sm shadow-lg"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </form>
            </div>
            {/* form 3 */}
            <div className="card p-3">
            {additionalmode === 1 && (
                <Form {...multiForm}>
                <form
                  className=""
                  onSubmit={multiForm.handleSubmit(handleAdditionSubmit)}
                >
                  <div className="flex items-center mb-3 gap-5">
                    <h2 className="mb-0 text-left text-xl font-bold">
                      Additional details
                    </h2>
                    <button
                      type="button"
                      className="btn text-primary bg-light-gray py-3 px-4 rounded-lg btn-lg shadow-lg ml-auto"
                      onClick={handleAdditionEditClick}
                    >
                      Edit
                    </button>
                  </div>
                  {schoolDetails && (
                    <div className="mb-3 flex gap-3">
                      <FormField
                        control={multiForm.control}
                        name="value"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>List of clubs in your school</FormLabel>
                            <MultiSelector
                              onValuesChange={field.onChange}
                              values={field.value}
                            >
                              <MultiSelectorTrigger className="shadow-xl rounded-md px-4 py-1 border-0">
                                <MultiSelectorInput
                                  placeholder="Select clubs"
                                  disabled={!isEditing}
                                />
                              </MultiSelectorTrigger>
                              <MultiSelectorContent>
                                <MultiSelectorList>
                                  {clubOptions.map((club) => (
                                    <MultiSelectorItem
                                      key={club.id}
                                      value={club.name}
                                    >
                                      {club.name}
                                    </MultiSelectorItem>
                                  ))}
                                </MultiSelectorList>
                              </MultiSelectorContent>
                            </MultiSelector>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  {schoolDetails && (
                    <div className="mb-3 flex justify-between gap-3">
                      <FormField
                        control={multiForm.control}
                        name="no_of_students"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of students this year</FormLabel>
                            <FormControl className="shadow-xl rounded-md px-4 py-1 border-0">
                              <Input
                                type="number"
                                placeholder=""
                                {...field}
                                disabled={!isEditing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  {schoolDetails && (
                    <div className="mb-3 flex justify-between gap-3">
                      <FormField
                        control={multiForm.control}
                        name="list_of_classes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>List of classes</FormLabel>
                            <FormControl className="shadow-xl rounded-md px-4 py-1 border-0">
                              <Input
                                placeholder=""
                                {...field}
                                disabled={!isEditing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  
            <FormField
            
                 control={multiForm.control}
                 

                  name="sub_category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Category</FormLabel>
                      <Select  {...field} onValueChange={(value) =>field.onChange(value)} defaultValue={field.value} disabled={!isEditing}>
                        <FormControl className=" rounded-md px-4  border-0">
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {subcategoryOptions.map((cat) => (
                          <SelectItem key={cat.gp_cat_id} value={cat.gp_cat_name}>
                            {cat.gp_cat_name}
                          </SelectItem>
                        ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                  {isEditing && (
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="btn justify-center text-white bg-primary py-2 px-5 rounded-lg shadow-lg"
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </form>
            </Form>
              
            )}
            {additionalmode ===2 && (
              <Form {...form}>
              <form
                noValidate
                onSubmit={ngoform.handleSubmit(handleAdditionSubmit)}
                className="space-y-8"
              >
                <div className="flex items-center mb-3 gap-5">
                    <h2 className="mb-0 text-left text-xl font-bold">
                      Additional details
                    </h2>
                    <button
                      type="button"
                      className="btn text-primary bg-light-gray py-3 px-4 rounded-lg btn-lg shadow-lg ml-auto"
                      onClick={handleAdditionEditClick}
                    >
                      Edit
                    </button>
                  </div>
                <div className="mb-3 flex justify-between gap-3">
                      <FormField
                        control={ngoform.control}
                        name="members"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Team members</FormLabel>
                            <FormControl className="shadow-xl rounded-md px-4 py-1 border-0">
                              <Input
                                type="number" 
                                {...field}
                                disabled={!isEditing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                
                    {isEditing && (
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="btn justify-center text-white bg-primary py-2 px-5 rounded-lg shadow-lg"
                      >
                        Submit
                      </button>
                    </div>
                  )}
              </form>
            </Form>
            )}
            {additionalmode ===3 && (
              <Form {...form}>
              <form
                noValidate
                onSubmit={residenceform.handleSubmit(handleAdditionSubmit)}
                className="space-y-8"
              >
                <div className="flex items-center mb-3 gap-5">
                    <h2 className="mb-0 text-left text-xl font-bold">
                      Additional details
                    </h2>
                    <button
                      type="button"
                      className="btn text-primary bg-light-gray py-3 px-4 rounded-lg btn-lg shadow-lg ml-auto"
                      onClick={handleAdditionEditClick}
                    >
                      Edit
                    </button>
                  </div>
                  {residenceDetails && (
                <div className="mb-3 flex justify-between gap-3">
                      <FormField
                        control={residenceform.control}
                        name="no_of_members"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Team members</FormLabel>
                            <FormControl className="shadow-xl rounded-md px-4 py-1 border-0">
                              <Input
                                type="number" 
                                {...field}
                                disabled={!isEditing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>)}
                
                    {isEditing && (
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="btn justify-center text-white bg-primary py-2 px-5 rounded-lg shadow-lg"
                      >
                        Submit
                      </button>
                    </div>
                  )}
              </form>
            </Form>
            )}
            {additionalmode ===4 && (
              <Form {...form}>
              <form
                noValidate
                onSubmit={promoterform.handleSubmit(handleAdditionSubmit)}
                className="space-y-8"
              >
                <div className="flex items-center mb-3 gap-5">
                    <h2 className="mb-0 text-left text-xl font-bold">
                      Additional details
                    </h2>
                    <button
                      type="button"
                      className="btn text-primary bg-light-gray py-3 px-4 rounded-lg btn-lg shadow-lg ml-auto"
                      onClick={handleAdditionEditClick}
                    >
                      Edit
                    </button>
                  </div>
                  {promoterDetail && (<div className="mb-3 flex justify-between gap-3">
                      <FormField
                        control={promoterform.control}
                        name="city_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City Name</FormLabel>
                            <FormControl className="shadow-xl rounded-md px-4 py-1 border-0">
                              <Input
                                type="text" 
                                {...field}
                                disabled={!isEditing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                </div>)}
                
                {promoterDetail && (
                <div className="">
                <FormField
                  control={promoterform.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Promoting Category {promoterDetail.group_type}</FormLabel>
                      <Select {...field} onValueChange={field.onChange} defaultValue={field.value} disabled={!isEditing}>
                        <FormControl className=" rounded-md px-4  border-0">
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a category" />
                          </SelectTrigger>
                        </FormControl>
                         <SelectContent> 
                          {category.map((category) =>
                            category.group_type !== "Promoter" ? (
                              <SelectItem key={category.id} value={category.group_type}>
                                {category.group_type}
                              </SelectItem>
                            ) : (
                              ""
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>
                )}
                <div className="mb-3 flex justify-between gap-3">
                      <FormField
                        control={promoterform.control}
                        name="total_team"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Team members</FormLabel>
                            <FormControl className="shadow-xl rounded-md px-4 py-1 border-0">
                              <Input
                                type="number" 
                                {...field}
                                disabled={!isEditing}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                </div>
                
                    {isEditing && (
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="btn justify-center text-white bg-primary py-2 px-5 rounded-lg shadow-lg"
                      >
                        Submit
                      </button>
                    </div>
                  )}
              </form>
            </Form>
            )}
           </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailsEdit;
