"use client";
import React, { useState, useEffect } from 'react';
import NavigationBar from '@/components/navigationBar';
import Footer from '@/components/footer';
import { useForm } from "react-hook-form";
import { apiURL } from '@/app/requestsapi/request';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"

const ActivityList = () => {
  const [category, setCategory] = useState([]);
  const form = useForm({
    defaultValues: {
      categoryId: '',
    },
  });

  // Fetch categories (example of fetching data)
  useEffect(() => {
    fetch(apiURL + '/categories')
      .then(response => response.json())
      .then(data => setCategory(data.categories))
      .catch(err => console.error('Failed to fetch categories:', err));
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission (e.g., make an API call)
  };

  return (
    <>
      <NavigationBar />
      <div className='relative flex justify-center p-4'>
        <h1 className='text-3xl text-center mt-2 font-bold'>Activities</h1>
      </div> 

      {/* Search by Person Wise */}
      <div className='search1'>
        <h1 className='text-lg text-center m-3'>Search by Person Wise</h1>
        <div className="mx-5 md:mx-9 lg:mx-16 border-2 border-gray-300 shadow-lg flex justify-center items-center bg-gray-100 rounded-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-8 w-full md:w-2/3"> 
              <div className="flex m-2 flex-col gap-4 md:flex-row md:m-5 justify-center items-center"> 
                <FormField
                  control={form.control}
                  name="coordinator_name"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-2/3 md:w-1/3">
                      <FormControl>
                        <Input {...field} placeholder="Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
      
                <FormField
                  control={form.control}
                  name="whatsapp_number"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-2/3 md:w-1/3">
                      <FormControl>
                        <Input type="number" {...field} placeholder="Phone Number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
      
                <Button type="submit" className="w-full md:w-1/3 bg-primary mx-auto text-center">
                  Search
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>


      {/* Search by Country Wise */}
      <div className='search1'>
        <h1 className='text-lg text-center m-3'>Search by Country Wise</h1>
        <div className="mx-5 md:mx-9 lg:mx-16 border-2 border-gray-300 shadow-lg flex justify-center items-center bg-gray-100 rounded-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4 w-full md:w-2/3"> 
              <div className="flex m-1 flex-col gap-4 md:flex-row md:m-3 justify-center items-center">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-2/3 md:w-1/4"> 
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                        </FormControl>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-2/3 md:w-1/4"> 
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                        </FormControl>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-2/3 md:w-1/4"> 
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select District" />
                          </SelectTrigger>
                        </FormControl>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="coordinator_name"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-2/3 md:w-1/4">
                      <FormControl>
                        <Input {...field} placeholder="Block" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex md:m-3 flex-col gap-4 md:flex-row justify-center items-center">
                <FormField
                  control={form.control}
                  name="coordinator_name"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-2/3 md:w-1/4">
                      <FormControl>
                        <Input {...field} placeholder="Block" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="coordinator_name"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-2/3 md:w-1/4">
                      <FormControl>
                        <Input {...field} placeholder="Block" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="coordinator_name"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-2/3 md:w-1/4">
                      <FormControl>
                        <Input {...field} placeholder="Block" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full md:w-1/4 bg-primary mx-auto text-center">
                  Search
                </Button>
                </div>  
            </form>
          </Form>
        </div>
      </div>

            {/* Search by Group Wise */}
            <div className='search1'>
        <h1 className='text-lg text-center m-3'>Search by Group Wise</h1>
        <div className="mx-5 md:mx-9 lg:mx-16 border-2 border-gray-300 shadow-lg flex justify-center items-center bg-gray-100 rounded-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4 w-full md:w-2/3"> 
              <div className="flex m-1 flex-col gap-4 md:flex-row md:m-3 justify-center items-center">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-2/3 md:w-1/4"> 
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Country" />
                          </SelectTrigger>
                        </FormControl>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-2/3 md:w-1/4"> 
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                        </FormControl>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-2/3 md:w-1/4"> 
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select District" />
                          </SelectTrigger>
                        </FormControl>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="coordinator_name"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-2/3 md:w-1/4">
                      <FormControl>
                        <Input {...field} placeholder="Block" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex md:m-3 flex-col gap-4 md:flex-row justify-center items-center">
                <FormField
                  control={form.control}
                  name="coordinator_name"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-2/3 md:w-1/4">
                      <FormControl>
                        <Input {...field} placeholder="Block" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="coordinator_name"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-2/3 md:w-1/4">
                      <FormControl>
                        <Input {...field} placeholder="Block" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="coordinator_name"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-2/3 md:w-1/4">
                      <FormControl>
                        <Input {...field} placeholder="Block" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full md:w-1/4 bg-primary mx-auto text-center">
                  Search
                </Button>
                </div>  
            </form>
          </Form>
        </div>
      </div>
      <div className="container mx-auto p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-gray-200 rounded-t-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left w-16 rounded-tl-lg">Sl. No</th>
                <th className="py-3 px-6 text-left">Thumbnail</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Name Of Art-Brief Description</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">View, Like, Comments, and Share</th>
                <th className="py-3 px-6 text-left rounded-tr-lg">Value</th>
              </tr>
            </thead>
            <tbody>
              {/* Add your data rendering logic here */}
              <tr>
                <td colSpan={7} className="py-3 px-6 text-center">Loading...</td>
              </tr>
              <tr>
                <td colSpan={7} className="py-3 px-6 text-center text-red-500"></td>
              </tr>
              <tr>
                <td colSpan={7} className="py-3 px-6 text-center">No activities found</td>
              </tr>
              <tr className="border border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left"></td>
                <td className="py-3 px-6 text-left">
                  <img src='' alt="Thumbnail" style={{ height: '100px', width:'150px' }} />
                </td>
                <td className="py-3 px-6 text-left"></td>
                <td className="py-3 px-6 text-left"></td>
                <td className="py-3 px-6 text-left"></td>
                <td className="py-3 px-6 text-left"></td>
                <td className="py-3 px-6 text-left"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination (Uncomment and add necessary state handlers for pagination) */}
      {/* <div className="flex justify-center items-center space-x-2 my-4">
        <button
          className={currentPage === 1 ? 
            "text-white text-sm py-2 px-4 bg-[#6b6767] rounded-xl shadow-lg" 
            : "text-white text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
          }
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-xl">{currentPage}</span>
        <button
          className={currentPage === totalPages ? 
            "text-white text-sm py-2 px-4 bg-[#6b6767] rounded-xl shadow-lg" 
            : "text-white text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
          }
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div> */}
      <Footer />
    </>
  );
}

export default ActivityList;
