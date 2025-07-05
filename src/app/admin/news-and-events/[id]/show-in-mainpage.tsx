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
import { Edit, Eye, Trash2 } from "lucide-react";
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
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateTimePicker } from "@/components/ui/dateTimePicker";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { apiURL } from "@/app/requestsapi/request";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

// Define your form schema here, if needed
const formSchema = z.object({
   
});

export function ShowMainPage() {
    const router = useRouter();
    const pathname = usePathname();
    const coId = pathname.split("/")[3];
    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    const token = Cookies.get("adtoken");

    const [heading, setHeading] = useState('');
    const [desc, setDesc] = useState('');
    const [loc, setLoc] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [showmain, setShowMain] = useState(0);
    useEffect(() => {
        async function fetchdata() {
            if (token) {
                const retrievedData = JSON.parse(localStorage.getItem("newsData") || "[]");
                const itemdata = retrievedData.find((item: { id: string; }) => item.id == coId);
                
                const { location, event_heading, event_body,created_time, show_in_main } = [itemdata][0];
                setLoc(location);
                setHeading(event_heading);
                setDesc(event_body);
                setDateTime(created_time)
                setShowMain(show_in_main)
            }
        }
        fetchdata();
    }, [coId, token]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
           
        },
    });

    async function handleshowmain(values: z.infer<typeof formSchema>) {

        const formdata = {
            isMainPageEvent:1
        };

        if (token) {
            try {
                const response = await axios.post(`${apiURL}/adminEdit/updateMainPageEvent?recordId=${coId}`, formdata, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data.success && response.status!=203) {
                    const msg = response.data.message;
                   
                    toast({
                        title: "Event Update Successfully.",
                        description: "",
                      });
            
            
                      setTimeout(function() {
                        window.history.back();
                      }, 1800);
                  } else {
                    const msg = response.data.message;
                   

                    toast({
                        variant: "destructive",
                        title: "Oops, Something went wrong!1",
                        description: "Please try again...",
                    });
                  }
            } catch (error:any) {
              
                
                toast({
                    variant: "destructive",
                    title: "Oops",
                    description: error.response.data['message'],
                });
            }
        }
    }

    async function handlehidemain(values: z.infer<typeof formSchema>) {

        const formdata = {
            isMainPageEvent:0
        };

        if (token) {
            try {
                const response = await axios.post(`${apiURL}/adminEdit//updateMainPageEvent?recordId=${coId}`, formdata, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.data.success && response.status!=203) {
                    const msg = response.data.message;
                   
                    toast({
                        title: "Event Update Successfully.",
                        description: "",
                      });
            
            
                      setTimeout(function() {
                        window.history.back();
                      }, 1800);
                  } else {
                    const msg = response.data.message;
                   

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
        }
    }

    return (
        showmain === 1 ? (
            <div className="flex items-center justify-start gap-2 my-4 cursor-pointer text-primary mr-3" onClick={handlehidemain}>
                <Eye />
                <span className="text-base">Hide from MainPage</span>
            </div>
        ):
        (
            <div className="flex items-center justify-start gap-2 my-4 cursor-pointer text-primary mr-3" onClick={handleshowmain}>
                <Eye />
                <span className="text-base">Show in MainPage</span>
            </div>
        )
        
    );
}
