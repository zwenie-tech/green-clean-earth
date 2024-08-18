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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

 
    useEffect(() => {
      async function fetchfirstData(){
        const responseall = await fetch(`${apiURL}/coordinator/members?limit=100000000000`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }); 
        if(responseall.status===200){
          const dataall = await responseall.json();
          console.log('length', dataall.Users.length);
          setTotalPages(Math.ceil(dataall.Users.length / itemsPerPage));
        }
      }
      fetchfirstData();
    }, [token]);

    const handlePageChange = (newPage: number) => {
      if (newPage > 0 && newPage <= totalPages) {
        console.log('working')
        setCurrentPage(newPage);
      }
    }
  useEffect(() => {
    if (!token) {
      // Redirect to the login page if no token is found
      router.push("/login");
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiURL}/coordinator/members?page=${currentPage}&limit=${itemsPerPage}`, {
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
  }, [token, router,currentPage]);

  return (
    <>
      <NavigationBar />
      <div className='relative flex p-4'>
        <div className='absolute left-1/2 transform -translate-x-1/2 w-full md:w-auto mt-3 mb-3'>
          <h1 className='text-xl text-left md:text-center md:text-xl font-bold'>Dashboard</h1>
        </div>
        <div className='ml-auto'>
          <button 
            className='rounded-xl md:mr-5 text-[#FFFFFF]  p-2 mr-4' 
          >
            
          </button>
        </div>
      </div>
      <div className='text-center'>
        <h1 className='text-3xl mt-2 font-bold'>Users List</h1>
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
{/*                 <div className="w-full md:w-1/4">
                  <img src='/images/participants_list.jpeg' alt={`User ${user.us_id}`} className="w-full h-auto object-cover rounded-lg" />
                </div> */}
                <div className="w-full md:w-3/4 md:pl-4">
                  <h4 className="text-xl font-bold">{user.us_name}</h4>
                  <p>Location: {user.us_address}</p>
                  <p>Contact No.: {user.us_mobile}</p>
                </div>
              </div>
            ))
          )}
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
};

export default DashboardUserList;
