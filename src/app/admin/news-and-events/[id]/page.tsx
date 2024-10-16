"use client";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import imageCompression from 'browser-image-compression';
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { BsImages, BsPaperclip } from "react-icons/bs";


import Cookies from 'js-cookie';
import { Eduform } from "./newsform";
import { apiURL, imageURL } from "@/app/requestsapi/request";
import DeleteBtn from "./deletebtn";

interface ActivityData {

  location: string;
  image_link: string;
  event_heading: string;
  event_body: string;
  created_time: string;
}
function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const coId = pathname.split("/")[3];
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];
  const token = Cookies.get("adtoken");
  const [userData, setUserData] = useState<ActivityData[]>([]);
  const [edit1, setEdit1] = useState(0);

  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
    }
  }, [token, router]);
  useEffect(() => {
    async function fetchdata() {
      if (token) {
        const retrievedData = JSON.parse(localStorage.getItem("newsData") || "[]");
        const itemdata = retrievedData.find((item: { id: string; }) => item.id == coId)
        console.log([itemdata][0].event_body)
        // Get all cookies
        const allCookies = Cookies.get();

        // Remove all cookies
        Object.keys(allCookies).forEach(cookieName => {
          Cookies.remove(cookieName);
        });

        Cookies.set('adtoken', token, { expires: 1 });
        Cookies.set('event_heading', [itemdata][0].event_heading, { expires: 1 });
        Cookies.set('event_body', [itemdata][0].event_body, { expires: 1 });
        Cookies.set('image_link', [itemdata][0].image_link, { expires: 1 });
        Cookies.set('location', [itemdata][0].location, { expires: 1 });


        setUserData([itemdata]);
      }
    }
    fetchdata();
  }, [coId, token]);

  return (
    <div className="">
      {/* {lastSegment} */}
      <div className="flex justify-between">
        <div
          className="flex items-center justify-start gap-2 my-4 cursor-pointer text-primary"
          onClick={() => {
            window.history.back();
          }}
        >
          <ChevronLeft />
          <span className="text-base">Manage Events & News</span>
        </div>
        <div className="flex justify-between">

          <Eduform />
          <DeleteBtn />
        </div>
      </div>
      {userData[0] &&
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 p-2 md:p-5 md:border md:shadow-md md:rounded-lg">
          <div className='overflow-hidden'>
            {userData[0].image_link ? (
              <div>
                <div className="aspect-square h-40 w-40">
                  <p>Image</p>
                  <img
                    src={`${userData[0].image_link}`}
                    alt="Selected"
                    width={150}
                    height={150}
                    className='h-full w-full object-cover'
                  />
                </div>
                {edit1 ?
                  <UploadButton id={coId} isEdit={true} /> :
                  <p className='text-primary underline flex items-center justify-center m-5'
                    onClick={() => { setEdit1(1) }}>Edit</p>
                }
              </div>
            ) : (
              <><p>Image</p><UploadButton id={coId} isEdit={false} /></>
            )}
          </div>
          {/* <div className="">
          <p className="text-sm text-gray-500">Image</p>
          <p className="text-base"><img src={`${userData[0].image_link}`} ></img></p>
        </div> */}
          <div className="">
            <p className="text-sm text-gray-500">Head</p>
            <p className="text-base">{userData[0].event_heading}</p>
          </div>
          <div className="">
            <p className="text-sm text-gray-500">News Description</p>
            <p className="text-base">{userData[0].event_body}</p>
          </div>
          <div className="">
            <p className="text-sm text-gray-500">Location</p>
            <p className="text-base">{userData[0].location}</p>
          </div>
          <div className="">
            <p className="text-sm text-gray-500">News Description</p>
            <p className="text-base">{userData[0].created_time.split("T")[0].split('-').reverse().join('-')}</p>
          </div>


        </div>
      }
    </div>
  );
}

export default Page;




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

type ImageFormData = z.infer<typeof formSchema>;

const UploadButton = ({ id, isEdit }: any) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const form = useForm<ImageFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: undefined,
    },
  });
  const token = Cookies.get('adtoken');
  const { toast } = useToast();


  const onSubmit = async (data: any) => {
    const formData = new FormData();

    if (selectedImage) {
      const compressedImage = await resizeImage(selectedImage);
      formData.append("image", compressedImage);
    }
    try {
      const response = await fetch(`${apiURL}/adminEdit/updateEventImage?recordId=${id}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (result) {
        toast({
          title: "Event Uploaded Successfully.",
          description: "Event image successfully updated",
        });
      }
      // Reload the page
      setTimeout(function () {
        window.location.reload();
      }, 1800);

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops, Something went wrong!",
        description: "Please try again...",
      });
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className={cn("flex md:flex-row w-[100%] flex-col")}>
        <div className="flex w-[100%] gap-2 flex-col">
          {!isEdit && (<Form {...form}>
            <form
              noValidate
              onSubmit={form.handleSubmit(onSubmit)}
              className='flex flex-col gap-4 place-items-center'
            >
              <div
                className={`flex w-[100%] gap-4  flex-col items-center md:flex-col md:justify-between md:items-center`}
              >
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
              <Button size="sm" variant={'default'} type="submit">
                Upload
              </Button>

            </form>
          </Form>)}

        </div>
      </div>

      {isEdit && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Edit Image</h2>
            <div className="flex justify-center mt-4">

              <Form {...form}>
                <form
                  noValidate
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='flex flex-col gap-4 place-items-center'
                >
                  <div
                    className={`flex w-[100%] gap-4  flex-col items-center md:flex-col md:justify-between md:items-center`}
                  >
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
                  <Button size="sm" variant={'default'} type="submit">
                    Upload
                  </Button>
                  {isEdit ?

                    <p className='text-primary underline flex items-center justify-center m-1' onClick={() => { window.location.reload() }}>Cancel</p>
                    : ''
                  }

                </form>
              </Form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}