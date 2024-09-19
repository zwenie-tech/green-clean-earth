"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useForm ,SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"; // Import Zod for form validation
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

// Define the validation schema
const formSchema = z.object({
  state: z.string().nonempty("State is required"),
  district: z.string().nonempty("District is required"),
  corporation: z.string().nonempty("Corporation is required"),
  lsgdname: z.string().nonempty("LSGD name is required"),
});

type FormData = z.infer<typeof formSchema>;
const LSGDform = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Handle edit mode toggling
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Initialize the form
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      state: "",
      district: "",
      corporation: "",
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
                  <h1 className="text-center font-bold text-xl ">LSGD</h1>
                  <button
                    type="button"
                    className="btn text-primary bg-light-gray py-3 px-4 rounded-lg btn-lg shadow-lg ml-auto"
                    onClick={handleEditClick}
                  >
                    {isEditing ? "Editing..." : "Edit"}
                  </button>
                </div>

                {/* State Field */}
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Select disabled={!isEditing} {...field}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a State" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="state1">State 1</SelectItem>
                            <SelectItem value="state2">State 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* District Field */}
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>District</FormLabel>
                      <FormControl>
                        <Select disabled={!isEditing} {...field}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a District" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="district1">District 1</SelectItem>
                            <SelectItem value="district2">District 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Corporation Field */}
                <FormField
                  control={form.control}
                  name="corporation"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Corporation</FormLabel>
                      <FormControl>
                        <Select disabled={!isEditing} {...field}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a Corporation" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="corp1">Corporation 1</SelectItem>
                            <SelectItem value="corp2">Corporation 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* LSGD Name Field */}
                <FormField
                  control={form.control}
                  name="lsgdname"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>LSGD Name</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={!isEditing} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button (only visible when editing) */}
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

export default LSGDform;
