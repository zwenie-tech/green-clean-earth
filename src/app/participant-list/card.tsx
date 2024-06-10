"use client";
import Image from "next/image";

type Participant = {
  up_file: string;
  up_id: number;
  up_tree_name: string;
  up_date: string;
}

type ParticipantCardProps = {
  participant: Participant;
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({ participant }) => {
  console.log(participant);
  function formatDateTime(isoString: string) {
    const date = new Date(isoString);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getUTCFullYear();
    
    // const hours = String(date.getUTCHours()).padStart(2, '0');
    // const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    // const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    const formattedDate = `${day}/${month}/${year}`;
    // const formattedTime = `${hours}:${minutes}:${seconds}`;

    return `${formattedDate}`;
  }

  const formattedDateTime = formatDateTime(participant.up_date);

  return (
    <div className="bg-white flex flex-col items-start border shadow gap-3 p-4 m-4 text-sm">
      <div>
        <img src={'https://img.freepik.com/free-photo/monstera-deliciosa-plant-pot_53876-133119.jpg'} alt={"Image"} height={150}/>
        {/* <img src={participant.up_file'} alt={"Image"} height={150}/> */}
      </div>
      <div>
        <div className="text-sm text-gray-500">Tree number: </div>
        <div className="text-xl">{ participant.up_id }</div>
      </div>
      <div>
        <div className="text-sm text-gray-500">Tree name: </div>
        <div className="text-xl">{ participant.up_tree_name }</div>
      </div>
      <div className="text-sm text-gray-500">{ formattedDateTime }</div>
    </div>
  )
};

export default ParticipantCard;
