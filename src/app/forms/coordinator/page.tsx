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
  username: z.string().nonempty("Username is required"),
  contactnumber : z.string().nonempty("Name is required"),
  createddate: z.string().nonempty("Category is required"),
  profession: z.string().nonempty("City is required"),
  groupname: z.string().nonempty("Name is required"),
  grouptype: z.string().nonempty("Category is required"),
  schooltype: z.string().nonempty("City is required"),
  schoolcategory: z.string().nonempty("Name is required"),
  edudistrict : z.string().nonempty("Category is required"),
  edusubdistrict: z.string().nonempty("City is required"),
  sahodaya: z.string().nonempty("Name is required"),
  block: z.string().nonempty("Category is required"),
  project: z.string().nonempty("City is required"),
  chapter: z.string().nonempty("Name is required"),
  zone: z.string().nonempty("Category is required"),
});

const Cordinate = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      contactnumber:"",
      createddate: "",
      profession: "",
      groupname: "",
      grouptype:"",
      schooltype: "",
      schoolcategory: "",
      edudistrict: "",
      edusubdistrict:"",
      sahodaya: "",
      block: "",
      project:"",
      chapter: "",
      zone:"",
    },
  });

  const handleSubmit = (data) => {
    console.log(data); // Handle form submit logic here
    setIsEditing(false); // Reset to non-editing mode after submission
  };

  return (
    <div
  className="w-full"
  style={{ backgroundColor: "#f7f7f7", padding: "5px", borderRadius: "8px" }}
>
  <Form {...form} onSubmit={form.handleSubmit(handleSubmit)}>
    <div className="w-full mb-4 md:mb-0 rounded-lg border-1 border-black shadow-xl bg-light-gray">
      <div className="card p-3">
        <div className="flex items-center mb-3 gap-5">
          <h1 className="text-center font-bold text-xl">Coordinator</h1>
          <button
            type="button"
            className="btn text-primary bg-light-gray py-3 px-4 rounded-lg btn-lg shadow-lg ml-auto"
            onClick={handleEditClick}
          >
            {isEditing ? "Editing..." : "Edit"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <FormControl>
                  <Input {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            name="username"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> 
          <FormField
            name="contactnumber"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <FormField
            name="createddate"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Created Date</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="profession"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Profession</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
            name="groupname"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Group Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="grouptype"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Group Type</FormLabel>
                <Select disabled={!isEditing}>
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <FormField
            name="schooltype"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>School Type</FormLabel>
                <Select disabled={!isEditing}>
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
          <FormField
            name="schoolcategory"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>School Category</FormLabel>
                <Select disabled={!isEditing}>
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
          <FormField
            name="edudistrict"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Education District</FormLabel>
                <Select disabled={!isEditing}>
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <FormField
            name="edusubdistrict"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Education Subdistrict</FormLabel>
                <Select disabled={!isEditing}>
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
           <FormField
            name="sahodaya"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Sahodaya</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="block"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Block</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <FormField
            name="project"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Project</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="chapter"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Chapter</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        
          <FormField
            name="zone"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Zone</FormLabel>
                <FormControl>
                  <Input {...field} disabled={!isEditing} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {isEditing && (
          <div className="flex justify-center mt-4">
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

  );
};

export default Cordinate;
