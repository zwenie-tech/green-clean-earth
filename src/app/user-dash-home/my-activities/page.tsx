"use client";
import Footer from "@/components/footer";
import Navigationbar from "@/components/navigationBar";
import { useEffect, useState, Suspense } from "react";
import ActivitiesTab from "./activities_tab";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import PageTitle from "@/components/sm/pageTitle";
import GceBadge from "@/components/gceBadge";
import JoinNow from "@/components/joinNow";
import Loading from "@/components/loading";

function MyActivities() {
  const token = Cookies.get("token");
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
        <PageTitle title="My Activities" />
        <div className="flex flex-wrap">
          <ActivitiesTab token={token} />
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
    <Suspense fallback={<Loading />}>
      <MyActivities />
    </Suspense>
  );
}
