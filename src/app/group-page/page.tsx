"use client";
import NavigationBar from '@/components/navigationBar';
import Footer from '@/components/footer';
import React, { useState } from 'react';

const ButtonDisplay = () => {
  const [activeButton, setActiveButton] = useState<'upload' | 'activity'>('upload');

  const showFirstMessage = () => {
    setActiveButton('upload');
  };

  const showSecondMessage = () => {
    setActiveButton('activity');
  };

  return (
    <div>
      <NavigationBar/>
      <div className='w-full flex flex-col items-center gap-4'>
              <div className='w-full flex justify-between items-center gap-3 '>
                <p className='text-right font-bold w-1/2'>Group Name:</p>
                <p className='w-1/2 font-bold'>aaaa</p>
              </div>
              <div className='w-full flex justify-between items-center gap-3 '>
                <p className='text-right font-bold w-1/2'>Code:</p>
                <p className='w-1/2 font-bold'>aaaa</p>
              </div>
              <div className='w-full flex justify-between items-center gap-3 '>
                <p className='text-right font-bold w-1/2'>Kozhikode:</p>
                <p className='w-1/2 font-bold'>aaaa</p>
              </div>
              <div className='w-full flex justify-between items-center gap-3 '>
                <p className='text-right font-bold w-1/2'>Total Upload:</p>
                <p className='w-1/2 font-bold'>123</p>
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
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="flex flex-col items-center p-4 border border-gray-200 rounded-lg" style={{boxShadow: '0px 4px 10px 3px #00000040'}}>
                  <div className="w-full">
                    <img src='/images/participants_list.jpeg' alt={`Placeholder ${index}`} className="w-full h-auto object-cover rounded-lg" style={{height: '250px'}}/>
                  </div>
                  <div className="w-full pt-3 md:pl-4">
                    <p>Plant name:</p>
                    <p>Uploaded No.:</p>
                  </div>
                </div>
              ))}
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
                  <tr className="border border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">1</td>
                    <td className="py-3 px-6 text-left">2000 Likes & 1125 Views</td>
                    <td className="py-3 px-6 text-left">Poster Contest</td>
                    <td className="py-3 px-6 text-left">Bathhon Pannur</td>
                    <td className="py-3 px-6 text-left">Green poster</td>
                    <td className="py-3 px-6 text-left"><img src='/images/participants_list.jpeg' style={{ height: '100px' }} /></td>
                    <td className="py-3 px-6 text-left">3125</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      
      <Footer/>
    </div>
  );
};

export default ButtonDisplay;
