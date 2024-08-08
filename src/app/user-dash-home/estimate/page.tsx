"use client"
import React, { useState } from 'react';
import NavigationBar from '@/components/navigationBar';
import Footer from '@/components/footer';
import { apiURL } from '@/app/requestsapi/request';
import { useToast } from '@/components/ui/use-toast';
import Cookies from 'js-cookie';

const Estimate = () => {
  const { toast } = useToast();
  const token = Cookies.get('token');


  const [formData, setFormData] = useState({
    Q1: '',
    Q2: '',
    Q3: '',
    Q4: '',
    Q5: '',
    Q6: '',
    Q7: '',
    Q8: '',
    Q9: '',
    Q10: '',
    Q11: '',
    Q12: '',
    Q13: '',
    Q14: '',
    Q15: '',
    treeNumber: ''
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const data = {
      treeNumber : parseInt(formData.treeNumber),
      q1         : parseInt(formData.Q1),
      q2         : parseInt(formData.Q2),
      q3         : formData.Q3,
      q4         : parseInt(formData.Q4),
      q5         : formData.Q5,
      q6         : parseInt(formData.Q6),
      q7         : parseInt(formData.Q7),
      q8         : formData.Q8,
      q9         : parseInt(formData.Q9),
      q10        : formData.Q10,
      q11        : parseInt(formData.Q11),
      q12        : formData.Q12,
      q13        : parseInt(formData.Q13),
      q14        : formData.Q14,
      q15        : parseInt(formData.Q15),

    }

    try {
      const response = await fetch(`${apiURL}/user/saveEstimate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,

        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      

      if (result.success) {
        toast({
          title: "Form Submitted Successfully.",
          description: "Thank you for your submition.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops, Something went wrong!",
        description: "Please try again...",
      });
      console.error("Error:", error);
    }
  };

  return (
    <>
      <NavigationBar />
      <div className='justify-center text-center m-5'>
        <h1 className='text-2xl font-bold'>Green Clean Estimate</h1>
      </div>
      <div className='flex justify-center items-center m-4 my-7'>
        <p className='bg-light-green pt-7 pb-7 pl-5 pr-5 rounded-xl'>
          സുഹൃത്തേ, നമ്മുടെ നാട് സമ്പൂർണ്ണ മാലിന്യ മുക്തവും ഹരിതാഭവും ആവണമെങ്കിൽ ഓരോ വീടും സ്ഥാപനങ്ങളും മാലിന്യ മുക്തവും ഹരിതാഭവും ആകേണ്ടതുണ്ട്. ഓരോരുത്തരും സ്വന്തം പുരയിടത്തിൽ പോയി പരിശോധിച്ചതിനു ശേഷം താഴെ കൊടുത്തിരിക്കുന്ന ഗ്രീൻ ക്ലീൻ എസ്റ്റിമേറ്റ് തയ്യാറാക്കുക. വൃക്ഷത്തെ പരിപാലനത്തിന്റെ ഭാഗമായുള്ള പ്രത്യേക നറുക്കെടുപ്പുകളിലൂടെ തിരഞ്ഞെടുക്കപ്പെടുകയാണെങ്കിൽ താങ്കളുടെ ഗ്രീൻ എസ്റ്റിമേറ്റ് പ്രകാരമുള്ള പ്രവർത്തികൾ നടപ്പിലാക്കാൻ ഉള്ള സാമഗ്രികൾ പൂർണ്ണമായോ ഭാഗികമായോ സമ്മാനമായി നൽകുന്നതാണ്.
        </p>
      </div>
      <div className='justify-center text-center m-3'>
        <h1 className='text-xl font-bold'>ചോദ്യങ്ങൾ</h1>
      </div>
      <form className='m-9' onSubmit={handleSubmit}>
        {/*1 st question */}
        <h2 className='text-xl font-bold'>1.⁠⁠വൃക്ഷങ്ങൾ വളർത്തൽ</h2>
        <hr className='w-full border-t-2 border-black my-4'></hr>
        <div className='flex mt-3 justify-between items-center'>
          <label className="w-2/3">Q1. താങ്കളുടെ പുരയിടത്തിൽ ഇനി എത്ര വൃക്ഷത്തൈകൾ നടാൻ കഴിയും ?</label>
          <div className="w-1/2">
            <input
              type='number'
              name='Q1'
              placeholder='Answer'
              required
              value={formData.Q1}
              onChange={handleChange}
              className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              style={{ boxShadow: '1px 4px 4px 0px #00000040' }}
            />
          </div>
        </div>
        <div className='flex mt-3 justify-between items-center'>
          <label className="w-2/3">Q2. അതിൽ എത്ര തൈകൾ ഈ വർഷം നാട്ടു വളർത്താൻ ഉദ്ദേശിക്കുന്നുണ്ട് ?</label>
          <div className="w-1/2">
            <input
              type='number'
              name='Q2'
              placeholder='Answer'
              required
              value={formData.Q2}
              onChange={handleChange}
              className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              style={{ boxShadow: '1px 4px 4px 0px #00000040' }}
            />
          </div>
        </div>
        <div className='flex mt-3 justify-between items-center'>
          <label className="w-2/3">Q3. ഏതൊക്കെ വൃക്ഷങ്ങൾ ?</label>
          <div className="w-1/2">
            <input
              type='text'
              name='Q3'
              placeholder='Answer'
              required
              value={formData.Q3}
              onChange={handleChange}
              className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              style={{ boxShadow: '1px 4px 4px 0px #00000040' }}
            />
          </div>
        </div>
        <div className='flex mt-3 justify-between items-center'>
          <label className="w-2/3">Q4. അതിനു ചെലവാകുന്ന തുക ?</label>
          <div className="w-1/2">
            <input
              type='number'
              name='Q4'
              placeholder='Answer'
              required
              value={formData.Q4}
              onChange={handleChange}
              className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              style={{ boxShadow: '1px 4px 4px 0px #00000040' }}
            />
          </div>
        </div>
        {/*2nd question */}
        <h2 className='text-xl mt-9 font-bold'>2.⁠⁠കൃഷി</h2>
        <hr className='w-full border-t-2 border-black my-4'></hr>
        <div className='flex mt-3 justify-between items-center'>
          <label className="w-2/3">Q1. താങ്കളുടെ പുരയിടത്തിൽ കൃഷി ചെയ്യാൻ അനുയോജ്യമായ സ്ഥലം ഉണ്ടോ ?</label>
          <div className="w-1/2">
            <input
              type='text'
              name='Q5'
              placeholder='Answer'
              required
              value={formData.Q5}
              onChange={handleChange}
              className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              style={{ boxShadow: '1px 4px 4px 0px #00000040' }}
            />
          </div>
        </div>
        <div className='flex mt-3 justify-between items-center'>
          <label className="w-2/3">Q2. അതിൽ എത്ര തൈകൾ ഈ വർഷം നാട്ടു വളർത്താൻ ഉദ്ദേശിക്കുന്നുണ്ട് ?</label>
          <div className="w-1/2">
            <input
              type='number'
              name='Q6'
              placeholder='Answer'
              required
              value={formData.Q6}
              onChange={handleChange}
              className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              style={{ boxShadow: '1px 4px 4px 0px #00000040' }}
            />
          </div>
        </div>
        <div className='flex mt-3 justify-between items-center'>
          <label className="w-2/3">Q3. അതിനു ചെലവാകുന്ന തുക ?</label>
          <div className="w-1/2">
            <input
              type='number'
              name='Q7'
              placeholder='Answer'
              required
              value={formData.Q7}
              onChange={handleChange}
              className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              style={{ boxShadow: '1px 4px 4px 0px #00000040' }}
            />
          </div>
        </div>
        {/*3rd question */}
        <h2 className='text-xl mt-9 font-bold'>3.⁠പൂന്തോട്ട നിർമ്മാണം</h2>
        <hr className='w-full border-t-2 border-black my-4'></hr>
        <div className='flex mt-3 justify-between items-center'>
          <label className="w-2/3">Q1. താങ്കളുടെ പുരയിടത്തിൽ പൂന്തോട്ടം നിർമ്മിക്കാൻ അനുയോജ്യമായ സ്ഥലം ഉണ്ടോ ?</label>
          <div className="w-1/2">
            <input
              type='text'
              name='Q8'
              placeholder='Answer'
              required
              value={formData.Q8}
              onChange={handleChange}
              className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              style={{ boxShadow: '1px 4px 4px 0px #00000040' }}
            />
          </div>
        </div>
        <div className='flex mt-3 justify-between items-center'>
          <label className="w-2/3">Q2. അതിനു ചെലവാകുന്ന തുക ?</label>
          <div className="w-1/2">
            <input
              type='number'
              name='Q9'
              placeholder='Answer'
              required
              value={formData.Q9}
              onChange={handleChange}
              className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              style={{ boxShadow: '1px 4px 4px 0px #00000040' }}
            />
          </div>
        </div>
        {/*4th question */}
        <h2 className='text-xl mt-9 font-bold'>4.⁠⁠മാലിന്യ സംസ്കരണം</h2>
          <hr className='w-full border-t-2 border-black my-4'></hr>
          <div className='flex mt-6 justify-between items-center'>
            <label className="w-2/3">Q1. മാലിന്യ സംസ്കരണത്തിന് താങ്കളുടെ വീട്ടിൽ താഴെ പറയുന്നവയിൽ ഏതൊക്കെ പദ്ധതികൾ ഇനി ഏർപ്പെടുത്താൻ ഉണ്ട് ? (ഓപ്ഷൻ നെയിം എഴുതുക)</label>
            <div className="w-1/2">
            <input
              type='text'
              name='Q10'
              placeholder='Answer'
              required
              value={formData.Q10}
              onChange={handleChange}
              className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              style={{ boxShadow: '1px 4px 4px 0px #00000040' }}
            />
         </div>   
          </div>
          <div className='m-2'>
            <p>A. ജൈവ മാലിന്യ സംസ്കരണം</p>
            <p>B.പ്ലാസ്റ്റിക് മാലിന്യ സംഭരണി </p>
            <p>C. ഇ-വെയ്റ്റ് സംഭരണി</p>
          </div>
         
          <div className='flex mt-6 justify-between items-center'>
            <label className="w-2/3">Q2. അതിനു ചെലവാകുന്ന തുക ?</label>
            <div className="w-1/2">
            <input
              type='number'
              name='Q11'
              placeholder='Answer'
              required
              value={formData.Q11}
              onChange={handleChange}
              className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              style={{ boxShadow: '1px 4px 4px 0px #00000040' }}
            />
         </div>   
          </div>
        
        {/*5th question */}
        <h2 className='text-xl mt-9 font-bold'>5. ⁠ജല സംരക്ഷണം</h2>
          <hr className='w-full border-t-2 border-black my-4'></hr>
          <div className='flex mt-6 justify-between items-center'>
            <label className="w-2/3">Q1. ജല സംരക്ഷണത്തിന് താങ്കളുടെ വീട്ടിൽ താഴെ പറയുന്നവയിൽ ഏതൊക്കെ പദ്ധതികൾ ഇനി ഏർപ്പെടുത്താൻ ഉണ്ട് ?</label>
            <div className="w-1/2">
            <input
              type='text'
              name='Q12'
              placeholder='Answer'
              required
              value={formData.Q12}
              onChange={handleChange}
              className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              style={{ boxShadow: '1px 4px 4px 0px #00000040' }}
            />
         </div>   
          </div>
          <div className='m-2'>
            <p>A. മഴക്കുഴി</p>
            <p>B. കിണർ റീചാർജിങ് </p>
            <p>C. മഴവെള്ള സംഭരണി</p>
          </div>
         
          <div className='flex mt-6 justify-between items-center'>
            <label className="w-2/3">Q2. അതിനു ചെലവാകുന്ന തുക ?</label>
            <div className="w-1/2">
            <input
              type='number'
              name='Q13'
              placeholder='Answer'
              required
              value={formData.Q13}
              onChange={handleChange}
              className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              style={{ boxShadow: '1px 4px 4px 0px #00000040' }}
            />
         </div>   
          </div>
        {/*7th question */}
        <h2 className='text-xl mt-9 font-bold'>6.⁠⁠ഊർജ്ജ സംരക്ഷണം</h2>
          <hr className='w-full border-t-2 border-black my-4'></hr>
          <div className='flex mt-6 justify-between items-center'>
            <label className="w-2/3">Q1. ഊർജ്ജ സംരക്ഷണത്തിന് താങ്കളുടെ വീട്ടിൽ താഴെ പറയുന്നവയിൽ ഏതൊക്കെ പദ്ധതികൾ ഇനി ഏർപ്പെടുത്താൻ ഉണ്ട് ?</label>
            <div className="w-1/2">
            <input
              type='text'
              name='Q14'
              placeholder='Answer'
              required
              value={formData.Q14}
              onChange={handleChange}
              className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              style={{ boxShadow: '1px 4px 4px 0px #00000040' }}
            />
         </div>   
          </div>
          <div className='m-2'>
            <p>A. സോളാർ സംവിധാനം ഏർപ്പെടുത്തൽ</p>
            <p>B. എൽ ഇ ഡി ബൾബ് വാങ്ങൽ</p>
          </div>
          <div className='flex mt-6 justify-between items-center'>
            <label className="w-2/3">Q2. അതിനു ചെലവാകുന്ന തുക ?</label>
            <div className="w-1/2">
            <input
              type='number'
              name='Q15'
              placeholder='Answer'
              required
              value={formData.Q15}
              onChange={handleChange}
              className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              style={{ boxShadow: '1px 4px 4px 0px #00000040' }}
            />
         </div>   
          </div>



          {/*center input box*/}

          <div className='flex flex-col w-full mt-6 justify-center items-center'>
             <label className="text-center mb-4">താങ്കളുടെ Tree Number ഇവിടെ എന്റർ ചെയ്യുക</label>
             <div className="w-1/2 mb-4">
             <input
              type='text'
              name='treeNumber'
              placeholder='Answer'
              required
              value={formData.treeNumber}
              onChange={handleChange}
              className='shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              style={{ boxShadow: '1px 4px 4px 0px #00000040' }}
            />
             </div>
             </div>
             <div className='flex flex-col w-full mt-2 justify-center items-center'>
               <button
                 className='w-1/3 mt-6 bg-[#3C6E1F] pt-3 pb-3 text-white rounded-xl'
                 style={{ boxShadow: '1px 4px 4px 0px #00000040' }}
               >
                 Submit
               </button>
            </div>
      </form>
      <Footer />
    </>
  );
};

export default Estimate;
