"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useForm ,SubmitHandler } from "react-hook-form";
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

// Zod schema for form validation
const formSchema = z.object({
  district: z.string().nonempty("District is required"),
  icdsblock: z.string().nonempty("ICDS Block is required"),
});
type FormData = z.infer<typeof formSchema>;
const ICDSform = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      district: "",
      icdsblock: "",
    },
  });

   // Define handleSubmit with proper typing for form data
   const handleSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data); // Handle form submit logic here
    setIsEditing(false); // Reset to non-editing mode after submission
  }

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
                  <h1 className="text-center font-bold text-xl ">ICDS Block</h1>
                  <button
                    type="button"
                    className="btn text-primary bg-light-gray py-3 px-4 rounded-lg btn-lg shadow-lg ml-auto"
                    onClick={handleEditClick}
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
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!isEditing}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a District" />
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

                {/* ICDS Block Field */}
                <FormField
                  control={form.control}
                  name="icdsblock"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>ICDS Block</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={!isEditing} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

export default ICDSform;
