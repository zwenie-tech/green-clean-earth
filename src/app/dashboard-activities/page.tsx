import React from 'react'
import NavigationBar from '@/components/navigationBar'
import Footer from '@/components/footer'
const dashboardActivity=()=>{
    return(
        <>
            <NavigationBar/>
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
               <h1 className='text-xl mt-2 font-bold'>Our Activities</h1>
             </div>
             {/*selection menu */}
            <div className="flex flex-wrap p-2 md:p-4">
            <div className="w-1/2 mb-3 md:w-1/4 p-1 md:p-2 bg-white">
                <label className="text-[#A09C9C] block font-bold ml-5 mb-1">Category</label>
                <select className="w-full p-1 md:p-2 border text-sm md:text-lg  rounded-xl bg-white focus:border-2 focus:border-[#3C6E1F]" style={{ boxShadow: "1px 4px 5px 3px #00000040" }}>
                  <option>Select Option 1</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
              <div className="w-1/2  md:mt-0 mb-3 md:w-1/4 p-1  md:p-2 bg-white">
                <label className="text-[#A09C9C] block font-bold  ml-5 mb-1">Sub Category</label>
                <select className="w-full p-1 md:p-2 border text-sm md:text-lg  rounded-xl bg-white focus:border-2 focus:border-[#3C6E1F]" style={{ boxShadow: "1px 4px 5px 3px #00000040" }}>
                  <option>Select Option 2</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
              <div className="w-full md:w-1/4 p-1 md:p-2 flex flex-col items-center md:items-start">
                 <label className="text-[#A09C9C] block  font-bold md:text-lg  mb-1">Club</label>
                 <select className="w-1/2 md:w-full p-1 md:p-2 border text-sm md:text-lg  rounded-xl bg-white focus:border-2 focus:border-[#3C6E1F]" style={{ boxShadow: "1px 4px 5px 3px #00000040" }}>
                  <option>Select Option 2</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
                </div>
                <div className="w-full md:w-1/4 p-1 md:p-2 flex justify-center md:justify-start sm:items-center md:items-start">
                     <button className="w-1/2 md:w-full mt-7  p-1 md:p-2 bg-[#3C6E1F] text-white rounded-2xl" style={{boxShadow: "1px 4px 5px 3px #00000040"}}>Submit</button>
                </div>
            </div>
            {/**Table.... */}
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
            <Footer/>

        </>
    )
}
export default dashboardActivity;