"use client";

import { useEffect, useState, Suspense } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
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
import { apiURL } from "@/app/requestsapi/request";
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NavigationBar from "@/components/navigationBar";
import Footer from "@/components/footer";
import { useSearchParams } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast";

// Define types for the data
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
  lsgd_id: number;
  lsg_name: string;
}

const formSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email().max(255),
  mobile: z.coerce.number().gte(1).lte(9999999999),
  country: z.string(),
  state: z.string().optional(),
  district: z.string().optional(),
  lsg: z.string().optional(),
  city: z.string().optional(),
  address: z.string(),
  gender: z.string(),
  password: z.string().max(255),
  referralcode: z.string().min(1).max(255),
});

function UserRegisterForm() {
  const { toast } = useToast();
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [lsgd, setLsgd] = useState<Lsgd[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      country: "",
      state: "",
      district: "",
      lsg: "",
      city: "",
      address: "",
      referralcode: "",
      password: "",
      gender: "",
    },
  });

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
  }, []);

  useEffect(() => {
    async function fetchLsgdData() {
      if (selectedDistrict) {
        const dist_id = districts.find((item) => item.dis_name === selectedDistrict)?.dis_id;
        if (dist_id) {
          const lsgResponse = await fetch(`${apiURL}/lsg/${dist_id}`);
          const lsgData = await lsgResponse.json();
          setLsgd(lsgData.district);
        }
      }
    }
    fetchLsgdData();
  }, [selectedDistrict, districts]);

  const searchParams = useSearchParams();
  const group_id = searchParams.get("id");
  const ref = searchParams.get("ref");

  useEffect(() => {
    if (ref) {
      //ts.ignore
      form.setValue("referralcode", ref as string);
    }
  }, [ref, form]);

  const router = useRouter();

  async function onSubmit(values: any) {
    const dataWithIds = {
      name: values.name,
      email: values.email,
      address: values.address,
      gender: values.gender,
      password: values.password,
      referalCode: values.referralcode,
      countryId: countries.find((item) => item.cntry_name === values.country)?.cntry_id,
      stateId: states.find((item) => item.st_name === values.state)?.st_id.toString(),
      districtId: districts.find((item) => item.dis_name === values.district)?.dis_id,
      mobileNumber: values.mobile.toString(),
      userPhoto: '',
      profileDescription: '',
    };
    console.log(dataWithIds);
    try {
      const response = await fetch(`${apiURL}/user/${group_id}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataWithIds),
      });
      if (!response.ok) {
        console.log(response);
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (result) {
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
        });
        router.push("/login/user");
      }
      console.log(result);
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
    <section className="bg-green-50 dark:bg-gray-900">
      <NavigationBar />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 mt-8">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create user account
            </h1>
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
                  render={({ field }) => (
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
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedCountry(value);
                      }} value={field.value}>
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
                        }} value={field.value}>
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
                        }} value={field.value}>
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
                    control={form.control}
                    name="lsg"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LSGD</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose an LSGD" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {lsgd.map((item) => (
                              <SelectItem key={item.lsgd_id} value={item.lsg_name}>
                                {item.lsg_name}
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
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City / Province</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
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
                />
                <FormField
                  control={form.control}
                  name="referralcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Referral code</FormLabel>
                      <FormControl>
                        <Input placeholder="Referral code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Register</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default function UserRegister() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserRegisterForm />
    </Suspense>
  );
}
