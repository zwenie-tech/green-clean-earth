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
  import Cookies from 'js-cookie';
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { apiURL } from "@/app/requestsapi/request";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";


interface State {
  st_id: number;
  st_name: string;
}

interface District {
  dis_id: number;
  dis_name: string;
}

type Corp = {
  cop_id: string;
  cop_name: string;
}
  const formSchema = z.object({
    corporationName: z.string(),
    districtId: z.string(),
    
  });

  export function Corpform() {
  const router = useRouter();

    const pathname = usePathname();
  const coId = pathname.split("/")[3];
  const token = Cookies.get("adtoken");
  // const dis_name = Cookies.get("dis_name");
  // const cop_name = Cookies.get("cop_name");
  const { toast } = useToast();


  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [states, setStates] = useState<State[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [corporation, setCorporation] = useState<Corp[]>([]);

  useEffect(() => {
    async function fetchData() {

        const stateResponse = await fetch(`${apiURL}/state`);
        const stateData = await stateResponse.json();
        setStates(stateData.state);

        const districtResponse = await fetch(`${apiURL}/district`);
        const districtData = await districtResponse.json();
        setDistricts(districtData.district);
      
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchCorpData() {
      if (selectedDistrict) {
        const dist_id = districts.find((item) => item.dis_name === selectedDistrict)?.dis_id;
        const corpResponse = await fetch(`${apiURL}/corporation/${dist_id}`);
        const corpData = await corpResponse.json();
        setCorporation(corpData.corporation);
      }
    }
    fetchCorpData();
  }, [selectedDistrict, districts]);

  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        districtId: '',
        corporationName: ''
      },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values);
      const formdata = {
        stateId : states.find((item) => item.st_name === "Kerala")?.st_id?.toString(),
        districtId : districts.find((item) => item.dis_name === values.districtId)?.dis_id?.toString(),
        corporationName: values.corporationName
      }
      console.log(formdata);

      if (token) {
        const response = await axios.post(`${apiURL}/adminEdit/modifyCorporation`, formdata, {
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
            <DialogTitle>Edit Contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="">
            <Form {...form}>
              <form
                noValidate
                onSubmit={form.handleSubmit(onSubmit)}
                className=""
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                
                   <FormField
                    control={form.control}
                    name="districtId"
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
                    name="corporationName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Corporation/Municipality/Block Panchayat</FormLabel>
                        <Select onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedCorp(value);
                        }} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a Option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {corporation.map((corp) => (
                              <SelectItem key={corp.cop_id} value={corp.cop_name}>
                                {corp.cop_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </div>

                <div className="mt-3 justify-center">
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
