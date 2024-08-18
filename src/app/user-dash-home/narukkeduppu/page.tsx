"use client"
import React, { useState } from 'react';
import NavigationBar from '@/components/navigationBar';
import Footer from '@/components/footer';

const Narukkeduppu = () => {
  const [treeNumberFrom, setTreeNumberFrom] = useState('');
  const [treeNumberTo, setTreeNumberTo] = useState('');
  const [randomNumber, setRandomNumber] = useState<number | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const from = parseInt(treeNumberFrom);
    const to = parseInt(treeNumberTo);

    if (!isNaN(from) && !isNaN(to) && from <= to) {
      const random = Math.floor(Math.random() * (to - from + 1)) + from;
      setRandomNumber(random);
    } else {
      alert('Please enter valid numbers with "Tree Number From" less than or equal to "Tree Number To".');
    }
  };

  return (
    <>
      <NavigationBar />
      <div className='justify-center text-center mt-5 mb-3'>
        <h1 className='text-2xl font-bold'>നറുക്കെടുപ്പ്</h1>
      </div>
      <div className='p-4 flex flex-col items-center w-2/3 md:w-1/3 border-2 mx-auto rounded-2xl border-black'>
        <div className='flex justify-center items-center mt-4 my-3'>
          <h3 className='text-center text-xl font-bold inline-block bg-light-gray pt-2 pb-2 pl-5 pr-5 rounded-xl'>
            {randomNumber !== null ? randomNumber : '345'}
          </h3>
        </div>
        <div className='flex w-full'>
          <form className='w-full m-7' onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='field1'>
                Tree Number From
              </label>
              <input
                type='text'
                id='field1'
                value={treeNumberFrom}
                onChange={(e) => setTreeNumberFrom(e.target.value)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                style={{ boxShadow: '1px 4px 4px 0px #00000040' }}
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='field2'>
                Tree Number To
              </label>
              <input
                type='text'
                id='field2'
                value={treeNumberTo}
                onChange={(e) => setTreeNumberTo(e.target.value)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                style={{ boxShadow: '1px 4px 4px 0px #00000040' }}
              />
            </div>
            <div className='flex justify-center m-4'>
              <button type='submit' className='bg-[#3C6E1F] text-white font-bold py-2 pl-6 pr-6 px-4 rounded-lg'>
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Narukkeduppu;
