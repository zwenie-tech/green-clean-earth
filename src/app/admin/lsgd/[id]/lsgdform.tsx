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
    state: z.string().min(2).max(255),
    district: z.string().min(2).max(255),
    corporation: z.string().min(2).max(255),
    lsgdname: z.string().min(2).max(255),
  });
  
  export function Lsgdform() {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        state: "",
      district: "",
      corporation: "",
      lsgdname: "",
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
            <DialogTitle>Edit LSGD</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="">
            <Form {...form}>
              <form
                noValidate
                onSubmit={form.handleSubmit(onSubmit)}
                className=""
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Select >
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
                        <Select >
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
                        <Select>
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
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                </div>
  
                <div className="mt-3">
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
  