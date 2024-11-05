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
        <div className='border border-black m-5 p-7 rounded-lg'>
          <p>നിങ്ങളുടെ  സ്ഥാപനത്തിൽ  നിന്നും  Green Clean Kerala  എന്ന  യു ട്യൂബ്  ചാനലിലേക്ക്   അപ്‌ലോഡ് ചെയ്യുന്ന  വീഡിയോകളിൽ  നിന്നും  വരുമാനം  ലഭിക്കുകയാണെങ്കിൽ  അതിന്റെ  പകുതി  സ്ഥാപനത്തിന്  നൽകുന്നതാണ് . സ്ഥാപനത്തിന്  ലഭിക്കുന്ന  തുകയുടെ  പകുതി  സ്ഥാപനത്തിന്റെ  ഹരിത  പ്രവർത്തനങ്ങൾക്കായി  ഉപയോഗിക്കാവുന്നതും  പകുതി  പരിപാടി  അവതരിപ്പിച്ച  വ്യക്തികൾക്ക്  നൽകേണ്ടതുമാണ് .</p>
        </div>
        <ActivitiesTab token={token} />
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
