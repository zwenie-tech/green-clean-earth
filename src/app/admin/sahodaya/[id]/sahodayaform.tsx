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
  sahodaya_name: z.string().min(2).max(255),
  st_name: z.string().min(2).max(255),
});

interface ActivityData {

    dis_name: string;
    edu_district: string;
    edu_sub_district_name:string;
}
interface Sahodaya {
  sahodaya_id: string;
  sahodaya_name: string;
}
interface State {
  st_id: number;
  st_name: string;
}
export function Eduform() {
    const router = useRouter();
    const pathname = usePathname();
    const coId = pathname.split("/")[3];
    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    const token = Cookies.get("adtoken");

    const [userData, setUserData] = useState<ActivityData[]>([]);
    const [sahodaya, setSahodaya] = useState<Sahodaya[]>([]);
    const [selectSahodaya, setSelectSahodaya] = useState('');
  const [selectedStateGrp, setSelectedStateGrp] = useState("");
  const [states, setStates] = useState<State[]>([]);
    

    const st_name = Cookies.get("st_name");
    const sahodaya_name = Cookies.get("sahodaya_name");
    useEffect(() => {
        async function fetchData() {
          st_name ? setSelectedStateGrp(st_name) : '';
          sahodaya_name ? setSelectSahodaya(sahodaya_name) : '';
          const response = await axios.get(`${apiURL}/sahodaya/1`);
          console.log(response)
          setSahodaya(response.data.sahodayaList);
        }
        fetchData();
    }, []);

    useEffect(() => {
      async function fetchData() {
          if (selectedStateGrp!='') {
            try {
              const st_id = states.find((item) => item.st_name === selectedStateGrp)?.st_id;
              const response = await axios.get(`${apiURL}/sahodaya/${st_id}`);
              console.log(response)
              setSahodaya(response.data.sahodayaList);
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }
      }
      fetchData();
  }, [selectedStateGrp]);
    
   
  useEffect(() => {
    async function fetchData() {
      const stateResponse = await fetch(`${apiURL}/state`);
      const stateData = await stateResponse.json();
      setStates(stateData.state);
       
    }
    fetchData();
}, [selectedStateGrp]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          sahodaya_name: sahodaya_name,
          st_name: st_name
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
                      name="st_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>

                          <Select onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedStateGrp(value);
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

                    <FormField
                      control={form.control}
                      name="sahodaya_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sahodaya</FormLabel>

                          <Select onValueChange={(value) => {
                            field.onChange(value);
                            setSelectSahodaya(value);
                          }} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a sahodaya" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {sahodaya && sahodaya.map((s) => (
                                <SelectItem key={s.sahodaya_id} value={s.sahodaya_name}>
                                  {s.sahodaya_name}
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
