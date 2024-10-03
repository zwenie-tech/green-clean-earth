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
import { Edit, Plus } from "lucide-react";
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
import { toast } from "@/components/ui/use-toast";


const formSchema = z.object({
    
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
export function AddProjectForm() {
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

            const districtResponse = await fetch(`${apiURL}/district`);
            const districtData = await districtResponse.json();
            setDistricts(districtData.district);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchClass = async () => {
            try {
                if(selectedDistrict){
                    const dis_id = districts.find((item) => item.dis_name === selectedDistrict)?.dis_id;
                    const response = await axios.get(`${apiURL}/icdsBlock/${dis_id}`);
                    setIcdsBlock(response.data.icdsBlockList);

                }
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

            
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        const formdata = {
            blockId: icdsBlock.find((item) => item.block_name === selectIcdsBlock)?.icds_block_id?.toString(),
            projectName: selectIcdsProject
        }
        console.log(formdata);

        if (token) {
            const response = await axios.post(`${apiURL}/adminEdit/modifyIcdsProject`, formdata, {
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
                <div className="flex items-center justify-start gap-2 my-4 cursor-pointer text-primary float-right">
                    <Plus />
                    <span className="text-base">Add Icds Project</span>
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl overflow-y-scroll max-h-[98%]">
                <DialogHeader>
                    <DialogTitle>Add Icds Project</DialogTitle>
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
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                                    <Select
                                        onValueChange={(value) => {
                                            // setCountry(value);
                                            setSelectedDistrict(value);
                                        }}
                                        value={selectedDistrict || ""}
                                        defaultValue={selectedDistrict}
                                    >
                                        <SelectTrigger className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"
                                        >
                                            <SelectValue placeholder="Choose a district" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {districts.map((d) => (
                                                <SelectItem key={d.dis_id} value={d.dis_name}>
                                                    {d.dis_name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Block</label>
                                    <Select
                                        onValueChange={(value) => {
                                            // handleIcds(value);
                                            setSelectIcdsBlock(value);
                                        }}
                                        value={selectIcdsBlock || ""}
                                        defaultValue={selectIcdsBlock}
                                    >
                                        <SelectTrigger className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"
                                        >
                                            <SelectValue placeholder="Choose a district" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {icdsBlock && icdsBlock.map((e) => (
                                                <SelectItem key={e.icds_block_id} value={e.block_name}>
                                                    {e.block_name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Project</label>
                                    <input
                                        className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"

                                        value={selectIcdsProject}
                                        onChange={(e) => setSelectIcdsProject(e.target.value)}
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
