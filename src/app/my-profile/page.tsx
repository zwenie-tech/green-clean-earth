"use client";
import Footer from "@/components/footer";
import Navigationbar from "@/components/navigationBar";
import { CircleUser, Images, List } from "lucide-react";
import { useEffect, useState, Suspense } from "react";
import ProfileTab from "./profile_tab";
import MyUploadsTab from "./my_uploads_tab";
import ActivitiesTab from "./activities_tab";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import PageTitle from "@/components/sm/pageTitle";
import GceBadge from "@/components/gceBadge";
import JoinNow from "@/components/joinNow";

function MyProfile() {
  const token = Cookies.get("token");
  const searchParams = useSearchParams();

  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/loginform");
    }
  }, [token, router]);

  return (
    <main>
      <Navigationbar />
      <div className="container mx-auto md:max-w-5xl mt-4 min-h-screen">
        <PageTitle title="My Profile" />
        <div className="flex flex-wrap">
          <div className="w-full">
            {/* <ul
              className="flex mb-0 list-none flex-wrap flex-row"
              role="tablist"
            >
              <li className="flex-auto text-center">
                <a
                  className={
                    "text-base text-primary font-semibold border-b-2 px-2 py-2 flex justify-center items-center gap-3 leading-normal hover:bg-primary/15 transition-all " +

                    (openTab === 1
                        ? " bg-light-gray border-primary"
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
                  <CircleUser size={28} strokeWidth={1.75} /> Profile Info
                </a>
              </li>
              <li className="flex-auto text-center">
                <a
                  className={
                    "text-base text-primary font-semibold border-b-2 px-2 py-2 flex justify-center items-center gap-3 leading-normal hover:bg-primary/15 transition-all " +
                    (openTab === 2
                      ? " bg-light-gray border-primary"
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
              <li className="flex-auto text-center">
                <a
                  className={
                    "text-base text-primary font-semibold border-b-2 px-2 py-2 flex justify-center items-center gap-3 leading-normal hover:bg-primary/15 transition-all " +
                    (openTab === 3
                        ? " bg-light-gray border-primary"
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
            </ul> */}
            <div className="relative flex flex-col min-w-0 break-words bg-light-gray w-full mb-6 rounded-lg shadow">
              <div className="px-4 py-5 flex-auto">
                <ProfileTab token={token} />
                {/* <div className="">
                  <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                    <MyUploadsTab token={token} />
                  </div>
                  <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                    <ActivitiesTab token={token} />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <GceBadge />
      <JoinNow />
      <Footer />
    </main>
  );
}

export default function MyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyProfile />
    </Suspense>
  );
}
