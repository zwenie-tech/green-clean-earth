"use client";
import NavigationBar from '@/components/navigationBar';
import Footer from '@/components/footer';
import React, { useState, useEffect, Suspense } from 'react';
import { apiURL, imageURL } from '../requestsapi/request';
import { useRouter, useSearchParams } from 'next/navigation';
import { ExternalLink, LinkIcon } from 'lucide-react';

interface GroupActivity {
  us_name: string;
  participant_name: string;
  activity_category: string;
  activity_social_media_link: string;
  activity_thumbnail: string;
  activity_likes: string;
  activity_views: string;
  earnings: string | null;
  gp_id: number;
  activity:string;
  activity_description: string;
  activity_title: string;
  personal_activity_id: number;
  login_id: number;
}

interface GroupUpload {
  up_id: number;
  up_name: string;
  up_planter: string;
  up_tree_name: string;
  up_cord_id: number;
  up_date: string;
  up_file: string;
  us_corporation: number;
  gp_name: string;
  up_reg_id: number;
  gp_id: number;
  is_challenged:number

}
export default function ButtonDisplay() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ButtonDisplayFn />
    </Suspense>
  );
}
const ButtonDisplayFn: React.FC = () => {
  const [activeButton, setActiveButton] = useState<'upload' | 'activity'>('upload');
  const [groupActivities, setGroupActivities] = useState<GroupActivity[]>([]);
  const [groupUploads, setGroupUploads] = useState<GroupUpload[]>([]);
  const searchParams = useSearchParams();
  const grpname = searchParams.get("gname");
  const grpid = searchParams.get("gid");
  const groupType = searchParams.get("groupType");
  const cordinatorName = searchParams.get("cordinator");
  const grpuc = searchParams.get("uc");
  const tabselect = searchParams.get("up");
  const [currentPageAct, setCurrentPageAct] = useState(1);
  const [currentPageUp, setCurrentPageUp] = useState(1);
  const [totalPagesAct, setTotalPagesAct] = useState(1);
  const [totalPagesUp, setTotalPagesUp] = useState(1);
  const [upcount, setUpCount] = useState(0);
  const [actcount, setActCount] = useState(0);
  const [cordinatorId, setCordinatorId] = useState(0);
  const itemsPerPage = 10;
  const router = useRouter()
  
  const navigateToUserPage = (participantName: string, loginId: number) => {
    router.push(`/user-page?u=${encodeURIComponent(participantName)}&id=${loginId}`);
  };
 
    const handlePageChangeAct = (newPage: number) => {
      if (newPage > 0 && newPage <= totalPagesAct) {
     
        setCurrentPageAct(newPage);
      }
    }
    const handlePageChangeUp = (newPage: number) => {
      if (newPage > 0 && newPage <= totalPagesUp) {
        
        setCurrentPageUp(newPage);
      }
    }
  

  const fetchGroupActivities = async (page:any) => {
    try {
      const grpId = parseInt(grpid!);
      const response = await fetch(`${apiURL}/activity/groupActivities?page=${page}&limit=${itemsPerPage}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ groupId: grpId }),
      });
      const data = await response.json();
      if (data.success) {
        // console.log(data)
        setCordinatorId(data.cordinator_id);
        setGroupActivities(data.groupActivities);
        setActCount(data.activity_count);
        setTotalPagesAct(Math.ceil(data.activity_count / itemsPerPage));
      }
    } catch (error) {
      console.error('Error fetching group activities:', error);
    }
  };

  const fetchGroupUploads = async (page:any) => {
    try {
      const grpId = parseInt(grpid!);

      const response = await fetch(`${apiURL}/uploads/groupUploads?page=${page}&limit=${itemsPerPage}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ groupId: grpId }),
      });
      const data = await response.json();
      if (data.success) {
        // console.log(data)
        setGroupUploads(data.groupUploads);
        setUpCount(data.upload_count);
        setTotalPagesUp(Math.ceil(data.upload_count / itemsPerPage));
      }
    } catch (error) {
      console.error('Error fetching group uploads:', error);
    }
  };

  useEffect(() => {
    fetchGroupActivities(currentPageAct);
    fetchGroupUploads(currentPageUp);
  }, [currentPageAct, currentPageUp]);

  useEffect(() => {
    setActiveButton(tabselect == 'f' ? "activity" : "upload")
  }, [tabselect]);

  return (
    <div>
      <NavigationBar />
      <div className="w-full flex flex-col items-center gap-4 mt-6">
        <div className="w-full flex justify-between items-center gap-3 ">
          <p className="text-right font-bold w-1/2">Group Name / Group Id:</p>
          <p className="w-1/2 font-bold">{grpname} / {grpid}</p>
        </div>
        <div className="w-full flex justify-between items-center gap-3 ">
          <p className="text-right font-bold w-1/2">Coordinator Name / Coordinator Id:</p>
          <p className="w-1/2 font-bold">{cordinatorName} / {cordinatorId}</p>
        </div>
        <div className="w-full flex justify-between items-center gap-3 ">
          <p className="text-right font-bold w-1/2">Group Type:</p>
          <p className="w-1/2 font-bold">{groupType}</p>
        </div>
        <div className="w-full flex justify-between items-center gap-3 ">
          <p className="text-right font-bold w-1/2">Upload count:</p>
          <p className="w-1/2 font-bold">{upcount}</p>
        </div>
        <div className="w-full flex justify-between items-center gap-3 ">
          <p className="text-right font-bold w-1/2">Activity count:</p>
          <p className="w-1/2 font-bold">{actcount}</p>
        </div>
      </div>
      <hr className="h-1 bg-gray-300 border-0 mt-4 w-3/4 justify-center items-center mx-auto" />
      <div className="flex flex-row bg-light-gray justify-center items-center w-3/4 mx-auto">
        <button
          onClick={() => setActiveButton('upload')}
          className={`w-1/2 text-center font-bold text-xl bg-light-gray py-3 text-[#3C6E1F] hover:bg-primary/15 border-b-2 ${
            activeButton === 'upload' ? 'border-[#3C6E1F]' : 'border-transparent'
          }`}
        >
          Upload
        </button>
        <button
          onClick={() => setActiveButton('activity')}
          className={`w-1/2 text-center font-bold text-xl bg-light-gray hover:bg-primary/15 py-3 text-[#3C6E1F] border-b-2 ${
            activeButton === 'activity' ? 'border-[#3C6E1F]' : 'border-transparent'
          }`}
        >
          Activity
        </button>
      </div>

      <div className="w-3/4 mx-auto">
        {activeButton === 'upload' && (
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {groupUploads.length ? (
          groupUploads.map((upload) => (
            <div key={upload.up_id} className="relative flex flex-col items-center p-4 border border-gray-200 rounded-lg"
             style={{ boxShadow: '0px 4px 10px 3px #00000040' }} onClick={() => navigateToUserPage(upload.up_name, upload.up_reg_id)}>
              
              <div className="w-full">
                {upload.is_challenged == 1 && (
                  <img
                    className="absolute top-0 left-0 transform translate-x-1/2 w-28 h-18 object-cover z-10"
                    src="/images/chellenge.png"
                    alt="Challenged"
                  />
                )}
                <img src={`${imageURL}${upload.up_file}`} alt={upload.up_tree_name} className="w-full h-auto object-cover rounded-lg" style={{ height: '250px' }} />
              </div>

              <div className="w-full pt-3 md:pl-4">
                <p>Plant name: {upload.up_tree_name}</p>
                <p>Uploaded No.: {upload.up_id}</p>
              </div>
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
            <div className="flex justify-center items-center space-x-2 my-4">
                  <button
                  className={currentPageUp === 1 ? 
                    "text-white text-sm py-2 px-4 bg-[#6b6767] rounded-xl shadow-lg" 
                  : "text-white text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
                  }
                    onClick={() => handlePageChangeUp(currentPageUp - 1)}
                    disabled={currentPageUp === 1}
                  >
                    Previous
                  </button>
                  <span className="text-xl">{currentPageUp}</span>
                  <button
                    className={currentPageUp === totalPagesUp ? 
                      "text-white text-sm py-2 px-4 bg-[#6b6767] rounded-xl shadow-lg" 
                    : "text-white text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
                    }
                    onClick={() => {
                      handlePageChangeUp(currentPageUp + 1) 
                    }}
                    disabled={currentPageUp === totalPagesUp}
                  >
                    Next
                  </button>
              </div>
          </div>
        )}

        {activeButton === 'activity' && (
          <div className="container mx-auto p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border-gray-200 rounded-t-lg">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left w-16 bd-2 rounded-tl-lg">Sl. No</th>
                    <th className="py-3 px-6 text-left">User Name</th>
                    <th className="py-3 px-6 text-left">Chest Number</th>
                    <th className="py-3 px-6 text-left">Category</th>
                    <th className="py-3 px-6 text-left">Name of Activity</th>
                    <th className="py-3 px-6 text-left">Activity Id</th>
                    <th className="py-3 px-6 text-left">User Id</th>
                    <th className="py-3 px-6 text-left">Earning</th>
                    <th className="py-3 px-6 text-left rounded-tr-lg">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {groupActivities.length ? (groupActivities.map((activity, index) => (
                    <tr key={index} className="border border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left">{index + 1}</td>
                      <td className="py-3 px-6 text-left">
                        <a 
                          href={`/user-page?u=${activity.us_name}&id=${activity.login_id}`} 
                          className="text-black hover:underline flex items-center gap-1"
                        >
                          {activity.us_name}
                          <LinkIcon size={16} className="text-blue-600" />
                        </a>
                      </td>                      <td className="py-3 px-6 text-left">{activity.activity_description}</td>
                      <td className="py-3 px-6 text-left">{activity.activity_category}</td>
                      <td className="py-3 px-6 text-left">
                        <a 
                          href={activity.activity_social_media_link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-black hover:underline flex items-center gap-1"
                        >
                          {activity.activity_title}
                          <ExternalLink size={16} className="text-blue-600" />
                        </a>
                      </td>                      <td className="py-3 px-6 text-left">{activity.personal_activity_id}</td>
                      <td className="py-3 px-6 text-left">{activity.login_id || "N/A"} </td>
                      <td className="py-3 px-6 text-left">{activity.earnings || "N/A"} </td>
                      <td className="py-3 px-6 text-left">{activity.activity_views} Views, {activity.activity_likes} Likes</td>
                    </tr>
                  ))): <div>No data found</div>}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center items-center space-x-2 my-4">
                  <button
                  className={currentPageAct === 1 ? 
                    "text-white text-sm py-2 px-4 bg-[#6b6767] rounded-xl shadow-lg" 
                  : "text-white text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
                  }
                    onClick={() => handlePageChangeAct(currentPageAct - 1)}
                    disabled={currentPageAct === 1}
                  >
                    Previous
                  </button>
                  <span className="text-xl">{currentPageAct}</span>
                  <button
                    className={currentPageAct === totalPagesAct ? 
                      "text-white text-sm py-2 px-4 bg-[#6b6767] rounded-xl shadow-lg" 
                    : "text-white text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
                    }
                    onClick={() => {
                      handlePageChangeAct(currentPageAct + 1) 
                    }}
                    disabled={currentPageAct === totalPagesAct}
                  >
                    Next
                  </button>
              </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
