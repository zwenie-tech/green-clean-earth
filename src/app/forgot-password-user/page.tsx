"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Cookies from 'js-cookie';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { apiURL } from "@/app/requestsapi/request";
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const formSchema = z.object({
  phone: z.coerce.number(),
});
function Page() {


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(values: z.infer<typeof formSchema>) {

    const apidata = {
      phoneNumber:values.phone.toString()
    }
    try{
      const response = await axios.post(`${apiURL}/user/forgotPassword`,apidata);
      if (response.status === 200) {
        Cookies.set("ph", values.phone.toString(), { expires: 1 });
        toast({
          title: "Success",
          description: "Password reset link sent to your phone number.",
        });
        router.push(`/forgot-password-user/change-password`);
      } else {
        console.error('Form submission failed');
        toast({
          title: "Error",
          description: "Failed to send password reset link. Please try again.",
          variant: "destructive",
        });
      }
    }catch (error) {
      console.error('An error occurred while submitting the form:', error);
      toast({
        title: "Error",
        description: "Failed to send password reset link. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="max-w-xs flex flex-col gap-4 items-center mx-auto my-6">
      <h1 className="text-xl font-bold md:text-2xl text-center">
        Forgot Password
      </h1>
      <div className="w-full mx-auto">
        {/*form.......... */}
        <div className="rounded-lg shadow flex items-center justify-center border-2">
          <div className="p-6 w-full">
            <Form {...form}>
              <form
                noValidate
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      {/* <FormDescription>
                        We have sent OTP in your registered Phone Number
                      </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-center">
                  <Button type="submit" className="w-1/3 bg-primary">
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NgoAdditionalDetails() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
}