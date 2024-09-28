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
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { apiURL } from "@/app/requestsapi/request";
import axios from "axios";


const formSchema = z.object({
    dis_name: z.string().min(2).max(255),
    edu_district: z.string().min(2).max(255),
    edu_sub_district_name: z.string().min(2).max(255),
});

interface ActivityData {

    dis_name: string;
    edu_district: string;
    edu_sub_district_name:string;
}



interface District {
    dis_id: number;
    dis_name: string;
}

interface EduDistrict {
    edu_district_id: string;
    edu_district: string;
}
interface EduSubDistrict {
    edu_sub_district_id: string;
    edu_sub_district_name: string;
  }
export function Eduform() {
    const router = useRouter();
    const pathname = usePathname();
    const coId = pathname.split("/")[3];
    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    const token = Cookies.get("adtoken");

    const [userData, setUserData] = useState<ActivityData[]>([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");

    const [districts, setDistricts] = useState<District[]>([]);
    const [eduDistrict, setEduDistrict] = useState<EduDistrict[]>([]);
    const [selecteduDistrict, setSelecteduDistrict] = useState('');
    const [eduSubDistrict, setEduSubDistrict] = useState<EduSubDistrict[]>([]);
    const [selecteduSubDistrict, setSelecteduSubDistrict] = useState('');

    const dis_name = Cookies.get("dis_name");
    const edu_district = Cookies.get("edu_district");
    const edu_sub_district_name = Cookies.get("edu_sub_district_name");
    
    useEffect(() => {
        async function fetchData() {

            dis_name ? setSelectedDistrict(dis_name) : '';
            edu_district ? setSelecteduDistrict(edu_district) : '';
            edu_sub_district_name ? setSelecteduSubDistrict(edu_sub_district_name) : '';

        }
        fetchData();
    }, [edu_district, dis_name]);

    useEffect(() => {
        async function fetchData() {

            const districtResponse = await fetch(`${apiURL}/district`);
            const districtData = await districtResponse.json();
            setDistricts(districtData.district);

        }
        fetchData();
    }, []);
    
    useEffect(() => {
        const fetchClass = async () => {
            try {
                if (selectedDistrict) {
                    const dis_id = districts.find((item) => item.dis_name === selectedDistrict)?.dis_id;
                    const responseedudistrict = dis_id ? await axios.get(`${apiURL}/eduDistrict/${dis_id}`) : null;
                    responseedudistrict ? setEduDistrict(responseedudistrict.data.eduDistrict) : '';
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchClass();
    }, [districts,selectedDistrict]);

    useEffect(() => {
        const handleEduDistrict = async () => {
            try {
                if (selecteduDistrict) {
              const eduid = eduDistrict.find((item) => item.edu_district === selecteduDistrict)?.edu_district_id
              const responseedusubdistrict = await axios.get(`${apiURL}/eduSubDistrict/${eduid}`);
              console.log(eduid,responseedusubdistrict)
              setEduSubDistrict(responseedusubdistrict.data.eduSubDistrict);
                }
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
          handleEduDistrict();
    }, [selecteduDistrict,eduDistrict]);
   

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            edu_district: edu_district,
            dis_name: dis_name,
            edu_sub_district_name:edu_sub_district_name
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
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
                    <DialogTitle>Edit EduDistrict</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="">
                    <Form {...form}>
                        <form
                            noValidate
                            onSubmit={form.handleSubmit(onSubmit)}
                            className=""
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                                {/* District Field */}
                                <FormField
                                    control={form.control}
                                    name="dis_name"
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

<FormField
                      control={form.control}
                      name="edu_district"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Education District</FormLabel>

                          <Select onValueChange={(value) => {
                            field.onChange(value);
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
                      name="edu_sub_district_name"
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
                            </div>

                            <div className="mt-3">
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
