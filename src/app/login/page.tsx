"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import NavigationBar from "@/components/navigationBar";
import Footer from "@/components/footer";
import Link from "next/link";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import Cookies from "js-cookie";

const formSchema = z.object({
  mobile: z.coerce.number().lte(9999999999),
  password: z.string().min(1).max(255),
});

export default function UserLogin() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      //mobile: 1,
      //password: "string",
    },
  });

  Cookies.remove("token");
  Cookies.remove("name");

  const [isOpen, setIsOpen] = useState(true);

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
            <div className="flex flex-col">
              <Link
                href={"/login/user"}
                className="grid place-items-center bg-green-100 text-green-600 py-2 px-4 my-2 border-2 border-green-600 rounded-md hover:bg-green-600 hover:text-white"
              >
                User
              </Link>
              <Link
                href={"/login/coordinator"}
                className="grid place-items-center bg-green-100 text-green-600 py-2 px-4 my-2 border-2 border-green-600 rounded-md hover:bg-green-600 hover:text-white"
              >
                Coordinator
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 text-center">
          <div className="fixed inset-0 bg-black opacity-30" onClick={() => setIsOpen(false)}></div>
          <Dialog.Panel className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white p-6">
              <Dialog.Title className="text-lg font-medium text-gray-900">
                അറിയിപ്പ്
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  ഈ വെബ്സൈറ്റിലെ രജിസ്ട്രേഷൻ പുതിയ രീതിയിൽ ഡിസൈൻ
                  ചെയ്തിരിക്കുന്നു. നേരത്തെ രജിസ്റ്റർ ചെയ്ത മുഴുവൻ ആളുകളും
                  പുതിയ രീതിയിൽ രജിസ്റ്റർ ചെയ്യേണ്ടതാണ്. സംശയങ്ങൾക്ക്.
                  9645964592
                </p>
              </div>
              <div className="mt-4">
                <button
                  className="inline-flex float-right m-2 justify-center px-4 py-2 text-sm font-medium text-green-600 bg-green-100 border border-transparent rounded-md hover:bg-green-200"
                  onClick={() => setIsOpen(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </section>
  );
}
