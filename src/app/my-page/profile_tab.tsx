"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchUserData } from "@/app/requestsapi/request";
import Cookies from "js-cookie";

interface Profile {
  name: string;
  location: string;
  address: string;
  contact: string;
  email: string;
}

interface ProfileDetailsProps {
  profile: Profile;
}

const initialProfile: Profile = {
  name: "Name",
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
        console.log(data);
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
      <ProfileDetails profile={profile} />
    </div>
  );
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ profile }) => {
  return (
    <div className="profile-details leading-normal">
      <h1 className="text-3xl font-semibold py-2">{profile.name}</h1>
      <p><strong>Location:</strong> {profile.location}</p>
      <p><strong>Address:</strong> {profile.address}</p>
      <p><strong>Phone:</strong> {profile.contact}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <style jsx>{`
        .profile-details {
          max-width: 400px;
        }
      `}</style>
    </div>
  );
};
