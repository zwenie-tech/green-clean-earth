"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useForm ,SubmitHandler} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"; // import Zod for form validation
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define the form schema using Zod
const formSchema = z.object({
  district: z.string().nonempty("District is required"),
  edudistrict: z.string().nonempty("Education district is required"),
  edusubdistrict: z.string().nonempty("Education subdistrict is required"),
  lsgdname: z.string().nonempty("LSGD Name is required"),
});

const EduSubform = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };


type FormData = z.infer<typeof formSchema>;
  // Use the form hook with Zod schema validation
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      district: "",
      edudistrict: "",
      edusubdistrict: "",
      lsgdname: "",
    },
  });

 // Define handleSubmit with proper typing for form data
 const handleSubmit: SubmitHandler<FormData> = (data) => {
  console.log(data); // Handle form submit logic here
  setIsEditing(false); // Reset to non-editing mode after submission
};

  return (
    <div className="flex flex-col md:flex-row">
      {/* Form Div */}
      <div
        className="md:w-1/2 w-full"
        style={{ backgroundColor: "#f7f7f7", padding: "5px", borderRadius: "8px" }}
      >
        <Form {...form}>
          <div className="w-full mb-4 md:mb-0 rounded-lg border-1 border-black shadow-xl bg-light-gray">
            <div className="card p-3">
              <div className="flex items-center mb-3 gap-5">
                <h1 className="text-center font-bold text-xl">Education Subdistrict</h1>
                <button
                  type="button"
                  className="btn text-primary bg-light-gray py-3 px-4 rounded-lg btn-lg shadow-lg ml-auto"
                  onClick={handleEditClick}
                  disabled={isEditing} // Disable the button when editing
                >
                  {isEditing ? "Editing..." : "Edit"}
                </button>
              </div>

              {/* District Field */}
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>District</FormLabel>
                    <Select disabled={!isEditing} {...field}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="type1">Type 1</SelectItem>
                        <SelectItem value="type2">Type 2</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Education District Field */}
              <FormField
                control={form.control}
                name="edudistrict"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Education District</FormLabel>
                    <Select disabled={!isEditing} {...field}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="type1">Type 1</SelectItem>
                        <SelectItem value="type2">Type 2</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Education Subdistrict Field */}
              <FormField
                control={form.control}
                name="edusubdistrict"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Education Subdistrict</FormLabel>
                    <Select disabled={!isEditing} {...field}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="type1">Type 1</SelectItem>
                        <SelectItem value="type2">Type 2</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

             

              {/* Submit Button */}
              {isEditing && (
                <div className="flex justify-center">
                  <button
                    type="submit"
                    onClick={form.handleSubmit(handleSubmit)} // Ensure correct handleSubmit usage
                    className="btn m-3 text-white bg-primary py-2 px-5 rounded-sm shadow-lg"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>
        </Form>
      </div>

      {/* Image Div */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center rounded"
        style={{ backgroundImage: "url('/images/login.jpeg')" }}
      ></div>
    </div>
  );
};

export default EduSubform;
