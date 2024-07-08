"use client";
import Footer from "@/components/footer";
import GceBadge from "@/components/gceBadge";
import JoinNow from "@/components/joinNow";
import NavigationBar from "@/components/navigationBar";
import PageTitle from "@/components/sm/pageTitle";
import { BadgeIndianRupee, CreditCard, FileText, Gift, ImageUp, Images, LogOut, Send, SquareUserRound, Trophy, UserRoundCog } from "lucide-react";
import Link from 'next/link'

export default function UserDashHome() {
  return (
    <>
    <main className='min-h-screen flex flex-col'>
      <NavigationBar/>
      <div className="max-w-screen-md mx-auto">
        <div className="relative ">
          <PageTitle title='Dashboard' />
          <Link href={'logout'} className="absolute right-[0] top-[0] px-6 py-2 rounded-full bg-light-gray hover:bg-dark-gray">Logout</Link>
        </div>
        <div className="max-w-screen-xl mx-auto p-4 mt-4 mb-6 shadow-dashboard">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <Link 
              className="flex flex-col justify-start items-start gap-3 text-xl border-2 border-dashed border-primary rounded-3xl py-6 md:py-10 bg-white hover:bg-primary/10"
              href={"/upload-plant"}>
              <div className="flex flex-row items-center justify-between w-full px-6 py-2 bg-light-green">
                <p className="font-semibold text-xl">My Uploads</p>
                <ImageUp size={48} color="#6c7260" strokeWidth={1.75} />
              </div>
              <div>
                <p className="px-6 py-2 font-normal text-base">വൃക്ഷത്തൈ സെൽഫി മത്സരം</p>
              </div>
            </Link>
            <Link 
              className="flex flex-col justify-start items-start gap-3 text-xl border-2 border-dashed border-primary rounded-3xl py-6 md:py-10 bg-white hover:bg-primary/10"
              href={"/upload-plant"}>
              <div className="flex flex-row items-center justify-between w-full px-6 py-2 bg-light-green">
                <p className="font-semibold text-xl">My Profile</p>
                <UserRoundCog size={48} color="#6c7260" strokeWidth={1.75} />
              </div>
              <div>
                <p className="px-6 py-2 font-normal text-base">All your activities, Update your info.</p>
              </div>
            </Link>
            <Link 
              className="flex flex-col justify-start items-start gap-3 text-xl border-2 border-dashed border-primary rounded-3xl py-6 md:py-10 bg-white hover:bg-primary/10"
              href={"/upload-plant"}>
              <div className="flex flex-row items-center justify-between w-full px-6 py-2 bg-light-green">
                <p className="font-semibold text-xl">Green Clean Estimate</p>
                <FileText size={48} color="#6c7260" strokeWidth={1.75} />
              </div>
              <div>
                <p className="px-6 py-2 font-normal text-base"></p>
              </div>
            </Link>
            <Link 
              className="flex flex-col justify-start items-start gap-3 text-xl border-2 border-dashed border-primary rounded-3xl py-6 md:py-10 bg-white hover:bg-primary/10"
              href={"/upload-plant"}>
              <div className="flex flex-row items-center justify-between w-full px-6 py-2 bg-light-green">
                <p className="font-semibold text-xl">Invite Friends</p>
                <Send size={48} color="#6c7260" strokeWidth={1.75} />
              </div>
              <div>
                <p className="px-6 py-2 font-normal text-base">സന്ദേശം പ്രചരിപ്പിച്ചാൽ സമ്മാനം</p>
              </div>
            </Link>
            <Link 
              className="flex flex-col justify-start items-start gap-3 text-xl border-2 border-dashed border-primary rounded-3xl py-6 md:py-10 bg-white hover:bg-primary/10"
              href={"/upload-plant"}>
              <div className="flex flex-row items-center justify-between w-full px-6 py-2 bg-light-green">
                <p className="font-semibold text-xl">നറുക്കെടുപ്പ്</p>
                <Gift size={48} color="#6c7260" strokeWidth={1.75} />
              </div>
              <div>
                <p className="px-6 py-2 font-normal text-base">Lucky Draw</p>
              </div>
            </Link>
            <Link 
              className="flex flex-col justify-start items-start gap-3 text-xl border-2 border-dashed border-primary rounded-3xl py-6 md:py-10 bg-white hover:bg-primary/10"
              href={"/upload-plant"}>
              <div className="flex flex-row items-center justify-between w-full px-6 py-2 bg-light-green">
                <p className="font-semibold text-xl">Green Card</p>
                <CreditCard size={48} color="#6c7260" strokeWidth={1.75} />
              </div>
              <div>
                <p className="px-6 py-2 font-normal text-base"></p>
              </div>
            </Link>
            <Link 
              className="flex flex-col justify-start items-start gap-3 text-xl border-2 border-dashed border-primary rounded-3xl py-6 md:py-10 bg-white hover:bg-primary/10"
              href={"/upload-plant"}>
              <div className="flex flex-row items-center justify-between w-full px-6 py-2 bg-light-green">
                <p className="font-semibold text-xl">Our Supporters Offer</p> 
                <BadgeIndianRupee size={48} color="#6c7260" strokeWidth={1.75} />
              </div>
              <div>
                <p className="px-6 py-2 font-normal text-base">Green Card കൈവശം ഉള്ളവർക്ക് പ്രത്യേക ഓഫറുകൾ നൽകുന്ന സ്‌ഥാപനങ്ങളുടെ ലിസ്റ്റ്</p>
              </div>
            </Link>
            <Link 
              className="flex flex-col justify-start items-start gap-3 text-xl border-2 border-dashed border-primary rounded-3xl py-6 md:py-10 bg-white hover:bg-primary/10"
              href={"/upload-plant"}>
              <div className="flex flex-row items-center justify-between w-full px-6 py-2 bg-light-green">
                <p className="font-semibold text-xl">GCEM Fest</p> 
                <Trophy size={48} color="#6c7260" strokeWidth={1.75} />
              </div>
              <div>
                <p className="px-6 py-2 font-normal text-base">Agro Arts and Sports Competetion. കാർഷിക കലാ കായിക മത്സരങ്ങൾ</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <GceBadge />
      <JoinNow />
      <Footer/>
    </main>
    </>
)
}