"use client";
import React, { useEffect, useState } from 'react';
import NavigationBar from '@/components/navigationBar';
import Footer from '@/components/footer';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { apiURL, imageURL } from '@/app/requestsapi/request';

interface Activity {
  personal_activity_id: number;
  participant_name: string;
  activity_category: string;
  activity_likes: string;
  activity_views: string;
  activity_value: string;
  participant_address: string;
  activity_title: string;
  activity_thumbnail: string;
  gp_name: string;
  earnings: number;
}

const DashboardActivity = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const token = Cookies.get('token');

  useEffect(() => {
    if (!token) {
      // Redirect to the login page if no token is found
      router.push("/loginform");
      return;
    }

    const fetchActivities = async () => {
      try {
        const response = await fetch(`${apiURL}/coordinator/our-earning`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setActivities(data.data); // Adjust this line based on your API response structure
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch activities');
        setLoading(false);
      }
    };

    fetchActivities();
  }, [token, router]);

  return (
    <>
      <NavigationBar />
      <div className='relative flex p-4'>
        <div className='absolute left-1/2 transform -translate-x-1/2 w-full md:w-auto'>
          <h1 className='text-2xl m-3 text-left md:text-center md:text-4xl font-bold'>Dashboard</h1>
        </div>
        <div className='ml-auto'>
          <button 
            className='rounded-xl md:mr-5 text-[#FFFFFF] p-2 mr-4' 
          >
          </button>
        </div>
      </div>
      <div className='text-center'>
        <h1 className='text-xl mt-2 font-bold'>Youtube earnings</h1>
      </div>
      {/* Table */}
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
                <th className="py-3 px-6 text-left">Value</th>
                <th className="py-3 px-6 text-left rounded-tr-lg">Earnings</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-3 px-6 text-center">Loading...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={8} className="py-3 px-6 text-center text-red-500">{error}</td>
                </tr>
              ) : activities.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-3 px-6 text-center">No activities found</td>
                </tr>
              ) : (
                activities.map((activity, index) => (
                  <tr key={activity.personal_activity_id} className="border border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{index + 1}</td>
                    <td className="py-3 px-6 text-left">{activity.activity_likes} Likes & {activity.activity_views} Views</td>
                    <td className="py-3 px-6 text-left">{activity.activity_category}</td>
                    <td className="py-3 px-6 text-left">{activity.participant_name}</td>
                    <td className="py-3 px-6 text-left"><img src={`${imageURL}${activity.activity_thumbnail}`} alt="Thumbnail" style={{ height: '100px' }} /></td>
                    <td className="py-3 px-6 text-left">{activity.activity_value}</td>
                    <td className="py-3 px-6 text-left">{activity.earnings}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DashboardActivity;
