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


const formSchema = z.object({
  lsgd: z.string().min(2).max(255),
  district: z.string().min(2).max(255),
  corporation: z.string().min(2).max(255),
  lsgdname: z.string().min(2).max(255),
});

interface ActivityData {
  cop_name: string;
  dis_name: string;
  lsg_name: string;
  st_name: string;
}

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
interface Lsgd {
  lsg_id: number;
  lsg_name: string;
}


export function Lsgdform() {
  const router = useRouter();
  const pathname = usePathname();
  const coId = pathname.split("/")[3];
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];
  const token = Cookies.get("adtoken");

  const [userData, setUserData] = useState<ActivityData[]>([]);
 const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [selectedLsgd, setSelectedLsgd] = useState("");
  const [states, setStates] = useState<State[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [corporation, setCorporation] = useState<Corp[]>([]);
  const [lsgd, setLsgd] = useState<Lsgd[]>([]);


  const st_name = Cookies.get("st_name");
  const lsg_name = Cookies.get("lsg_name");
  const dis_name = Cookies.get("dis_name");
  const cop_name = Cookies.get("cop_name");

  useEffect(() => {
    async function fetchData() {

      dis_name ? setSelectedDistrict(dis_name) : '';
      cop_name ? setSelectedCorp(cop_name) : '';
      lsg_name ? setSelectedLsgd(lsg_name) : '';

    }
    fetchData();
  }, [cop_name, dis_name]);
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

  useEffect(() => {
    async function fetchLsgdData() {
      if (selectedCorp) {
        const corp_id = corporation.find((item) => item.cop_name === selectedCorp)?.cop_id;
        const lsgResponse = await fetch(`${apiURL}/lsg/${corp_id}`);
        const lsgData = await lsgResponse.json();

        setLsgd(lsgData.lsg);
      }
    }
    fetchLsgdData();
  }, [selectedCorp, corporation]);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      district: dis_name,
      corporation: cop_name,
      lsgdname: lsg_name,
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
          <DialogTitle>Edit LSGD</DialogTitle>
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
                    name="district"
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

                {/* Corporation Field */}
                <FormField
                    control={form.control}
                    name="corporation"
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

                {/* LSGD Name Field */}
                <FormField
                    control={form.control}
                    name="lsgd"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LSGD</FormLabel>
                        <Select onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedLsgd(value);
                        }} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a LSGD" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {lsgd && lsgd.map((lsg) => (
                              <SelectItem key={lsg.lsg_id} value={lsg.lsg_name}>
                                {lsg.lsg_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
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
