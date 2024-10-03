"use client";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Uploadform } from "./uploadform";
import axios from "axios";
import { apiURL, imageURL } from "@/app/requestsapi/request";
import Cookies from 'js-cookie';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import imageCompression from 'browser-image-compression';
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { BsImages, BsPaperclip } from "react-icons/bs";

interface UploadData {
  up_file: string;
  up_file_2: string;
  up_file_3: string;
  up_file_4: string;
  up_id: string;
  us_id: string;
  us_name: string;
  up_planter: string;
  cntry_name: string;
  st_name: string;
  dis_name: string;
  cop_name: string;
  lsg_name: string;
  source_name: string;
  up_landmark_details: string;
  up_tree_name: string;
  co_ord_name: string;
  gp_name: string;
  group_type: string;
  type_name: string;
  gp_cat_name: string;
  edu_district: string;
  edu_sub_district_name: string;
  sahodaya_name: string;
  block_name: string;
  project_name: string;
  chapter_name: string;
  zone_name: string;
  city: string;
}

function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const Id = pathname.split("/")[3];
  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];
  const token = Cookies.get("adtoken");
  const [uploadData, setUploadData] = useState<UploadData[]>([]);
  const [edit1, setEdit1] = useState(0);
  const [edit2, setEdit2] = useState(0);
  const [edit3, setEdit3] = useState(0);
  const [edit4, setEdit4] = useState(0);
  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
    }
  }, [token, router]);


  useEffect(() => {
    async function fetchdata() {
      if (token) {

        const response = await axios.get(`${apiURL}/adminFrame/uploadDetails/${Id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        try {

          if (response.data.success && response.status != 203) {
            setUploadData(response.data.uploadDetails);
          } else {

          }

        } catch (error) {
          console.error("Error:", error);

        }
      };
    }
    fetchdata();
  }, [token, Id]);
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
          <span className="text-base">Manage Uploads</span>
        </div>
        <div className="flex justify-between">

          <Uploadform />
        </div>
      </div>
      {uploadData[0] ?
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 p-2 md:p-5 md:border md:shadow-md md:rounded-lg">

          <div className='overflow-hidden'>
            {uploadData[0].up_file ? (
              <div>
                <div className="aspect-square h-40 w-40">
                  <p>Image 1</p>
                  <img
                    src={`${imageURL}${uploadData[0].up_file}`}
                    alt="Selected"
                    width={150}
                    height={150}
                    className='h-full w-full object-cover'
                  />
                </div>
                {edit1 ?
                  <UploadButton imageNo={1} treeNo={uploadData[0].up_id} isEdit={true} /> :
                  <p className='text-primary underline flex items-center justify-center m-5'
                    onClick={() => { setEdit1(1) }}>Edit</p>
                }
              </div>
            ) : (
              <><p>Image 1</p><UploadButton imageNo={1} treeNo={uploadData[0].up_id} isEdit={false} /></>
            )}
          </div>

          <div className='overflow-hidden'>
            {uploadData[0].up_file_2 ? (
              <div>
                <div className="aspect-square h-40 w-40">
                  <p>Image 2</p>
                  <img
                    src={`${imageURL}${uploadData[0].up_file_2}`}
                    alt="Selected"
                    width={150}
                    height={150}
                    className='h-full w-full object-cover'
                  />
                </div>
                {edit2 ?
                  <UploadButton imageNo={2} treeNo={uploadData[0].up_id} isEdit={true} /> :
                  <p className='text-primary underline flex items-center justify-center m-5'
                    onClick={() => { setEdit2(1) }}>Edit</p>
                }
              </div>
            ) : (
              <><p>Image 2</p><UploadButton imageNo={2} treeNo={uploadData[0].up_id} isEdit={false} /></>
            )}
          </div>

          <div className='overflow-hidden'>
            {uploadData[0].up_file_3 ? (
              <div>
                <div className="aspect-square h-40 w-40">
                  <p>Image 3</p>
                  <img
                    src={`${imageURL}${uploadData[0].up_file_3}`}
                    alt="Selected"
                    width={150}
                    height={150}
                    className='h-full w-full object-cover'
                  />
                </div>
                {edit3 ?
                  <UploadButton imageNo={3} treeNo={uploadData[0].up_id} isEdit={true} /> :
                  <p className='text-primary underline flex items-center justify-center m-5'
                    onClick={() => { setEdit3(1) }}>Edit</p>
                }
              </div>
            ) : (
              <><p>Image 3</p><UploadButton imageNo={3} treeNo={uploadData[0].up_id} isEdit={false} /></>
            )}
          </div>


          <div className='overflow-hidden'>
            {uploadData[0].up_file_4 ? (
              <div>
                <div className="aspect-square h-40 w-40">
                  <p>Image 4</p>
                  <img
                    src={`${imageURL}${uploadData[0].up_file_4}`}
                    alt="Selected"
                    width={150}
                    height={150}
                    className='h-full w-full object-cover'
                  />
                </div>
                {edit4 ?
                  <UploadButton imageNo={4} treeNo={uploadData[0].up_id} isEdit={true} /> :
                  <p className='text-primary underline flex items-center justify-center'
                    onClick={() => { setEdit4(1) }}>Edit</p>
                }
              </div>
            ) : (
              <><p>Image 4</p><UploadButton imageNo={4} treeNo={uploadData[0].up_id} isEdit={false} /></>
            )}
          </div>

          {uploadData[0].up_id ?
            <div className="">
              <p className="text-sm text-gray-500">Tree Number</p>
              <p className="text-base">{uploadData[0].up_id}</p>
            </div>
            : ''}
          {uploadData[0].us_id ?
            <div className="">
              <p className="text-sm text-gray-500">Uploader ID</p>
              <p className="text-base">{uploadData[0].us_id}</p>
            </div>
            : ''}
          {uploadData[0].us_name ?
            <div className="">
              <p className="text-sm text-gray-500">Uploader Name</p>
              <p className="text-base">{uploadData[0].us_name}</p>
            </div>
            : ''}
          {uploadData[0].up_planter ?
            <div className="">
              <p className="text-sm text-gray-500">Planter Name</p>
              <p className="text-base">{uploadData[0].up_planter}</p>
            </div>
            : ''}
          {uploadData[0].cntry_name ?
            <div className="">
              <p className="text-sm text-gray-500">Country</p>
              <p className="text-base">{uploadData[0].cntry_name}</p>
            </div>
            : ''}
          {uploadData[0].st_name ?
            <div className="">
              <p className="text-sm text-gray-500">State</p>
              <p className="text-base">{uploadData[0].st_name}</p>
            </div>
            : ''}
          {uploadData[0].dis_name ?
            <div className="">
              <p className="text-sm text-gray-500">District</p>
              <p className="text-base">{uploadData[0].dis_name}</p>
            </div>
            : ''}
          {uploadData[0].cop_name ?
            <div className="">
              <p className="text-sm text-gray-500">Corporation </p>
              <p className="text-base">{uploadData[0].cop_name}</p>
            </div>
            : ''}
          {uploadData[0].lsg_name ?
            <div className="">
              <p className="text-sm text-gray-500">LSGD</p>
              <p className="text-base">{uploadData[0].lsg_name}</p>
            </div>
            : ''}
          {uploadData[0].source_name ?
            <div className="">
              <p className="text-sm text-gray-500">Source</p>
              <p className="text-base">{uploadData[0].source_name}</p>
            </div>
            : ''}
          {uploadData[0].up_landmark_details ?
            <div className="">
              <p className="text-sm text-gray-500">Landmark</p>
              <p className="text-base">{uploadData[0].up_landmark_details}</p>
            </div>
            : ''}
          {uploadData[0].up_tree_name ?
            <div className="">
              <p className="text-sm text-gray-500">Tree Name</p>
              <p className="text-base">{uploadData[0].up_tree_name}</p>
            </div>
            : ''}
          {uploadData[0].co_ord_name ?
            <div className="">
              <p className="text-sm text-gray-500">Coordinator Name</p>
              <p className="text-base">{uploadData[0].co_ord_name}</p>
            </div>
            : ''}
          {uploadData[0].gp_name ?
            <div className="">
              <p className="text-sm text-gray-500">Group Name</p>
              <p className="text-base">{uploadData[0].gp_name}</p>
            </div>
            : ''}
          {uploadData[0].group_type ?
            <div className="">
              <p className="text-sm text-gray-500">Group Type</p>
              <p className="text-base">{uploadData[0].group_type}</p>
            </div>
            : ''}
          {uploadData[0].type_name ?
            <div className="">
              <p className="text-sm text-gray-500">School Type</p>
              <p className="text-base">{uploadData[0].type_name}</p>
            </div>
            : ''}
          {uploadData[0].gp_cat_name ?
            <div className="">
              <p className="text-sm text-gray-500">School Category</p>
              <p className="text-base">{uploadData[0].gp_cat_name}</p>
            </div>
            : ''}
          {uploadData[0].edu_district ?
            <div className="">
              <p className="text-sm text-gray-500">Educational DIstrict</p>
              <p className="text-base">{uploadData[0].edu_district}</p>
            </div>
            : ''}
          {uploadData[0].edu_sub_district_name ?
            <div className="">
              <p className="text-sm text-gray-500">Educational Subdistrict</p>
              <p className="text-base">{uploadData[0].edu_sub_district_name}</p>
            </div>
            : ''}
          {uploadData[0].sahodaya_name ?
            <div className="">
              <p className="text-sm text-gray-500">Sahodaya</p>
              <p className="text-base">{uploadData[0].sahodaya_name}</p>
            </div>
            : ''}
          {uploadData[0].block_name ?
            <div className="">
              <p className="text-sm text-gray-500">Block</p>
              <p className="text-base">{uploadData[0].block_name}</p>
            </div>
            : ''}
          {uploadData[0].project_name ?
            <div className="">
              <p className="text-sm text-gray-500">Project</p>
              <p className="text-base">{uploadData[0].project_name}</p>
            </div>
            : ''}
          {uploadData[0].chapter_name ?
            <div className="">
              <p className="text-sm text-gray-500">Chapter</p>
              <p className="text-base">{uploadData[0].chapter_name}</p>
            </div>
            : ''}
          {uploadData[0].zone_name ?
            <div className="">
              <p className="text-sm text-gray-500">Zone</p>
              <p className="text-base">{uploadData[0].zone_name}</p>
            </div>
            : ''}
        </div> : ''}
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

const UploadButton = ({ imageNo, treeNo, isEdit }: any) => {
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
    formData.append("imageNumber", imageNo);
    formData.append("treeNumber", treeNo);

    if (selectedImage) {
      const compressedImage = await resizeImage(selectedImage);
      formData.append("image", compressedImage);
    }
    try {
      const response = await fetch(`${apiURL}/adminEdit/updateImage`, {
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
          title: "Plant Uploaded Successfully.",
          description: "plant image successfully updated",
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
