"use client";
import Footer from "@/components/footer";
import NavigationBar from "@/components/navigationBar";
import { UserPlus } from "lucide-react";
import Link from 'next/link'
import { DialogAddUser } from "./dialog-add-user";
import { useSearchParams, useRouter } from "next/navigation";
import { apiURL } from "@/app/requestsapi/request";
import { useToast } from "@/components/ui/use-toast"
import React, { Suspense } from 'react';
import Cookies from 'js-cookie';

function CoordinatorDashBoardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const co_id = searchParams.get("id");
  console.log(co_id);
  const token = Cookies.get('token');
  if (!token) {
    // Redirect to the login page
    router.push("/login");
  }

  async function onSubmit(values: any) {
    console.log(values);
    try {
      const response = await fetch(
        `${apiURL}/coordinator/${co_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          credentials: "include", // Include cookies in the request
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log(response);

      const result = await response.json();
      console.log(result);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops, Something went wrong!",
        description: "Please try again...",
      });
      console.error("Error:", error);
    }
  }

  return (
    <div className="bg-green-50 dark:bg-gray-900">
      <NavigationBar />

      <div className="container mx-auto md:max-w-5xl min-h-screen mt-4">
        <h1 className="text-3xl my-4 font-bold mt-8 pb-4 border-b-2">Coordinator Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <div
            className="flex justify-start items-start gap-3 text-xl border rounded-xl shadow p-6 bg-white hover:bg-green-100 hover:shadow-md hover:border-green-600"
          >
            <div>
              <UserPlus size={48} color="#16a34a" strokeWidth={1.75} />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-xl">Add members</p>
              <DialogAddUser />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function CoordinatorDashBoard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CoordinatorDashBoardContent />
    </Suspense>
  );
}
