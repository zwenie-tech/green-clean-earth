"use client";
import { useState, useEffect } from "react";
import ParticipantCard from "./card";
import Navigationbar from "@/components/navigationBar";
import Footer from "@/components/footer";
import { Link } from "lucide-react";
import { apiURL } from "@/app/requestsapi/request";

export default function ParticipantList() {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${apiURL}/uploads/all`);
      const data = await response.json();
      console.log(data.Uploads);
      setParticipants(data.Uploads);
    }
    fetchData();
  }, []);

  return (
    <div className="bg-green-50">
      <Navigationbar />
      <div className="container mx-auto md:max-w-5xl mt-4">
        <h1 className="text-3xl my-4 font-bold mt-8">Participant List</h1>
        <a
          href={"https://greencleanearth.org/participants/1"}
          className="float-right place-items-center w-25 bg-green-100 text-green-600  py-2 px-4 my-2 border-2 border-green-600 rounded-md hover:bg-green-600 hover:text-white"
        >
          Old Participant List
        </a>
        <div className="p-4 flex flex-col items-center justify-center w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4   gap-3">
            {participants.map((participant, index) => (
              <ParticipantCard key={index} participant={participant} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
