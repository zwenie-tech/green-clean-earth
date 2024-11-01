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
import { Edit, Trash2 } from "lucide-react";
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
import { title } from "process";


const formSchema = z.object({


});

interface ActivityData {

  dis_name: string;

}

interface MissionChapter {
  chapter_id: string;
  chapter_name: string;
}

export function DeleteBtn() {
  const router = useRouter();
  const pathname = usePathname();
  const coId = pathname.split("/")[3];
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];
  const token = Cookies.get("adtoken");

  const [missionChapter, setMissionChapter] = useState<MissionChapter[]>([]);
  const [selecttitle, setTitle] = useState('');
  const [adlink, setAdLink] = useState('');
  const [disporder, setDispOrder] = useState('');


  const display_order = Cookies.get("display_order");
  const ad_links = Cookies.get("ad_link");
  const title = Cookies.get("title");

  useEffect(() => {
    async function fetchData() {
      ad_links ? setAdLink(ad_links) : '';
      title ? setTitle(title) : '';
      display_order ? setDispOrder(display_order) : '';
    }
    fetchData();
  }, [ad_links, display_order, title]);


  useEffect(() => {
    async function fetchData() {

      try {

        const response = await axios.get(`${apiURL}/malayalamMissionChapter/${selecttitle}`);
        setMissionChapter(response.data.chapterList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [selecttitle]);




  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    },
  });

  async function handleDelete(values: z.infer<typeof formSchema>) {
  
    const formdata = {
      title: selecttitle,
       adLink:adlink, 
       displayOrder:disporder,
       isdeleted:true
    
    }
    console.log(formdata);

    if (token) {
      const response = await axios.post(`${apiURL}/adminEdit/addAds?recordId=${coId}`, formdata, {
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
    <div className="flex items-center justify-start gap-2 my-4 cursor-pointer text-primary ml-3" onClick={handleDelete}>
          <Trash2 />
          <span className="text-base">Delete</span>
        </div>
  );
}
