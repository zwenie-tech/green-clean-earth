"use client";
import Image from 'next/image';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { BsImages, BsPaperclip, BsX } from 'react-icons/bs';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { number, z } from 'zod';
import imageCompression from 'browser-image-compression';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { apiURL, imageURL, uploadPlantData } from '@/app/requestsapi/request';
import Cookies from "js-cookie";
import { useToast } from '@/components/ui/use-toast';


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

interface UploadButtonProps {
  imageNo: number;
  treeNo: number;
  isEdit: boolean;
  onComplete?: () => void;
  onCloseModal?: () => void;
}

export const UploadButton = ({ 
  imageNo, 
  treeNo, 
  isEdit, 
  onComplete, 
  onCloseModal 
}: UploadButtonProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const token = Cookies.get('token');

  const form = useForm<ImageFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { image: undefined },
  });

  const handleImageUpload = async (imageFile: File | null) => {
    if (!imageFile) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("imageNumber", imageNo.toString());
    formData.append("treeNumber", treeNo.toString());

    try {
      const compressedImage = await resizeImage(imageFile);
      formData.append("image", compressedImage);

      const response = await fetch(`${apiURL}/uploads/updateImage`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        // Attempt to extract error message from response body
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }
      const result = await response.json();
      if (result.success) {
        toast({
          title: "Success",
          description: "Image updated successfully!",
        });
        form.reset();
        setImage(null);
        onComplete?.();
        setTimeout(function() {
            window.location.reload();
          }, 1800);
      }
    } catch (error:any) {
      toast({
        variant: "destructive",
        title: "Oops, Something went wrong!",
        description: error.message || "Please try again...",
      });
      console.error("Error:", error);
    }finally {
      setIsUploading(false);
    }
  };

  const renderImagePreview = () => (
    <div className="relative group">
      {image ? (
        <>
          <div className="flex items-center justify-center h-40 bg-gray-100 rounded-md overflow-hidden">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="h-40 object-cover rounded-md"
            />
          </div>
          <button
            type="button"
            onClick={() => setImage(null)}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Remove image"
          >
            <BsX size={18} />
          </button>
        </>
      ) : (
        <div className="flex items-center justify-center h-40 bg-gray-100 rounded-md">
          <BsImages className="text-gray-400 text-4xl" />
        </div>
      )}
    </div>
  );

  const renderFileInput = () => (
    <FormField
      control={form.control}
      name="image"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              asChild
            >
              <label className="cursor-pointer flex items-center gap-2">
                <BsPaperclip />
                {image ? "Change Image" : "Select Image"}
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={async (e) => {
                    const files = e.target.files;
                    if (files?.[0]) {
                      const validFile = await validateAndResizeImage(files);
                      field.onChange(files);
                      setImage(validFile?.[0] || null);
                    }
                  }}
                />
              </label>
            </Button>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  if (isEdit) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={()=>{window.location.reload()}}
        />
        <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md z-10">
          <button
            type="button"
            onClick={()=>{window.location.reload()}}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <BsX size={24} />
          </button>
          
          <h2 className="text-xl font-bold mb-4">Update Image #{imageNo}</h2>
          
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => handleImageUpload(image))}
              className="space-y-4"
            >
              {renderImagePreview()}
              {renderFileInput()}
              
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={()=>{window.location.reload()}}
                  className="flex-1"
                  disabled={isUploading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={!image || isUploading}
                >
                  {isUploading ? "Uploading..." : "Confirm Update"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => handleImageUpload(image))}
        className="space-y-4"
      >
        {renderImagePreview()}
        {renderFileInput()}
        <Button
          type="submit"
          className="w-full"
          disabled={!image || isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Image"}
        </Button>
      </form>
    </Form>
  );
};