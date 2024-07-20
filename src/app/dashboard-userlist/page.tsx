import React from 'react';
import NavigationBar from '@/components/navigationBar';
import Footer from '@/components/footer';

const DashboardUserList = () => {
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

      {/*list part */}
      <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3,4,5].map((index) => (
          <div key={index} className="flex flex-col md:flex-row items-center p-4 border border-gray-200 rounded-lg" style={{boxShadow:'0px 4px 10px 3px #00000040'}}>
            <div className="w-full md:w-1/4">
              <img src='/images/participants_list.jpeg' alt={`Placeholder ${index}`} className="w-full h-auto object-cover rounded-lg" />
            </div>
            <div className="w-full md:w-3/4 md:pl-4">
              <h4 className="text-xl font-bold">Megha prakash {index}</h4>
              <p>Location:</p>
              <p>Contact No.:</p>
              <p>Profession:</p>
              <p>City:</p>
            </div>
          </div>
        ))}
      </div>
    </div>
      <Footer />
    </>
  );
};

export default DashboardUserList;
