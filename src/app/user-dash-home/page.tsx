"use client";
import Footer from "@/components/footer";
import GceBadge from "@/components/gceBadge";
import JoinNow from "@/components/joinNow";
import NavigationBar from "@/components/navigationBar";
import PageTitle from "@/components/sm/pageTitle";
import { BadgeIndianRupee, CreditCard, FileText, Gift, ImageUp, Images, LogOut, Send, SquareUserRound, Trophy, UserRoundCog } from "lucide-react";
import Link from 'next/link'
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { DialogUploadPlant } from "@/app/user-dash-home/dialog-upload-plants";
import Cookies from 'js-cookie';



  function UserDashHomeFn() {
    const router = useRouter();
  const token = Cookies.get('token');

  useEffect(() => {
    if (!token) {
      router.push("/loginform");
    }
  }, [token, router]);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  return (
    <>
  <main className='min-h-screen flex flex-col'>
    <NavigationBar />
    <div className="max-w-screen-md mx-auto mt-6 mb-3">
      <div className="relative">
        <PageTitle title='Dashboard' />
        {/* Logout button can be added here */}
      </div>
      <div className="max-w-screen-xl mx-auto p-4 mt-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Upload Plant Dialog */}
          <DialogUploadPlant />
          
          {/* My Uploads */}
          <Link 
            className="flex flex-col justify-start items-start gap-3 text-xl border-2 border-dashed border-primary rounded-3xl py-6 md:py-10 bg-white hover:bg-primary/10 transition-all hover:scale-105"
            href={`user-dash-home/uploaded-plants`}
          >
            <div className="flex flex-row items-center justify-between w-full px-6 py-2 bg-light-green">
              <p className="font-semibold text-xl">My Uploads</p>
              <Images size={48} color="#6c7260" strokeWidth={1.75} />
            </div>
            <div>
              <p className="px-6 py-2 font-normal text-base">നിങ്ങൾ അപ്‌ലോഡ് ചെയ്തവ കാണാൻ</p>
            </div>
          </Link>
          
          {/* My Profile */}
          <Link 
            className="flex flex-col justify-start items-start gap-3 text-xl border-2 border-dashed border-primary rounded-3xl py-6 md:py-10 bg-white hover:bg-primary/10 transition-all hover:scale-105"
            href={`/my-profile?id=${id}`}
          >
            <div className="flex flex-row items-center justify-between w-full px-6 py-2 bg-light-green">
              <p className="font-semibold text-xl">My Profile</p>
              <UserRoundCog size={48} color="#6c7260" strokeWidth={1.75} />
            </div>
            <div>
              <p className="px-6 py-2 font-normal text-base">All your activities, Update your info.</p>
            </div>
          </Link>

          {/* Lucky Draw */}
          <Link 
            className="flex flex-col justify-start items-start gap-3 text-xl border-2 border-dashed border-primary rounded-3xl py-6 md:py-10 bg-white hover:bg-primary/10 transition-all hover:scale-105"
            href={"/user-dash-home/narukkeduppu"}
          >
            <div className="flex flex-row items-center justify-between w-full px-6 py-2 bg-light-green">
              <p className="font-semibold text-xl">നറുക്കെടുപ്പ്</p>
              <Gift size={48} color="#6c7260" strokeWidth={1.75} />
            </div>
            <div>
              <p className="px-6 py-2 font-normal text-base">Lucky Draw</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
    <GceBadge />
    <Footer />
  </main>
</>

    
)
}

export default function UserDashHome() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserDashHomeFn />
    </Suspense>
  );
}