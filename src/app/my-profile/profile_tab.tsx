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
  name:string
  location: string;
  address: string;
  contact: string;
  email: string;
  institution_name: string,
  coordinator_name: string,
  profession: string,
  country:string
}

interface ProfileDetailsProps {
  profile: Profile;
  token: string;
}

const initialProfile: Profile = {
  name:'Name',
  location: "Location",
  address: "Address",
  contact: "9876543210",
  email: "example@email.com",
  institution_name: 'Institution Name',
  coordinator_name: 'Coord Name',
  profession:'Teacher',
  country: 'Country'
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
          // const { us_name, us_address, us_mobile, us_email, us_district, us_city,cntry_name  } = data.user[0];
          const { 
            us_name, 
            us_address, 
            us_mobile, 
            us_email, 
            us_district, 
            us_city, 
            cntry_name, 
            st_name, 
            dis_name, 
            cop_name, 
            lsg_name, 
            us_ward, 
            us_gender, 
            us_profile_description,
            co_ord_name
           } = data.user[0];
          
          Cookies.set('name', us_name, { expires: 1 });
          Cookies.set('email', us_email, { expires: 1 });
          Cookies.set('profileDescription', us_profile_description, { expires: 1 });
          Cookies.set('mobile', us_mobile, { expires: 1 });
          Cookies.set('country', cntry_name, { expires: 1 });
          Cookies.set('state', st_name, { expires: 1 });
          Cookies.set('district', dis_name, { expires: 1 });
          Cookies.set('corporation', cop_name, { expires: 1 });
          Cookies.set('lsg', lsg_name, { expires: 1 });
          Cookies.set('ward', us_ward, { expires: 1 });
          Cookies.set('city', us_city, { expires: 1 });
          Cookies.set('address', us_address, { expires: 1 });
          Cookies.set('gender', us_gender, { expires: 1 });

          setProfile({
            name : us_name,
            institution_name: us_name,
            coordinator_name: co_ord_name,
            profession: us_name,
            country : cntry_name,
            location: us_district ? us_district:us_city, // Set the location with a default value
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
        {/* <div className="h-40 w-40 bg-white border rounded-full"></div> */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full p-6 bg-white rounded-md">
          {/* <div>
            <p className="text-dark-text">Institution Name</p> 
            <p>{profile.institution_name}</p>
          </div> */}
          <div>
            <p className="text-dark-text">Coordinator Name</p> 
            <p>{profile.coordinator_name}</p>
          </div>
          <div>
            <p className="text-dark-text">Location</p> 
            <p>{profile.location}</p>
          </div>
          {/* <div>
            <p className="text-dark-text">Profession</p> 
            <p>{profile.profession}</p>
          </div> */}
          <div>
            <p className="text-dark-text">Whatsapp Number</p> 
            <p>{profile.contact}</p>
          </div>
          <div>
            <p className="text-dark-text">Country</p> 
            <p>{profile.country}</p>
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
