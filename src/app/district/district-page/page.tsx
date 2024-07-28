"use client";
import NavigationBar from '@/components/navigationBar';
import Footer from '@/components/footer';
import React, { useState, useEffect } from 'react';
import { apiURL, imageURL } from '../../requestsapi/request';
import { useSearchParams } from 'next/navigation';

// Define TypeScript interfaces for the API responses
interface DistrictActivity {
  us_name: string;
  participant_name: string;
  activity_category: string;
  activity_social_media_link: string;
  activity_thumbnail: string;
  activity_likes: string;
  activity_views: string;
  earnings: string | null;
}

interface ApiResponse {
  districtActivities: DistrictActivity[];
  success: boolean;
}

interface DistrictUpload {
  up_planter: string;
  up_id: number;
  up_date: string;
  up_file: string;
  gp_name: string;
}

interface DistrictUploadsResponse {
  districtList: DistrictUpload[];
  success: boolean;
}

const ButtonDisplay: React.FC = () => {
  const [activeButton, setActiveButton] = useState<'upload' | 'activity'>('upload');
  const [activities, setActivities] = useState<DistrictActivity[]>([]);
  const [uploads, setUploads] = useState<DistrictUpload[]>([]);
  const searchParams = useSearchParams();
  const ind = searchParams.get("i");
  const dname = searchParams.get("n");
  const upno = searchParams.get("u");

  
  const showFirstMessage = () => {
    setActiveButton('upload');
  };

  const showSecondMessage = () => {
    setActiveButton('activity');
  };

  useEffect(() => {
    if (activeButton === 'activity') {
      fetchActivities();
    } else if (activeButton === 'upload') {
      fetchUploads();
    }
  }, [activeButton]);

  const fetchActivities = async () => {
    try {
      const i = parseInt(ind!);
      const response = await fetch(`${apiURL}/activity/districtActivities?limit=2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"districtId": i})
      });
      const data: ApiResponse = await response.json();
      if (data.success) {
        setActivities(data.districtActivities);
      } else {
        console.error('Failed to fetch activities');
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const fetchUploads = async () => {
    try {
      const i = parseInt(ind!);
      const response = await fetch(`${apiURL}/common/districtUploads?districtId=${i}&page=1&limit=2`);
      const data: DistrictUploadsResponse = await response.json();
      if (data.success) {
        setUploads(data.districtList);
      } else {
        console.error('Failed to fetch uploads');
      }
    } catch (error) {
      console.error('Error fetching uploads:', error);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className='w-full flex flex-col items-center gap-4'>
        <div className='w-full flex justify-between items-center gap-3 '>
          <p className='text-right font-bold w-1/2'>District Name:</p>
          <p className='w-1/2 font-bold'>{dname}</p>
        </div>
        <div className='w-full flex justify-between items-center gap-3 '>
          <p className='text-right font-bold w-1/2'>District Id:</p>
          <p className='w-1/2 font-bold'>{ind}</p>
        </div>
        <div className='w-full flex justify-between items-center gap-3 '>
          <p className='text-right font-bold w-1/2'>{dname}:</p>
          <p className='w-1/2 font-bold'>{upno}</p>
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
              {uploads.length > 0 ? uploads.map((upload, index) => (
                <div key={index} className="flex flex-col items-center p-4 border border-gray-200 rounded-lg" style={{boxShadow: '0px 4px 10px 3px #00000040'}}>
                  <div className="w-full">
                    <img src={`${imageURL}${upload.up_file}`} alt={`Upload ${index}`} className="w-full h-auto object-cover rounded-lg" style={{height: '250px'}}/>
                  </div>
                  <div className="w-full pt-3 md:pl-4">
                    <p>Planter Name: {upload.up_planter}</p>
                    <p>Upload ID: {upload.up_id}</p>
                    <p>Upload Date: {new Date(upload.up_date).toLocaleDateString('en-GB')}</p>
                    <p>Group Name: {upload.gp_name}</p>
                  </div>
                </div>
              )) : <center><div>No uploads found</div></center>}
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
                    <th className="py-3 px-6 text-left">Name of art brief description</th>
                    <th className="py-3 px-6 text-left">Thumbnail</th>
                    <th className="py-3 px-6 text-left rounded-tr-lg">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.length > 0 ? activities.map((activity, index) => (
                    <tr key={index} className="border border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left">{index + 1}</td>
                      <td className="py-3 px-6 text-left">{`${activity.activity_likes} Likes & ${activity.activity_views} Views`}</td>
                      <td className="py-3 px-6 text-left">{activity.activity_category}</td>
                      <td className="py-3 px-6 text-left">{activity.participant_name}</td>
                      <td className="py-3 px-6 text-left">{activity.activity_social_media_link}</td>
                      <td className="py-3 px-6 text-left"><img src={`${imageURL}${activity.activity_thumbnail}`} style={{ height: '100px' }} alt="Thumbnail" /></td>
                      <td className="py-3 px-6 text-left">{activity.earnings || 'N/A'}</td>
                    </tr>
                  )) : <center><div className='text-center'>No activities found</div></center>}
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

export default ButtonDisplay;
