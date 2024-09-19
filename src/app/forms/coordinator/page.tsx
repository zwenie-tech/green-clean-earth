"use client";
import React ,{useState}from "react";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
  name: z.string().nonempty("Name is required"),
  email: z.string().nonempty("Email is required"),
  username: z.string().nonempty("Username is required"),
  contactnumber: z.string().nonempty("Contact number is required"),
  createddate: z.string().nonempty("Created date is required"),
  profession: z.string().nonempty("Profession is required"),
  groupname: z.string().nonempty("Group name is required"),
  grouptype: z.string().nonempty("Group type is required"),
  schooltype: z.string().nonempty("School type is required"),
  schoolcategory: z.string().nonempty("School category is required"),
  edudistrict: z.string().nonempty("Education district is required"),
  edusubdistrict: z.string().nonempty("Education subdistrict is required"),
  sahodaya: z.string().nonempty("Sahodaya is required"),
  block: z.string().nonempty("Block is required"),
  project: z.string().nonempty("Project is required"),
  chapter: z.string().nonempty("Chapter is required"),
  zone: z.string().nonempty("Zone is required"),
});

type FormData = z.infer<typeof formSchema>;

const Cordinate = () => {
  // Use the form hook with Zod schema validation
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      contactnumber: "",
      createddate: "",
      profession: "",
      groupname: "",
      grouptype: "",
      schooltype: "",
      schoolcategory: "",
      edudistrict: "",
      edusubdistrict: "",
      sahodaya: "",
      block: "",
      project: "",
      chapter: "",
      zone: "",
    },
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };
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
              <h1 className="text-center font-bold text-xl">Coordinator</h1>
              <button
                  type="button"
                  className="btn text-primary bg-light-gray py-3 px-4 rounded-lg btn-lg shadow-lg ml-auto"
                  onClick={handleEditClick}
                  disabled={isEditing} // Disable the button when editing
                >
                  {isEditing ? "Editing..." : "Edit"}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormField 
          control={form.control}
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
          control={form.control}
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
           control={form.control}
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
          control={form.control}
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
        control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
           control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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

export default Cordinate;
