"use client";
import React, { useEffect, useState } from "react";
import NavigationBar from "@/components/navigationBar";
import Footer from "@/components/footer";
import { apiURL, imageURL } from "@/app/requestsapi/request";

interface Participant {
  up_id: number,
  us_id: number,
  up_name: string,
  up_planter: string,
  up_tree_name: string,
  up_cord_id: number,
  up_date: string,
  up_file: string,
  us_corporation: number,
  gp_name:string
}

type Country = {
  cntry_id: string;
  cntry_name: string;
}

type State = {
  st_id: string;
  st_name: string;
}

type District = {
  dis_id: string;
  dis_name: string;
}

type Category = {
  id: string;
  group_type: string;
}

type Lsgd = {
  lsg_id: string;
  lsg_name: string;
}

type Corp = {
  cop_id: string;
  cop_name: string;
}

const Participant = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [lsgd, setLsgd] = useState<Lsgd[]>([]);
  const [corporation, setCorporation] = useState<Corp[]>([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCorp, setSelectedCorp] = useState("");
  const [selectedLsgd, setSelectedLsgd] = useState("");
  const [wardNo, setWardNo] = useState("");

  useEffect(() => {
    async function fetchInitialData() {
      const countryResponse = await fetch(`${apiURL}/country`);
      const countryData = await countryResponse.json();
      setCountries(countryData.country);
      try {
        const response = await fetch(`${apiURL}/uploads/filter`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }
        });
  
        if (!response.ok) {
        
          throw new Error("Network response was not ok");
        }
        try {
          const result = await response.json();
        

          setParticipants(result.Uploads);
        } catch {
          setParticipants([]);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchInitialData();
  }, []);

  useEffect(() => {
    async function fetchStates() {
      if (selectedCountry === "India") {
        const stateResponse = await fetch(`${apiURL}/state`);
        const stateData = await stateResponse.json();
        setStates(stateData.state);
      } else {
        setStates([]);
        setSelectedState("");
      }
      setDistricts([]);
      setCorporation([]);
      setLsgd([]);
      setSelectedDistrict("");
      setSelectedCorp("");
      setSelectedLsgd("");
      setWardNo("");
    }
    fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    async function fetchDistricts() {
      if (selectedCountry === "India" && selectedState === "Kerala") {
        const districtResponse = await fetch(`${apiURL}/district`);
        const districtData = await districtResponse.json();
        setDistricts(districtData.district);
      } else {
        setDistricts([]);
      }
      setCorporation([]);
      setLsgd([]);
      setSelectedDistrict("");
      setSelectedCorp("");
      setSelectedLsgd("");
      setWardNo("");
    }
    fetchDistricts();
  }, [selectedCountry, selectedState]);

  useEffect(() => {
    async function fetchCorpData() {
      if (selectedCountry === "India" && selectedState === "Kerala" && selectedDistrict) {
        const dist_id = districts.find((item) => item.dis_name === selectedDistrict)?.dis_id;
        const corpResponse = await fetch(`${apiURL}/corporation/${dist_id}`);
        const corpData = await corpResponse.json();
        setCorporation(corpData.corporation);
      } else {
        setCorporation([]);
      }
      setLsgd([]);
      setSelectedCorp("");
      setSelectedLsgd("");
      setWardNo("");
    }
    fetchCorpData();
  }, [selectedCountry, selectedState, selectedDistrict, districts]);

  useEffect(() => {
    async function fetchLsgdData() {
      if (selectedCountry === "India" && selectedState === "Kerala" && selectedCorp) {
        const corp_id = corporation.find((item) => item.cop_name === selectedCorp)?.cop_id;
        const lsgResponse = await fetch(`${apiURL}/lsg/${corp_id}`);
        const lsgData = await lsgResponse.json();
        setLsgd(lsgData.lsg);
      } else {
        setLsgd([]);
      }
      setSelectedLsgd("");
      setWardNo("");
    }
    fetchLsgdData();
  }, [selectedCountry, selectedState, selectedCorp, corporation]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    setSelectedCountry(selectedCountry);
    setSelectedState("");
    setSelectedDistrict("");
    setSelectedCorp("");
    setSelectedLsgd("");
    setWardNo("");
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedState = e.target.value;
    setSelectedState(selectedState);
    setSelectedDistrict("");
    setSelectedCorp("");
    setSelectedLsgd("");
    setWardNo("");
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDistrict = e.target.value;
    setSelectedDistrict(selectedDistrict);
    setSelectedCorp("");
    setSelectedLsgd("");
    setWardNo("");
  };

  const handleCorpChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCorp = e.target.value;
    setSelectedCorp(selectedCorp);
    setSelectedLsgd("");
    setWardNo("");
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const dataWithIds: any = {
      countryId: countries.find((item) => item.cntry_name === selectedCountry)?.cntry_id
    };

    if (selectedCountry === "India") {
      dataWithIds.stateId = states.find((item) => item.st_name === selectedState)?.st_id || null;
      
      if (selectedState === "Kerala") {
        dataWithIds.districtId = districts.find((item) => item.dis_name === selectedDistrict)?.dis_id || null;
        dataWithIds.corporationId = corporation.find((item) => item.cop_name === selectedCorp)?.cop_id || null;
        dataWithIds.lsgdId = lsgd.find((item) => item.lsg_name === selectedLsgd)?.lsg_id || null;
        dataWithIds.wardNo = parseInt(wardNo) || null;
      }
    }


    try {
      const response = await fetch(`${apiURL}/uploads/filter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataWithIds),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      try {
        const result = await response.json();
        setParticipants(result.Uploads);
      } catch {
        setParticipants([]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <NavigationBar />
      <div>
        <h2 className="m-5 text-2xl font-bold text-center items-center text-[#3C6E1F]">Participants list</h2>
      </div>
      <form onSubmit={onSubmit}>
        <div className="flex flex-wrap p-2 md:p-4">
          <div className="w-1/2 mb-3 md:w-1/3 p-1 md:p-2 bg-white">
            <label className="block ml-5 mb-1">Country</label>
            <select
              className="w-full p-1 md:p-2 border-0 rounded-md bg-white focus:border-2 focus:border-[#3C6E1F]"
              style={{ boxShadow: "1px 4px 5px 3px #00000040" }}
              value={selectedCountry}
              onChange={handleCountryChange}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.cntry_id} value={country.cntry_name}>
                  {country.cntry_name}
                </option>
              ))}
            </select>
          </div>
          
          {selectedCountry === "India" && (
            <div className="w-1/2 mb-3 md:w-1/3 p-1 md:p-2">
              <label className="block ml-5 mb-1">State</label>
              <select
                className="w-full p-1 md:p-2 border rounded-md bg-white focus:border-2 focus:border-[#3C6E1F]"
                style={{ boxShadow: "1px 4px 5px 3px #00000040" }}
                value={selectedState}
                onChange={handleStateChange}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.st_id} value={state.st_name}>
                    {state.st_name}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {selectedCountry === "India" && selectedState === "Kerala" && (
            <>
              <div className="w-1/2 mb-3 md:w-1/3 p-1 md:p-2">
                <label className="block ml-5 mb-1">District</label>
                <select
                  className="w-full p-1 md:p-2 border rounded-md bg-white focus:border-2 focus:border-[#3C6E1F]"
                  style={{ boxShadow: "1px 4px 5px 3px #00000040" }}
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district.dis_id} value={district.dis_name}>
                      {district.dis_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/2 mb-3 md:w-1/4 p-1 md:p-2">
                <label className="block ml-5 mb-1">Corporation</label>
                <select
                  className="w-full p-1 md:p-2 border rounded-md bg-white focus:border-2 focus:border-[#3C6E1F]"
                  style={{ boxShadow: "1px 4px 5px 3px #00000040" }}
                  value={selectedCorp}
                  onChange={handleCorpChange}
                >
                  <option value="">Select Corporation</option>
                  {corporation.map((corp) => (
                    <option key={corp.cop_id} value={corp.cop_name}>
                      {corp.cop_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/2 mb-3 md:w-1/4 p-1 md:p-2 bg-white">
                <label className="block ml-5 mb-1">LSGD</label>
                <select
                  className="w-full p-1 md:p-2 border rounded-md bg-white focus:border-2 focus:border-[#3C6E1F]"
                  style={{ boxShadow: "1px 4px 5px 3px #00000040" }}
                  value={selectedLsgd}
                  onChange={(e) => setSelectedLsgd(e.target.value)}
                >
                  <option value="">Select LSGD</option>
                  {lsgd.map((lsg) => (
                    <option key={lsg.lsg_id} value={lsg.lsg_name}>
                      {lsg.lsg_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/2 mb-3 md:w-1/4 p-1 md:p-2">
                <label className="block ml-3 mb-1">Ward No</label>
                <input
                  type="text"
                  className="w-full p-1 md:p-2 border rounded-md bg-white focus:border-2 focus:border-[#3C6E1F]"
                  placeholder="Enter ward number"
                  style={{ boxShadow: "1px 4px 5px 3px #00000040" }}
                  value={wardNo}
                  onChange={(e) => setWardNo(e.target.value)}
                />
              </div>
            </>
          )}
          
          <div className="w-full md:w-1/4 p-1 md:p-2 flex justify-center md:justify-start sm:items-center md:items-start">
            <button
              type="submit"
              className="w-1/2 md:w-full mt-7 p-1 md:p-2 bg-[#3C6E1F] text-white rounded-md"
              style={{ boxShadow: "1px 4px 5px 3px #00000040" }}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
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
        {participants && participants.length > 0 ? (
          participants.map((participant) => (
            <tr key={participant.up_id} className="border border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left">{participant.up_id || 'N/A'}</td>
              <td className="py-3 px-6 text-left">{participant.up_planter || 'N/A'}</td>
              <td className="py-3 px-6 text-left"><a href={`/user-page?u=${participant.up_name}&id=${participant.us_id}`}>{participant.up_name || 'N/A'}</a></td>
              <td className="py-3 px-6 text-left">{participant.gp_name || 'N/A'}</td>
              <td className="py-3 px-6 text-left">{participant.up_tree_name || 'N/A'}</td>
              <td className="py-3 px-6 text-left">
                {participant.up_file ? (
                  <img 
                    src={`${imageURL}${participant.up_file}`} 
                    style={{ height: '100px' }} 
                    alt="Tree" 
                    // onError={(e) => {
                    //   e.currentTarget.src = '/path/to/fallback/image.jpg';
                    //   e.currentTarget.alt = 'Image not available';
                    // }}
                  />
                ) : (
                  'No image available'
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6} className="py-3 px-6 text-center">No participants data available</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>
      <Footer />
    </>
  );
};

export default Participant;