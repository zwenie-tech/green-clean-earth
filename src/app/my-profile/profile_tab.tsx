"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchUserData } from "@/app/requestsapi/request";
import Cookies from "js-cookie";
import Link from "next/link";
import { Gift } from "lucide-react";
import { DialogUploadPlant, DialogUploadPlantMyPage } from "./dialog_upload_plant";
import { DialogEditProfile } from "./dialog_edit_profile";

interface Profile {
  name: string;
  location: string;
  address: string;
  contact: string;
  email: string;
}

interface ProfileDetailsProps {
  profile: Profile;
  token: string;
}

const initialProfile: Profile = {
  name: "Name Name",
  location: "Location",
  address: "Address",
  contact: "9876543210",
  email: "example@email.com",
};

export default function ProfileTab({ token }: any) {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const searchParams = useSearchParams();
  const user_id = searchParams.get("id");

  useEffect(() => {
    async function fetchData() {
      if (user_id && token) {
        const data = await fetchUserData(user_id, token);
        if (data.user) {
          const { us_name, us_address, us_mobile, us_email, us_district } = data.user[0];
          Cookies.set('name', us_name, { expires: 1 });
          setProfile({
            name: us_name,
            location: us_district || "", // Set the location with a default value
            address: us_address,
            contact: us_mobile,
            email: us_email,
          });
        }
      }
    }
    fetchData();
  }, [user_id, token]);

  return (
    <div className="">
      <ProfileDetails profile={profile} token={token}/>
    </div>
  );
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ profile},{token}) => {
  return (
    <div className="">
      <div className="flex flex-col items-center">
        <div className="h-40 w-40 bg-white border rounded-full"></div>
        <div className="relative w-full my-4">
          <h1 className="text-3xl text-center font-semibold">{profile.name}</h1>
          <p className="text-dark-text text-center">{profile.email}</p>  
          <div className="my-2 md:m-0 md:absolute md:right-[25%] md:top-[50%] translate-y-[-50%]">
            {/* <Link href={'my-profile/edit'} className="text-primary">
              Edit Profile
            </Link> */}
            <DialogEditProfile />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full p-6 bg-white">
          <div>
            <p className="text-dark-text">Location</p> 
            <p>{profile.location}</p>
          </div>
          <div>
            <p className="text-dark-text">Address</p>
            <p>{profile.address}</p>
          </div>
          <div>
            <p className="text-dark-text">Phone</p>
            <p>{profile.contact}</p>
          </div>
        </div>
        
      </div>
      {/* <DialogUploadPlantMyPage token={token} />
      <Link 
            className="flex m-4 justify-start items-start gap-3 text-xl border rounded-xl shadow p-5 bg-white hover:bg-green-100 hover:shadow-md hover:border-green-600"
            href={"https://greencleanearth.org/gcem-lucky-draw-contest"}>
            <div>
              <Gift size={48} color="#16a34a" strokeWidth={1.75} />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-xl">Lucky Draw</p>
              <p className="font-normal text-base">നറുക്കെടുപ്പ്</p>
            </div>
      </Link> */}
    </div>
    
  );
};
