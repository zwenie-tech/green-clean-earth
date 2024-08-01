"use client"
import React, { useEffect, useState } from 'react'
import NavigationBar from '@/components/navigationBar'
import Footer from '@/components/footer'
import { apiURL } from '../requestsapi/request';
import { useRouter } from 'next/navigation';

// Define the interface for the API response data
interface Group {
  gp_id: number;
  gp_name: string;
  co_ord_contact: string;
  dis_name: string;
  gp_code: string;
  upload_count: number;
}

interface ApiResponse {
  success: boolean;
  groupList: Group[];
}

const GroupList = () => {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await fetch(`${apiURL}/common/groupList`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify({ groupId: 572 })
      });

      const data: ApiResponse = await response.json();
      if (data.success) {
        setGroups(data.groupList);
      }
    };

    fetchGroups();
  }, []);
  const router = useRouter();

  
  return (
    <>
      <NavigationBar />
      <div className='justify-center sw-full md:w-auto'>
        <h1 className='m-3 text-center text-2xl font-bold'>Group List</h1>
      </div>
      <div className='border border-black m-5 p-7 rounded-lg'>
        <p>വിദ്യാലയങ്ങൾ, തദ്ദേശസ്വയംഭരണ സ്ഥാപനങ്ങൾ, കുടുംബശ്രീ യൂണിറ്റുകൾ, സോഷ്യൽ മീഡിയ കൂട്ടായ്മകൾ, റെസിഡൻസ് അസോസിയേഷനുകൾ, സന്നദ്ധ സംഘടനകൾ, സ്ഥാപനങ്ങൾ എന്നിവയ്ക്ക് ഗ്രൂപ്പ് ആയി മത്സരത്തിൽ പങ്കെടുക്കാവുന്നതാണ്.ഇങ്ങിനെ പങ്കെടുക്കുന്ന ഗ്രൂപ്പുകൾക്ക് സ്വന്തം ഗ്രൂപ്പിൽ ഏറ്റവും മികച്ച പ്രകടനം കാഴ്ച വെക്കുന്ന മെമ്പർമാരെ തിരഞ്ഞെടുക്കാനും അവർക്ക് പ്രത്യേക സമ്മാനം നൽകാനും അവസരം ലഭിക്കുന്നതാണ്.ഓരോ മത്സരാർത്ഥിയും സ്വന്തം സ്ഥാപനത്തിന്റെ ഗ്രൂപ്പ് കോഡ് മത്സരത്തോടൊപ്പം എന്റർ ചെയ്യേണ്ടതാണ്.</p>
      </div>
      {/* <div className='flex justify-center items-center h-full'>
        <p className='inline-block px-5 ml-5 mr-5 p-2 text-center rounded-lg bg-light-gray'>
          ഗ്രൂപ് കോഡ് (GROUP CODE) ലഭിക്കാൻ ഇവിടെ CLICK ചെയ്യുക.
        </p>
      </div> */}
      <p className='ml-7 mt-4 p-3'>ഇപ്പോൾ മത്സരത്തിൽ പങ്കെടുക്കുന്ന സ്ഥാപനങ്ങളുടെ GROUP CODE ചുവടെ ചേർക്കുന്നു</p>
      
      {/* Table */}
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
              {groups.map((group, index) => (
                <tr key={group.gp_id} className="border border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{index + 1}</td>
                  <a href={`/group-page?gname=${group.gp_name}&gid=${group.gp_id}&uc=${group.upload_count}`}><td className="py-3 px-6 text-left">{group.gp_name}</td></a>
                  <td className="py-3 px-6 text-left">{group.gp_code}</td>
                  <td className="py-3 px-6 text-left">{group.upload_count}</td>
                  <td className="py-3 px-6 text-left">{group.dis_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default GroupList
