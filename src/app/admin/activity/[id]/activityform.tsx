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
import axios from "axios";
import { apiURL } from "@/app/requestsapi/request";
import { usePathname } from "next/navigation";
import Cookies from 'js-cookie';
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  parname: z.string().min(2).max(255),
  activitylink: z.string().min(2).max(255),
  description: z.string().min(2).max(255),
  view:  z.coerce.number(),
  like:  z.coerce.number(),
  earnings: z.coerce.number(),
  address: z.string().min(2).max(255),
  activity_title: z.string().min(2).max(255),
  activity_category: z.string().min(2).max(255),
  activity_sub_category: z.string().min(2).max(255),
});

interface Category {
  activity_category: string;
  activity_category_id: string;
}

interface SubCategory {
  id: string;
  name: string;
}

export function Activityforms() {
  const pathname = usePathname();
  const ActId = pathname.split("/")[3];
  const token = Cookies.get("adtoken");
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

  const activity_title = Cookies.get("activity_title");
  const participant_name = Cookies.get("participant_name");
  const activity_social_media_link = Cookies.get("activity_social_media_link");
  const participant_address = Cookies.get("participant_address");
  const activity_description = Cookies.get("activity_description");
  const activity_category = Cookies.get("activity_category");
  const activity_sub_category = Cookies.get("activity_sub_category");
  const activity_likes = Cookies.get("activity_likes");
  const activity_value = Cookies.get("activity_value");
  const activity_views = Cookies.get("activity_views");
  const earnings = Cookies.get("earnings");

          

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
      parname: participant_name,
      activitylink: activity_social_media_link,
      description: activity_description,
      view: parseInt(activity_views!),
      like: parseInt(activity_likes!),
      address: participant_address,
      activity_title: activity_title,
      activity_category: activity_category,
      activity_sub_category: activity_sub_category,
      earnings: parseInt(earnings!) || 0 

    },
  });
  


  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const formdata = {
      participantName : values.parname, 
      participantAddress : values.address,  
      activityCategoryId: categories.find((item) => item.activity_category === values.activity_category)?.activity_category_id,
      activitySubCategory : values.activity_sub_category, 
      activityTitle : values.activity_title,
      activityDescription : values.description, 
      activityLink : values.activitylink, 
      earnings : values.earnings, 
      likes : values.like, 
      views : values.view, 
      total : values.like + values.view, 
      activityId : ActId,
    }
    console.log(formdata);
    if (token) {
      const response = await axios.post(`${apiURL}/adminEdit/updateActivity`, formdata, {
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
        <div className="flex items-center justify-start gap-2 my-4 cursor-pointer text-primary">
          <Edit />
          <span className="text-base">Edit</span>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl overflow-y-scroll max-h-[98%]">
        <DialogHeader>
          <DialogTitle>Edit Activity</DialogTitle>
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
                  name="activity_title"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Activity Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="parname"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Participant Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="activitylink"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Activity Link</FormLabel>
                      <FormControl >
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="activity_category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Items</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.activity_category_id} value={category.activity_category}>
                              {category.activity_category}
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
                  name="activity_sub_category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {subCategories.map((subCategory) => (
                            <SelectItem key={subCategory.id} value={subCategory.name}>
                              {subCategory.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="view"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>View </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="like"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Like </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="earnings"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Earning </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
               
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Address</FormLabel>
                      <FormControl >
                        <Input {...field} />
                      </FormControl>
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
