"use client"
import React, { useEffect, useState } from 'react';
import NavigationBar from '@/components/navigationBar';
import Footer from '@/components/footer';
import Image from 'next/image';
import { apiURL } from '../requestsapi/request';

interface District {
  dis_name: string;
  upload_count: number;
}
interface ApiResponse {
  districtList: District[];
  success: boolean;
}

const DistrictPage = () => {
  const [districts, setDistricts] = useState<District[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiURL}/common/districtList`);
        const data: ApiResponse = await response.json();
        if (data.success) {
          console.log(data.districtList);
          setDistricts(data.districtList);
        } else {
          console.error('Failed to fetch district data');
        }
      } catch (error) {
        console.error('Error fetching district data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <NavigationBar />
      <div className='justify-center sw-full md:w-auto'>
        <h1 className='m-3 text-center text-2xl font-bold'>District List</h1>
      </div>
      <div className="w-3/4 mx-auto flex justify-center items-center p-7">
        <p className="text-center">
          വിദ്യാലയങ്ങൾ, തദ്ദേശസ്വയംഭരണ സ്ഥാപനങ്ങൾ, കുടുംബശ്രി യൂണിറ്റുകൾ, സോഷ്യൽ മിഡിയ കൂട്ടായ്മകൾ, റെസിഡൻസ് അസോസിയേഷനുകൾ, സന്നദ്ധ സംഘടനകൾ, സ്ഥാപനങ്ങൾ എന്നിവയ്ക്ക് ഗ്രൂപ്പ് ആയി മത്സരത്തിൽ പങ്കെടുക്കാവുന്നതാണ്.
          ഇങ്ങിനെ പങ്കെടുക്കുന്ന ഗ്രൂപ്പുകൾക്ക് സ്വന്തം ഗ്രൂപ്പിൽ ഏറ്റവും മികച്ച പ്രകടനം കാഴ്ച വെക്കുന്ന മെമ്പർമാരെ തിരഞ്ഞെടുക്കാനും അവർക്ക് പ്രത്യേക സമ്മാനം നൽകാനും അവസരം ലഭിക്കുന്നതാണ്.
        </p>
      </div>
      <div className="container mx-auto p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-gray-200 rounded-t-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left rounded-tl-lg">Sl. No</th>
                <th className="py-3 px-6 text-left">District Name</th>
                <th className="py-3 px-6 text-left rounded-tr-lg">Upload Count</th>
              </tr>
            </thead>
            <tbody>
              {districts.map((district, index) => (
                <tr key={index} className="border border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{index + 1}</td>
                  <td className="py-3 px-6 text-left"><a href={`/district/district-page?i=${index+1}&n=${district.dis_name}&u=${district.upload_count}`}>{district.dis_name}</a></td>
                  <td className="py-3 px-6 text-left">{district.upload_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mx-2 gap-2">
        <div className="items-center rounded-xl md:h-64">
          <img
            src="/images/joinnow1.jpeg"
            alt="Description of image"
            className="w-full h-full object-center rounded-xl"
          />
        </div>
        <div className="items-center bg-[#3C6E1F] rounded-xl md:h-64">
          <h1 className='text-center text-white mt-5 p-4'>Green Clean Earth Movement</h1>
          <p className='text-white text-center p-4'>
            ഭൂമിയെ ഹരിതാഭമാക്കാനും, മാലിന്യ മുക്തമാക്കാനും ജനങ്ങളെ പ്രേരിപ്പിക്കാൻ വിവിധ സ്ഥാപങ്ങളുടെയും,സംഘടനകളുടെയും സഹകരണത്തോടെ GCEM Foundation ആവിഷ്‌കരിച്ച് നടപ്പിൽ വരുത്തുന്ന ഒരു ബഹുജനമുന്നേറ്റമാണ് Green Clean Earth Movement(GCEM).
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DistrictPage;
