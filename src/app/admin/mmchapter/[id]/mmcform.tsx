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
    chapter_name: z.string().min(2).max(255),
    chapter_type_name: z.string().min(2).max(255),
});

interface ActivityData {

    dis_name: string;
    
}

interface MissionChapter {
    chapter_id: string;
    chapter_name: string;
  }

export function Eduform() {
    const router = useRouter();
    const pathname = usePathname();
    const coId = pathname.split("/")[3];
    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    const token = Cookies.get("adtoken");

    const [missionChapter, setMissionChapter] = useState<MissionChapter[]>([]);
  const [selectMissionarea, setSelectMissionarea] = useState('');
  const [selectMission, setSelectedMission] = useState('');
    

    const chapter_type_name = Cookies.get("chapter_type_name");
    const chapter_name = Cookies.get("chapter_name");
    
    useEffect(() => {
        async function fetchData() {

            chapter_name ? setSelectedMission(chapter_name) : '';
            const response = await axios.get(`${apiURL}/malayalamMissionChapter/2`);
            setMissionChapter(response.data.chapterList);
        }
        fetchData();
    }, []);


    useEffect(() => {
        async function fetchData() {

            try {
        
                const response = await axios.get(`${apiURL}/malayalamMissionChapter/${selectMissionarea}`);
                setMissionChapter(response.data.chapterList);
              } catch (error) {
                console.error("Error fetching data:", error);
              }
        }
        fetchData();
    }, [selectMissionarea]);

   
   

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            
            chapter_name:chapter_name,
            chapter_type_name:chapter_type_name == "Global" ? '1' : '2'

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

                            <FormField
                      control={form.control}
                      name="chapter_type_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mission Area</FormLabel>

                          <Select onValueChange={(value) => {
                            field.onChange(value);
                            setSelectMissionarea(value);

                          }} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose mission area" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>

                              <SelectItem key='1' value="1">
                                Global
                              </SelectItem>
                              <SelectItem key='2' value="2">
                                India
                              </SelectItem>


                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="chapter_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Chapter</FormLabel>

                          <Select onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedMission(value);
                            
                          }} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a mission chapter" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {missionChapter && missionChapter.map((e) => (
                                <SelectItem key={e.chapter_id} value={e.chapter_name}>
                                  {e.chapter_name}
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
