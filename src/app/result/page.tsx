import React from 'react';
import NavigationBar from '@/components/navigationBar';
import Footer from '@/components/footer';
import Earth from '@/components/earth';
import ResultImages from './resultMap';
const Results = () => {
  return (
    <>
      <NavigationBar />
      <div className='flex flex-col items-center m-5'>
        <h1 className='text-2xl font-bold mb-5'>Result</h1>
        <div className='w-full flex justify-center items-center gap-4 m-5'>
          <button className='text-sm md:text-md w-1/2 md:w-1/4 bg-[#FFF6E4] pt-6 pb-5 sm:pt-3 sm:pb-3 rounded-lg' style={{boxShadow:'0px 4px 10px 3px #00000040'}}>
            Winners List
          </button>
          <button className='text-sm md:text-md w-1/2 md:w-1/4 bg-[#FFF6E4] pt-3 pb-3 rounded-lg' style={{boxShadow:'0px 4px 10px 3px #00000040'}}>
            Participant List After 01/11/2017
          </button>
        </div>
        <div className='w-full flex justify-center items-center gap-4'>
          <button className='text-sm md:text-md w-1/2 md:w-1/4 bg-[#FFF6E4] pt-3 pb-3 rounded-lg' style={{boxShadow:'0px 4px 10px 3px #00000040'}}>
          Participant List Before 31/10/2017
          </button>
          <button className='text-sm md:text-md w-1/2 md:w-1/4 bg-[#FFF6E4] pt-3 pb-3 rounded-lg' style={{boxShadow:'0px 4px 10px 3px #00000040'}}>
          Agro Art Competition - Participant List
          </button>
        </div>
        <div className='w-full md:w-1/2 border-2 border-black rounded-lg flex flex-col justify-center items-center gap-4 mt-5 p-4'>
          <p className='text-center'>ഇത് വരെ UPLOAD ചെയ്യപ്പെട്ട വൃക്ഷത്തൈ സെൽഫികളുടെ ലിസ്റ്റ് ലഭിക്കാൻ ഇവിടെ ക്ലിക് ചെയ്യുക</p>
          <button className='text-sm md:text-md w-1/2 md:w-1/4 bg-[#FFF6E4] pt-3 pb-3 rounded-lg justify-center items-center' style={{boxShadow:'0px 4px 10px 3px #00000040'}}>
            Click here &gt
          </button>
        </div>
        <ResultImages/>
        <div className='m-5'>
            <p className='text-center text-[#3C6E1F]'>
            ഹരിത പുരസ്‌കാരം വൃക്ഷത്തൈ സെൽഫി മത്സരത്തിൽ ഇത് വരെ സമ്മാനാർഹരായവരുടെ വിവരങ്ങൾ
            </p>
        </div>
        <div className='w-full md:w-1/2 rounded-lg flex flex-col justify-center items-center gap-4 mt-5 p-4' style={{boxShadow:'0px 4px 10px 3px #00000040'}}>
            <h3 className='font-bold'>നറുക്കെടുപ്പ് ഘട്ടം: Haritholsavam 21 </h3>
            <div className='w-full flex flex-col items-center gap-4'>
              <div className='w-full flex justify-between items-center gap-3 '>
                <p className='text-right w-1/2'>പേര്:</p>
                <p className='w-1/2'>Akshay k</p>
              </div>
              <div className='w-full flex justify-between items-center gap-3 '>
                <p className='text-right w-1/2'>സമ്മാനം:</p>
                <p className='w-1/2'>Fruit Plant</p>
              </div>
              <div className='w-full flex justify-between items-center gap-3 '>
                <p className='text-right w-1/2'>സ്ഥാനം:</p>
                <p className='w-1/2'>one</p>
              </div>
              <div className='w-full flex justify-between items-center gap-3 '>
                <p className='text-right w-1/2'>സ്ഥലം:</p>
                <p className='w-1/2'>Youtube Online</p>
              </div>
              <div className='w-full flex justify-between items-center gap-3 '>
                <p className='text-right w-1/2'>തിയ്യതി:</p>
                <p className='w-1/2'>21 July 2021</p>
              </div>
            </div>

        </div>

      </div>
      <Earth/>
      <Footer />
    </>
  );
}

export default Results;
