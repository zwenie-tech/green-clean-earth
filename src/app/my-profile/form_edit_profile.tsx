"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { apiURL, fetchUserData } from "@/app/requestsapi/request";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

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

export function FormEditProfile() {
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
  const searchParams = useSearchParams();
  const user_id = searchParams.get("id");
  const router = useRouter();
  const token = Cookies.get('token');


  const us_name = Cookies.get('name');
  const us_email = Cookies.get('email');
  const us_profile_description = Cookies.get('profileDescription');
  const us_mobile = Cookies.get('mobile');
  const cntry_name = Cookies.get('country');
  const st_name = Cookies.get('state');
  const dis_name = Cookies.get('district');
  const cop_name = Cookies.get('corporation');
  const lsg_name = Cookies.get('lsg');
  const us_ward = Cookies.get('ward');
  const us_city = Cookies.get('city');
  const us_address = Cookies.get('address');
  const us_gender = Cookies.get('gender');


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
            ward: us_ward || "",
            city: us_city || "",
            address: us_address,
            gender: us_gender || "",
          });
          setSelectedCountry(cntry_name);
          setSelectedState(st_name || "");
          setSelectedDistrict(dis_name || "");
          setSelectedCorp(cop_name || "");
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
      lsgd: parseInt(values.lsg) || 0
    };

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
              <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }:any) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="profileDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Description</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
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
                {selectedState === 'Kerala' && (
                  <FormField
                    control={form.control}
                    name="lsg"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LSGD / Zone</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a LSG" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {lsgd.map((lsg) => (
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
                        <Input type="number" {...field} />
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
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile number</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                {/* <FormField
                  control={form.control}
                  name="referralcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Referral Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Referral Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <Button type="submit" className="w-full">Update</Button>
              </form>
            </Form>
  )
}
