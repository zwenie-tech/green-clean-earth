import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Label } from "@/components/ui/label";
  import { Edit } from "lucide-react";
  import { zodResolver } from "@hookform/resolvers/zod";
  import * as z from "zod";
  import { useForm } from "react-hook-form";
  import { Button } from "@/components/ui/button";
  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { format } from "date-fns";
  import { CalendarIcon } from "lucide-react";
  import { Calendar } from "@/components/ui/calendar";
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
  import { cn } from "@/lib/utils";
  import { DateTimePicker } from "@/components/ui/dateTimePicker";
  const formSchema = z.object({
    image1: z
    .any()
    .refine((file) => file instanceof File, "Must be a file")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/gif"].includes(file?.type),
      "Invalid image format. Accepted formats: jpeg, png, gif."
    )
    .refine((file) => file?.size <= 5 * 1024 * 1024, "Max file size is 5MB"), // max 5MB
  image2: z
    .any()
    .refine((file) => file instanceof File, "Must be a file")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/gif"].includes(file?.type),
      "Invalid image format. Accepted formats: jpeg, png, gif."
    )
    .refine((file) => file?.size <= 5 * 1024 * 1024, "Max file size is 5MB"), // max 5MB
    image3: z
    .any()
    .refine((file) => file instanceof File, "Must be a file")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/gif"].includes(file?.type),
      "Invalid image format. Accepted formats: jpeg, png, gif."
    )
    .refine((file) => file?.size <= 5 * 1024 * 1024, "Max file size is 5MB"), // max 5MB
  image4: z
    .any()
    .refine((file) => file instanceof File, "Must be a file")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/gif"].includes(file?.type),
      "Invalid image format. Accepted formats: jpeg, png, gif."
    )
    .refine((file) => file?.size <= 5 * 1024 * 1024, "Max file size is 5MB"), // max 5MB
    treeno: z.string().min(2).max(255),
    uploadid: z.string().min(2).max(255),
    uploadname: z.string().min(2).max(255),
    plantername: z.string().min(2).max(255),
    country: z.string().min(2).max(255),
    state: z.string().min(2).max(255),
    district: z.string().min(2).max(255),
    cooperation: z.string().min(2).max(255),
    lsgd: z.string().min(2).max(255),
    source: z.string().min(2).max(255),
    landmark: z.string().min(2).max(255),
    treename: z.string().min(2).max(255),
    coordinatorname: z.string().min(2).max(255),
    groupname: z.string().min(2).max(255),
    grouptype: z.string().min(2).max(255),
    schooltype: z.string().min(2).max(255),
    schoolcategory: z.string().min(2).max(255),
    edudistrict: z.string().min(2).max(255),
    edusubdistrict: z.string().min(2).max(255),
    sahodaya: z.string().min(2).max(255),
    block: z.string().min(2).max(255),
    project: z.string().min(2).max(255),
    chapter: z.string().min(2).max(255),
    zone: z.string().min(2).max(255)
  });
  
  export function Uploadform() {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
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
  
    function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values);
    }
  
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-center justify-start gap-2 my-4 cursor-pointer text-primary">
            <Edit />
            <span className="text-base">Edit</span>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-4xl overflow-y-scroll max-h-[98%]">
          <DialogHeader>
            <DialogTitle>Edit Uploads</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="">
            <Form {...form}>
              <form
                noValidate
                onSubmit={form.handleSubmit(onSubmit)}
                className=""
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <FormField 
              control={form.control}
                name="image1"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Image 1</FormLabel>
                    <FormControl>
                       <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
              control={form.control}
                name="image2"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Image 2</FormLabel>
                    <FormControl>
                    <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField 
               control={form.control}
                name="image3"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Image 3</FormLabel>
                    <FormControl>
                    <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
              control={form.control}
                name="image4"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Image 4</FormLabel>
                    <FormControl>
                    <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField 
              control={form.control}
                name="treeno"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Tree Number</FormLabel>
                    <FormControl>
                      <Input {...field}  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
              control={form.control}
                name="uploadid"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Uploader ID</FormLabel>
                    <FormControl >
                      <Input {...field}  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
               control={form.control}
                name="uploadname"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Uploader Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
               <FormField
               control={form.control}
                name="plantername"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Planter Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
              control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Country </FormLabel>
                    <Select >
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
                name="state"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>State</FormLabel>
                    <Select >
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
                name="district"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>District </FormLabel>
                    <Select >
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
                name="cooperation"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Cooperation </FormLabel>
                    <Select >
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
                name="lsgd"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>LSGD </FormLabel>
                    <Select >
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
                name="source"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Source </FormLabel>
                    <FormControl>
                      <Input {...field}  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
              control={form.control}
                name="landmark"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Landmark </FormLabel>
                    <FormControl>
                      <Input {...field}  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
              control={form.control}
                name="treename"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Tree Name</FormLabel>
                    <FormControl>
                      <Input {...field}  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
              control={form.control}
                name="coordinatorname"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Coordinator Name</FormLabel>
                    <FormControl >
                      <Input {...field}  />
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
                      <Input {...field} />
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
                    <FormControl>
                      <Input {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
              control={form.control}
                name="schooltype"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>School Type</FormLabel>
                    <FormControl>
                      <Input {...field}  />
                    </FormControl>
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
                    <Select >
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
                  <FormLabel> Education District</FormLabel>
                  <Select >
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
            control={form.control}
            name="edusubdistrict"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Education Subdistrict </FormLabel>
                <Select>
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
                      <Input {...field}  />
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
                      <Input {...field}  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
              control={form.control}
                name="project"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Project</FormLabel>
                    <FormControl>
                      <Input {...field}  />
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
                      <Input {...field}  />
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
                      <Input />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                </div>
  
                <div className="mt-3 justify-center item-center">
                  <Button type="submit">Submit</Button>
                </div>

              </form>
            </Form>
          </div>
          <DialogFooter>
            {/* <Button type="submit">Save changes</Button> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  