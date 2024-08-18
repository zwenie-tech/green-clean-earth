"use client";
import NavigationBar from '@/components/navigationBar'
import PageTitle from '@/components/sm/pageTitle'
import GceBadge from '@/components/gceBadge'
import Footer from '@/components/footer'
import { Locate, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'


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
import { Input } from '@/components/ui/input'
import JoinNow from '@/components/joinNow';

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string()
});


const Contact = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  return (
    <main className='min-h-screen flex flex-col'>
      <NavigationBar/>
      <div className='mx-2 mt-2'>
        <PageTitle title='Get in touch with us' />
        <div className="mx-4 mb-10 flex flex-col gap-4 md:flex md:flex-row-reverse">
          <div className='mx-8'>
            <div className='my-4'>
              <h3 className='text-primary text-2xl text-center'>About us</h3>
              <p className='border-l p-2 border-black'>ഭൂമിയെ ഹരിതാഭമാക്കാനും, മാലിന്യ മുക്തമാക്കാനും ജനങ്ങളെ പ്രേരിപ്പിക്കാൻവിവിധ സ്ഥാപങ്ങളുടെയും,സംഘടനകളുടെയും , സഹകരണത്തോടെ GCEM Foundation ആവിഷ്‌കരിച്ച് നടപ്പിൽ വരുത്തുന്ന ഒരു ബഹുജനമുന്നേറ്റമാണ് Green Clean Earth Movement(GCEM).</p>
            </div>
            <div>
              <div className='flex flex-col gap-4 my-8'>
                <Link href='mailto:gcemfoundation@gmail.com' className='flex gap-4'>
                  <Mail size={30}/>
                  <p className='text-lg'>gcemfoundation@gmail.com</p>
                </Link>
                <Link href='tel:+919645964592' className='flex gap-4'>
                  <Phone size={30}/>
                  <p className='text-lg'>+91 9645 9645 92</p>
                </Link>
                <Link href='' className='flex gap-4'>
                  <MapPin size={30}/>
                  <p className='text-lg'>M Square Building Pavamani Road Kozhikode, Kerala India</p>
                </Link>
              </div>
              <div className='my-4 p-2'>
                <Link href={''} className='text-primary'>Advertising option</Link>
              </div>
            </div>
          </div>
          <div className='max-w-md md:min-w-[30vw] bg-light-gray p-8 rounded-md '>
            <Form {...form}>
                <form
                  noValidate
                  // onSubmit={form.handleSubmit()}
                  className="flex flex-col gap-2"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="self-center bg-primary ">
                    Submit
                  </Button>
                </form>
            </Form>
          </div>
        </div>
      </div>
      <GceBadge />
      <Footer/>
    </main>
  )
}

export default Contact