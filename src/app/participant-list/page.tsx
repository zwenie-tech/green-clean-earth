"use client";
import { useState, useEffect } from "react";
import ParticipantCard from "./card";
import Navigationbar from "@/components/navigationBar";
import Footer from "@/components/footer";
import { apiURL } from "@/app/requestsapi/request";
import Cookies from "js-cookie";
import Earth from "@/components/earth";
import { imageURL } from "../requestsapi/request";

type Participant = {
  up_file: string;
  up_id: number;
  up_tree_name: string;
  up_date: string;
  up_planter: string;
  up_name: string;
}

type ParticipantCardProps = {
  participant: Participant;
}

const ParticipantList: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${apiURL}/uploads/all`);
      const data = await response.json();
      setParticipants(data.Uploads);
    }
    fetchData();
  }, []);

  function formatDate(isoString: string) {
    const date = new Date(isoString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }

  function formatTime(isoString: string) {
    const date = new Date(isoString);
    let hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    let hour = parseInt(hours) % 12;
    const formattedTime = `${hour}:${minutes} ${parseInt(hours) >= 12 ? 'PM' : 'AM'}`;
    return formattedTime;
  }

  return (
    <div className="">
      <Navigationbar />
      <div>
        <h1 className="text-2xl my-4 text-center font-bold">Participant List</h1>
      </div>
      <div className="m-2 flex justify-center items-center space-x-4">
    <a href="/participants">
    <button className="text-white text-sm md:text-base py-2 px-3 bg-[#3C6E1F] rounded-2xl shadow-xl md:py-3 md:px-4">
       Sorting Page
    </button>
    </a>
    <button className="text-white text-sm md:text-base py-2 px-3 bg-[#3C6E1F] rounded-2xl shadow-xl md:py-3 md:px-4">
         District List
    </button>
     <button className="text-white text-sm md:text-base py-2 px-3 bg-[#3C6E1F] rounded-2xl shadow-xl md:py-3 md:px-4">
       Old participants
     </button>
</div>



      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
        {participants.map((participant) => (
          <div key={participant.up_id} className="p-2">
            <div className="rounded-lg shadow-lg">
              <div className="rounded-lg border">
              <img className="w-full h-48 object-cover" src={`${imageURL}${participant.up_file}`} alt={"Image"} height={150} width={200}/>
                <div className="flex justify-center mt-2 gap-2">
                   <div className="text-md text-center font-bold">Tree number: </div>
                   <div className="text-md">{participant.up_id}</div>
                </div>
                <div className="flex justify-center mt-2 text-gray-600 gap-2">
                   <div className="text-md">{formatDate(participant.up_date)}</div>
                   <div className="text-md">{formatTime(participant.up_date)}</div>
                </div>
                <hr className="my-2" />
                <div className="flex ml-2 mt-2  gap-2">
                   <div className="text-sm pl-5 mb-2">Tree name: </div>
                   <div className="text-sm">{participant.up_tree_name}</div>
                </div>
                <div className="flex ml-2 mt-2 gap-2">
                   <div className="text-sm pl-5 mb-2">Planter name: </div>
                   <div className="text-sm">{participant.up_planter}</div>
                </div>
                <div className="flex ml-2 mt-2 gap-2">
                   <div className="text-sm pl-5 mb-2">Uploader name: </div>
                   <div className="text-sm">{participant.up_name}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Earth />
      <Footer />
    </div>
  );
}

export default ParticipantList;
