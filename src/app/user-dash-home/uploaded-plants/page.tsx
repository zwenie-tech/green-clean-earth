'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Cookies from "js-cookie";
import Link from 'next/link';
import Image from 'next/image';
import { BsImages, BsPaperclip } from 'react-icons/bs';

import NavigationBar from '@/components/navigationBar';
import PageTitle from '@/components/sm/pageTitle';
import GceBadge from '@/components/gceBadge';
import Footer from '@/components/footer';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { apiURL, imageURL, uploadPlantData } from '@/app/requestsapi/request';
import { UploadButton } from './upload_form';
import PaginationComponent from '@/app/PageComponent';

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
  is_challenged: number | null;
};

type ApiResponse = {
  total: number;
  Uploads: PlantData[];
  success: boolean;
};

type EditState = {
  image1: boolean;
  image2: boolean;
  image3: boolean;
  image4: boolean;
};

type EditStates = Record<number, EditState>;

type UploadButtonProps = {
  imageNo: number;
  treeNo: number;
  isEdit: boolean;
  onComplete: () => void; // Changed from optional to required
};



const MemoizedUploadButton = React.memo(UploadButton);

type PlantImageKeys =
  | 'up_file'
  | 'up_file_2'
  | 'up_file_3'
  | 'up_file_4';

type PlantTimeKeys =
  | 'up_date'
  | 'up_file_2_time'
  | 'up_file_3_time'
  | 'up_file_4_time';

const getPlantImageKey = (imageNumber: number): PlantImageKeys => {
  if (imageNumber === 1) return 'up_file';
  if (imageNumber === 2) return 'up_file_2';
  if (imageNumber === 3) return 'up_file_3';
  if (imageNumber === 4) return 'up_file_4';
  throw new Error(`Invalid image number: ${imageNumber}`);
};

const getPlantTimeKey = (imageNumber: number): PlantTimeKeys => {
  if (imageNumber === 1) return 'up_date';
  if (imageNumber === 2) return 'up_file_2_time';
  if (imageNumber === 3) return 'up_file_3_time';
  if (imageNumber === 4) return 'up_file_4_time';
  throw new Error(`Invalid image number: ${imageNumber}`);
};
function formatDate(isoString: string) {
  const date = new Date(isoString);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

function formatTime(isoString: string) {
  const date = new Date(isoString);
  let hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  let hour = parseInt(hours) % 12 || 12;
  return `${hour}:${minutes} ${parseInt(hours) >= 12 ? 'PM' : 'AM'}`;
}

function isThreeMonthsOld(isoString: string | null): boolean {
  if (!isoString) return false;
  const uploadDate = new Date(isoString);
  const currentDate = new Date();
  const diffInMs = currentDate.getTime() - uploadDate.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return diffInDays >= 90; // ~3 months
}


const MyUploadedPlants = () => {
  const [data, setData] = useState<PlantData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editStates, setEditStates] = useState<EditStates>({});
  const token = Cookies.get('token');
  const itemsPerPage = 10;

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${apiURL}/uploads/me?page=${currentPage}&limit=${itemsPerPage}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result: ApiResponse = await response.json();
        if (result.success) {
          setTotalPages(Math.ceil(result.total / itemsPerPage));
          setData(result.Uploads);

          // Initialize edit states for all plants
          const initialEditStates: EditStates = {};
          result.Uploads.forEach(plant => {
            initialEditStates[plant.up_id] = {
              image1: false,
              image2: false,
              image3: false,
              image4: false
            };
          });
          setEditStates(initialEditStates);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token, currentPage]);

  const toggleEditState = (plantId: number, imageNumber: number) => {
    setEditStates(prev => {
      const imageKey = `image${imageNumber}` as keyof EditState;
      return {
        ...prev,
        [plantId]: {
          ...prev[plantId],
          [imageKey]: !prev[plantId]?.[imageKey]
        }
      };
    });
  };

 const renderImageCell = (plant: PlantData, imageNumber: number) => {
  const imageKey = getPlantImageKey(imageNumber);
  const timeKey = getPlantTimeKey(imageNumber);

  const imageValue = plant[imageKey] as string | null;
  const timeValue = plant[timeKey] as string | null;
  const editKey = `image${imageNumber}` as keyof EditState;
  const isEdit = editStates[plant.up_id]?.[editKey];

  // Check if previous image exists (for images 2-4)
  if (imageNumber > 1) {
    const prevImageKey = getPlantImageKey(imageNumber - 1);
    const prevTimeKey = getPlantTimeKey(imageNumber - 1);
    const prevTimeValue = plant[prevTimeKey] as string | null;

    if (!plant[prevImageKey]) {
      return <div className='bg-slate-200 w-full h-full'></div>; // Show gray box if previous image doesn't exist
    }

    if (!isThreeMonthsOld(prevTimeValue)) {
      return (
        <div className='text-xs text-center text-gray-500'>
          <p>Upload not available</p>
          <p className='text-[10px]'>(3 months not completed)</p>
        </div>
      );
    }
  }

  return (
    <div className='w-full'>
      {imageValue ? (
        <div className='flex flex-col items-center'>
          <div className="relative aspect-square w-full max-w-[120px] sm:max-w-[150px]">
            <img
              src={`${imageURL}${imageValue}`}
              alt={`Plant image ${imageNumber}`}
              className='absolute h-full w-full object-cover rounded'
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/placeholder.png';
              }}
            />
            {plant.is_challenged == 1 && (
              <img
                className="absolute top-0 left-0 w-full h-full object-contain z-10"
                src="/images/chellenge.png"
                alt="Challenged"
              />
            )}
          </div>

          <div className='mt-2 text-center text-xs sm:text-sm'>
            <p>Uploaded on</p>
            <p>{timeValue ? `${formatDate(timeValue)}` : "N/A"}</p>
            <p>{timeValue ? `${formatTime(timeValue)}` : ""}</p>
          </div>

          {isEdit ? (
            <MemoizedUploadButton
              imageNo={imageNumber}
              treeNo={plant.up_id}
              isEdit={true}
              onComplete={() => toggleEditState(plant.up_id, imageNumber)}
            />
          ) : (
            <button
              className='text-primary underline text-xs sm:text-sm mt-1'
              onClick={() => toggleEditState(plant.up_id, imageNumber)}
            >
              Edit to replace
            </button>
          )}
        </div>
      ) : (
        <div className='flex justify-center'>
          <MemoizedUploadButton
            imageNo={imageNumber}
            treeNo={plant.up_id}
            isEdit={false}
            onComplete={() => { }}
          />
        </div>
      )}
    </div>
  );
};


  return (
    <main className='min-h-screen flex flex-col'>
      <NavigationBar />
      <div className='mx-2 mt-6 px-2 sm:px-4'>
        <PageTitle title='My Uploaded Plants' />

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              <div className="w-full overflow-x-auto">
                <table className="min-w-[1200px] w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tree Number</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Planter</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uploader</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image 1</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image 2</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image 3</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image 4</th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {data.map((plant) => (
                      <tr key={`plant-${plant.up_id}`} className='hover:bg-gray-50'>
                        <td className='px-4 py-4 text-sm font-medium text-primary whitespace-nowrap'>
                          <div>
                            <Link
                              href={{
                                pathname: 'uploaded-plants/plant',
                                query: { plant: plant.up_id },
                              }}
                              className='hover:text-primary-dark text-primary underline block'
                            >
                              {plant.up_id}
                            </Link>
                            <Link
                              href={{
                                pathname: 'uploaded-plants/plant',
                                query: { tree: plant.up_id },
                              }}
                              className='hover:text-primary-dark text-primary underline text-sm block mt-1'
                            >
                              Edit
                            </Link>
                          </div>                  
                        </td>
                        <td className='px-4 py-4 text-sm text-gray-500 whitespace-nowrap '>
                          {plant.up_planter}
                        </td>
                        <td className='px-4 py-4 text-sm text-gray-500 whitespace-nowrap '>
                          {plant.up_name}
                        </td>
                        <td className='px-4 py-4 whitespace-nowrap'>{renderImageCell(plant, 1)}</td>
                        <td className='px-4 py-4 whitespace-nowrap '>{renderImageCell(plant, 2)}</td>
                        <td className='px-4 py-4 whitespace-nowrap '>{renderImageCell(plant, 3)}</td>
                        <td className='px-4 py-4 whitespace-nowrap'>{renderImageCell(plant, 4)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
      <GceBadge />
      <Footer />
    </main>
  );
};

export default MyUploadedPlants;