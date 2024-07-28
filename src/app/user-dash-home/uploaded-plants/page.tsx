'use client';

import NavigationBar from '@/components/navigationBar';
import PageTitle from '@/components/sm/pageTitle';
import GceBadge from '@/components/gceBadge';
import Footer from '@/components/footer';
import Image from 'next/image';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { BsImages, BsPaperclip } from 'react-icons/bs';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import imageCompression from 'browser-image-compression';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { apiURL, imageURL, uploadPlantData } from '@/app/requestsapi/request';
import Cookies from "js-cookie";
import { useToast } from '@/components/ui/use-toast';

type PlantData = {
  up_id: number;
  up_name: string;
  up_planter: string;
  up_tree_name: string;
  up_cord_id: number;
  up_date: string;
  up_file: string;
  up_file_2: string | null;
  up_file_2_time: string | null;
  up_file_3: string | null;
  up_file_3_time: string | null;
  up_file_4: string | null;
  up_file_4_time: string | null;
  up_country_id: string | null;
  cntry_name: string | null;
  up_state_id: string | null;
  st_name: string | null;
  city: string | null;
  up_district: string | null;
  dis_name: string | null;
  up_corporation: string | null;
  cop_name: string | null;
  up_lsgd: string | null;
  lsg_name: string | null;
  up_ward: string | null;
};

type ApiResponse = {
  Uploads: PlantData[];
  success: boolean;
};

const MyUploadedPlants = () => {
  const [data, setData] = useState<PlantData[]>([]);
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${apiURL}/uploads/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result: ApiResponse = await response.json();
      if (result.success) {
        console.log(result.Uploads);
        setData(result.Uploads);
      }
    };

    fetchData();
  }, [token]);

  return (
    <main className='min-h-screen flex flex-col'>
      <NavigationBar />
      <div className='mx-2'>
        <PageTitle title='My Uploaded Plants' />
        <div className="overflow-x-scroll">
          <table className='mx-auto table-fixed border-collapse border border-black'>
            <thead>
              <tr className='border border-black'>
                <th className='border border-black p-4'>Tree #</th>
                <th className='border border-black p-4'>Planter</th>
                <th className='border border-black p-4'>Uploader</th>
                <th className='border border-black p-4'>Image 1</th>
                <th className='border border-black p-4'>Image 2</th>
                <th className='border border-black p-4'>Image 3</th>
                <th className='border border-black p-4'>Image 4</th>
              </tr>
            </thead>
            <tbody>
              {data.map((plant) => (
                <tr key={plant.up_id} className='align-top'>
                  <td className='border border-black p-4'>
                    <Link 
                      href={{
                        pathname: 'uploaded-plants/plant',
                        query: { tree: plant.up_id },
                      }}
                      className='text-primary underline'
                    >
                      {plant.up_id}
                    </Link>
                  </td>
                  <td className='border border-black p-4'>{plant.up_planter}</td>
                  <td className='border border-black p-4'>{plant.up_name}</td>
                  <td className='border border-black p-4'>
                    <div className='overflow-hidden'>
                      {plant.up_file ? (
                        // <Image src={`${imageURL}${plant.up_file}`} alt='' width={200} height={200} />
                        <img src={`${imageURL}${plant.up_file}`} alt="Selected" width={150} height={150} />
                      ) : (
                        <UploadButton imageNo={1} treeNo={plant.up_id}/>
                      )}
                    </div>
                  </td>
                  <td className='border border-black p-4'>
                    <div className='w-56 h-56  md:max-w-[200px]'>
                      {plant.up_file_2 ? (
                        // <Image src={`${imageURL}${plant.up_file}`} alt='' width={200} height={200} />
                        <img src={`${imageURL}${plant.up_file_2}`} alt="Selected" width={150} height={150} />
                      ) : (
                        <UploadButton imageNo={2} treeNo={plant.up_id} />
                      )}
                    </div>
                  </td>
                  <td className='border border-black p-4'>
                    <div className='w-56 h-56  md:max-w-[200px]'>
                      {plant.up_file_2 ? (plant.up_file_3 ? (
                        // <Image src={`${imageURL}${plant.up_file}`} alt='' width={200} height={200} />
                        <img src={`${imageURL}${plant.up_file_3}`} alt="Selected" width={150} height={150} />
                      ) : (
                        <UploadButton imageNo={3} treeNo={plant.up_id} />
                      )):(<div className='bg-slate-200'></div>)}
                    </div>
                  </td>
                  <td className='border border-black p-4'>
                    <div className='w-56 h-56  md:max-w-[200px]'>
                    {plant.up_file_2 && plant.up_file_3 ? (plant.up_file_4 ? (
                        // <Image src={`${imageURL}${plant.up_file}`} alt='' width={200} height={200} />
                        <img src={`${imageURL}${plant.up_file_4}`} alt="Selected" width={150} height={150} />
                      ) : (
                        <UploadButton imageNo={4} treeNo={plant.up_id} />
                      )):(<div className='bg-slate-200'></div>)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <GceBadge />
      <Footer />
    </main>
  );
};

export default MyUploadedPlants;

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

const UploadButton = ({imageNo,treeNo}:any) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const form = useForm<ImageFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: undefined,
    },
  });
  const token = Cookies.get('token');
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
      const response = await fetch(`${apiURL}/uploads/updateImage`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        console.log(response);
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (result) {
        toast({
          title: "Plant Uploaded Successfully.",
          description: "Your plant image successfully updated",
        });
      }
      // Reload the page
      setTimeout(function() {
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
            <Form {...form}>
              <form  noValidate
        onSubmit={form.handleSubmit(onSubmit)}>
              <div
                className={`flex w-[100%] gap-4  flex-col items-center md:flex-col md:justify-between md:items-center`}
              >
                <div
                  className={`flex md:flex-[1] h-[fit-content] md:justify-between md:flex-row`}
                >
                  {selectedImage ? (
                    <div className="md:max-w-[200px]">
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected"
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
              <Button size="sm" variant={'link'} type="submit">
                Upload
              </Button>
              </form>
            </Form>
          </div>
        </div>
    </div>
  )
}
