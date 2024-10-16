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
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateTimePicker } from "@/components/ui/dateTimePicker";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { apiURL } from "@/app/requestsapi/request";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { BsImages, BsPaperclip } from "react-icons/bs";
import imageCompression from "browser-image-compression";



const MAX_FILE_SIZE = 1024 * 1024 * 100; // 100MB
const TARGET_FILE_SIZE = 1024 * 1024 * 4; // 4MB
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

async function resizeImage(file: File) {
  const options = {
    maxSizeMB: TARGET_FILE_SIZE / (1024 * 1024),
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  try {
    const resizedFile = await imageCompression(file, options);
    return resizedFile;
  } catch (error) {
    console.error('Error resizing the image:', error);
    throw error;
  }
}

async function validateAndResizeImage(files: FileList | null) {
  if (!files || files.length === 0) {
    return files;
  }

  const file = files[0];
  if (file.size > TARGET_FILE_SIZE) {
    const resizedFile = await resizeImage(file);
    return [resizedFile] as unknown as FileList;
  }

  return files;
}

const formSchema = z.object({
  image: z
    .any()
    .refine(async (files) => {
      const validFiles = await validateAndResizeImage(files);
      return validFiles![0]?.size <= MAX_FILE_SIZE;
    }, "Max image size is 100MB.")
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});


export function AddEvents() {
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
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {

        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {

        const formData = new FormData();

        if (selectedImage) {
          const compressedImage = await resizeImage(selectedImage);
          formData.append("image", compressedImage);
          formData.append("eventHeading", heading);
          formData.append("eventBody", desc);
          formData.append("location", loc);
          formData.append("createdTime", dateTime);
        }

        if (token) {
            try {
                const response = await axios.post(`${apiURL}/adminEdit/modifyEvents`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

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
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex items-center justify-start gap-2 my-4 cursor-pointer text-primary float-right">
                    <Plus />
                    <span className="text-base">Add Events</span>
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl overflow-y-scroll max-h-[98%]">
                <DialogHeader>
                    <DialogTitle>Add Events</DialogTitle>
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

                                    <div
                                        className={`flex md:flex-[1] h-[fit-content] md:justify-between md:flex-row`}
                                    >
                                        {selectedImage ? (
                                            <div className=" max-w-[200px]">
                                                <img
                                                    src={URL.createObjectURL(selectedImage)}
                                                    alt="Selected"
                                                    className='max-h-32'
                                                />
                                            </div>
                                        ) : (
                                            <div className="inline-flex items-center justify-between">
                                                <div className="p-2 justify-center items-center flex">
                                                    <BsImages size={28} />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="image"
                                        render={({ field }) => (
                                            <FormItem>

                                                <FormControl>
                                                    <Button
                                                        size="sm"
                                                        type="button"
                                                        className="bg-white hover:bg-primary/10 border border-primary text-primary"
                                                    >
                                                        <input
                                                            type="file"
                                                            className="hidden"
                                                            id="fileInput"
                                                            accept="image/*"
                                                            onBlur={field.onBlur}
                                                            name={field.name}
                                                            onChange={async (e) => {
                                                                const files = e.target.files;
                                                                if (files && files[0]) {
                                                                    const validFiles = await validateAndResizeImage(files);
                                                                    field.onChange(validFiles);
                                                                    setSelectedImage(validFiles?.[0] || null);
                                                                }
                                                            }}
                                                            ref={field.ref}
                                                        />
                                                        <label
                                                            htmlFor="fileInput"
                                                            className="text-neutral-90 flex gap-2 justify-center items-center w-full"
                                                        >
                                                            <BsPaperclip /> Choose file
                                                        </label>
                                                    </Button>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
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
