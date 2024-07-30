"use client"
import React, { Suspense, useEffect, useState } from 'react';
import PageTitle from '@/components/sm/pageTitle';
import { apiURL, imageURL } from '@/app/requestsapi/request';
import { useSearchParams } from 'next/navigation';

interface TreeDetails {
  up_id: number;
  up_name: string;
  up_planter: string;
  up_tree_name: string;
  up_file: string | null;
  up_file_2: string | null;
  up_file_3: string | null;
  up_file_4: string | null;
  up_district: string | null;
  up_lsgd: string | null;
  up_ward: string | null;
  up_landmark_details: string | null;
  source_name: string | null;
  gp_name: string | null;
}
interface Participant {
  id : number;
}



const Item: React.FC = () => {
  const [treeDetails, setTreeDetails] = useState<TreeDetails | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  useEffect(() => {
    const fetchTreeDetails = async () => {
      const response = await fetch(`${apiURL}/uploads/treeDetails/${id}`);
      const data = await response.json();
      if (data.success) {
        setTreeDetails(data.treeDetails[0]);
      }
    };

    fetchTreeDetails();
  }, [id]);

  if (!treeDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageTitle title={`Tree number: ${treeDetails.up_id}`} />
      <div className="rounded-lg shadow-lg max-w-screen-lg mx-auto">
        <div className="rounded-lg border">
          <div className='flex flex-col flex-wrap md:flex-row gap-3 py-2 mb-2'>
            {treeDetails.up_file && (
              <div className='w-full aspect-square md:h-40 md:w-40 rounded bg-light-gray mx-auto'>
                <img src={`${imageURL}${treeDetails.up_file}`} alt='' width={200} height={200} />
              </div>
            )}
            {treeDetails.up_file_2 && (
              <div className='w-full aspect-square md:h-40 md:w-40 rounded bg-light-gray mx-auto'>
                <img src={`${imageURL}${treeDetails.up_file_2}`} alt='' width={200} height={200} />
              </div>
            )}
            {treeDetails.up_file_3 && (
              <div className='w-full aspect-square md:h-40 md:w-40 rounded bg-light-gray mx-auto'>
                <img src={`${imageURL}${treeDetails.up_file_3}`} alt='' width={200} height={200} />
              </div>
            )}
            {treeDetails.up_file_4 && (
              <div className='w-full aspect-square md:h-40 md:w-40 rounded bg-light-gray mx-auto'>
                <img src={`${imageURL}${treeDetails.up_file_4}`} alt='' width={200} height={200} />
              </div>
            )}
          </div>
          <hr className="my-2" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:p-6 rounded-3xl">
            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">Planter name: </div>
              <div className="text-sm">{treeDetails.up_planter}</div>
            </div>
            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">Uploader name: </div>
              <div className="text-sm">{treeDetails.up_name}</div>
            </div>
            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">Tree name: </div>
              <div className="text-sm">{treeDetails.up_tree_name}</div>
            </div>
            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">Group code: </div>
              <div className="text-sm">{treeDetails.gp_name || 'N/A'}</div>
            </div>
            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">District: </div>
              <div className="text-sm">{treeDetails.up_district || 'N/A'}</div>
            </div>
            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">LSGD Type: </div>
              <div className="text-sm">{treeDetails.up_lsgd || 'N/A'}</div>
            </div>
            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">Ward Name: </div>
              <div className="text-sm">{treeDetails.up_ward || 'N/A'}</div>
            </div>
            {/* <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">Coupon Number: </div>
              <div className="text-sm">....</div>
            </div>
            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">Tree Scientific Name: </div>
              <div className="text-sm">....</div>
            </div> */}
            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">Landmark: </div>
              <div className="text-sm">{treeDetails.up_landmark_details || 'N/A'}</div>
            </div>
            <div className="flex ml-2 mt-2 gap-2">
              <div className="text-sm pl-5 mb-2">Plant Source: </div>
              <div className="text-sm">{treeDetails.source_name || 'N/A'}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



export default function Itemfn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Item />
    </Suspense>
  );
}