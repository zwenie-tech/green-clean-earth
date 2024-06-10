"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import NavigationBar from "@/components/navigationBar";
import Footer from "@/components/footer";
import Link from "next/link";

import Cookies from 'js-cookie';
const formSchema = z.object({"mobile":z.coerce.number().lte(9999999999),"password":z.string().min(1).max(255)})

export default function UserLogin() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
//mobile: 1,
//password: "string",
},
  })

  
  Cookies.remove('token');

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <section className="bg-green-50 dark:bg-gray-900">
        <NavigationBar />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[calc(100vh-74px)] lg:py-0">
            {/* <h1 className="flex items-center mb-6 text-2xl font-bold text-green-600 dark:text-white">
                GreenCleanEarth    
            </h1> */}
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Select type of your account
                    </h1>
                    <div className="flex flex-col" >
                        <Link href={"/login/user"}  className="grid place-items-center bg-green-100 text-green-600  py-2 px-4 my-2 border-2 border-green-600 rounded-md hover:bg-green-600 hover:text-white">
                            User
                        </Link>
                        <Link href={"/login/coordinator"}  className="grid place-items-center bg-green-100 text-green-600  py-2 px-4 my-2 border-2 border-green-600 rounded-md hover:bg-green-600 hover:text-white">
                            Coordinator
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </section>

  )
}
