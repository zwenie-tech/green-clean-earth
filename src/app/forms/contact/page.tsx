"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
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
const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().nonempty("Email is required"),
  subject: z.string().nonempty("Username is required"),
  messege : z.string().nonempty("Name is required"),
  date: z.string().nonempty("Category is required"),
  
});

const Contactform = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      messege:"",
      date: "",
      
    },
  });

  const handleSubmit = (data) => {
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
        <Form {...form} onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="w-full mb-4 md:mb-0 rounded-lg border-1 border-black shadow-xl bg-light-gray">
            <div className="card p-3">
              <div className="flex items-center mb-3 gap-5">
              <h1 className="text-center font-bold text-xl ">Contact Us</h1>
                <button
                  type="button"
                  className="btn text-primary bg-light-gray py-3 px-4 rounded-lg btn-lg shadow-lg ml-auto"
                  onClick={handleEditClick}
                >
                  {isEditing ? "Editing..." : "Edit"}
                </button>
              </div>

              <FormField 
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Email</FormLabel>
                    <FormControl >
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                name="subjecct"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                name="messege"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Messege </FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="date"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel> Date</FormLabel>
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

export default Contactform;
