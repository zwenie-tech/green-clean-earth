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
  image1: z.string().nonempty("Image1 is required"),
  image2: z.string().nonempty("Image2 is required"),
  image3: z.string().nonempty("Image3 is required"),
  image4 : z.string().nonempty("Image4 is required"),
  treeno: z.string().nonempty("Tree Number is required"),
  uploadid: z.string().nonempty("Uploader ID is required"),
  uploadname: z.string().nonempty("Uploader Name is required"),
  plantername : z.string().nonempty("Planter Name is required"),
  country: z.string().nonempty("Country is required"),
  state: z.string().nonempty("State is required"),
  district: z.string().nonempty("District is required"),
  cooperation: z.string().nonempty("Cooperation is required"),
  lsgd: z.string().nonempty("LSGD is required"),
  source: z.string().nonempty("Landmark is required"),
  landmark : z.string().nonempty("Category is required"),
  treename: z.string().nonempty("Tree Name is required"),
  coordinatorname: z.string().nonempty("Coordinator Name is required"),
  groupname: z.string().nonempty("Group Name is required"),
  grouptype: z.string().nonempty("Group Type is required"),
  schooltype: z.string().nonempty("School Type is required"),
  schoolcategory: z.string().nonempty("School Category is required"),
  edudistrict: z.string().nonempty("Educational District is required"),
  edusubdistrict: z.string().nonempty("Educational Sub District is required"),
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
      image1:"",
      image2:"",
      image3:"",
      image4:"",
      treeno: "",
      uploadid: "",
      uploadname: "",
      plantername:"",
      country:"",
      state: "",
      district: "",
      cooperation:"",
      lsgd: "",
      source: "",
      landmark:"",
      treename:"",
      coordinatorname:"",
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
    <div className="flex flex-col">
      {/* Form Div */}
      <div
        className="w-full"
        style={{ backgroundColor: "#f7f7f7", padding: "5px", borderRadius: "8px" }}
      >
        <Form {...form} onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="w-full mb-4 md:mb-0 rounded-lg border-1 border-black shadow-xl bg-light-gray">
            <div className="card p-3">
              <div className="flex items-center mb-3 gap-5">
              <h1 className="text-center font-bold text-xl ">Uploads</h1>
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
                name="image1"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Image 1</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
                name="image2"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Image 2</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField 
                name="image3"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Image 3</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
                name="image4"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Image 4</FormLabel>
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
                name="treeno"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Tree Number</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="uploadid"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Uploader ID</FormLabel>
                    <FormControl >
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                name="uploadname"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Uploader Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
               <FormField
                name="plantername"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Planter Name</FormLabel>
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
                name="country"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Country </FormLabel>
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
                name="state"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>State</FormLabel>
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
                name="district"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>District </FormLabel>
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
                name="cooperation"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Cooperation </FormLabel>
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <FormField
                name="lsgd"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>LSGD </FormLabel>
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
                name="source"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Source </FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="landmark"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Landmark </FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="treename"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Tree Name</FormLabel>
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
                name="coordinatorname"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Coordinator Name</FormLabel>
                    <FormControl >
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
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="schooltype"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>School Type</FormLabel>
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
            /><FormField
            name="edusubdistrict"
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
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
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
    </div>
  );
};

export default Cordinate;
