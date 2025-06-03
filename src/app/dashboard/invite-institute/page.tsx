"use client"
import React, { useEffect, useState } from 'react';
import NavigationBar from '@/components/navigationBar';
import Footer from '@/components/footer';
import { apiURL, baseURL } from '@/app/requestsapi/request';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button';

interface Institution {
  gp_id: number;
  gp_name: string;
}

const Invite: React.FC = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [copy, setCopy] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const router = useRouter();
  const token = Cookies.get('token');
  const ref_code = Cookies.get('cord_refcode');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;


  useEffect(() => {
    async function fetchfirstData() {
      const responseall = await fetch(`${apiURL}/coordinator/our-invites?limit=100000000000`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (responseall.status === 200) {
        const dataall = await responseall.json();
        setTotalPages(Math.ceil(dataall.data.length / itemsPerPage));

      }
    }
    fetchfirstData();
  }, [token]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  }
  if (!token) {
    // Redirect to the login page if no token is found
    router.push("/loginform");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiURL}/coordinator/our-invites?page=${currentPage}&limit=${itemsPerPage}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const result = await response.json();
        if (result.success) {
          setInstitutions(result.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, currentPage]);

  return (
    <>
      <NavigationBar />
      <div className='relative flex flex-col md:flex-row md:justify-between p-4'>
        <div className='md:absolute md:left-1/2 md:transform md:-translate-x-1/2 w-full md:w-auto mt-6 mb-3'>
          {/* <h1 className='text-xl m-2 text-left md:text-center md:text-xl font-bold'>Dashboard</h1> */}
        </div>
        <div className='ml-auto md:mr-0 md:mt-0 mt-4'>
          <button
            className='rounded-xl md:mr-5 text-[#FFFFFF] bg-[#3C6E1F] p-2 mr-4'
            style={{ boxShadow: '1px 4px 5px 3px #00000040' }}
            onClick={() => setShowDialog(true)}
          >
            Invite
          </button>
        </div>
      </div>
      <div className='text-center'>
        <h1 className='text-3xl mt-2 font-bold'>Invite Institution</h1>
        <div className="container w-full justify-center mt-6">
          {/* <p className="text-lg font-semibold mt-2">
          Invite Other institutions
        </p> */}
          <p className="">
            താങ്കളുടെ പരിചയക്കാരായ മറ്റു സ്ഥാപനങ്ങളിലെ സുഹൃത്തുക്കളെ ഈ
            മത്സരത്തിലേക്ക് ഇൻവൈറ്റ് ചെയ്യുക. അവർ നേടുന്ന പോയിന്റുകൾ പ്രമോട്ടർ
            എന്ന നിലയിൽ താങ്കളുടെ അക്കൗണ്ടിൽ പരിഗണിക്കുന്നതാണ്. അതിന് Invite
            Other institutions എന്ന് ബട്ടൺ ക്ലിക്ക് ചെയ്ത് മെസ്സേജ് അവർക്ക്
            അയച്ചു കൊടുക്കുക.
          </p>
        </div>

      </div>
      <div className="container mx-auto p-6">
        <div className="overflow-x-auto">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="min-w-full bg-white border-gray-200 rounded-t-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left w-16 bd-2 rounded-tl-lg">Sl. No</th>
                  <th className="py-3 px-6 text-left">Group code</th>
                  <th className="py-3 px-6 text-left">Institution name</th>
                  {/* <th className="py-3 px-6 text-left rounded-tr-lg">Coordinator name</th> */}
                </tr>
              </thead>
              <tbody>
                {institutions.length > 0 ? institutions.map((institution, index) => (
                  <tr key={institution.gp_id} className="border border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{index + 1}</td>
                    <td className="py-3 px-6 text-left">{institution.gp_id}</td>
                    <td className="py-3 px-6 text-left">{institution.gp_name}</td>
                    {/* <td className="py-3 px-6 text-left">Bathhon Pannur</td> */}
                  </tr>
                )) : <tr><td colSpan={3} className="text-center py-3">No data found</td></tr>}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center space-x-2 my-4">
        <button
          className={currentPage === 1 ?
            "text-white text-sm py-2 px-4 bg-[#6b6767] rounded-xl shadow-lg"
            : "text-white text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
          }
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-xl">{currentPage}</span>
        <button
          className={currentPage === totalPages ?
            "text-white text-sm py-2 px-4 bg-[#6b6767] rounded-xl shadow-lg"
            : "text-white text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
          }
          onClick={() => {
            handlePageChange(currentPage + 1)
          }}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <Footer />

      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Invite Coordinator</h2>
            <div className="max-h-96 overflow-y-auto">
              <p>
                <b>കോഡിനേറ്റർ രജിസ്ട്രേഷൻ</b><br />
                🥦
                <b>ഗ്രീൻ ക്ലീൻ കേരള സുസ്ഥിരവികസന ഹരിത മത്സരങ്ങളിൽ പങ്കെടുക്കുവാൻ....</b>
                👇🏼<br />
                ( വിദ്യാലയത്തിലെ അധ്യാപക കോഡിനേറ്റർ പൂരിപ്പിക്കേണ്ടത്. ഒരു വിദ്യാലയത്തിൽ നിന്നും ഒരു കോഡിനേറ്റർ മാത്രം പൂരിപ്പിച്ചാൽ മതി.
                താഴെക്കൊടുത്ത വീഡിയോ കാണുക<br />
                👇🏼<br />
                ലിങ്ക് video
                <br />👆🏼<br />
                അതിനുശേഷം
                താഴെക്കൊടുത്ത ലിങ്കിൽ ക്ലിക്ക് ചെയ്തു വീഡിയോയിൽ പറഞ്ഞത് പ്രകാരം
                മറ്റു അധ്യാപകർക്കും വിദ്യാർത്ഥികൾ വെബ്സൈറ്റിൽ നിന്നും ലഭിക്കുന്ന പുതിയ ലിങ്ക് അയച്ചു കൊടുക്കുക)
                <br />👇🏼<br />
                <strong><a className='text-green-600' href={`${baseURL}register?ref=${ref_code}`}>{`${baseURL}register?ref=${ref_code}`}</a></strong>
                <br />Use referral code <strong>{ref_code}</strong> while registration.<br />
                <br />സംശയങ്ങൾക്ക്
                🥦<br />
                Web: www.GreenCleanEarth.org <br />
                Whatsapp/Telegram : 9645 9645 92<br />
                Mail: GreenCleanKerala@gmail.com.<br />
                Youtube /fb/insta: Green Clean Kerala<br />
                🥦
                വാർത്തകളും റിസൽ ട്ടുകളും അറിയുവാൻ ചാനലും പേജും സബ്സ്ക്രൈബ്- ഫോളോ ചെയ്യുക
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-600 text-white py-2 px-4 rounded mr-2"
                onClick={() => {
                  navigator.clipboard.writeText(`
              *കോഡിനേറ്റർ രജിസ്ട്രേഷൻ*
              🥦
              *ഗ്രീൻ ക്ലീൻ കേരള സുസ്ഥിരവികസന ഹരിത മത്സരങ്ങളിൽ പങ്കെടുക്കുവാൻ....*
              👇🏼
              ( വിദ്യാലയത്തിലെ അധ്യാപക കോഡിനേറ്റർ പൂരിപ്പിക്കേണ്ടത്. ഒരു വിദ്യാലയത്തിൽ നിന്നും ഒരു കോഡിനേറ്റർ മാത്രം പൂരിപ്പിച്ചാൽ മതി.
              താഴെക്കൊടുത്ത വീഡിയോ കാണുക
              👇🏼
              ലിങ്ക് video
              👆🏼
              അതിനുശേഷം
              താഴെക്കൊടുത്ത ലിങ്കിൽ ക്ലിക്ക് ചെയ്തു വീഡിയോയിൽ പറഞ്ഞത് പ്രകാരം  
              മറ്റ് അധ്യാപകർക്കും വിദ്യാർത്ഥികൾ വെബ്സൈറ്റിൽ നിന്നും ലഭിക്കുന്ന പുതിയ ലിങ്ക് അയച്ചു കൊടുക്കുക)
              👇🏼
              ${baseURL}register?ref=${ref_code}
              👆🏼
              Use referral code ${ref_code} while registration.
              സംശയങ്ങൾക്ക്
              🥦
              Web: www.GreenCleanEarth.org
              Whatsapp/Telegram : 9645 9645 92
              Mail: GreenCleanKerala@gmail.com.
              Youtube /fb/insta: Green Clean Kerala
              🥦
              വാർത്തകളും റിസൽ ട്ടുകളും അറിയുവാൻ ചാനലും പേജും സബ്സ്ക്രൈബ്- ഫോളോ ചെയ്യുക
            `);
                  setCopy(true);
                }}
              >
                {copy ? "Copied!" : "Copy"}
              </button>
              <button
                className="bg-green-600 text-white py-2 px-4 rounded"
                onClick={() => setShowDialog(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default Invite;
