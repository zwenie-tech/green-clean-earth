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
import axios from "axios";
import { apiURL } from "@/app/requestsapi/request";
import { usePathname } from "next/navigation";
import Cookies from 'js-cookie';
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  
});

interface Category {
  activity_category: string;
  activity_category_id: string;
}

interface SubCategory {
  id: string;
  name: string;
}

export function DeleteBtn() {
  const pathname = usePathname();
  const ActId = pathname.split("/")[3];
  const token = Cookies.get("adtoken");
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  const [title, setTitle] = useState("");
  const [partname, setPartName] = useState("");
  const [link, setLink] = useState("");
  const [address, setAddress] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [like, setLike] = useState("");
  const [view, setView] = useState("");
  const [earning, setEarning] = useState("");

  const handleDelete = async () => {
    const formdata = {
      participantName: partname,
      participantAddress: address,
      activityCategoryId: categories.find((item) => item.activity_category === category)?.activity_category_id,
      activitySubCategory: subcategory,
      activityTitle: title,
      activityDescription: desc,
      activityLink: link,
      earnings: earning,
      likes: like,
      views: view,
      total: parseInt(like) + parseInt(view),
      activityId: ActId,
      isdeleted:true
    }
    try {
      const response = await axios.post(`${apiURL}/adminEdit/updateActivity`,formdata,{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
      if (response.data.success && response.status!=203) {
        toast({
            title: "Delete Successfully.",
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

  useEffect(() => {
    async function fetchdata() {
      if (token) {

        const response = await axios.get(`${apiURL}/adminFrame/activityDetails/${ActId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        try {

          if (response.data.success && response.status != 203) {
            const udata = response.data.activityDetails;
            const {activity_title,participant_name,activity_social_media_link,participant_address,activity_description,activity_category,activity_sub_category,activity_views,activity_likes,earnings} = udata[0];
           
            setTitle(activity_title);
            setPartName(participant_name);
            setLink(activity_social_media_link );
            setAddress(participant_address);
            setDesc(activity_description);
            setCategory(activity_category );
            setSubCategory(activity_sub_category );
            setLike(activity_likes);
            setView(activity_views);
            setEarning(earnings);

          } else {
            console.error("Error:", response.data);

          }

        } catch (error) {
          console.error("Error:", error);

        }
      };
    }
    fetchdata();
  }, [ActId, token]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiURL}/activity_category`);
        setCategories(response.data.activity_category);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchSubCategories = async () => {
      try {
        const response = await axios.get(`${apiURL}/activity_sub_category`);
        setSubCategories(response.data.activity_sub_category);

      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchCategories();
    fetchSubCategories();
  }, []);



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
     

    },
  });

  return (
    <div className="flex items-center justify-start gap-2 my-4 cursor-pointer text-primary ml-3" onClick={handleDelete}>
          <Trash2 />
          <span className="text-base">Delete</span>
        </div>
  );
}
