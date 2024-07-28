"use client"
import React, { useEffect, useState } from 'react';
import NavigationBar from '@/components/navigationBar';
import Footer from '@/components/footer';
import Cookies from "js-cookie";
import { apiURL } from '@/app/requestsapi/request';

interface Invite {
  gp_id: number;
  gp_name: string;
}

const UserInvite: React.FC = () => {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const token = Cookies.get('token');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiURL}/user/my-invites`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const result = await response.json();
        if (result.success) {
          setInvites(result.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return (
    <>
      <NavigationBar />
      <div className='relative flex p-4'>
        <div className='absolute left-1/2 transform -translate-x-1/2 w-full md:w-auto'>
          <h1 className='text-2xl m-3 text-left md:text-center md:text-4xl font-bold'>Dashboard</h1>
        </div>
        <div className='ml-auto'>
          
          <button
            className='rounded-xl md:mr-5 text-[#FFFFFF] bg-[#3C6E1F] p-2 mr-4'
            style={{ boxShadow: '1px 4px 5px 3px #00000040' }}
          >
            Invite
          </button>
        </div>
      </div>
      <div className='text-center'>
        <h1 className='text-xl mt-2 font-bold'>Invite Friends</h1>
      </div>
      <div className="container mx-auto p-6">
        <div className="overflow-x-auto">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="min-w-full bg-white border-gray-200 rounded-t-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left w-16 bd-2 rounded-tl-lg">Sl. No</th>
                  <th className="py-3 px-6 text-left">Group code</th>
                  <th className="py-3 px-6 text-left">Institution name</th>
                  {/* <th className="py-3 px-6 text-left rounded-tr-lg">Coordinator name</th> */}
                </tr>
              </thead>
              <tbody>
                {invites ? invites.map((invite, index) => (
                  <tr key={invite.gp_id} className="border border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{index + 1}</td>
                    <td className="py-3 px-6 text-left">{invite.gp_id}</td>
                    <td className="py-3 px-6 text-left">{invite.gp_name}</td>
                    {/* <td className="py-3 px-6 text-left">Bathhon Pannur</td> Replace with actual data if available */}
                  </tr>
                )): <div>No data found</div>}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserInvite;
