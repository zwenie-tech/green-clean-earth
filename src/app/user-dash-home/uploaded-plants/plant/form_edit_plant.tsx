"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { apiURL } from "@/app/requestsapi/request";
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
import { cn } from "@/lib/utils";
import { BsImages, BsPaperclip } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { uploadActivityData } from "@/app/requestsapi/request";
import { useToast } from "@/components/ui/use-toast";
import imageCompression from "browser-image-compression";

const MAX_FILE_SIZE = 1024 * 1024 * 100; // 100MB
const TARGET_FILE_SIZE = 1024 * 1024 * 4; // 4MB
const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];


const formSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email().max(255),
  mobile: z.coerce.number().gte(1).lte(9999999999),
  country: z.string(),
  state: z.string().optional(),
  district: z.string().optional(),
  corporation: z.string().optional(),
  ward: z.string().optional(),
  lsg: z.string().optional(),
  city: z.string().optional(),
  address: z.string(),
  gender: z.string(),
  profileDescription: z.string(),
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

interface ActivitiesTabProps {
  token: string;
}

export function FormEditPlant({ token }: ActivitiesTabProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { toast } = useToast();
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [lsgd, setLsgd] = useState<Lsgd[]>([]);
  const [corporation, setCorporation] = useState<Corp[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [selectedLsgd, setSelectedLsgd] = useState("");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: us_name,
            email: us_email,
            profileDescription: us_profile_description || "",
            mobile: parseInt(us_mobile!) || 0,
            country: cntry_name,
            state: st_name || "",
            district: dis_name || "",
            corporation: cop_name || "",
            lsg: lsg_name || "",
            ward: us_ward || "",
            city: us_city || "",
            address: us_address,
            gender: us_gender || "",
    },
  });

  useEffect(() => {
    async function fetchData() {
      if (user_id && token) {
        const data = await fetchUserData(user_id, token);
        if (data.user) {
          const { us_name, us_address, us_mobile, us_email, us_district, us_city, cntry_name, st_name, dis_name, cop_name, lsg_name, us_ward, us_gender, us_profile_description } = data.user[0];
          form.reset({
            name: us_name,
            email: us_email,
            profileDescription: us_profile_description || "",
            mobile: parseInt(us_mobile),
            country: cntry_name,
            state: st_name || "",
            district: dis_name || "",
            corporation: cop_name || "",
            lsg: lsg_name || "",
            ward: us_ward.toString() || "",
            city: us_city || "",
            address: us_address,
            gender: us_gender || "",
          });
          setSelectedCountry(cntry_name);
          setSelectedState(st_name || "");
          setSelectedDistrict(dis_name || "");
          setSelectedCorp(cop_name || "");
          console.log(data.user[0])
          setSelectedLsgd(lsg_name || "");
        }
      }

      const countryResponse = await fetch(`${apiURL}/country`);
      const countryData = await countryResponse.json();
      setCountries(countryData.country);
    }
    fetchData();
  }, [user_id, token, form]);

  useEffect(() => {
    async function fetchData() {
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
        console.log(lsgData);
        setLsgd(lsgData.lsg);
      }
    }
    fetchLsgdData();
  }, [selectedCorp, corporation]);

  async function onSubmit(values: any) {
    
    const dataWithIds = {
      name: values.name,
      email: values.email,
      profileDescription: values.profileDescription,
      mobileNumber: values.mobile.toString(),
      countryId: countries.find((item) => item.cntry_name === values.country)?.cntry_id,
      stateId: states.find((item) => item.st_name === values.state)?.st_id?.toString(),
      city: values.city,
      province: values.province || '',
      corporation: corporation.find((item) => item.cop_name === values.corporation)?.cop_id?.toString(),
      address: values.address,
      gender: values.gender,
      districtId: districts.find((item) => item.dis_name === values.district)?.dis_id?.toString(),
      wardNo: parseInt(values.ward) || 0,
      lsgd: lsgd.find((item) => item.lsg_name === values.lsg)?.lsg_id || 0
    };
    console.log(values.lsg);
    try {
      const response = await fetch(`${apiURL}/user/updateProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(dataWithIds),
      });
      if (!response.ok) {
        console.log(response)
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Profile Successfully Updated.",
          description: "",
        });
        // router.push("/my-profile?id=" + user_id);
        location.reload();
      } else {
        throw new Error(result.message || "Failed to update profile");
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

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-2 h-[calc(80vh-50px)]">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Items</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.activity_category_id} value={category.activity_category}>
                      {category.activity_category}
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
          name="sub_category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {subCategories.map((subCategory) => (
                    <SelectItem key={subCategory.id} value={subCategory.name}>
                      {subCategory.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="activity_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activity Title</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="short_desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="social_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Social Media Link</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary w-[100%]">
          Submit
        </Button>
      </form>
    </Form>
  )
}
