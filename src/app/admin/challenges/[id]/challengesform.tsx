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
import axios from "axios";
import { apiURL } from "@/app/requestsapi/request";
import Cookies from 'js-cookie';
import { useToast } from "@/components/ui/use-toast";


  const formSchema = z.object({
    ischallenge: z.string(),
  });
  
  export function Challengesform() {
    const token = Cookies.get("adtoken");
  const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        ischallenge:'',
      },
    });
  
    async function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values);
      const formdata = {
        isChallenged : values.ischallenge === "2" ? false : true
      }
      console.log(formdata);

      if (token) {
        const response = await axios.post(`${apiURL}/adminEdit/updateActivity`, formdata, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        try {
  
          if (response.data.success && response.status != 203) {
            toast({
              title: "Data Successfully Updated.",
              description: "",
            });
  
            setTimeout(function() {
                        window.location.reload();
                      }, 1800);
                    
  
          } else {
            toast({
              variant: "destructive",
              title: "Oops, Something went wrong!",
              description: "Please try again...",
            });
          }
  
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Oops, Something went wrong!",
            description: "Please try again...",
          });
        }
      };
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
            <DialogTitle>Edit Coordinator</DialogTitle>
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
                      name="ischallenge"
                      render={({ field }) => (
                        <FormItem>
                        <FormLabel>Is Challenged?</FormLabel>

                          <Select onValueChange={(value) => {
                            field.onChange(value);

                          }} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>

                              <SelectItem key='1' value="1">
                                True
                              </SelectItem>
                              <SelectItem key='2' value="2">
                                False
                              </SelectItem>


                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
  
                  </div>
  
                <div className="mt-3 justify-center">
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
  