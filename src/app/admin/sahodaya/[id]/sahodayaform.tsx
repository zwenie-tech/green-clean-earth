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
import { toast } from "@/components/ui/use-toast";


const formSchema = z.object({

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
        }
        fetchData();
    }, [sahodaya_name, st_name]);

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
  }, [selectedStateGrp, states]);
    
   
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
          
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values);
      const formdata = {
        stateId : states.find((item) => item.st_name === selectedStateGrp)?.st_id?.toString(),
        sahodayaName : selectSahodaya
            }
      console.log(formdata);
  
      if (token) {
        const response = await axios.post(`${apiURL}/adminEdit/modifySahodaya?recordId=${coId}`, formdata, {
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
  
            setTimeout(function() {
              window.history.back();
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
                    <DialogTitle>Edit Sahodaya</DialogTitle>
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
                            <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <Select
                      onValueChange={(value) => {
                        // setCountry(value);
                        setSelectedStateGrp(value);
                      }}
                      value={selectedStateGrp || ""}
                      defaultValue={selectedStateGrp}
                    >
                      <SelectTrigger className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"
                      >
                        <SelectValue placeholder="Choose a state" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state.st_id} value={state.st_name}>
                            {state.st_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                            
                  <div className="mb-4">
                  <label className="form-label">Sahodaya</label>
                  <input
                    className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"

                    value={selectSahodaya}
                    onChange={(e) => setSelectSahodaya(e.target.value)}
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
