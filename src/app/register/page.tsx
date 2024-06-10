"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { cn } from "@/lib/utils"

import { Check, ChevronsUpDown } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { apiURL } from "@/app/requestsapi/request";
import { useToast } from "@/components/ui/use-toast"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import NavigationBar from "@/components/navigationBar";
import Footer from "@/components/footer";
import NgoAdditionalDetails from "./ngo-additional-details/page";

const formSchema = z.object({
  categoryId: z.string(),
  name: z.string().max(255),
  location: z.string().max(255),
  coordinator_name: z.string().max(255),
  whatsapp_number: z.coerce.number(),
  profession: z.string().max(255),
  country: z.string(),
  state: z.string().optional(),
  district: z.string().optional(),
  lsg: z.string().optional(),
  city: z.string().optional(),
  username: z.string().max(255),
  password: z.string().max(255),
})

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

export default function Register() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [lsgd, setLsgd] = useState<Lsgd[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  useEffect(() => {
    async function fetchData() {
      const countryResponse = await fetch(`${apiURL}/country`);
      const countryData = await countryResponse.json();
      setCountries(countryData.country);
      const categoryResponse = await fetch(`${apiURL}/category`);
      const categoryData = await categoryResponse.json();
      setCategory(categoryData.category);
    }
    fetchData();
  }, []);

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
    async function fetchLsgdData() {
      if (selectedDistrict) {
        const dist_id = districts.find((item) => item.dis_name === selectedDistrict)?.dis_id;
        const lsgResponse = await fetch(`${apiURL}/lsg/${dist_id}`);
        const lsgData = await lsgResponse.json();
        setLsgd(lsgData.district);
      }
    }
    fetchLsgdData();
  }, [selectedDistrict, districts]);

  const router = useRouter()


  async function onSubmit(values: z.infer<typeof formSchema>) {
    const country_id = countries.find((item) => item.cntry_name === values.country)?.cntry_id;
    const lsgd_id = lsgd.find((item) => item.lsg_name === values.lsg)?.lsg_id;
    const dataWithIds = {
      ...values,
      categoryId: category.find((item) => item.group_type === values.categoryId)?.id.toString(),
      country: country_id!.toString(),
      state: states.find((item) => item.st_name === values.state)?.st_id,
      district: districts.find((item) => item.dis_name === values.district)?.dis_id,
      lsg: lsgd_id,
      whatsapp_number: values.whatsapp_number.toString(),
      city: values.city || 'city',
      province: values.city || 'province',
    };
    console.log(dataWithIds);

    try {
      const response = await fetch(`${apiURL}/coordinator/register`, {
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
      const { group_id } = result;
      toast({
        title: "Registeration Successful! .",
        description: "We've created your account for you.Please fill further details.",
      })


      if (values.categoryId === "NGO")
        router.push("/register/ngo-additional-details?group_id=" + group_id);
      else if (values.categoryId === "School")
        router.push("/register/school-additional-details?group_id=" + group_id + "&pno=" + values.whatsapp_number);
      else if (values.categoryId === "Residence Association")
        router.push("/register/residenceass_additional_details?group_id=" + group_id);
      else
        router.push("/register/promoter-additional-details?group_id=" + group_id);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops, Something went wrong!",
        description: "Please try again...",
      })
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
              Create a group account
            </h1>
            <Form {...form}>
              <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {category.map((category) => (
                            <SelectItem key={category.id} value={category.group_type}>
                              {category.group_type}
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="coordinator_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coordinator name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="whatsapp_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Whatsapp number</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="profession"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profession</FormLabel>
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
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
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
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  )
}
