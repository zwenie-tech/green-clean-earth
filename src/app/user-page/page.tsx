"use client";
import NavigationBar from '@/components/navigationBar';
import Footer from '@/components/footer';
import React, { useState, useEffect, Suspense } from 'react';
import { apiURL, imageURL } from '../requestsapi/request';
import { useSearchParams } from 'next/navigation';
import { ExternalLink, LinkIcon } from 'lucide-react';
import PaginationComponent from "../PageComponent";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";

interface Upload {
  up_id: number;
  up_name: string;
  up_planter: string;
  up_tree_name: string;
  up_cord_id: number;
  up_date: string;
  up_file: string;
  us_corporation: number;
  gp_name: string;
  up_reg_id: number;
  is_challenged: number;
}

interface Activity {
  us_name: string;
  participant_name: string;
  activity_category: string;
  activity_social_media_link: string;
  activity_thumbnail: string;
  activity_likes: string;
  activity_views: string;
  earnings: string | null;
  activity_description: string;
  activity_title: string;
  personal_activity_id: number;
  login_id: number;
  group_type: string;
  gp_id: number;
  gp_name:string;
  co_ord_name:string;
}
export default function ButtonDisplay() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ButtonDisplayFn />
    </Suspense>
  );
}
const ButtonDisplayFn = () => {
  const [activeButton, setActiveButton] = useState<'upload' | 'activity'>('upload');
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const searchParams = useSearchParams();
  const username = searchParams.get("u");
  const userid = searchParams.get("id");
  const [currentPageAct, setCurrentPageAct] = useState(1);
  const [currentPageUp, setCurrentPageUp] = useState(1);
  const [totalPagesAct, setTotalPagesAct] = useState(1);
  const [totalPagesUp, setTotalPagesUp] = useState(1);
  const [totalCountUp, setTotalCountUp] = useState("0");
  const [totalCountAct, setTotalCountAct] = useState("0");
  const [coordinatorName, setCoordinatorName] = useState("");
  const [coordinatorId, setCoordinatorId] = useState<number | null>(null);
  const [groupName, setGroupName] = useState("");
  const [groupId, setGroupId] = useState<number | null>(null);
  const itemsPerPage = 10;
  const token = Cookies.get("token");

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
  
  async function handleChallenge(treeno: number) {
    if(token!=null){
      try {
        const response = await axios.post(`${apiURL}/uploads/markChallenged`, { treeNumber:treeno });
      } catch (error) {
        console.error("Error challenging tree:", error);
      }
      location.reload();
    }
  }

  const handlePageChangeAct = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPagesAct) {

      setCurrentPageAct(newPage);
    }
  }
  const handlePageChangeUp = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPagesUp) {
      setCurrentPageUp(newPage);
    }
  }
  

  useEffect(() => {
    const uid = parseInt(userid!);
    fetch(`${apiURL}/uploads/userUploads?page=${currentPageUp}&limit=${itemsPerPage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: uid }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setTotalPagesUp(Math.ceil(data.upload_count / itemsPerPage));
          setTotalCountUp(data.upload_count)
          setUploads(data.userUploads);
        }
      })
      .catch(error => console.error('Error fetching uploads:', error));

    fetch(`${apiURL}/activity/userActivities?page=${currentPageAct}&limit=${itemsPerPage}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: uid }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // console.log(data)
          if (data.details && data.details.length > 0) {
            setCoordinatorName(data.details[0].co_ord_name);
            setCoordinatorId(data.details[0].us_cord_id);
            setGroupName(data.details[0].gp_name);
            setGroupId(data.details[0].gp_id);
          }

          setTotalPagesAct(Math.ceil(data.activity_count / itemsPerPage));
          setTotalCountAct(data.activity_count)

          setActivities(data.userActivities);
        }
      })
      .catch(error => console.error('Error fetching activities:', error));
  }, [userid, currentPageAct, currentPageUp]);

  const showFirstMessage = () => {
    setActiveButton('upload');
  };

  const showSecondMessage = () => {
    setActiveButton('activity');
  };

  return (
    <div>
      <NavigationBar />
      <div className='w-full flex flex-col items-center gap-4 mt-6'>
        <div className='w-full flex justify-between items-center gap-3 '>
          <p className='text-right font-bold w-1/2'>User Name / User Id:</p>
          <p className='w-1/2 font-bold'>{username} / {userid}</p>
        </div>
        <div className='w-full flex justify-between items-center gap-3 '>
          <p className='text-right font-bold w-1/2'>Group Name / Group Id:</p>
          <p className='w-1/2 font-bold'>{groupName} / {groupId}</p>
        </div>
        <div className='w-full flex justify-between items-center gap-3 '>
          <p className='text-right font-bold w-1/2'>Cordinator Name / Cordinator Id:</p>
          <p className='w-1/2 font-bold'>{coordinatorName} / {coordinatorId}</p>
        </div>
        <div className='w-full flex justify-between items-center gap-3 '>
          <p className='text-right font-bold w-1/2'>Upload Count:</p>
          <p className='w-1/2 font-bold'>{totalCountUp}</p>
        </div>
        <div className='w-full flex justify-between items-center gap-3 '>
          <p className='text-right font-bold w-1/2'>Activity Count:</p>
          <p className='w-1/2 font-bold'>{totalCountAct}</p>
        </div>

      </div>
      <hr className="h-1 bg-gray-300 border-0 mt-4 w-3/4 justify-center items-center mx-auto" />
      <div className="flex flex-row bg-light-gray justify-center items-center w-3/4 mx-auto">
        <button
          onClick={showFirstMessage}
          className={`w-1/2 text-center font-bold text-xl bg-light-gray py-3 text-[#3C6E1F] hover:bg-primary/15 border-b-2 ${activeButton === 'upload' ? 'border-[#3C6E1F]' : 'border-transparent'
            }`}
        >
          Upload
        </button>
        <button
          onClick={showSecondMessage}
          className={`w-1/2 text-center font-bold text-xl bg-light-gray hover:bg-primary/15 py-3 text-[#3C6E1F] border-b-2 ${activeButton === 'activity' ? 'border-[#3C6E1F]' : 'border-transparent'
            }`}
        >
          Activity
        </button>
      </div>

      <div className="w-3/4 mx-auto">
        {activeButton === 'upload' && (
          <div className="container mx-auto p-4">
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {uploads.map((upload) => (
                <div key={upload.up_id} className="participant-item relative group">
              {/* Conditional image for challenged status */}
              {upload.is_challenged == 1 && (
                <img
                  className="absolute top-1/3 left-1/2  transform -translate-x-1/2  w-28 h-18 object-cover z-10"
                  src="/images/chellenge.png"
                  alt="Challenged"
                />
              )}
              <div className="rounded-lg shadow-lg border  hover:shadow-2xl hover:border-gray-400 h-full flex flex-col">
                <Link
                  href={{
                    pathname: 'participant-list/item',
                    query: { id: upload.up_id },
                  }}
                >
                  <img
                    className="w-full h-80 object-cover rounded-tl-lg rounded-tr-lg"
                    src={`${imageURL}${upload.up_file}`}
                    //src="/images/image1.jpeg"
                    alt="Image"
                  />
                  <div className="flex justify-center mt-2 gap-1">
                    <div className="text-md text-center font-bold">Tree number:</div>
                    <div className="text-md font-bold">{upload.up_id}</div>
                  </div>
                  <div className="flex justify-center mt-2 text-sm text-gray-500 gap-2">
                    <div className="text-md">{formatDate(upload.up_date)}</div>
                    <div className="text-md">{formatTime(upload.up_date)}</div>
                  </div>
                </Link>
                <hr className="my-2" />
                <div className="flex-grow flex flex-col gap-3 justify-normal p-4">
                  <div className="">
                    {/* <div className="text-sm text-left pl-8" style={{width:'45%'}}>Uploader name:</div>                  */}
                    <div className="text-base font-bold text-center">{upload.up_name}</div>
                  </div>
                  <div className="flex gap-3 justify-center">
                    {/* <div className="text-sm" style={{width:'45%'}}>Group name:</div>                  */}
                    <div className="text-sm text-center">{upload.gp_name}</div>
                  </div>
                  {upload.is_challenged == 1 ? (
                    <div className="flex m-auto">
                      <div className="text-sm py-2 text-center text-primary">This image has been challenged</div>
                    </div>
                  ) : token!=null ? (
                    <div className="flex justify-center">
                      <button
                        onClick={(e) => {
                          e.preventDefault(); // Prevent the default link behavior
                          handleChallenge(upload.up_id);
                        }}
                        className="bg-primary m-1 text-white text-sm py-1 px-2 rounded hidden group-hover:block mx-auto"
                      >
                        Challenge
                      </button>
                    </div>
                  ):''}
                </div>
              </div>
            </div>
              ))}
            </div>

            {/* <div className="flex justify-center items-center space-x-2 my-4">
              <button
                className={
                  currentPageUp === 1
                    ? 'text-white text-sm py-2 px-4 bg-[#6b6767] rounded-xl shadow-lg'
                    : 'text-white text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg'
                }
                onClick={() => handlePageChangeUp(currentPageUp - 1)}
                disabled={currentPageUp === 1}
              >
                Previous
              </button>
              <span className="text-xl">{currentPageUp}</span>
              <button
                className={
                  currentPageUp === totalPagesUp
                    ? 'text-white text-sm py-2 px-4 bg-[#6b6767] rounded-xl shadow-lg'
                    : 'text-white text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg'
                }
                onClick={() => {
                  handlePageChangeUp(currentPageUp + 1);
                }}
                disabled={currentPageUp === totalPagesUp}
              >
                Next
              </button>
            </div> */}

<PaginationComponent
  currentPage={currentPageUp}
  totalPages={totalPagesUp}
  onPageChange={handlePageChangeUp}
/>

          </div>
        )}


        {activeButton === 'activity' && (
          <div className="container mx-auto p-6">
            <div className="overflow-x-auto">
            
              <table className="min-w-full bg-white border-gray-200 rounded-t-lg">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left w-16 bd-2 rounded-tl-lg">Sl. No</th>
                    <th className="py-3 px-6 text-left">Group Name</th>
                    <th className="py-3 px-6 text-left">Chest Number</th>
                    <th className="py-3 px-6 text-left">Category</th>
                    <th className="py-3 px-6 text-left">Name of Activity</th>
                    <th className="py-3 px-6 text-left">Activity Id</th>
                    <th className="py-3 px-6 text-left">User Id</th>
                    <th className="py-3 px-6 text-left rounded-tr-lg">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, index) => (
                    <tr key={index} className="border border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left">{index + 1}</td>
                      <td className="py-3 px-6 text-left">
                        <a 
                          href={`/group-page?gname=${activity.gp_name}&gid=${activity.gp_id}&uc=${0}&cordinator=${activity.co_ord_name}&groupType=${activity.group_type}`} 
                          className="text-black hover:underline flex items-center gap-1"
                        >
                          {activity.gp_name}
                          <LinkIcon size={16} className="text-blue-600" />
                        </a>
                      </td>                      <td className="py-3 px-6 text-left">{activity.activity_description}</td>
                      <td className="py-3 px-6 text-left">{activity.activity_category}</td>
                      <td className="py-3 px-6 text-left">
                        <a 
                          href={activity.activity_social_media_link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-black hover:underline flex items-center gap-1"
                        >
                          {activity.activity_title}
                          <ExternalLink size={16} className="text-blue-600" />
                        </a>
                      </td>                      <td className="py-3 px-6 text-left">{activity.personal_activity_id}</td>
                      <td className="py-3 px-6 text-left">{activity.login_id}</td>
                      <td className="py-3 px-6 text-left">{activity.activity_views} Views, {activity.activity_likes} Likes</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* <div className="flex justify-center items-center space-x-2 my-4">
              <button
                className={currentPageAct === 1 ?
                  "text-white text-sm py-2 px-4 bg-[#6b6767] rounded-xl shadow-lg"
                  : "text-white text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
                }
                onClick={() => handlePageChangeAct(currentPageAct - 1)}
                disabled={currentPageAct === 1}
              >
                Previous
              </button>
              <span className="text-xl">{currentPageAct}</span>
              <button
                className={currentPageAct === totalPagesAct ?
                  "text-white text-sm py-2 px-4 bg-[#6b6767] rounded-xl shadow-lg"
                  : "text-white text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
                }
                onClick={() => {
                  handlePageChangeAct(currentPageAct + 1)
                }}
                disabled={currentPageAct === totalPagesAct}
              >
                Next
              </button>
            </div> */}

            <PaginationComponent
              currentPage={currentPageAct}
              totalPages={totalPagesAct}
              onPageChange={handlePageChangeAct}
            />

          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};