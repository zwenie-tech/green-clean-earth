"use client";
import Image from "next/image";
import { useState } from "react";
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

const ParticipantCard: React.FC<ParticipantCardProps> = ({ participant }) => {

  
  function formatDate(isoString: string) {
    const date = new Date(isoString);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getUTCFullYear();
    

    const formattedDate = `${day}/${month}/${year}`;

    return `${formattedDate}`;
  }
  function formatTime(isoString: string) {
    const date = new Date(isoString);
    let hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    let hour = parseInt(hours) % 12;

    const formattedTime = `${hour}:${minutes} ${parseInt(hours) >= 12 ? 'PM' : 'AM'}`;

    return `${formattedTime}`;
  }

  const formattedDate = formatDate(participant.up_date);
  const formattedTime = formatTime(participant.up_date);

  return (
    <div className="bg-red-300 flex flex-col items-start border shadow gap-3 p-4 m-1 text-sm">
      <div className="bg-red-600">
        <img className="w-full h-48 object-cover" src={`${imageURL}${participant.up_file}`} alt={"Image"} height={150} width={200}/>
        {/* <img src={participant.up_file'} alt={"Image"} height={150}/> */}
      </div>
      <div className="bg-red-900">
        <div className="text-sm text-gray-500">Tree number: </div>
        <div className="text-xl">{ participant.up_id }</div>
      </div>
      <div>
        <div className="text-sm text-gray-500">Tree name: </div>
        <div className="text-xl">{ participant.up_tree_name }</div>
      </div>
      <div>
        <div className="text-sm text-gray-500">Planter name: </div>
        <div className="text-xl">{ participant.up_planter }</div>
      </div>
      <div>
        <div className="text-sm text-gray-500">Uploader name: </div>
        <div className="text-xl">{ participant.up_name }</div>
      </div>
      <div className="text-sm text-gray-500">{ formattedDate }</div>
      <div className="text-sm text-gray-500">{ formattedTime }</div>
    </div>
  )
};

export default ParticipantCard;
