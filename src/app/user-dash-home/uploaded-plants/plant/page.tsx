'use client';

import Footer from '@/components/footer';
import GceBadge from '@/components/gceBadge';
import NavigationBar from '@/components/navigationBar';
import PageTitle from '@/components/sm/pageTitle';
import { DialogEditPlant } from './dialog_edit_plant';
import { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { apiURL, imageURL } from '@/app/requestsapi/request';
import Image from 'next/image';

type PlantData = {
  up_id: number;
  up_name: string;
  up_planter: string;
  up_tree_name: string;
  up_cord_id: number;
  up_date: string;
  up_file: string;
  up_file_2: string | null;
  up_file_2_time: string | null;
  up_file_3: string | null;
  up_file_3_time: string | null;
  up_file_4: string | null;
  up_file_4_time: string | null;
  up_country_id: string | null;
  cntry_name: string | null;
  up_state_id: string | null;
  st_name: string | null;
  city: string | null;
  up_district: string | null;
  dis_name: string | null;
  up_corporation: string | null;
  cop_name: string | null;
  up_lsgd: string | null;
  lsg_name: string | null;
  up_ward: string | null;
  source_name: string | null;
  up_landmark_details: string | null;
};

type ApiResponse = {
  Uploads: PlantData[];
  success: boolean;
};

const Plant = ({ searchParams }: any) => {
  const [plant, setPlant] = useState<PlantData | null>(null);
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${apiURL}/uploads/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result: ApiResponse = await response.json();
      if (result.success) {
        const selectedPlant = result.Uploads.find(p => p.up_id === parseInt(searchParams.tree));
        if (selectedPlant) {
          const {up_id,cntry_name,st_name,city,dis_name,cop_name,lsg_name,up_ward,source_name,up_landmark_details}:any = selectedPlant;
          Cookies.set('treeId', up_id.toString(), { expires: 1 });
          Cookies.set('country', cntry_name, { expires: 1 });
          Cookies.set('state', st_name, { expires: 1 });
          Cookies.set('district', dis_name, { expires: 1 });
          Cookies.set('corporation', cop_name, { expires: 1 });
          Cookies.set('lsg', lsg_name, { expires: 1 });
          Cookies.set('ward', up_ward, { expires: 1 });
          Cookies.set('city', city, { expires: 1 });
          Cookies.set('source', source_name, { expires: 1 });
          Cookies.set('landmark', up_landmark_details, { expires: 1 });
          setPlant(selectedPlant);
        }
      }
    };

    fetchData();
  }, [token, searchParams.tree]);

  if (!plant) {
    return <div>Loading...</div>;
  }
  function formatDate(isoString: string) {
    const date = new Date(isoString);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getUTCFullYear();
    

    const formattedDate = `${day}/${month}/${year}`;

    return `${formattedDate}`;
  }
  const formattedDate = formatDate(plant.up_date);

  return (
    <main className='min-h-screen flex flex-col'>
      <NavigationBar />
      <div className='mx-2'>
        <PageTitle title={`Tree Id: ${plant.up_id}`} />
      </div>
      <div className='p-4 md:p-8 max-w-6xl mx-auto'>
        <div>
          <div className='flex flex-col flex-wrap md:flex-row gap-3 py-2 mb-2'>
            <div className='w-full aspect-square md:h-40 md:w-40 rounded bg-light-gray mx-auto'>
              {plant.up_file && <img src={`${imageURL}${plant.up_file}`} alt='' width={200} height={200} />}
            </div>
            <div className='w-full aspect-square md:h-40 md:w-40 rounded bg-light-gray mx-auto'>
              {plant.up_file_2 && <img src={`${imageURL}${plant.up_file_2}`} alt='' width={200} height={200} />}
            </div>
            <div className='w-full aspect-square md:h-40 md:w-40 rounded bg-light-gray mx-auto'>
              {plant.up_file_3 && <img src={`${imageURL}${plant.up_file_3}`} alt='' width={200} height={200} />}
            </div>
            <div className='w-full aspect-square md:h-40 md:w-40 rounded bg-light-gray mx-auto'>
              {plant.up_file_4 && <img src={`${imageURL}${plant.up_file_4}`} alt='' width={200} height={200} />}
            </div>
          </div>
          <div className="flex flex-col gap-4 bg-light-gray p-4 md:p-6 rounded-3xl">
            <div className='self-end text-primary'>
              <DialogEditPlant/>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'>
              <div className='flex flex-col gap-1'>
                <p className='text-sm text-dark-text'>Planter Name</p>
                <p>{plant.up_planter}</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-sm text-dark-text'>Uploader Name</p>
                <p>{plant.up_name}</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-sm text-dark-text'>Tree Name</p>
                <p>{plant.up_tree_name}</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-sm text-dark-text'>Date</p>
                <p>{formattedDate}</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-sm text-dark-text'>Country</p>
                <p>{plant.cntry_name}</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-sm text-dark-text'>State</p>
                <p>{plant.st_name}</p>
              </div>
              {plant.city && (<div className='flex flex-col gap-1'>
                <p className='text-sm text-dark-text'>City</p>
                <p>{plant.city}</p>
              </div>)}
              
              <div className='flex flex-col gap-1'>
                <p className='text-sm text-dark-text'>District</p>
                <p>{plant.dis_name}</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-sm text-dark-text'>Corporation</p>
                <p>{plant.cop_name}</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-sm text-dark-text'>LSGD</p>
                <p>{plant.lsg_name}</p>
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-sm text-dark-text'>Ward</p>
                <p>{plant.up_ward}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GceBadge />
      <Footer />
    </main>
  );
};

export default Plant;
