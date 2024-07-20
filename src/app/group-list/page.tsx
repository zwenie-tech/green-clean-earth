import React from 'react'
import NavigationBar from '@/components/navigationBar'
import Footer from '@/components/footer'
const groupList=()=>{
    return(
        <>
            <NavigationBar/>
            <div className='justify-center sw-full md:w-auto'>
                <h1 className='m-3 text-center text-2xl font-bold'>Group List</h1>
            </div>
            <div className='border border-black m-5 p-7 rounded-lg'>
                <p>വിദ്യാലയങ്ങൾ, തദ്ദേശസ്വയംഭരണ സ്ഥാപനങ്ങൾ, കുടുംബശ്രീ യൂണിറ്റുകൾ, സോഷ്യൽ മീഡിയ കൂട്ടായ്മകൾ, റെസിഡൻസ് അസോസിയേഷനുകൾ, സന്നദ്ധ സംഘടനകൾ, സ്ഥാപനങ്ങൾ എന്നിവയ്ക്ക് ഗ്രൂപ്പ് ആയി മത്സരത്തിൽ പങ്കെടുക്കാവുന്നതാണ്.ഇങ്ങിനെ പങ്കെടുക്കുന്ന ഗ്രൂപ്പുകൾക്ക് സ്വന്തം ഗ്രൂപ്പിൽ ഏറ്റവും മികച്ച പ്രകടനം കാഴ്ച വെക്കുന്ന മെമ്പർമാരെ തിരഞ്ഞെടുക്കാനും അവർക്ക് പ്രത്യേക സമ്മാനം നൽകാനും അവസരം ലഭിക്കുന്നതാണ്.ഓരോ മത്സരാർത്ഥിയും സ്വന്തം സ്ഥാപനത്തിന്റെ ഗ്രൂപ്പ് കോഡ് മത്സരത്തോടൊപ്പം എന്റർ ചെയ്യേണ്ടതാണ്.</p>
            </div>
            <div className='flex justify-center items-center h-full'>
                <p className='inline-block px-5 ml-5 mr-5 p-2 text-center rounded-lg bg-light-gray'>
                    ഗ്രൂപ് കോഡ് (GROUP CODE) ലഭിക്കാൻ ഇവിടെ CLICK ചെയ്യുക.
                </p>
            </div>
            <p className='ml-7 mt-4 p-3'>ഇപ്പോൾ മത്സരത്തിൽ പങ്കെടുക്കുന്ന സ്ഥാപനങ്ങളുടെ GROUP CODE ചുവടെ ചേർക്കുന്നു</p>
            <div className="flex flex-wrap p-2 md:p-4">
                  <div className="w-1/2 mb-3 md:w-1/3 p-1 md:p-2 bg-white">
                <label className="block font-bold ml-5 text-[#A09C9C] mb-1 text-sm md:text-lg ">Group Category</label>
               <select className="w-full p-1 md:p-2 border-0 text-sm md:text-lg  rounded-xl bg-white focus:border-2 focus:border-[#3C6E1F]" style={{ boxShadow: "1px 4px 5px 3px #00000040" }}>
                  <option>Select Option 1</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
                  <div className="w-1/2 mb-3 md:w-1/3 p-1 md:p-2">
                    <label className="block font-bold text-[#A09C9C] ml-5 text-sm md:text-lg  mb-1">Group Name</label>
                    <select className="w-full p-1 md:p-2 text-sm md:text-lg  border rounded-xl bg-white focus:border-2 focus:border-[#3C6E1F]" style={{ boxShadow: "1px 4px 5px 3px #00000040" }}>
                      <option>Select Option 2</option>
                      <option>Option 1</option>
                      <option>Option 2</option>
                    </select>
                  </div>
                </div>
            {/*Table..... */}
            <div className="container mx-auto p-6">
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border-gray-200 rounded-t-lg">
      <thead>
        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-left w-16 rounded-tl-lg">Sl. No</th>
          <th className="py-3 px-6 text-left">Group Name</th>
          <th className="py-3 px-6 text-left">Group Code</th>
          <th className="py-3 px-6 text-left">Upload Count</th>
          <th className="py-3 px-6 text-left rounded-tr-lg">District</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border border-gray-200 hover:bg-gray-100">
          <td className="py-3 px-6 text-left">1</td>
          <td className="py-3 px-6 text-left">110634, GOVERNMENT TECHNICAL HIGH SCHOOL, VATAKARA</td>
          <td className="py-3 px-6 text-left">110634, GOVERNMENT TECHNICAL HIGH SCHOOL, VATAKARA</td>
          <td className="py-3 px-6 text-left">5</td>
          <td className="py-3 px-6 text-left">Kozhikode</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

            <Footer/>
        </>
    )
}
export default groupList