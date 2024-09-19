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
const formSchema = z.object({
  parname: z.string().nonempty(" Participant Name is required"),
  activitylink: z.string().nonempty("Activity link is required"),
  description: z.string().nonempty("Descripton is required"),
  view : z.string().nonempty("View is required"),
  like: z.string().nonempty("Link is required"),
  value : z.string().nonempty("Value is required"),
  createddate: z.string().nonempty("Created Date is required"),
  category: z.string().nonempty("Category is required"),
  groupname: z.string().nonempty("Group Name is required"),
  grouptype: z.string().nonempty("Group Type is required"),
  schooltype: z.string().nonempty("School Type is required"),
  schoolcategory: z.string().nonempty(" School Category is required"),
  edudistrict : z.string().nonempty("Education District is required"),
  edusubdistrict: z.string().nonempty("Education Subdistrict is required"),
  sahodaya: z.string().nonempty("Name is required"),
  block: z.string().nonempty("Sahodaya is required"),
  project: z.string().nonempty("Project is required"),
  chapter: z.string().nonempty("Chapter is required"),
  zone: z.string().nonempty("Zone is required"),
});

type FormData = z.infer<typeof formSchema>;

const ActivityForm = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parname: "",
      activitylink: "",
      description: "",
      view:"",
      like: "",
      value: "",
      createddate:"",
      category:"",
      schoolcategory: "",
      groupname: "",
      grouptype:"",
      schooltype: "",
      edudistrict: "",
      edusubdistrict:"",
      sahodaya: "",
      block: "",
      project:"",
      chapter: "",
      zone:"",
    },
  });

    // Define handleSubmit with proper typing for form data
    const handleSubmit: SubmitHandler<FormData> = (data) => {
      console.log(data); // Handle form submit logic here
      setIsEditing(false); // Reset to non-editing mode after submission
    };

  return (
      <div
        className=" w-full"
        style={{ backgroundColor: "#f7f7f7", padding: "5px", borderRadius: "8px" }}
      >
        <Form {...form}>
          <div className="w-full mb-4 md:mb-0 rounded-lg border-1 border-black shadow-xl bg-light-gray">
            <div className="card p-3">
              <div className="flex items-center mb-3 gap-5">
              <h1 className="text-center font-bold text-xl ">Activity</h1>
                <button
                  type="button"
                  className="btn text-primary bg-light-gray py-3 px-4 rounded-lg btn-lg shadow-lg ml-auto"
                  onClick={handleEditClick}
                >
                  {isEditing ? "Editing..." : "Edit"}
                </button>
              </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <FormField 
                name="parname"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Participant Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
              control={form.control}
                name="activitylink"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Activity Link</FormLabel>
                    <FormControl >
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
               control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
               control={form.control}
                name="view"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>View </FormLabel>
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
              control={form.control}
                name="like"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Like </FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Value </FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
              control={form.control}
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
               control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Category</FormLabel>
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
              control={form.control}
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
                name="groupname"
                control={form.control}
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
                control={form.control}
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
              <FormField
                name="schooltype"
                control={form.control}
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
              name="edudistrict"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel> Education District</FormLabel>
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
            name="edusubdistrict"
            control={form.control}
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Education Subdistrict </FormLabel>
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
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
  );
};

export default ActivityForm;