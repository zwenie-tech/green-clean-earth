"use client";
import NavigationBar from '@/components/navigationBar';
import Footer from '@/components/footer';
import React, { useState, useEffect, Suspense } from 'react';
import { apiURL, imageURL } from '../requestsapi/request';
import { useSearchParams } from 'next/navigation';

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

  useEffect(() => {
    const uid = parseInt(userid!);
    fetch(`${apiURL}/uploads/userUploads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: uid }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setUploads(data.userUploads);
        }
      })
      .catch(error => console.error('Error fetching uploads:', error));

    fetch(`${apiURL}/activity/userActivities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: uid }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setActivities(data.userActivities);
        }
      })
      .catch(error => console.error('Error fetching activities:', error));
  }, [userid]);

  const showFirstMessage = () => {
    setActiveButton('upload');
  };

  const showSecondMessage = () => {
    setActiveButton('activity');
  };

  return (
    <div>
      <NavigationBar />
      <div className='w-full flex flex-col items-center gap-4'>
        <div className='w-full flex justify-between items-center gap-3 '>
          <p className='text-right font-bold w-1/2'>User Name:</p>
          <p className='w-1/2 font-bold'>{username}</p>
        </div>
        <div className='w-full flex justify-between items-center gap-3 '>
          <p className='text-right font-bold w-1/2'>User Id:</p>
          <p className='w-1/2 font-bold'>{userid}</p>
        </div>
        
      </div>
      <hr className="h-1 bg-gray-300 border-0 mt-4 w-3/4 justify-center items-center mx-auto" />
      <div className="flex flex-row bg-light-gray justify-center items-center w-3/4 mx-auto">
        <button
          onClick={showFirstMessage}
          className={`w-1/2 text-center font-bold bg-light-gray py-3 text-[#3C6E1F] hover:bg-primary/15 border-b-2 ${
            activeButton === 'upload' ? 'border-[#3C6E1F]' : 'border-transparent'
          }`}
        >
          Upload
        </button>
        <button
          onClick={showSecondMessage}
          className={`w-1/2 text-center font-bold bg-light-gray hover:bg-primary/15 py-3 text-[#3C6E1F] border-b-2 ${
            activeButton === 'activity' ? 'border-[#3C6E1F]' : 'border-transparent'
          }`}
        >
          Activity
        </button>
      </div>

      <div className="w-3/4 mx-auto">
        {activeButton === 'upload' && (
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {uploads.map((upload) => (
                <div key={upload.up_id} className="flex flex-col items-center p-4 border border-gray-200 rounded-lg" style={{ boxShadow: '0px 4px 10px 3px #00000040' }}>
                  <div className="w-full">
                    <img src={`${imageURL}${upload.up_file}`} alt={upload.up_tree_name} className="w-full h-auto object-cover rounded-lg" style={{ height: '250px' }} />
                  </div>
                  <div className="w-full pt-3 md:pl-4">
                    <p>Plant name: {upload.up_tree_name}</p>
                    <p>Uploaded No.: {upload.up_id}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeButton === 'activity' && (
          <div className="container mx-auto p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border-gray-200 rounded-t-lg">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left w-16 bd-2 rounded-tl-lg">Sl. No</th>
                    <th className="py-3 px-6 text-left">View/ Like/ Comment/ Share</th>
                    <th className="py-3 px-6 text-left">Category</th>
                    <th className="py-3 px-6 text-left">Name & address of participant</th>
                    
                    <th className="py-3 px-6 text-left">Thumbnail</th>
                    <th className="py-3 px-6 text-left rounded-tr-lg">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, index) => (
                    <tr key={index} className="border border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left">{index + 1}</td>
                      <td className="py-3 px-6 text-left">{`${activity.activity_likes} Likes & ${activity.activity_views} Views`}</td>
                      <td className="py-3 px-6 text-left">{activity.activity_category}</td>
                      <td className="py-3 px-6 text-left">{activity.participant_name}</td>
                      <td className="py-3 px-6 text-left"><img src={`${imageURL}${activity.activity_thumbnail}`} style={{ height: '100px' }} /></td>
                      <td className="py-3 px-6 text-left">{activity.earnings || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
