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

interface MissionChapter {
  chapter_id: string;
  chapter_name: string;
}

export function AddChapterForm() {
  const router = useRouter();
  const pathname = usePathname();
  const coId = pathname.split("/")[3];
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];
  const token = Cookies.get("adtoken");

  const [missionChapter, setMissionChapter] = useState<MissionChapter[]>([]);
  const [selectMissionarea, setSelectMissionarea] = useState('');
  const [selectMission, setSelectedMission] = useState('');


  const chapter_type_id = Cookies.get("chapter_type_id");
  const chapter_name = Cookies.get("chapter_name");

  useEffect(() => {
    async function fetchData() {
      console.log(chapter_type_id)
      chapter_name ? setSelectedMission(chapter_name) : '';
      chapter_type_id ? setSelectMissionarea(chapter_type_id) : '';
    }
    fetchData();
  }, [chapter_name, chapter_type_id]);


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
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const formdata = {
      chapterTypeId: selectMissionarea,
      chapterName: selectMission
    }
    console.log(formdata);

    if (token) {
      const response = await axios.post(`${apiURL}/adminEdit/modifyMMChapter`, formdata, {
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
          <span className="text-base">Add Mission Chapter</span>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl overflow-y-scroll max-h-[98%]">
        <DialogHeader>
          <DialogTitle>Add Mission Chapter</DialogTitle>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mission Area</label>
                  <Select
                    onValueChange={(value) => {
                      // setCountry(value);
                      setSelectMissionarea(value);
                    }}
                    value={selectMissionarea || ""}
                    defaultValue={selectMissionarea}
                  >
                    <SelectTrigger className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"
                    >
                      <SelectValue placeholder="Choose a mission area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key='1' value="1">
                        Global
                      </SelectItem>
                      <SelectItem key='2' value="2">
                        India
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-4">
                  <label className="form-label">Chapter</label>
                  <input
                    className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"

                    value={selectMission}
                    onChange={(e) => setSelectedMission(e.target.value)}
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
