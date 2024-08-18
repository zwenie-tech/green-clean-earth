"use client";
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
import { apiURL } from "@/app/requestsapi/request";
import { useRouter } from 'next/navigation'

import { Input } from "@/components/ui/input";

import { Suspense, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NavigationBar from "@/components/navigationBar";
import Footer from "@/components/footer";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
const formSchema = z.object({
  members: z.coerce.number(),
});
function NgoAdditionalDetailsForm() {
  const searchParams = useSearchParams();

  const group_id = searchParams.get("group_id");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  const router = useRouter()
  const { toast } = useToast()
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const dataWithIds = {
      ...values,
      groupId: parseInt(group_id!),
    };
    try {
      const response = await fetch(
        `${apiURL}/group/ngo/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataWithIds),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      if (result) {
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
        })
        router.push("/loginform");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops,Something went wrong !",
        description: "Please try again...",
      })
      console.error("Error:", error);
    }
  }

  return (
    <section className="bg-green-50 dark:bg-gray-900">
      <NavigationBar />
      <h1 className="text-xl mt-6 mb-3 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              NGO - Additional Details
      </h1>
     {/* <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 mt-8">
        {/* <h1 className="flex items-center my-6 text-2xl font-bold text-green-600 dark:text-white">
          GreenCleanEarth
        </h1> */}
      <div className="mt-7 container mx-auto p-4 flex flex-col lg:flex-row  items-stretch">
      <div className="w-full lg:w-1/4 flex items-center justify-center">
          <img
            src="/images/planting_trees.jpg"
            alt="Description of image"
            className="w-full h-full object-cover rounded-lg opacity-50"
          />
        </div>
        {/*form.......... */}
        <div className="w-full lg:w-1/3 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center border-2">
          <div className="p-6 w-full">
            <Form {...form}>
              <form
                noValidate
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="members"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team members</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
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
        <div className="w-full lg:w-1/4 flex items-center justify-center">
          <img
            src="/images/planting_trees_2.jpg"
            alt="Description of image"
            className="w-full h-full object-cover rounded-lg opacity-50"
          />
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default function NgoAdditionalDetails() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NgoAdditionalDetailsForm />
    </Suspense>
  );
}