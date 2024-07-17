import Earth from '@/components/earth';
import Footer from '@/components/footer';
import NavigationBar from '@/components/navigationBar'

import React from 'react'

const participant=()=>{
    return(
        <>
        <NavigationBar/>
        <div>
            <h2 className="m-5 text-2xl font-bold text-center items-center text-[#3C6E1F]">Participants list</h2>
        </div>
                   {/*menu*/}
      <div className="flex flex-wrap p-2 md:p-4">
      <div className="w-1/2 mb-3 md:w-1/3 p-1 md:p-2 bg-white">
    <label className="block ml-5 mb-1">Country</label>
   <select className="w-full p-1 md:p-2 border-0 rounded-2xl bg-white focus:border-2 focus:border-[#3C6E1F]" style={{ boxShadow: "1px 4px 5px 3px #00000040" }}>
      <option>Select Option 1</option>
      <option>Option 1</option>
      <option>Option 2</option>
    </select>
  </div>
      <div className="w-1/2 mb-3 md:w-1/3 p-1 md:p-2">
        <label className="block ml-5 mb-1">State</label>
        <select className="w-full p-1 md:p-2 border rounded-2xl bg-white focus:border-2 focus:border-[#3C6E1F]" style={{ boxShadow: "1px 4px 5px 3px #00000040" }}>
          <option>Select Option 2</option>
          <option>Option 1</option>
          <option>Option 2</option>
        </select>
      </div>
      <div className="w-1/2 mb-3 md:w-1/3 p-1 md:p-2">
        <label className="block ml-5 mb-1">District</label>
        <select className="w-full p-1 md:p-2 border rounded-2xl bg-white focus:border-2 focus:border-[#3C6E1F]" style={{ boxShadow: "1px 4px 5px 3px #00000040" }}>
          <option>Select Option 3</option>
          <option>Option 1</option>
          <option>Option 2</option>
        </select>
      </div>
      <div className="w-1/2 mb-3 md:w-1/4 p-1 md:p-2">
        <label className="block ml-5 mb-1">corporation</label>
        <select className="w-full p-1 md:p-2 border rounded-2xl bg-white focus:border-2 focus:border-[#3C6E1F]" style={{ boxShadow: "1px 4px 5px 3px #00000040" }}>
          <option>Select Option 4</option>
          <option>Option 1</option>
          <option>Option 2</option>
        </select>
      </div>
      <div className="w-1/2 mb-3 md:w-1/4 p-1 md:p-2 bg-white">
    <label className="block ml-5 mb-1">Lsgd</label>
    <select className="w-full p-1 md:p-2 border rounded-2xl bg-white focus:border-2 focus:border-[#3C6E1F]" style={{ boxShadow: "1px 4px 5px 3px #00000040" }}>
      <option>Select Option 5</option>
      <option>Option 1</option>
      <option>Option 2</option>
    </select>
  </div>
      <div className="w-1/2 mb-3 md:w-1/4 p-1 md:p-2">
        <label className="block ml-3 mb-1">Ward No</label>
       <input
          type="text"
          className="w-full p-1 md:p-2 border rounded-2xl bg-white focus:border-2 focus:border-[#3C6E1F]"
          placeholder="Enter ward number"
          style={{ boxShadow: "1px 4px 5px 3px #00000040" }}
        />
      </div>
      <div className="w-full md:w-1/4 p-1 md:p-2 flex justify-center md:justify-start sm:items-center md:items-start">
        <button className="w-1/2 md:w-full mt-7  p-1 md:p-2 bg-[#3C6E1F] text-white rounded-2xl" style={{boxShadow: "1px 4px 5px 3px #00000040"}}>Submit</button>
      </div>
    </div>
   {/*table */} 
   <div className="container mx-auto p-6">
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border-gray-200 rounded-t-lg">
      <thead>
        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-left w-16 bd-2 rounded-tl-lg">Tree number</th>
          <th className="py-3 px-6 text-left">Planter name</th>
          <th className="py-3 px-6 text-left">Uploader name</th>
          <th className="py-3 px-6 text-left">Group code/count</th>
          <th className="py-3 px-6 text-left">Tree name/scientific name</th>
          <th className="py-3 px-6 text-left rounded-tr-lg">Image last uploaded</th>
        </tr>
      </thead>
            <tbody>
              <tr className="border border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">113683</td>
                <td className="py-3 px-6 text-left">Muhamad aizam</td>
                <td className="py-3 px-6 text-left">Wadi rahma english school</td>
                <td className="py-3 px-6 text-left">wadi eco-club kodiyathur</td>
                <td className="py-3 px-6 text-left">Jack fruit tree</td>
                <td className="py-3 px-6 text-left"><img src='/images/participants_list.jpeg' style={{ height: '100px' }} /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
        <Earth/>
        <Footer/>
        </>
    )
}
export default participant;