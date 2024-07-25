"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { apiURL, fetchClubData } from "@/app/requestsapi/request";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

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
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/extension/multi-select";

const MAX_FILE_SIZE = 1024 * 1024 * 100; // 100MB
const TARGET_FILE_SIZE = 1024 * 1024 * 4; // 4MB
const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];


const formSchema = z.object({
  country: z.string(),
  state: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  corporation: z.string().optional(),
  lsg: z.string().optional(),
  ward: z.string().optional(),
  landmark: z.string(),
  clubs: z.string(),
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
interface Club {
  id: string;
  name: string;
}

export function FormEditPlant() {
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
  const [selectedClub, setSelectedClub] = useState("");
  const [clubOptions, setClubOptions] = useState<Club[]>([]);
  const token = Cookies.get('token');


  const tree_id = Cookies.get('treeId');
  const cntry_name = Cookies.get('country');
  const st_name = Cookies.get('state');
  const dis_name = Cookies.get('district');
  const cop_name = Cookies.get('corporation');
  const lsg_name = Cookies.get('lsg');
  const us_ward = Cookies.get('ward');
  const us_city = Cookies.get('city');
  const club = Cookies.get('source');
  const landmark = Cookies.get('landmark');

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
            country: cntry_name,
            state: st_name || "",
            district: dis_name || "",
            corporation: cop_name || "",
            lsg: lsg_name || "",
            ward: us_ward || "",
            city: us_city || "",
            landmark: landmark || "",
            clubs: club || "",
    },
  });

  
  useEffect(() => {
    async function fetchData() {
      if (tree_id && token) {
        const response = await fetch(`${apiURL}/uploads/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result: any = await response.json();
        if (result.success) {
          const selectedPlant = result.Uploads.find((p: { up_id: number; }) => p.up_id === parseInt(tree_id!));
          if(selectedPlant){
          const {cntry_name,st_name,city,dis_name,cop_name,lsg_name,up_ward,source_name,up_landmark_details}:any = selectedPlant;
          
            form.reset({
              
              country: cntry_name,
              state: st_name || "",
              district: dis_name || "",
              corporation: cop_name || "",
              lsg: lsg_name || "",
              ward: up_ward || "",
              city: city || "",
              clubs: source_name || "",
              landmark: up_landmark_details || "",
            });
            setSelectedCountry(cntry_name);
            setSelectedState(st_name || "");
            setSelectedDistrict(dis_name || "");
            setSelectedCorp(cop_name || "");
            setSelectedLsgd(lsg_name || "");
            setSelectedClub(source_name || "")
          }
      }
      }

      const countryResponse = await fetch(`${apiURL}/country`);
      const countryData = await countryResponse.json();
      setCountries(countryData.country);
    }
    fetchData();
  }, [tree_id, token, form]);

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

  async function onSubmit(values: any) {
    console.log(values);

    const dataWithIds = {
      treeNumber: parseInt(tree_id!),
      countryId: countries.find((item) => item.cntry_name === values.country)?.cntry_id,
      stateId: states.find((item) => item.st_name === values.state)?.st_id,
      city: values.city,
      districtId: districts.find((item) => item.dis_name === values.district)?.dis_id,
      corporationId: corporation.find((item) => item.cop_name === values.corporation)?.cop_id,
      lsgdId: lsgd.find((item) => item.lsg_name === values.lsg)?.lsg_id || 0,
      wardNo: parseInt(values.ward) || 0,
      sourceId: clubOptions.find((item) => item.name === values.clubs)?.id,
      landmark: values.landmark
    };
    console.log(dataWithIds);
    try {
      const response = await fetch(`${apiURL}/uploads/updateDetails`, {
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
          title: "Edited Successfully.",
          description: "",
        });
        // router.push("/my-profile?id=" + user_id);
        location.reload();
      } else {
        throw new Error(result.message || "Failed to edit the form");
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
    <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
        control={form.control}
        name="clubs"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Clubs</FormLabel>
            <Select onValueChange={(value) => {
              field.onChange(value);
              setSelectedClub(value);
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
      {selectedState === 'Kerala' && (
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
      )}
      {selectedState !== 'Kerala' && selectedCountry === 'India' && (
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
      {selectedState === 'Kerala' && (
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
      {selectedState === 'Kerala' && selectedCorp!="" && (
        <FormField
          control={form.control}
          name="lsg"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LSGD / Zone</FormLabel>
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
        control={form.control}
        name="ward"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ward Number</FormLabel>
            <FormControl>
              <Input type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
        
      )}
      {selectedCountry != 'India' && (
      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>City / Province</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    )}
    <FormField
        control={form.control}
        name="landmark"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Landmark</FormLabel>
            <FormControl>
              <Input type="text" {...field} required/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
     
      <Button type="submit" className="w-full">Update</Button>
    </form>
  </Form>
  )
}
