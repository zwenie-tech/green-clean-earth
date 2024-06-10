"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
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
import { apiURL } from "@/app/requestsapi/request";

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import NavigationBar from "@/components/navigationBar";
import Footer from "@/components/footer";
import { useSearchParams,useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object(
  {
    "total_team":z.coerce.number(),
  })

function ResidenceAssAdditionalDetailsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  // const [countries, setCountries] = useState([]);
  // const [states, setStates] = useState([]);
  // const [districts, setDistricts] = useState([]);
  // const [category, setCategory] = useState([]);
  // const [lsgd, setLsgd] = useState([]);
  // const [selectedDistrict, setSelectedDistrict] = useState("");

  
  // useEffect(() => {
  //   async function fetchData() {
  //     const countryResponse = await fetch(`${apiURL}/country`);
  //     const countryData = await countryResponse.json();
  //     setCountries(countryData.country);

  //     const stateResponse = await fetch(`${apiURL}/state`);
  //     const stateData = await stateResponse.json();
  //     setStates(stateData.state);

  //     const districtResponse = await fetch(`${apiURL}/district`);
  //     const districtData = await districtResponse.json();
  //     setDistricts(districtData.district);

  //     const categoryResponse = await fetch(`${apiURL}/category`);
  //     const categoryData = await categoryResponse.json();
  //     setCategory(categoryData.category);
  //   }
  //   fetchData();
  // }, []);

  
  // useEffect(() => {
  //   async function fetchLsgdData() {
  //     if (selectedDistrict) {
  //       console.log(selectedDistrict);
  //       const lsgResponse = await fetch(`${apiURL}/lsg/${selectedDistrict}`);
  //       const lsgData = await lsgResponse.json();
  //       setLsgd(lsgData.district);
  //     }
  //   }
  //   fetchLsgdData();
  // }, [selectedDistrict]);

  
// get group id from the url parameter
const searchParams = useSearchParams();

const group_id = searchParams.get("group_id");
const router = useRouter()
const { toast } = useToast()
const onSubmit = async (values: z.infer<typeof formSchema>) => {
  console.log(values);
  const dataWithIds = {
    // countryId : countries.find((item) => item.cntry_name === values.country)?.cntry_id,
    // stateId : states.find((item) => item.st_name === values.state)?.st_id,
    // districtId : districts.find((item) => item.dis_name === values.district)?.dis_id,
    // lsgdId : lsgd.find((item) => item.lsg_name === values.lsgdzone)?.lsg_id,
    totalNoOfMembers : values.total_team,
    groupId: parseInt(group_id!),
   

  };
  console.log(dataWithIds);

  try {
    const response = await fetch(`${apiURL}/group/residence_association/register`, {
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
      })
      router.push("/login/coordinator");
    }
    console.log(result);
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Oops,Something went wrong !",
      description: "Please try again...",
    })
    console.error("Error:", error);
  }
};

  return (
    <section className="bg-green-50 dark:bg-gray-900">
      <NavigationBar />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 mt-8">
        {/* <h1 className="flex items-center my-6 text-2xl font-bold text-green-600 dark:text-white">
          GreenCleanEarth
        </h1> */}
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Residence Association - Additional details
              </h1>
          <Form {...form}>
            <form  noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
                  <FormField
                    control={form.control}
                    name="total_team"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total number of team members</FormLabel>
                        <FormControl>
                          <Input  type="number" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              <Button type="submit" className="bg-green-600">Submit</Button>
            </form>
          </Form>
    </div>
      </div>
  </div>
  <Footer/>
</section>
  )
}

export default function ResidenceAssAdditionalDetails() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResidenceAssAdditionalDetailsForm />
    </Suspense>
  );
}