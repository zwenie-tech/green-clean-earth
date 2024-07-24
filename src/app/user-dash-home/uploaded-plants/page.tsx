'use client';

import NavigationBar from '@/components/navigationBar'
import PageTitle from '@/components/sm/pageTitle'
import GceBadge from '@/components/gceBadge'
import Footer from '@/components/footer'
import Image from 'next/image'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { BsImages, BsPaperclip } from 'react-icons/bs'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import imageCompression from 'browser-image-compression';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

const MyUploadedPlants = () => {
  const data = [
    {
      'tree':'39468',
      'planter':'Lorem ipsum',
      'uploader':'Lorem ipsum',
      'image1':'',
      'image2':'',
      'image3':'',
      'image4':'',
    },
    {
      'tree':'39468',
      'planter':'Lorem ipsum',
      'uploader':'Lorem ipsum',
      'image1':'',
      'image2':'',
      'image3':'',
      'image4':'',
    },
    {
      'tree':'39468',
      'planter':'Lorem ipsum',
      'uploader':'Lorem ipsum',
      'image1':'',
      'image2':'',
      'image3':'',
      'image4':'',
    },
    {
      'tree':'39468',
      'planter':'Lorem ipsum',
      'uploader':'Lorem ipsum',
      'image1':'',
      'image2':'',
      'image3':'',
      'image4':'',
    },

  ];
  return (
    <main className='min-h-screen flex flex-col'>
      <NavigationBar/>
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
              {
                data.map( plant => {
                return (
                  <tr className='align-top'>
                    <td className='border border-black p-4'>
                      <Link 
                        href={{
                          pathname:'uploaded-plants/plant',
                          query:{
                            tree: plant.tree
                          }
                        }}
                        className='text-primary underline'
                      >
                        { plant.tree }
                      </Link>
                    </td>
                    <td className='border border-black p-4'>{ plant.planter }</td>
                    <td className='border border-black p-4'>{ plant.uploader }</td>
                    <td className='border border-black p-4'>
                      <div className='overflow-hidden'>
                        {
                          plant.image1 ?
                            <Image src={plant.image1} alt=''/>
                            : <UploadBUtton />
                        }
                        
                      </div>
                    </td>
                    <td className='border border-black p-4'>
                      <div className='w-56 h-56 bg-slate-200'>
                        { plant.image2 }
                        </div>
                    </td>
                    <td className='border border-black p-4'>
                      <div className='w-56 h-56 bg-slate-200'>
                        { plant.image3 }
                        </div>
                    </td>
                    <td className='border border-black p-4'>
                      <div className='w-56 h-56 bg-slate-200'>
                        { plant.image4 }
                        </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <GceBadge />
      <Footer/>
    </main>
  )
}
export default MyUploadedPlants



const MAX_FILE_SIZE = 1024 * 1024 * 100; // 100MB
const TARGET_FILE_SIZE = 1024 * 1024 * 4; // 4MB
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
async function resizeImage(file:any) {
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
async function validateAndResizeImage(files:any) {
  if (!files || files.length === 0) { 
    return files;
  }

  const file = files[0];
  if (file.size > TARGET_FILE_SIZE) {
    const resizedFile = await resizeImage(file);
    return [resizedFile];
  }

  return files;
}
const formSchema = z.object({
  image: z
    .any()
    .refine(async (files) => {
      const validFiles = await validateAndResizeImage(files);
      return validFiles?.[0]?.size <= MAX_FILE_SIZE;
    }, "Max image size is 100MB.")
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});
type ImageFormData = z.infer<typeof formSchema>;

const UploadBUtton = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const form = useForm<ImageFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: undefined,
    },
  });
  return (
    <div>
      <div className={cn("flex md:flex-row w-[100%] flex-col")}>
          <div className="flex w-[100%] gap-2 flex-col">
            <Form {...form}>
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
                                setSelectedImage(validFiles[0] || null);
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
            </Form>
          </div>
        </div>
    </div>
  )
}
