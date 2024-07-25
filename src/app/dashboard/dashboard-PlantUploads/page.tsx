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

  if (!token) {
    // Redirect to the login page
    router.push("/login");
  }

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch(`${apiURL}/coordinator/our-uploads?page=1&limit=20`, {
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
  }, [gid,token]);

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
        <h1 className='text-xl mt-2 font-bold'>Our Plant Uploads</h1>
      </div>
      {/*buttons....*/}
      {/* <div className="flex flex-wrap p-2 md:p-4">
                  <div className="w-1/2 mb-3 md:w-1/3 p-1 md:p-2 bg-white">
                <label className="text-[#A09C9C] block font-bold ml-5 mb-1 text-sm md:text-lg ">Select Draw</label>
               <select className="w-full p-1 md:p-2 border-0 text-sm md:text-lg  rounded-xl bg-white focus:border-2 focus:border-[#3C6E1F]" style={{ boxShadow: "1px 4px 5px 3px #00000040" }}>
                  <option>Select Option 1</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
                  <div className="w-1/2 mb-3 md:w-1/3 p-1 md:p-2">
                    <label className="text-[#A09C9C] block font-bold ml-5 text-sm md:text-lg  mb-1">Group leader list</label>
                    <select className="w-full p-1 md:p-2 text-sm md:text-lg  border rounded-xl bg-white focus:border-2 focus:border-[#3C6E1F]" style={{ boxShadow: "1px 4px 5px 3px #00000040" }}>
                      <option>Select Option 2</option>
                      <option>Option 1</option>
                      <option>Option 2</option>
                    </select>
                  </div>
                  <div className="w-1/2 mb-3 md:w-1/3 p-1 md:p-2">
                    <label className="text-[#A09C9C] block font-bold ml-5 text-sm md:text-lg  mb-1">Select Page</label>
                    <select className="w-full p-1 md:p-2 border text-sm md:text-lg  rounded-xl bg-white focus:border-2 focus:border-[#3C6E1F]" style={{ boxShadow: "1px 4px 5px 3px #00000040" }}>
                      <option>Select Option 3</option>
                      <option>Option 1</option>
                      <option>Option 2</option>
                    </select>
                  </div>
                  <div className="w-1/2 mb-3 md:w-1/4 p-1 md:p-2">
                    <label className="text-[#A09C9C] block font-bold text-sm md:text-lg  ml-5 mb-1">District</label>
                    <select className="w-full p-1 md:p-2 border text-sm md:text-lg  rounded-xl bg-white focus:border-2 focus:border-[#3C6E1F]" style={{ boxShadow: "1px 4px 5px 3px #00000040" }}>
                      <option>Select Option 4</option>
                      <option>Option 1</option>
                      <option>Option 2</option>
                    </select>
                  </div>
                  <div className="w-1/2 mb-3 md:w-1/4 p-1 md:p-2 bg-white">
                <label className="text-[#A09C9C] block font-bold text-sm md:text-lg ml-5 mb-1">Assembly Constituency</label>
                <select className="w-full p-1 md:p-2 border text-sm md:text-lg  rounded-xl bg-white focus:border-2 focus:border-[#3C6E1F]" style={{ boxShadow: "1px 4px 5px 3px #00000040" }}>
                  <option>Select Option 5</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
              <div className="w-1/2  md:mt-0 mb-3 md:w-1/4 p-1  md:p-2 bg-white">
                <label className="text-[#A09C9C] block font-bold text-sm md:text-lg  ml-5 mb-1">LSGD</label>
                <select className="w-full p-1 md:p-2 border text-sm md:text-lg  rounded-xl bg-white focus:border-2 focus:border-[#3C6E1F]" style={{ boxShadow: "1px 4px 5px 3px #00000040" }}>
                  <option>Select Option 5</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
              <div className="w-full md:w-1/4 p-1 md:p-2 flex flex-col items-center md:items-start">
                 <label className="text-[#A09C9C] block text-sm font-bold md:text-lg text-sm md:text-lg  mb-1">Ward No</label>
                 <input
                   type="text"
                   className="w-1/2 md:w-full p-1 md:p-2 border rounded-xl bg-white focus:border-2 focus:border-[#3C6E1F]"
                   placeholder="Enter ward number"
                   style={{ boxShadow: "1px 4px 5px 3px #00000040" }}
                 />
                </div>
            </div>
            <div className="w-full md:p-2 flex justify-center items-center mt-2 md:mt-0">
             <button className="w-1/2 p-1 m-7 mt-2 md:p-2 bg-[#3C6E1F] text-white rounded-xl" style={{ boxShadow: "1px 4px 5px 3px #00000040" }}>
               Submit
             </button>
            </div> */}
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