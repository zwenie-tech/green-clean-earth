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
    block_name: z.string().min(2).max(255),
    project_name: z.string().min(2).max(255),
});

interface ActivityData {

    dis_name: string;

}



interface District {
    dis_id: number;
    dis_name: string;
}

interface IcdsBlock {
    icds_block_id: string;
    block_name: string;
}
interface IcdsProject {
    project_id: string;
    project_name: string;
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

    const [icdsBlock, setIcdsBlock] = useState<IcdsBlock[]>([]);
    const [selectIcdsBlock, setSelectIcdsBlock] = useState('');
    const [districts, setDistricts] = useState<District[]>([]);
    const [icdsProject, setIcdsProject] = useState<IcdsProject[]>([]);
    const [selectIcdsProject, setSelectIcdsProject] = useState('');

    const dis_name = Cookies.get("dis_name");
    const block_name = Cookies.get("block_name");
    const project_name = Cookies.get("project_name");

    useEffect(() => {
        async function fetchData() {

            dis_name ? setSelectedDistrict(dis_name) : '';
            block_name ? setSelectIcdsBlock(block_name) : '';
            project_name ? setSelectIcdsProject(project_name) : '';
            const response = await axios.get(`${apiURL}/icdsBlock/1`);
            setIcdsBlock(response.data.icdsBlockList);
          const responses = await axios.get(`${apiURL}/icdsProject/1`);
          setIcdsProject(responses.data.icdsProjectList);
        }
        fetchData();
    }, []);

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
                const dis_id = districts.find((item) => item.dis_name === selectedDistrict)?.dis_id;
                const response = await axios.get(`${apiURL}/icdsBlock/${dis_id}`);
                setIcdsBlock(response.data.icdsBlockList);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchClass();
    }, [districts, selectedDistrict]);

    const handleIcds = async (e: any) => {
        try {
          const icdsid = icdsBlock.find((item) => item.block_name === e)?.icds_block_id
          const response = await axios.get(`${apiURL}/icdsProject/${icdsid}`);
          setIcdsProject(response.data.icdsProjectList);
    
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {

            dis_name: dis_name,
            block_name: block_name,
            project_name: project_name
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
                                    name="block_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Block</FormLabel>

                                            <Select onValueChange={(value) => {
                                                field.onChange(value);
                                                handleIcds(value);
                                                setSelectIcdsBlock(value);
                                            }} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Choose a icds block" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {icdsBlock && icdsBlock.map((e) => (
                                                        <SelectItem key={e.icds_block_id} value={e.block_name}>
                                                            {e.block_name}
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
                                    name="project_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Project</FormLabel>

                                            <Select onValueChange={(value) => {
                                                field.onChange(value);

                                                setSelectIcdsProject(value);
                                            }} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Choose a icds project" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {icdsProject && icdsProject.map((e) => (
                                                        <SelectItem key={e.project_id} value={e.project_name}>
                                                            {e.project_name}
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
