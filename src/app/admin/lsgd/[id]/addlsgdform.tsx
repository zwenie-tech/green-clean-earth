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
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";


const formSchema = z.object({
 
});

interface ActivityData {
  cop_name: string;
  dis_name: string;
  lsg_name: string;
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


export function AddLsgdform() {
  const router = useRouter();
  const pathname = usePathname();
  const coId = pathname.split("/")[3];
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];
  const token = Cookies.get("adtoken");
  const { toast } = useToast();

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
     
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const formdata = {
      stateId: states.find((item) => item.st_name === "Kerala")?.st_id?.toString(),
      districtId: districts.find((item) => item.dis_name === selectedDistrict)?.dis_id?.toString(),
      corporationId: corporation.find((item) => item.cop_name === selectedCorp)?.cop_id?.toString(),
      lsgdName: selectedLsgd
    }
    console.log(formdata);

    if (token) {
      const response = await axios.post(`${apiURL}/adminEdit/modifyLsgd`, formdata, {
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
        <div className="flex items-center justify-start gap-2 my-4 cursor-pointer text-primary float-right">
          <Plus />
          <span className="text-base">Add LSGD</span>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl overflow-y-scroll max-h-[98%]">
        <DialogHeader>
          <DialogTitle>Add LSGD</DialogTitle>
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
                      {districts.map((district) => (
                        <SelectItem key={district.dis_id} value={district.dis_name}>
                          {district.dis_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Corporation/Municipality/Block Panchayat</label>
                  <Select
                    onValueChange={(value) => {
                      // setCountry(value);
                      setSelectedCorp(value);
                    }}
                    value={selectedCorp || ""}
                    defaultValue={selectedCorp}
                  >
                    <SelectTrigger className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"
                    >
                      <SelectValue placeholder="Choose a corporation" />
                    </SelectTrigger>
                    <SelectContent>
                      {corporation.map((corp) => (
                        <SelectItem key={corp.cop_id} value={corp.cop_name}>
                          {corp.cop_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-4">
                  <label className="form-label">Lsgd</label>
                  <input
                    className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"

                    value={selectedLsgd}
                    onChange={(e) => setSelectedLsgd(e.target.value)}
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
