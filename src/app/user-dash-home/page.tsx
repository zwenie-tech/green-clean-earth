"use client";
import Footer from "@/components/footer";
import NavigationBar from "@/components/navigationBar";
import { BadgeIndianRupee, CreditCard, FileText, Gift, ImageUp, Images, LogOut, Send, SquareUserRound, Trophy, UserRoundCog } from "lucide-react";
import Link from 'next/link'

export default function UserDashHome() {
  return (
    <div className="bg-green-50 dark:bg-gray-900">
      <NavigationBar />
      
      <div className="container mx-auto md:max-w-5xl mt-4">
        <h1 className="text-3xl my-4 font-bold mt-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <Link 
            className="flex justify-start items-start gap-3 text-xl border rounded-xl shadow p-6 bg-white hover:bg-green-100 hover:shadow-md hover:border-green-600"
            href={"/upload-plant"}>
            <div>
              <ImageUp size={48} color="#16a34a" strokeWidth={1.75} />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-xl">Upload Plants</p>
              <p className="font-normal text-base">വൃക്ഷത്തൈ സെൽഫി മത്സരം</p>
            </div>
          </Link>


          <Link 
            className="flex justify-start items-start gap-3 text-xl border rounded-xl shadow p-6 bg-white hover:bg-green-100 hover:shadow-md hover:border-green-600"
            href={""}>
            <div>
              <Images size={48} color="#16a34a" strokeWidth={1.75} />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-xl">My Uploads</p>
              <p className="font-normal text-base">നിങ്ങൾ അപ്‌ലോഡ് ചെയ്തവ കാണാൻ</p>
            </div>
          </Link>

          <Link 
            className="flex justify-start items-start gap-3 text-xl border rounded-xl shadow p-6 bg-white hover:bg-green-100 hover:shadow-md hover:border-green-600"
            href={"my-page"}>
            <div>
              <SquareUserRound size={48} color="#16a34a" strokeWidth={1.75} />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-xl">My Page</p>
              <p className="font-normal text-base">All my activities</p>
            </div>
          </Link>

          <Link 
            className="flex justify-start items-start gap-3 text-xl border rounded-xl shadow p-6 bg-white hover:bg-green-100 hover:shadow-md hover:border-green-600"
            href={""}>
            <div>
            <FileText size={48} color="#16a34a" strokeWidth={1.75} />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-xl">Green Clean Estimate</p>
              <p className="font-normal text-base"></p>
            </div>
          </Link>

          <Link 
            className="flex justify-start items-start gap-3 text-xl border rounded-xl shadow p-6 bg-white hover:bg-green-100 hover:shadow-md hover:border-green-600"
            href={""}>
            <div>
              <UserRoundCog size={48} color="#16a34a" strokeWidth={1.75} />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-xl">My Profile</p>
              <p className="font-normal text-base">Update your info.</p>
            </div>
          </Link>

          <Link 
            className="flex justify-start items-start gap-3 text-xl border rounded-xl shadow p-6 bg-white hover:bg-green-100 hover:shadow-md hover:border-green-600"
            href={""}>
            <div>
              <Send size={48} color="#16a34a" strokeWidth={1.75} />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-xl">Invite Friends</p>
              <p className="font-normal text-base">സന്ദേശം പ്രചരിപ്പിച്ചാൽ സമ്മാനം</p>
            </div>
          </Link>

          <Link 
            className="flex justify-start items-start gap-3 text-xl border rounded-xl shadow p-6 bg-white hover:bg-green-100 hover:shadow-md hover:border-green-600"
            href={""}>
            <div>
              <Gift size={48} color="#16a34a" strokeWidth={1.75} />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-xl">Lucky Draw</p>
              <p className="font-normal text-base">നറുക്കെടുപ്പ്</p>
            </div>
          </Link>

          <Link 
            className="flex justify-start items-start gap-3 text-xl border rounded-xl shadow p-6 bg-white hover:bg-green-100 hover:shadow-md hover:border-green-600"
            href={""}>
            <div>
              <CreditCard size={48} color="#16a34a" strokeWidth={1.75} />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-xl">Green Card</p>
              <p className="font-normal text-base">This facilty will function soon</p>
            </div>
          </Link>

          <Link 
            className="flex justify-start items-start gap-3 text-xl border rounded-xl shadow p-6 bg-white hover:bg-green-100 hover:shadow-md hover:border-green-600"
            href={""}>
            <div>
              <BadgeIndianRupee size={48} color="#16a34a" strokeWidth={1.75} />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-xl">Our Supporters Offer</p>
              <p className="font-normal text-base">Green Card കൈവശം ഉള്ളവർക്ക് പ്രത്യേക ഓഫറുകൾ നൽകുന്ന സ്‌ഥാപനങ്ങളുടെ ലിസ്റ്റ്</p>
            </div>
          </Link>

          <Link 
            className="flex justify-start items-start gap-3 text-xl border rounded-xl shadow p-6 bg-white hover:bg-green-100 hover:shadow-md hover:border-green-600"
            href={""}>
            <div>
              <Trophy size={48} color="#16a34a" strokeWidth={1.75} />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-xl">GCEM Fest</p>
              <p className="font-normal text-base">Agro Arts and Sports Competetion. കാർഷിക കലാ കായിക മത്സരങ്ങൾ</p>
            </div>
          </Link>

          <Link 
            className="flex justify-start items-start gap-3 text-xl border rounded-xl shadow p-6 bg-white hover:bg-green-100 hover:shadow-md hover:border-green-600"
            href={""}>
            <div>
              <LogOut size={48} color="#16a34a" strokeWidth={1.75} />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-xl">Logout</p>
              <p className="font-normal text-base">Click here to logout from this application.</p>
            </div>
          </Link>

        </div>
      </div>
      <Footer/>
    </div>
 )
}