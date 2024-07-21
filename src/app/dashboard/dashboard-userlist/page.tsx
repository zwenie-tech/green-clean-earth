"use client";
import React, { useEffect, useState } from 'react';
import NavigationBar from '@/components/navigationBar';
import Footer from '@/components/footer';
import { apiURL } from '@/app/requestsapi/request';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface User {
  us_id: number;
  us_name: string;
  us_mobile: string;
  us_address: string;
  created_on: string;
}

const DashboardUserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const token = Cookies.get('token');

  useEffect(() => {
    if (!token) {
      // Redirect to the login page if no token is found
      router.push("/login");
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiURL}/coordinator/members?page=1&limit=20`, {
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
        setUsers(data.Users); // Adjust this line based on your API response structure
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers();
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
            className='rounded-xl md:mr-5 text-[#FFFFFF] bg-[#3C6E1F] p-2 mr-4' 
            style={{ boxShadow: '1px 4px 5px 3px #00000040' }}
          >
            Invite New User
          </button>
        </div>
      </div>
      <div className='text-center'>
        <h1 className='text-xl mt-2 font-bold'>Users List</h1>
      </div>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : users.length === 0 ? (
            <p>No users found</p>
          ) : (
            users.map((user) => (
              <div key={user.us_id} className="flex flex-col md:flex-row items-center p-4 border border-gray-200 rounded-lg" style={{ boxShadow: '0px 4px 10px 3px #00000040' }}>
                <div className="w-full md:w-1/4">
                  <img src='/images/participants_list.jpeg' alt={`User ${user.us_id}`} className="w-full h-auto object-cover rounded-lg" />
                </div>
                <div className="w-full md:w-3/4 md:pl-4">
                  <h4 className="text-xl font-bold">{user.us_name}</h4>
                  <p>Location: {user.us_address}</p>
                  <p>Contact No.: {user.us_mobile}</p>
                  <p>Profession: {/* Add profession if available */}</p>
                  <p>City: {/* Add city if available */}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashboardUserList;
