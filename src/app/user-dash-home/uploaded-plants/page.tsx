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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [edit1, setEdit1] = useState(0);
  const [edit2, setEdit2] = useState(0);
  const [edit3, setEdit3] = useState(0);
  const [edit4, setEdit4] = useState(0);
  const itemsPerPage = 10;

 
    useEffect(() => {
      async function fetchfirstData(){
        const responseall = await fetch(`${apiURL}/uploads/me?limit=100000000000`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); 
        const dataall = await responseall.json();
        setTotalPages(Math.ceil(dataall.Uploads.length / itemsPerPage));
      }
      fetchfirstData();
    }, [token]);

    const handlePageChange = (newPage: number) => {
      if (newPage > 0 && newPage <= totalPages) {
        
        setCurrentPage(newPage);
      }
    }
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${apiURL}/uploads/me?page=${currentPage}&limit=${itemsPerPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result: ApiResponse = await response.json();
      if (result.success) {
        setData(result.Uploads);
      }
    };

    fetchData();
  }, [token,currentPage]);

  return (
    <main className='min-h-screen flex flex-col'>
      <NavigationBar />
      <div className='mx-2 mt-6'>
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
                        <div>
                        <div className="aspect-square h-40 w-40">
                          <img 
                            src={`${imageURL}${plant.up_file}`} 
                            alt="Selected" 
                            width={150} 
                            height={150}
                            className='h-full w-full object-cover'
                          />
                        </div>
                        {edit1 ?
                          <UploadButton imageNo={1} treeNo={plant.up_id} isEdit={true}/>:
                          <p className='text-primary underline flex items-center justify-center m-5' 
                          onClick={()=>{setEdit1(1)}}>Edit</p>
                          }
                        </div>
                      ) : (
                        <UploadButton imageNo={1} treeNo={plant.up_id} isEdit={false}/>
                      )}
                    </div>
                  </td>
                  <td className='border border-black p-4'>
                    <div className='w-56 h-56  md:max-w-[200px]'>
                      {plant.up_file_2 ? (
                        // <Image src={`${imageURL}${plant.up_file}`} alt='' width={200} height={200} />
                        <div>
                        <div className="aspect-square h-40 w-40">
                          <img 
                            src={`${imageURL}${plant.up_file_2}`} 
                            alt="Selected" 
                            width={150} 
                            height={150}
                            className='h-full w-full object-cover'
                          />
                        </div>
                        {edit2 ?
                          <UploadButton imageNo={2} treeNo={plant.up_id} isEdit={true}/>:
                          <p className='text-primary underline flex items-center justify-center m-5' 
                          onClick={()=>{setEdit2(1)}}>Edit</p>
                          }
                        </div>
                      ) : (
                        <UploadButton imageNo={2} treeNo={plant.up_id} isEdit={false}/>
                      )}
                    </div>
                  </td>
                  <td className='border border-black p-4'>
                    <div className='w-56 h-56  md:max-w-[200px]'>
                      {plant.up_file_2 ? (plant.up_file_3 ? (
                        <div>
                          <div className="aspect-square h-40 w-40">
                            <img 
                              src={`${imageURL}${plant.up_file_3}`} 
                              alt="Selected" 
                              width={150} 
                              height={150}
                              className='h-full w-full object-cover'
                            />
                          </div>
                          {edit3 ?
                          <UploadButton imageNo={3} treeNo={plant.up_id} isEdit={true}/>:
                          <p className='text-primary underline flex items-center justify-center m-5' 
                          onClick={()=>{setEdit3(1)}}>Edit</p>
                          }
                        </div>

                      ) : (
                        <UploadButton imageNo={3} treeNo={plant.up_id} isEdit={false}/>
                      )):(<div className='bg-slate-200'></div>)}
                    </div>
                  </td>
                  <td className='border border-black p-4'>
                    <div className='w-56 h-56  md:max-w-[200px]'>
                    {plant.up_file_2 && plant.up_file_3 ? (plant.up_file_4 ? (
                        <div className='flex items-center justify-center'>
                          <div className="aspect-square h-40 w-40">
                            <img 
                              src={`${imageURL}${plant.up_file_4}`} 
                              alt="Selected" 
                              width={150} 
                              height={150}
                              className='h-full w-full object-cover'
                            />
                            </div>
                            {edit4 ?
                          <UploadButton imageNo={4} treeNo={plant.up_id} isEdit={true}/>:
                          <p className='text-primary underline flex items-center justify-center m-5' 
                          onClick={()=>{setEdit4(1)}}>Edit</p>
                          }
                        </div>
                      ) : (
                        <UploadButton imageNo={4} treeNo={plant.up_id} isEdit={false}/>
                      )):(<div className='bg-slate-200'></div>)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-2 my-4">
        <button
        className={currentPage === 1 ? 
          "text-white text-sm py-2 px-4 bg-[#6b6767] rounded-xl shadow-lg" 
        : "text-white text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
        }
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-xl">{currentPage}</span>
        <button
          className={currentPage === totalPages ? 
            "text-white text-sm py-2 px-4 bg-[#6b6767] rounded-xl shadow-lg" 
          : "text-white text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
          }
          onClick={() => {
            handlePageChange(currentPage + 1) 
          }}
          disabled={currentPage === totalPages}
        >
          Next
        </button>

        
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

const UploadButton = ({imageNo,treeNo,isEdit}:any) => {
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
                  {isEdit?
        
        <p className='text-primary underline flex items-center justify-center m-1' onClick={()=>{window.location.reload()}}>Cancel</p>
                    :''
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
