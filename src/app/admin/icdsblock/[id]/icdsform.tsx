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
    district: z.string().min(2).max(255),
    icdsblock: z.string().min(2).max(255),
  });
  
  export function ICDSFrom() {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        district: "",
        icdsblock: "",
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
            <DialogTitle>Edit ICDS Block</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="">
            <Form {...form}>
              <form
                noValidate
                onSubmit={form.handleSubmit(onSubmit)}
                className=""
              >
                <div className="grid grid-cols-1 gap-4 md:gap-6">
                  <FormField
                    control={form.control}
                    name="district"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>District</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
  
                  <FormField
                    control={form.control}
                    name="icdsblock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ICDS block</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
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
  