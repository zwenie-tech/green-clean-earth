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
import { useToast } from "@/components/ui/use-toast";


const formSchema = z.object({
    dis_name: z.string().min(2).max(255),
    edu_district: z.string().min(2).max(255),
});

interface ActivityData {

    dis_name: string;
    edu_district: string;
}



interface District {
    dis_id: number;
    dis_name: string;
}

interface EduDistrict {
    edu_district_id: string;
    edu_district: string;
}
export function Eduform() {
    const router = useRouter();
    const pathname = usePathname();
    const coId = pathname.split("/")[3];
    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    const token = Cookies.get("adtoken");
    const { toast } = useToast();

    const [selectedDistrict, setSelectedDistrict] = useState("");

    const [districts, setDistricts] = useState<District[]>([]);
    const [eduDistrict, setEduDistrict] = useState<EduDistrict[]>([]);
    const [selecteduDistrict, setSelecteduDistrict] = useState('');

    const dis_name = Cookies.get("dis_name");
    const edu_district = Cookies.get("edu_district");

    useEffect(() => {
        async function fetchData() {

            dis_name ? setSelectedDistrict(dis_name) : '';
            edu_district ? setSelecteduDistrict(edu_district) : '';

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
    }, [districts, selectedDistrict]);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            edu_district: edu_district,
            dis_name: dis_name,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        
        const formdata = {
            districtId: districts.find((item) => item.dis_name === values.dis_name)?.dis_id?.toString(),
            eduDistrictName: selecteduDistrict
        }
        console.log(formdata);

        if (token) {
            const response = await axios.post(`${apiURL}/adminEdit/modifyEduDistrict?recordId=${coId}`, formdata, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            try {

                if (response.data.success && response.status != 203) {

                    toast({
                        title: "Data Successfully Updated.",
                        description: "",
                    });

                    setTimeout(function () {
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

                                <div className="mb-4">
                                    <label className="form-label">Edu District</label>
                                    <input
                                        className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"

                                        value={selecteduDistrict}
                                        onChange={(e) => setSelecteduDistrict(e.target.value)}
                                    />
                                </div>
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
