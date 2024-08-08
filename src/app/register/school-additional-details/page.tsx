"use client";

import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/extension/multi-select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import NavigationBar from "@/components/navigationBar";
import { Input } from "@/components/ui/input";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { apiURL } from "@/app/requestsapi/request";
import { fetchClubData } from "@/app/requestsapi/request";
import Footer from "@/components/footer";
import axios from "axios";

const formSchema = z.object({
  value: z.array(z.string()).nonempty("Please select at least one club"),
  no_of_students: z.coerce.number(),
  total_classes: z.coerce.number().gte(1).lte(999),
  list_of_classes: z.string().min(3).max(255),
  category: z.string().nonempty("Please select a category"),
});

type FormSchema = z.infer<typeof formSchema>;

interface Club {
  id: string;
  name: string;
}
interface Category {
  gp_cat_id: string;
  gp_cat_name: string;
}

const MultiSelectZodForm = () => {
  const [clubOptions, setClubOptions] = useState<Club[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);
  const multiForm = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: [],
    },
  });
  const router = useRouter();
  const { toast } = useToast();

  // Wrap useSearchParams in Suspense
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const data = await fetchClubData();
        setClubOptions(data.clubs);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };
    fetchClubs();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${apiURL}/schoolCategory`);
        console.log(response.data);
        setCategoryOptions(response.data.subCategory);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };
    fetchCategory();
  }, []);

  const onSubmit = async (data: FormSchema) => {
    // Extracting values from searchParams
    const groupId = searchParams.get("group_id");
    const pno = searchParams.get("pno");

    const selectedClubIds = clubOptions
      .filter((club) => data.value.includes(club.name))
      .map((club) => club.id);

      
    const payload = {
      groupId: parseInt(groupId!),
      clubs: selectedClubIds.toString(),
      list_of_classes: data.list_of_classes.toString(),
      no_of_students: parseInt(data.no_of_students.toString()),
      phoneNUmber: parseInt(pno!),
      subCategoryId:categoryOptions.find((item) => item.gp_cat_name === data.category)?.gp_cat_id
    };
    console.log(payload)

    try {
      const response = await fetch(`${apiURL}/group/school/register`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (result) {
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
        });
        router.push("/loginform");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops, Something went wrong!",
        description: "Please try again...",
      });
      console.error("Error:", error);
    }
  };

  return (
    <section className="bg-green-50">
      <NavigationBar />
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
        School - Additional details   
      </h1>
      <div className="mt-7 container mx-auto p-4 flex flex-col lg:flex-row  items-stretch">
        <div className="w-full lg:w-1/3 flex items-center justify-center">
          <img
            src="/images/planting_trees.jpg"
            alt="Description of image"
            className="w-full h-full object-cover rounded-lg opacity-50"
          />
        </div>
        {/* form */}
        <div className="w-full lg:w-1/3 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center border-2">
          <div className="p-6 w-full">
            <Form {...multiForm}>
              <form
                onSubmit={multiForm.handleSubmit(onSubmit)}
                className="space-y-3 grid gap-3 w-full"
              >
                <FormField
                  control={multiForm.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>List of clubs in your school</FormLabel>
                      <MultiSelector
                        onValuesChange={field.onChange}
                        values={field.value}
                      >
                        <MultiSelectorTrigger className="border border-primary">
                          <MultiSelectorInput placeholder="Select clubs" />
                        </MultiSelectorTrigger>
                        <MultiSelectorContent>
                          <MultiSelectorList>
                            {clubOptions.map((club) => (
                              <MultiSelectorItem
                                key={club.id}
                                value={club.name}
                              >
                                {club.name}
                              </MultiSelectorItem>
                            ))}
                          </MultiSelectorList>
                        </MultiSelectorContent>
                      </MultiSelector>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={multiForm.control}
                  name="no_of_students"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of students this year</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="" {...field} />
                      </FormControl>
                      <FormDescription> </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={multiForm.control}
                  name="total_classes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total number of classes</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="" {...field} />
                      </FormControl>
                      <FormDescription> </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={multiForm.control}
                  name="list_of_classes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>List of classes</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormDescription> </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={multiForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Category</FormLabel>
                      <FormControl>
                        <select {...field} className="w-full px-4 py-2 border rounded-md" required>
                          <option value="">Select a category</option>
                          {categoryOptions.map((category) => (
                            <option key={category.gp_cat_id} value={category.gp_cat_name}>
                              {category.gp_cat_name}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormDescription> </FormDescription>
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
        <div className="w-full lg:w-1/3 flex items-center justify-center">
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
};

export default function MultiSelectZod() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MultiSelectZodForm />
    </Suspense>
  );
}
