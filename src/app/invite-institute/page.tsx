import React from 'react'
import NavigationBar from '@/components/navigationBar'
import Footer from '@/components/footer'
const invite=()=>{
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
                   Invite
                 </button>
               </div>
             </div>
             <div className='text-center'>
               <h1 className='text-xl mt-2 font-bold'>Invite Institution </h1>
             </div>
             <div className="container mx-auto p-6">
                 <div className="overflow-x-auto">
                   <table className="min-w-full bg-white border-gray-200 rounded-t-lg">
                     <thead>
                       <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                         <th className="py-3 px-6 text-left w-16 bd-2 rounded-tl-lg">Sl. No</th>
                         <th className="py-3 px-6 text-left">Group code </th>
                         <th className="py-3 px-6 text-left">Institution name</th>
                         <th className="py-3 px-6 text-left rounded-tr-lg">coordinator name</th>
                       </tr>
                     </thead>
                           <tbody>
                             <tr className="border border-gray-200 hover:bg-gray-100">
                               <td className="py-3 px-6 text-left">1</td>
                               <td className="py-3 px-6 text-left">1234</td>
                               <td className="py-3 px-6 text-left">namal</td>
                               <td className="py-3 px-6 text-left">Bathhon Pannur</td>
                             </tr>
                           </tbody>
                         </table>
                       </div>
                     </div>
            <Footer/>
        </>
        
    )
}
export default invite;