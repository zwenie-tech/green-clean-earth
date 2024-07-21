"use client";
import React from 'react'
import NavigationBar from "@/components/navigationBar";
import Footer from '@/components/footer';
import { Button } from 'react-bootstrap';
import { FaUpload } from 'react-icons/fa';
const dashboard=()=>{
  const OurUserButton = () => {
    window.location.href = '/dashboard-userlist';
  };
  const PlantUploadsButton = () => {
    window.location.href = '/dashboaed-PlantUploads';
  };
  const ActivitiesButton= () => {
    window.location.href = '/dashboard';
  };
  const YouTubeEarningsButton= () => {
    window.location.href = '/dashboard';
  };
  const OurTeamButton = () => {
    window.location.href = '/dashboard';
  };
  const InviteUsersButton = () => {
    window.location.href = '/dashboard';
  };
  const InviteInstitutionsButton= () => {
    window.location.href = '/dashboard';
  };
    return(
        <>
            <NavigationBar/>
            <div className='relative flex items-center p-4'>
              <div className='absolute left-1/2 transform -translate-x-1/2'>
                <h1 className='text-4xl font-bold'>Dashboard</h1>
              </div>
              <div className='ml-auto'>
                <button className='rounded-xl bg-gray-200 p-2 md:mr-6' style={{boxShadow:'1px 4px 5px 3px #00000040'}}>Logout</button>
              </div>
            </div>
            <div className='text-center'>
                 <h1 className='text-xl mt-2 font-bold text-[#3C6E1F]'>Green clean institution Name</h1>
            </div>
            <div className='text-center'>
                 <h1 className='text-xl mb-6 mt-2 font-bold '>in Association with Green Clean Kerala Mission</h1>
            </div>
            {/*uploading button .......... */}
        <div className="flex justify-center items-center p-2 gap-2 md:gap-6 mb-3">
        <label className="btn btn-primary flex align-items-center bg-light-green rounded-lg"style={{width:'250px',boxShadow:'1px 4px 5px 3px #00000040'}} onClick={PlantUploadsButton}>
          <div
           style={{ width: '50px',height: '50px',backgroundColor: 'white',borderRadius: '20px',borderWidth: '1px',borderColor: '#3C6E1F',display:'flex',justifyContent: 'center',alignItems: 'center',}}
          >
          <FaUpload />
         </div>
          <div className="pt-4 p-1 text-sm md:text-xl md:p-3">Plant Uploads</div>
          <input type="submit" style={{ display: 'none' }} />
        </label>
        <label className="btn btn-primary flex align-items-center bg-light-green rounded-lg"style={{width:'250px',boxShadow:'1px 4px 5px 3px #00000040'}} onClick={ActivitiesButton}>
          <div
           style={{ width: '50px',height: '50px',backgroundColor: 'white',borderRadius: '20px',borderWidth: '1px',borderColor: '#3C6E1F',display:'flex',justifyContent: 'center',alignItems: 'center',}}
          >
          <FaUpload />
         </div>
          <div className="pt-4 p-1 text-sm md:text-xl md:p-3">Activities</div>
          <input type="submit" style={{ display: 'none' }} />
        </label>
        </div>
        {/**2..... */}
        <div className="flex justify-center items-center p-2 gap-2 md:gap-6 mb-3">
        <label className="btn btn-primary flex align-items-center bg-light-green rounded-lg"style={{width:'250px',boxShadow:'1px 4px 5px 3px #00000040'}} onClick={YouTubeEarningsButton}>
          <div
           style={{ width: '50px',height: '50px',backgroundColor: 'white',borderRadius: '20px',borderWidth: '1px',borderColor: '#3C6E1F',display:'flex',justifyContent: 'center',alignItems: 'center',}}
          >
          <FaUpload />
         </div>
          <div className="pt-4 p-1 text-sm md:text-xl md:p-3">YouTube Earnings</div>
          <input type="submit" style={{ display: 'none' }} />
        </label>
        <label className="btn btn-primary flex align-items-center bg-light-green rounded-lg"style={{width:'250px',boxShadow:'1px 4px 5px 3px #00000040'}} onClick={OurTeamButton}>
          <div
           style={{ width: '50px',height: '50px',backgroundColor: 'white',borderRadius: '20px',borderWidth: '1px',borderColor: '#3C6E1F',display:'flex',justifyContent: 'center',alignItems: 'center',}}
          >
          <FaUpload />
         </div>
          <div className="pt-4 p-1 text-sm md:text-xl md:p-3">Our Team</div>
          <input type="submit" style={{ display: 'none' }} />
        </label>
        </div>
        {/**3..... */}
        <div className="flex justify-center items-center p-2 gap-2 md:gap-6 
        mb-3">
        <label className="btn btn-primary flex align-items-center  bg-light-green rounded-lg"style={{width:'250px',boxShadow:'1px 4px 5px 3px #00000040'}} onClick={InviteUsersButton}>
          <div
           style={{ width: '50px',height: '50px',backgroundColor: 'white',borderRadius: '20px',borderWidth: '1px',borderColor: '#3C6E1F',display:'flex',justifyContent: 'center',alignItems: 'center',}}
          >
          <FaUpload />
         </div>
          <div className="pt-4 p-1 text-sm md:text-xl md:p-3">Invite Users</div>
          <input type="submit" style={{ display: 'none' }} />
        </label>
        <label className="btn btn-primary flex align-items-center  bg-light-green rounded-lg"style={{width:'250px',boxShadow:'1px 4px 5px 3px #00000040'}} onClick={InviteInstitutionsButton} >
          <div
           style={{ width: '50px',height: '50px',backgroundColor: 'white',borderRadius: '20px',borderWidth: '1px',borderColor: '#3C6E1F',display:'flex',justifyContent: 'center',alignItems: 'center',}}
          >
          <FaUpload />
         </div>
          <div className="pt-4 p-1 text-sm md:text-xl md:p-3">Invite Institutions</div>
          <input type="submit" style={{ display: 'none' }} />
        </label>
        </div>
        {/*4th */}
        <div className="flex justify-center items-center gap-5 ">
        <label className="btn btn-primary flex align-items-center bg-light-green rounded-lg"style={{width:'250px',boxShadow:'1px 4px 5px 3px #00000040'}} onClick={OurUserButton}>
          <div
           style={{ width: '50px',height: '50px',backgroundColor: 'white',borderRadius: '20px',borderWidth: '1px',borderColor: '#3C6E1F',display:'flex',justifyContent: 'center',alignItems: 'center'}}
          >
          <FaUpload />
         </div>
          <div className="pt-4 p-1 text-sm md:text-xl md:p-3">Our Users</div>
          <input type="submit" style={{ display: 'none' }} />
        </label>
        </div>
        <Footer/>
        </>
    )
}
export default dashboard;