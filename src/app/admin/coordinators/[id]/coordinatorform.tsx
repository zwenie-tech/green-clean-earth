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

import Cookies from 'js-cookie';

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
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { apiURL, fetchClubData } from "@/app/requestsapi/request";
import axios from "axios";
import imageCompression from "browser-image-compression";
const formSchema = z.object({
 
});

export function CoordinatorForm() {
  const router = useRouter();
  const pathname = usePathname();
  const userId = pathname.split("/")[3];
  const { toast } = useToast();
  const token = Cookies.get("adtoken");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [profession, setProfession] = useState("");


  useEffect(() => {
    async function fetchdata() {
      if (token) {

        const response = await axios.get(`${apiURL}/adminFrame/cordinatorDetails/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        try {

          if (response.data.success && response.status != 203) {
            const udata = response.data.cordinatorDetails;
            const {co_ord_name,co_email_id,co_username,co_ord_contact,co_profession} = udata[0];
            
            setName(co_ord_name || "");
            setEmail(co_email_id || "");
            setUsername(co_username || "");
            setContact(co_ord_contact || "");
            setProfession(co_profession || "");
            console.log(udata)
          } else {

          }

        } catch (error) {
          console.error("Error:", error);

        }
      };
    }
    fetchdata();
  }, [token, userId]);

 
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
  
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {

    console.log(values)


    const dtm = {
      name : name,
      number : contact,
      profession : profession,
      username : username,
      emailId : email,
      cordinatorId : userId,
    }
    if (token) {
      const response = await axios.post(`${apiURL}/adminEdit/updateCordinatorProfile`, dtm, {
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
          <DialogTitle>Edit Coordinator</DialogTitle>
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
              <div className="mb-4">
                  <label className="form-label">Name</label>
                  <input
                    className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"

                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Email</label>
                  <input
                    className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"

                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Username</label>
                  <input
                    className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"

                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Contact Number</label>
                  <input
                    className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"

                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Profession</label>
                  <input
                    className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"

                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                  />
                </div>
               
              </div>

              <div className="mt-3 justify-center item-center">
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
