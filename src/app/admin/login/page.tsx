"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import axios from "axios";
import { apiURL } from "@/app/requestsapi/request";
import Cookies from 'js-cookie';
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";


const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export default function ProfileForm() {

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password:""
    },
  });

  

  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    try{
      const response = await axios.post(`${apiURL}/admin/login`,values);
      if(response.data.success){
        const token = response.data.data.token;
        toast({
          title: "Account logged in.",
          description: "Successfully logged in.",
        })
        Cookies.set('token', token, { expires: 1 });
        router.replace("/admin");

      }
    }catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials.",
      });
    }
  }

  return (
    <div className="min-h-screen grid place-items-center mx-4 md:mx-auto">
      <div className="w-full md:w-96 border p-8 rounded-md">
        <h1 className="text-3xl leading-loose">Admin Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="float-right">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
