"use client";
import Footer from "@/components/footer";
import Navigationbar from "@/components/navigationBar";
import { CircleUser, Images, List } from "lucide-react";
import { useEffect, useState, Suspense } from "react";
import ProfileTab from "./profile_tab";
import MyUploadsTab from "./my_uploads_tab";
import ActivitiesTab from "./activities_tab";
import Cookies from 'js-cookie';
import { useRouter, useSearchParams } from "next/navigation";

function MyPageContent() {
  const router = useRouter();
  const token = Cookies.get('token');
  const [openTab, setOpenTab] = useState(1);
  const searchParams = useSearchParams();
  
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  return (
    <div className="bg-green-50">
      <Navigationbar />
      <div className="container mx-auto md:max-w-5xl mt-4 min-h-screen">
        <h1 className="text-3xl my-4 font-bold mt-8">My Page</h1>
        <div className="flex flex-wrap">
          <div className="w-full">
            <ul
              className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
              role="tablist"
            >
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-base text-green-600 font-semibold border-b-4 px-2 py-2 flex justify-center items-center gap-3 leading-normal hover:bg-green-100 transition-all " +
                    (openTab === 1
                        ? " bg-green-100 border-green-600"
                        : " bg-white border-transparent")
                  }
                  onClick={e => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  <CircleUser size={28} strokeWidth={1.75} /> Profile
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-base text-green-600 font-semibold border-b-4 px-2 py-2 flex justify-center items-center gap-3 leading-normal hover:bg-green-100 transition-all " +
                    (openTab === 2
                      ? " bg-green-100 border-green-600"
                      : " bg-white border-transparent")
                  }
                  onClick={e => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  <Images size={28} strokeWidth={1.75} /> My Uploads
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-base text-green-600 font-semibold border-b-4 px-2 py-2 flex justify-center items-center gap-3 leading-normal hover:bg-green-100 transition-all " +
                    (openTab === 3
                        ? " bg-green-100 border-green-600"
                        : " bg-white border-transparent")
                  }
                  onClick={e => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                  data-toggle="tab"
                  href="#link3"
                  role="tablist"
                >
                  <List size={28} strokeWidth={1.75} /> Activities
                </a>
              </li>
            </ul>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow rounded">
              <div className="px-4 py-5 flex-auto">
                <div className="tab-content tab-space">
                  <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                    <ProfileTab token={token} />
                  </div>
                  <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                    <MyUploadsTab token={token} />
                  </div>
                  <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                    <ActivitiesTab token={token} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default function MyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyPageContent />
    </Suspense>
  );
}
