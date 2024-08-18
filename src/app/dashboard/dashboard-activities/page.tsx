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
}

const DashboardActivity = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const token = Cookies.get('token');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

 
    useEffect(() => {
      async function fetchfirstData(){
        const responseall = await fetch(`${apiURL}/coordinator/our-activities?limit=100000000000`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }); 
        if(responseall.status===200){
          const dataall = await responseall.json();
          setTotalPages(Math.ceil(dataall.data.length / itemsPerPage));

        }
      }
      fetchfirstData();
    }, [token]);

    const handlePageChange = (newPage: number) => {
      if (newPage > 0 && newPage <= totalPages) {
        setCurrentPage(newPage);
      }
    }
  useEffect(() => {
    if (!token) {
      // Redirect to the login page if no token is found
      router.push("/loginform");
      return;
    }

    const fetchActivities = async () => {
      try {
        const response = await fetch(`${apiURL}/coordinator/our-activities?page=${currentPage}&limit=${itemsPerPage}`, {
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
  }, [token, router,currentPage]);

  return (
    <>
      <NavigationBar />
      <div className='relative flex p-4'>
        <div className='absolute left-1/2 transform -translate-x-1/2 w-full md:w-auto mt-3'>
          <h1 className='text-xl mb-3 text-left md:text-center md:text-xl font-bold'>Dashboard</h1>
        </div>
        <div className='ml-auto'>
          <button 
            className='rounded-xl md:mr-5 text-[#FFFFFF]  p-2 mr-4' 
          >
          </button>
        </div>
      </div>
      <div className='text-center'>
        <h1 className='text-3xl mt-2 font-bold'>Our Activities</h1>
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
                <th className="py-3 px-6 text-left rounded-tr-lg">Value</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-3 px-6 text-center">Loading...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="py-3 px-6 text-center text-red-500">{error}</td>
                </tr>
              ) : activities.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-3 px-6 text-center">No activities found</td>
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
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-2 my-4">
        <button
        className={currentPage === 1 ? 
          "text-white text-sm py-2 px-4 bg-[#6b6767] rounded-xl shadow-lg" 
        : "text-white text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
        }
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-xl">{currentPage}</span>
        <button
          className={currentPage === totalPages ? 
            "text-white text-sm py-2 px-4 bg-[#6b6767] rounded-xl shadow-lg" 
          : "text-white text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
          }
          onClick={() => {
            handlePageChange(currentPage + 1) 
          }}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <Footer />
    </>
  );
}

export default DashboardActivity;
