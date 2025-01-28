"use client";
import React, { Suspense } from "react";
import NavigationBar from "@/components/navigationBar";
import Footer from "@/components/footer";
import { FaUpload } from "react-icons/fa";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { DialogAddUser } from "./dialog-add-user";

const Dashboard = () => {
  const router = useRouter();
  const token = Cookies.get("token");
  const gname = Cookies.get("gname");
  const cordId = Cookies.get("coid");
  if (!token) {
    router.push("/loginform");
  }
  const OurUserButton = () => {
    router.push("/dashboard/dashboard-userlist");
  };
  const PlantUploadsButton = () => {
    router.push("/dashboard/dashboard-PlantUploads");
  };
  const ActivitiesButton = () => {
    router.push("/dashboard/dashboard-activities");
  };
  const YouTubeEarningsButton = () => {
    router.push("/dashboard/youtube-earnings");
  };
  const OurTeamButton = () => {
    router.push("/dashboard/details-edit");
  };

  const InviteInstitutionsButton = () => {
    router.push("/dashboard/invite-institute");
  };
  const LogoutButton = () => {
    router.push("/logout");
  };
  return (
    <div style={{ background: "rgba(3, 18, 20, 0.1)" }}>
      <NavigationBar />
      <div className="relative flex items-center p-4">
        <div className="absolute left-1/2 mt-6 mb-3 transform -translate-x-1/2">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        <div className="ml-auto">
          {/* <button className='rounded-xl bg-gray-200 p-2 md:mr-6' style={{boxShadow:'1px 4px 5px 3px #00000040'}} onClick={LogoutButton}>Logout</button> */}
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-3xl mt-2 font-bold text-[#3C6E1F]">{gname}</h1>
      </div>
      <div className="text-center">
        <h1 className="text-3xl mt-2 font-bold text-[#3C6E1F]">
          Cordinator Id: {cordId}
        </h1>
      </div>
      <div className="text-center">
        <h1 className="text-xl mb-6 mt-2 font-bold ">
          in Association with Green Clean Kerala Mission
        </h1>
      </div>
      <div className="mx-auto p-6 max-w-screen-lg text-justify my-2">
        <div className="">
          <p className="">
            വിജയാശംസകൾ. താങ്കളെയും സ്ഥാപനത്തെയും ഉയരങ്ങളിൽ എത്തിക്കുവാൻ ഈ
            പദ്ധതിയിലൂടെ സാധ്യമാകട്ടെ എന്ന് ആശംസിക്കുന്നു.
          </p>
          <p className="text-lg font-semibold mt-2">താങ്കൾ ചെയ്യേണ്ടത്.</p>
          <p className="">
            സ്ഥാപനത്തിലെ മുഴുവൻ മെമ്പർമാരെയും മത്സരത്തിൽ പങ്കെടുപ്പിക്കുവാൻ
            Invite users എന്ന ബട്ടൺ ക്ലിക്ക് ചെയ്തു മെസ്സേജ് കോപ്പി ചെയ്ത് ,
            എല്ലാ മെമ്പർമാർക്കും വാട്സ്ആപ്പ് വഴി അയച്ചു കൊടുക്കുക. അവരോട്
            ലിങ്കിൽ ക്ലിക്ക് ചെയ്ത് രജിസ്റ്റർ ചെയ്തതിനുശേഷം മത്സരങ്ങളിൽ
            പങ്കെടുക്കുവാൻ നിർദ്ദേശിക്കുക.
          </p>
          <p className="text-lg font-semibold mt-2">പുരസ്കാരങ്ങൾ സമ്മാനങ്ങൾ</p>
          <p className="">
            പങ്കെടുക്കുന്ന മത്സരങ്ങളുടെ എണ്ണവും ക്വാളിറ്റിയും അനുസരിച്ച്
            നിങ്ങൾക്ക് പോയിന്റുകൾ ലഭിക്കുന്നതും മികച്ച പ്രകടനം നടത്തുന്ന
            വിദ്യാർത്ഥികൾ, ക്ലാസുകൾ, അധ്യാപകർ, കോഡിനേറ്റർമാർ, പ്രമോട്ടർമാർ ,
            പരിസ്ഥിതി പ്രവർത്തകർ, സന്നദ്ധ സംഘടനകൾ, റസിഡൻസ് അസോസിയേഷനുകൾ
            എന്നിവക്ക് പുരസ്കാരങ്ങളും സമ്മാനങ്ങളും ഉണ്ടായിരിക്കുന്നതാണ്.
          </p>
          <p className="text-lg font-semibold mt-2">
            Invite Other institutions
          </p>
          <p className="">
            താങ്കളുടെ പരിചയക്കാരായ മറ്റു സ്ഥാപനങ്ങളിലെ സുഹൃത്തുക്കളെ ഈ
            മത്സരത്തിലേക്ക് ഇൻവൈറ്റ് ചെയ്യുക. അവർ നേടുന്ന പോയിന്റുകൾ പ്രമോട്ടർ
            എന്ന നിലയിൽ താങ്കളുടെ അക്കൗണ്ടിൽ പരിഗണിക്കുന്നതാണ്. അതിന് Invite
            Other institutions എന്ന് ബട്ടൺ ക്ലിക്ക് ചെയ്ത് മെസ്സേജ് അവർക്ക്
            അയച്ചു കൊടുക്കുക.
          </p>
          <p className="text-lg font-semibold mt-2">Our team</p>
          <p className="">
            താങ്കളുടെ സ്ഥാപനത്തിൽ ഈ പദ്ധതി യിൽ താങ്കളോടൊപ്പം ഉള്ള
            സഹപ്രവർത്തകരുടെ വിവരങ്ങൾ ഇവിടെ നൽകുക
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mt-8">
          <DialogAddUser />

          <label
            className="flex items-center justify-center bg-light-green rounded-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-light-gray hover:z-10"
            onClick={PlantUploadsButton}
          >
            <div>
              <FaUpload />
            </div>
            <div className="p-4 text-xl">Plant Uploads</div>
          </label>

          <label
            className="flex items-center justify-center bg-light-green rounded-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-light-gray hover:z-10"
            onClick={ActivitiesButton}
          >
            <div>
              <FaUpload />
            </div>
            <div className="p-4 text-xl">Activities</div>
          </label>
          <label
            className="flex items-center justify-center bg-light-green rounded-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-light-gray hover:z-10"
            onClick={YouTubeEarningsButton}
          >
            <div>
              <FaUpload />
            </div>
            <div className="p-4 text-xl">YouTube Earnings</div>
          </label>

          <label
            className="flex items-center justify-center bg-light-green rounded-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-light-gray hover:z-10"
            onClick={OurUserButton}
          >
            <div>
              <FaUpload />
            </div>
            <div className="p-4 text-xl">Our Users</div>
          </label>
          <label
            className="flex items-center justify-center bg-light-green rounded-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-light-gray hover:z-10"
            onClick={InviteInstitutionsButton}
          >
            <div>
              <FaUpload />
            </div>
            <div className="p-4 text-xl">Invite Other Institutions</div>
          </label>

          <label
            className="flex items-center justify-center bg-light-green rounded-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-light-gray hover:z-10"
            onClick={OurTeamButton}
          >
            <div>
              <FaUpload />
            </div>
            <div className="p-4 text-xl">Our Team</div>
          </label>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default function Dashboardfn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
    </Suspense>
  );
}
