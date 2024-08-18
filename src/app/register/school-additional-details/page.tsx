"use client";

import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/extension/multi-select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import NavigationBar from "@/components/navigationBar";
import { Input } from "@/components/ui/input";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { apiURL } from "@/app/requestsapi/request";
import { fetchClubData } from "@/app/requestsapi/request";
import Footer from "@/components/footer";
import axios from "axios";
import Cookies from 'js-cookie';

const formSchema = z.object({
  value: z.array(z.string()).nonempty("Please select at least one club"),
  no_of_students: z.coerce.number(),
  total_classes: z.coerce.number().gte(1).lte(999),
  list_of_classes:z.string(),
  category: z.string().nonempty("Please select a category"),
  schooltype: z.string().nonempty("Please select a type"),
  class: z.string().nonempty("Please select a class"),
  edudistrict: z.string().nonempty("Please select a edudistrict").optional(),
  edusubdistrict: z.string().nonempty("Please select a edusubdistrict").optional(),
  sahodaya: z.string().nonempty("Please select a sahodaya").optional(),
  icdsblock: z.string().nonempty("Please select a sahodaya").optional(),
  icdsproject: z.string().nonempty("Please select a sahodaya").optional(),
  missionchapter: z.string().nonempty("Please select a chapter").optional(),
  missionzone: z.string().nonempty("Please select a zone").optional(),
});

type FormSchema = z.infer<typeof formSchema>;

interface Club {
  id: string;
  name: string;
}
interface Class {
  class_id: string;
  class: string;
}
interface SchoolType {
  id: string;
  type_name: string;
}
interface Category {
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

type Row = {
  schooltype: string;
  edudistrict: string;
  edusubdistrict: string;
  sahodaya: string;
  icdsblock: string;
  icdsproject: string;
  missionchapter: string;
  missionzone: string;
  category: string;
  class: string;
  list_of_classes: string[];
};

const MultiSelectZodForm = () => {

  const router = useRouter();
  const { toast } = useToast();
  const [clubOptions, setClubOptions] = useState<Club[]>([]);
  const [classOptions, setClassOptions] = useState<Class[]>([]);
  const [clgOptions, setClgOptions] = useState<Class[]>([]);
  const [schoolType, setSchoolType] = useState<SchoolType[]>([]);
  const [eduDistrict, setEduDistrict] = useState<EduDistrict[]>([]);
  const [sahodaya, setSahodaya] = useState<Sahodaya[]>([]);
  const [icdsBlock, setIcdsBlock] = useState<IcdsBlock[]>([]);
  const [icdsProject, setIcdsProject] = useState<IcdsProject[]>([]);
  const [missionChapter, setMissionChapter] = useState<MissionChapter[]>([]);
  const [missionZone, setMissionZone] = useState<MissionZone[]>([]);
  const [eduSubDistrict, setEduSubDistrict] = useState<EduSubDistrict[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);
  const [selectCategory, setSelectCategory] = useState('');
  const [selectschoolType, setSelectschoolType] = useState('');
  const [selecteduDistrict, setSelecteduDistrict] = useState('');
  const [rows, setRows] = useState<Row[]>([{
    schooltype: '',
    edudistrict: '',
    edusubdistrict: '',
    sahodaya: '',
    icdsblock: '',
    icdsproject: '',
    missionchapter: '',
    missionzone: '',
    category: '',
    class: '',
    list_of_classes: [],
  }]);

  const addRow = () => {
    setRows([...rows, {
      schooltype: '',
      edudistrict: '',
      edusubdistrict: '',
      sahodaya: '',
      icdsblock: '',
      icdsproject: '',
      missionchapter: '',
      missionzone: '',
      category: '',
      class: '',
      list_of_classes: [],
    }]);
  };

  const removeRow = (index: number) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleChange = (index: number, field: keyof Row, value: string | string[]) => {
    const newRows = [...rows];
    if (field === 'list_of_classes') {
      newRows[index][field] = value as string[];
    } else {
      newRows[index][field] = value as string;
    }
    setRows(newRows);
  };
  
  const multiForm = useForm({
    defaultValues: {
      value: [],
      no_of_students: '',
      total_classes: '',
      schooltype: '',
      edudistrict: '',
      edusubdistrict: '',
      sahodaya: '',
      icdsblock: '',
      icdsproject: '',
      missionchapter: '',
      missionzone: '',
      category: '',
      class: '',
      list_of_classes: [],
    },
  });
  
  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)); // Generates ["A", "B", "C", ..., "Z"]

  // Wrap useSearchParams in Suspense
  const searchParams = useSearchParams();

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
    const handleCbse = async () => {
      if(selectschoolType === 'CBSE'){
        try {
          const st_id = Cookies.get('st_id');
          // const eduid = eduDistrict.find((item) => item.edu_district === e)?.edu_district_id
          const response = await axios.get(`${apiURL}/sahodaya/${st_id}`);
          setSahodaya(response.data.sahodayaList);
        } catch (error) {
          console.error("Error fetching data:", error);
        }

      }
      if(selectschoolType === 'ICDS'){
        try {
          const dis_id = Cookies.get('dis_id');
          const response = await axios.get(`${apiURL}/icdsBlock/${dis_id}`);
          setIcdsBlock(response.data.icdsBlockList);
        } catch (error) {
          console.error("Error fetching data:", error);
        }

      }
      if(selectschoolType === 'Malayalam Mission'){
        try {
          const response = await axios.get(`${apiURL}/malayalamMissionChapter`);
          setMissionChapter(response.data.chapterList);
        } catch (error) {
          console.error("Error fetching data:", error);
        }

      }
    }
    handleCbse();
  }, [selectschoolType]);

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
    const fetchClass = async () => {
      try {
        const dis_id = Cookies.get('dis_id');

        const response = await axios.get(`${apiURL}/class/1`);
        const responseclg = await axios.get(`${apiURL}/class/2`);
        const responsetype = await axios.get(`${apiURL}/schoolType`);
        const responseedudistrict = dis_id ? await axios.get(`${apiURL}/eduDistrict/${dis_id}`):null;
        setClassOptions(response.data.classList);
        setClgOptions(responseclg.data.classList);
        setSchoolType(responsetype.data.schoolType);
        responseedudistrict ? setEduDistrict(responseedudistrict.data.eduDistrict): '';

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchClass();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${apiURL}/schoolCategory`);
        
        setCategoryOptions(response.data.subCategory);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };
    fetchCategory();
  }, []);

  const onSubmit = async (data:any) => {
    // Extracting values from searchParams
    const groupId = searchParams.get("group_id");
    const pno = searchParams.get("pno");

    const selectedClubIds = clubOptions
      .filter((club) => data.value.includes(club.name))
      .map((club) => club.id);

     const apidata= { 
        groupId          :parseInt(groupId!),
        clubs            :selectedClubIds.toString(),
        list_of_classes  : data.list_of_classes.toString(),
        no_of_students   : parseInt(data.no_of_students),
        phoneNUmber      : parseInt(pno!),
        subCategoryId    : categoryOptions.find((item) => item.gp_cat_name === data.category)?.gp_cat_id,
        schoolTypeId     : schoolType.find((item) => item.type_name === data.schooltype)?.id,
        eduDistrictId    : eduDistrict.find((item) => item.edu_district === data.edudistrict)?.edu_district_id,
        eduSubDistrictId : eduSubDistrict.find((item) => item.edu_sub_district_name === data.edusubdistrict)?.edu_sub_district_id,
        sahodayaId       : sahodaya.find((item) => item.sahodaya_name === data.sahodaya)?.sahodaya_id,
        blockId          : icdsBlock.find((item) => item.block_name === data.icdsblock)?.icds_block_id,
        projectId        : icdsProject.find((item) => item.project_name === data.icdsproject)?.project_id,
        chapterId        : missionChapter.find((item) => item.chapter_name === data.missionchapter)?.chapter_id,
        zoneId           : missionZone.find((item) => item.zone_name === data.missionzone)?.zone_id
    }

    try {
      const response = await fetch(`${apiURL}/group/school/register`, {
        method: "POST",
        body: JSON.stringify(apidata),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (result) {
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
        });
        router.push("/loginform");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops, Something went wrong!",
        description: "Please try again...",
      });
      console.error("Error:", error);
    }
  };

  return (
    <section className="bg-green-50">
      <NavigationBar />
      <h1 className="mt-6 mb-3 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
        School - Additional details   
      </h1>
      <div className="mt-7 container mx-auto p-4 flex flex-col lg:flex-row  items-stretch">
        <div className="w-full lg:w-1/3 flex items-center justify-center">
          <img
            src="/images/planting_trees.jpg"
            alt="Description of image"
            className="w-full h-full object-cover rounded-lg opacity-50"
          />
        </div>
        {/* form */}
        <div className="w-full lg:w-1/3 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center border-2">
      <div className="p-6 w-full">
        <Form {...multiForm}>
          <form
            onSubmit={multiForm.handleSubmit(onSubmit)}
            className="space-y-3 grid gap-3 w-full"
          >
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
                    <MultiSelectorTrigger className="border border-primary">
                      <MultiSelectorInput placeholder="Select clubs" />
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
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
                      <FormField
                        control={multiForm.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Select Category</FormLabel>
                            <FormControl>
                              <select
                                {...field}
                                onChange={(e) => {
                                  
                                  field.onChange(e.target.value);  // Update the form state
                                  setSelectCategory(e.target.value);
                                }}
                                className="w-full px-4 py-2 border rounded-md"
                                required
                              >
                                <option value="">Select a category</option>
                                {categoryOptions.map((category) => (
                                  <option key={category.gp_cat_id} value={category.gp_cat_name}>
                                    {category.gp_cat_name}
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                            <FormDescription> </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    {selectCategory!== 'College' && (<FormField
                        control={multiForm.control}
                        name="schooltype"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Select School Type</FormLabel>
                            <FormControl>
                              <select
                                {...field}
                                onChange={(e) => {
                                  
                                  field.onChange(e.target.value);  // Update the form state
                                  setSelectschoolType(e.target.value);

                                }}
                                className="w-full px-4 py-2 border rounded-md"
                                required
                              >
                                <option value="">Select a type</option>
                                {schoolType.map((s) => (
                                  <option key={s.id} value={s.type_name}>
                                    {s.type_name}
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                            <FormDescription> </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />)}
                    

                       {/* if select schooltype is general education */}
                       {(selectschoolType==='General Education' && selectCategory!== 'College') &&
                      (<>
                          <FormField
                            control={multiForm.control}
                            name="edudistrict"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Select Education District</FormLabel>
                                <FormControl>
                                  <select
                                    {...field}
                                    onChange={(e) => {
                                      field.onChange(e.target.value); // Update the form state
                                      setSelecteduDistrict(e.target.value);
                                      handleEduDistrict(e.target.value);
                                    } }
                                    className="w-full px-4 py-2 border rounded-md"
                                    required
                                  >
                                    <option value="">Select a edudistrict</option>
                                    {eduDistrict && eduDistrict.map((e) => (
                                      <option key={e.edu_district_id} value={e.edu_district}>
                                        {e.edu_district}
                                      </option>
                                    ))}
                                  </select>
                                </FormControl>
                                <FormDescription> </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )} />
                      
                            <FormField
                              control={multiForm.control}
                              name="edusubdistrict"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Select Education Subdistrict</FormLabel>
                                  <FormControl>
                                    <select
                                      {...field}
                                      onChange={(e) => {

                                        field.onChange(e.target.value); // Update the form state
                                        // setSelecteduDistrict(e.target.value);
                                      } }
                                      className="w-full px-4 py-2 border rounded-md"
                                      required
                                    >
                                      <option value="">Select a edudistrict</option>
                                      {eduSubDistrict && eduSubDistrict.map((e) => (
                                        <option key={e.edu_sub_district_id} value={e.edu_sub_district_name}>
                                          {e.edu_sub_district_name}
                                        </option>
                                      ))}
                                    </select>
                                  </FormControl>
                                  <FormDescription> </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )} />
                          </>)
                      }
                      {/* general education fields end here */}
                       {/* if select schooltype is cbse */}
                    {selectschoolType==='CBSE' && selectCategory!== 'College' &&
                      (<>
                          <FormField
                            control={multiForm.control}
                            name="sahodaya"
                            render={({ field }) => (
                              <FormItem>
                                  <FormLabel>Select Sahodaya</FormLabel>

                                <FormControl>
                                  <select
                                    {...field}
                                    onChange={(e) => {

                                      field.onChange(e.target.value); 
                                      // setSelecteduDistrict(e.target.value);
                                    } }
                                    className="w-full px-4 py-2 border rounded-md"
                                    required
                                  >
                                    <option value="">Select a sahodaya</option>
                                    {sahodaya && sahodaya.map((s) => (
                                      <option key={s.sahodaya_id} value={s.sahodaya_name}>
                                        {s.sahodaya_name}
                                      </option>
                                    ))}
                                  </select>
                                </FormControl>
                                <FormDescription> </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )} />
                        
                        </>)
                      }
                      {/* cbse fields end here */}
                       {/* if select schooltype is ICDS */}
                       {selectschoolType==='ICDS' && selectCategory!== 'College' &&
                      (<>
                          <FormField
                            control={multiForm.control}
                            name="icdsblock"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Select ICDS Block</FormLabel>
                                <FormControl>
                                  <select
                                    {...field}
                                    onChange={(e) => {
                                      field.onChange(e.target.value); // Update the form state
                                      // setSelecteduDistrict(e.target.value);
                                      handleIcds(e.target.value);
                                    } }
                                    className="w-full px-4 py-2 border rounded-md"
                                    required
                                  >
                                    <option value="">Select a icds block</option>
                                    {icdsBlock && icdsBlock.map((e) => (
                                      <option key={e.icds_block_id} value={e.block_name}>
                                        {e.block_name}
                                      </option>
                                    ))}
                                  </select>
                                </FormControl>
                                <FormDescription> </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )} />
                        
                            <FormField
                              control={multiForm.control}
                              name="icdsproject"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Select ICDS Project</FormLabel>
                                  <FormControl>
                                    <select
                                      {...field}
                                      onChange={(e) => {

                                        field.onChange(e.target.value); // Update the form state
                                        // setSelecteduDistrict(e.target.value);
                                      } }
                                      className="w-full px-4 py-2 border rounded-md"
                                      required
                                    >
                                      <option value="">Select a icds project</option>
                                      {icdsProject && icdsProject.map((e) => (
                                        <option key={e.project_id} value={e.project_name}>
                                          {e.project_name}
                                        </option>
                                      ))}
                                    </select>
                                  </FormControl>
                                  <FormDescription> </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )} />
                          </>)
                      }
                      {/* icds fields end here */}
                       {/* if select schooltype is malayalam mission */}
                       {selectschoolType==='Malayalam Mission' && selectCategory!== 'College' &&
                      (<>
                          <FormField
                            control={multiForm.control}
                            name="missionchapter"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Select Mission Chapter</FormLabel>
                                <FormControl>
                                  <select
                                    {...field}
                                    onChange={(e) => {
                                      field.onChange(e.target.value); // Update the form state
                                      // setSelecteduDistrict(e.target.value);
                                      handleChapter(e.target.value);
                                    } }
                                    className="w-full px-4 py-2 border rounded-md"
                                    required
                                  >
                                    <option value="">Select a chapter</option>
                                    {missionChapter && missionChapter.map((e) => (
                                      <option key={e.chapter_id} value={e.chapter_name}>
                                        {e.chapter_name}
                                      </option>
                                    ))}
                                  </select>
                                </FormControl>
                                <FormDescription> </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )} />
                        
                            <FormField
                              control={multiForm.control}
                              name="missionzone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Select Mission Zone</FormLabel>
                                  <FormControl>
                                    <select
                                      {...field}
                                      onChange={(e) => {

                                        field.onChange(e.target.value); // Update the form state
                                        // setSelecteduDistrict(e.target.value);
                                      } }
                                      className="w-full px-4 py-2 border rounded-md"
                                      required
                                    >
                                      <option value="">Select a zone</option>
                                      {missionZone && missionZone.map((e) => (
                                        <option key={e.zone_id} value={e.zone_name}>
                                          {e.zone_name}
                                        </option>
                                      ))}
                                    </select>
                                  </FormControl>
                                  <FormDescription> </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )} />
                          </>)
                      }
                      {/* malayalam mission fields end here */}

                      
                      <FormField
              control={multiForm.control}
              name="no_of_students"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of students this year</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="" {...field} required/>
                  </FormControl>
                  <FormDescription> </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={multiForm.control}
              name="list_of_classes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>List of Classes</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="LKG,UKG,1,2" {...field} required/>
                  </FormControl>
                  <FormDescription> </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={multiForm.control}
              name="total_classes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total number of classes</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="" {...field} required/>
                  </FormControl>
                  <FormDescription> </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-center">
              <Button type="submit" className="w-1/3 bg-primary">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
        <div className="w-full lg:w-1/3 flex items-center justify-center">
          <img
            src="/images/planting_trees_2.jpg"
            alt="Description of image"
            className="w-full h-full object-cover rounded-lg opacity-50"
          />
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default function MultiSelectZod() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MultiSelectZodForm />
    </Suspense>
  );
}
