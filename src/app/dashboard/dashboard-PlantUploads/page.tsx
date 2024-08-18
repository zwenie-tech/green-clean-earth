"use client";
import React, { Suspense, useEffect, useState } from 'react';
import NavigationBar from '@/components/navigationBar';
import Footer from '@/components/footer';
import { apiURL, imageURL } from '@/app/requestsapi/request';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

interface PlantUpload {
  up_id: number | null;
  up_planter: string | null;
  up_name: string | null;
  up_file: string | null;
  up_date: string | null;
  up_file_2: string | null;
  up_file_2_time: string | null;
  up_file_3: string | null;
  up_file_3_time: string | null;
  up_file_4: string | null;
  up_file_4_time: string | null;
}

const PlantuploadContent = () => {
  const [uploads, setUploads] = useState<PlantUpload[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const gid = searchParams.get("gid");
  const token = Cookies.get('token');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

 
    useEffect(() => {
      async function fetchfirstData(){
        const responseall = await fetch(`${apiURL}/coordinator/our-uploads?limit=100000000000`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ groupid: gid })
        }); 
        const dataall = await responseall.json();
        console.log('length', dataall.data.length);
        setTotalPages(Math.ceil(dataall.data.length / itemsPerPage));
      }
      fetchfirstData();
    }, [token,gid]);

    const handlePageChange = (newPage: number) => {
      if (newPage > 0 && newPage <= totalPages) {
        console.log('working')
        setCurrentPage(newPage);
      }
    }
  if (!token) {
    // Redirect to the login page
    router.push("/login");
  }

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch(`${apiURL}/coordinator/our-uploads?page=${currentPage}&limit=${itemsPerPage}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ groupid: gid })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const apidata = await response.json();
        setUploads(apidata.data); // Adjust this line based on your API response structure
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch uploads');
        setLoading(false);
      }
    };

    fetchUploads();
  }, [gid,token,currentPage]);

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
            // style={{ boxShadow: '1px 4px 5px 3px #00000040' }}
          >
            
          </button>
        </div>
      </div>
      <div className='text-center'>
        <h1 className='text-3xl mt-2 font-bold'>Our Plant Uploads</h1>
      </div>
      <div className="container mx-auto p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-gray-200 rounded-t-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left w-16 bd-2 rounded-tl-lg">Tree #</th>
                <th className="py-3 px-6 text-left">Planter</th>
                <th className="py-3 px-6 text-left">Uploader</th>
                <th className="py-3 px-6 text-left">Image 1</th>
                <th className="py-3 px-6 text-left">Image 2</th>
                <th className="py-3 px-6 text-left">Image 3</th>
                <th className="py-3 px-6 text-left rounded-tr-lg">Image 4</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-3">Loading...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="text-center py-3 text-red-500">{error}</td>
                </tr>
              ) : uploads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-3">No uploads found</td>
                </tr>
              ) : (
                uploads.map((upload) => (
                  <tr key={upload.up_id || 0} className="border border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{upload.up_id}</td>
                    <td className="py-3 px-6 text-left">{upload.up_planter}</td>
                    <td className="py-3 px-6 text-left">{upload.up_name}</td>

                    <td className="py-3 px-6 text-left">
                      {upload.up_file ? (
                        <img src={`${imageURL}${upload.up_file}`} alt="Upload" style={{ height: '100px' }} />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {upload.up_file_2 ? (
                        <img src={`${imageURL}${upload.up_file_2}`} alt="Upload" style={{ height: '100px' }} />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {upload.up_file_3 ? (
                        <img src={`${imageURL}${upload.up_file_3}`} alt="Upload" style={{ height: '100px' }} />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {upload.up_file_4 ? (
                        <img src={`${imageURL}${upload.up_file_4}`} alt="Upload" style={{ height: '100px' }} />
                      ) : (
                        "No Image"
                      )}
                    </td>
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
};


export default function Plantupload() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlantuploadContent />
    </Suspense>
  );
}