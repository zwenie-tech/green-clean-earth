"use client"; // Ensure this is a client component

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
const Details = () => {
  const searchParams = useSearchParams();

  // Get the query parameters from the URL
  const initialName = searchParams.get('name') || '';
  const initialEmail = searchParams.get('email') || '';
  const initialUsername = searchParams.get('username') || '';
  const initialGroup = searchParams.get('group') || '';
  const initialCountry = searchParams.get('country') || '';
  const initialState = searchParams.get('state') || '';
  const initialDistrict = searchParams.get('district') || '';
  const initialCooperation = searchParams.get('cooperation') || '';
  const initialLsgd = searchParams.get('LSGD') || '';
  const initialWard = searchParams.get('Ward') || '';
  const initialGroupName = searchParams.get('groupname') || '';
  const initialReferredBy = searchParams.get('referredBy') || '';

  // State to allow editing of the details
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [username, setUsername] = useState(initialUsername);
  const [group, setGroup] = useState(initialGroup);
  const [country, setCountry] = useState(initialCountry);
  const [state, setState] = useState(initialState);
  const [district, setDistrict] = useState(initialDistrict);
  const [cooperation, setCooperation] = useState(initialCooperation);
  const [lsgd, setLsgd] = useState(initialLsgd);
  const [ward, setWard] = useState(initialWard);
  const [groupName, setGroupName] = useState(initialGroupName);
  const [referredBy, setReferredBy] = useState(initialReferredBy);

  // State to track saved details
  const [savedDetails, setSavedDetails] = useState({
    name: initialName,
    email: initialEmail,
    username: initialUsername,
    group: initialGroup,
    country: initialCountry,
    state: initialState,
    district: initialDistrict,
    cooperation: initialCooperation,
    lsgd: initialLsgd,
    ward: initialWard,
    groupName: initialGroupName,
    referredBy: initialReferredBy
  });

  // Handlers to update the input values
  const handleSave = () => {
    setSavedDetails({
      name, email, username, group, country, state, district, cooperation, lsgd, ward, groupName, referredBy
    });
  };

  return (
<>
<div className="flex flex-col md:flex-row">
  {/* Form Div */}
  <div className="md:w-1/2 w-full" style={{ backgroundColor: '#f7f7f7', padding: '5px', borderRadius: '8px' }}>
    <h1 className="text-center font-bold text-xl mt-7">Details </h1>
    <form className="flex flex-col gap-4 max-w-md">
      {[
        { label: 'Name', value: name, onChange: setName },
        { label: 'Email', value: email, onChange: setEmail },
        { label: 'Username', value: username, onChange: setUsername },
        { label: 'Group', value: group, onChange: setGroup },
        { label: 'Country', value: country, onChange: setCountry },
        { label: 'State', value: state, onChange: setState },
        { label: 'District', value: district, onChange: setDistrict },
        { label: 'Cooperation', value: cooperation, onChange: setCooperation },
        { label: 'LSGD', value: lsgd, onChange: setLsgd },
        { label: 'Ward', value: ward, onChange: setWard },
        { label: 'Group Name', value: groupName, onChange: setGroupName },
        { label: 'Referred By', value: referredBy, onChange: setReferredBy },
      ].map(({ label, value, onChange }, idx) => (
        <div key={idx}>
          <label className="flex flex-col space-y-1">
            <strong>{label}:</strong>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </label>
        </div>
      ))}

      <button
        type="button"
        onClick={handleSave}
        className="w-full md:w-1/2 mt-5 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-800 mx-auto"
      >
        Save
      </button>
    </form>
  </div>

  {/* Image Div */}
  <div className="hidden md:block md:w-1/2 bg-cover bg-center rounded" style={{ backgroundImage: "url('/images/login.jpeg')" }}>
  </div>
</div>

      {/* Display the saved details */}
      <div style={{ marginTop: '30px' }}>
        <h3>Saved Details</h3>
        <p><strong>Name:</strong> {savedDetails.name}</p>
        <p><strong>Email:</strong> {savedDetails.email}</p>
        <p><strong>Username:</strong> {savedDetails.username}</p>
        <p><strong>Group:</strong> {savedDetails.group}</p>
        <p><strong>Country:</strong> {savedDetails.country}</p>
        <p><strong>State:</strong> {savedDetails.state}</p>
        <p><strong>District:</strong> {savedDetails.district}</p>
        <p><strong>Cooperation:</strong> {savedDetails.cooperation}</p>
        <p><strong>LSGD:</strong> {savedDetails.lsgd}</p>
        <p><strong>Ward:</strong> {savedDetails.ward}</p>
        <p><strong>Group Name:</strong> {savedDetails.groupName}</p>
        <p><strong>Referred By:</strong> {savedDetails.referredBy}</p>
      </div>
  </> 
  );
};

export default Details;
