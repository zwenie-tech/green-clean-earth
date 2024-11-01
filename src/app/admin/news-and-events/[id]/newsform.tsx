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

export function Eduform() {
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
    useEffect(() => {
        async function fetchdata() {
            if (token) {
                const retrievedData = JSON.parse(localStorage.getItem("newsData") || "[]");
                const itemdata = retrievedData.find((item: { id: string; }) => item.id == coId);
                console.log([itemdata][0].event_body);
                const { location, event_heading, event_body } = [itemdata][0];
                location ? setLoc(location) : '';
                event_heading ? setHeading(event_heading) : '';
                event_body ? setDesc(event_body) : '';
            }
        }
        fetchdata();
    }, [coId, token]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
           
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {

        

        const formdata = {
            eventHeading: heading,
            eventBody: desc,
            location: loc,
            createdTime: dateTime,  // Include the formatted datetime
        };
        console.log(dateTime);
        console.log(formdata);

        if (token) {
            try {
                const response = await axios.post(`${apiURL}/adminEdit/modifyEvents?recordId=${coId}`, formdata, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

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
        }
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
                    <DialogTitle>Edit EduDistrict</DialogTitle>
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

                                <div className="md:col-span-3 mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
                                    <textarea
                                        className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm h-24"
                                        value={heading}
                                        onChange={(e) => setHeading(e.target.value)}
                                        placeholder="Enter a heading"
                                    ></textarea>
                                </div>

                                <div className="md:col-span-3 mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm h-24"
                                        value={desc}
                                        onChange={(e) => setDesc(e.target.value)}
                                        placeholder="Enter a description"
                                    ></textarea>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Location</label>
                                    <input
                                        className="block w-full px-3 py-2 border border-gray-950 rounded-md shadow-sm focus:outline-none focus:ring-green-700 focus:border-green-700 sm:text-sm"
                                        value={loc}
                                        onChange={(e) => setLoc(e.target.value)}
                                    />
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="dateTime" className="block text-gray-700 text-sm font-bold mb-2">
                                        Date and Time:
                                    </label>
                                    <input
                                        type="datetime-local"
                                        id="dateTime"
                                        value={dateTime}
                                        onChange={(e) => setDateTime(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
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
