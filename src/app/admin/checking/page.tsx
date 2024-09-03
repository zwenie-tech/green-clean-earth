"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input"
const TableComponent = () => {
  const router = useRouter();

  // Sample data
  const initialData = [
    { name: 'John', email: 'abc@gmail.com', username: 'New York', group: 'ertyuioiuyg', country: 'India', state: 'Kerala', district: 'MLP', cooperation: 'Tirur', LSGD: 'Tirur', Ward: '12', groupname: 'ABCD', referredBy: 'Anusz' },
    { name: 'Jane', email: 'xya@gmail.com', username: 'Los Angeles', group: 'ertyuioiuyg', country: 'India', state: 'Kerala', district: 'MLP', cooperation: 'Tirur', LSGD: 'Tirur', Ward: '12', groupname: 'ABCD', referredBy: 'Anusz' },
    { name: 'Mike', email: 'tyhb@gmail.com', username: 'Chicago', group: 'ertyuioiuyg', country: 'India', state: 'Kerala', district: 'MLP', cooperation: 'Tirur', LSGD: 'Tirur', Ward: '12', groupname: 'ABCD', referredBy: 'Anusz' },
  ];

  // State for table data
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState({
    name: '', email: '', username: '', group: '', country: '', state: '', district: '', cooperation: '', LSGD: '', Ward: '', groupname: '', referredBy: ''
  });

  // Handle search input in the second row
  const handleSearchChange = (e, column) => {
    const value = e.target.value;
    setSearchTerm(prev => ({ ...prev, [column]: value }));

    // Filter the table data based on the search
    const filteredData = initialData.filter(row =>
      row[column]?.toString().toLowerCase().includes(value.toLowerCase())
    );
    setData(filteredData);
  };

  // Handle double-click to navigate to another page
  const handleDoubleClick = (rowData) => {
    router.push(`/admin/checking/details?name=${rowData.name}&email=${rowData.email}&username=${rowData.username}&group=${rowData.group}&country=${rowData.country}&state=${rowData.state}&district=${rowData.district}&cooperation=${rowData.cooperation}&Ward=${rowData.Ward}&LSGD=${rowData.LSGD}&groupname=${rowData.groupname}&referredBy=${rowData.referredBy}`);
  };
  

  return (
    <div>
      <div className="container mx-auto p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-gray-200 rounded-t-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left rounded-tl-lg">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Username</th>
                <th className="py-3 px-6 text-left">Group</th>
                <th className="py-3 px-6 text-left">Country</th>
                <th className="py-3 px-6 text-left">State</th>
                <th className="py-3 px-6 text-left">District</th>
                <th className="py-3 px-6 text-left">Cooperation</th>
                <th className="py-3 px-6 text-left">LSGD</th>
                <th className="py-3 px-6 text-left">Ward</th>
                <th className="py-3 px-6 text-left">Group Name</th>
                <th className="py-3 px-6 text-left rounded-tr-lg">Referred By</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td ><input className="rounded-md border-primary outline-primary-300 border rounded-md px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 gap-5" type="text" placeholder="Search Name" value={searchTerm.name} onChange={(e) => handleSearchChange(e, 'name')} /></td> 
                <td ><input className="rounded-md border-primary outline-primary-300 border rounded-md px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 gap-5" type="email" placeholder="Search Email" value={searchTerm.email} onChange={(e) => handleSearchChange(e, 'email')} /></td>
                <td><input  className="rounded-md border-primary outline-primary-300 border rounded-md px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 gap-5"type="text" placeholder="Search Username" value={searchTerm.username} onChange={(e) => handleSearchChange(e, 'username')} /></td>
                <td><input className="rounded-md border-primary outline-primary-300 border rounded-md px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 gap-5" type="text" placeholder="Search Group" value={searchTerm.group} onChange={(e) => handleSearchChange(e, 'group')} /></td>
                <td><input className="rounded-md border-primary outline-primary-300 border rounded-md px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 gap-5" type="text" placeholder="Search Country" value={searchTerm.country} onChange={(e) => handleSearchChange(e, 'country')} /></td>
                <td><input className="rounded-md border-primary outline-primary-300 border rounded-md px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 gap-5" type="text" placeholder="Search State" value={searchTerm.state} onChange={(e) => handleSearchChange(e, 'state')} /></td>
                <td><input className="rounded-md border-primary outline-primary-300 border rounded-md px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 gap-5" type="text" placeholder="Search District" value={searchTerm.district} onChange={(e) => handleSearchChange(e, 'district')} /></td>
                <td><input className="rounded-md border-primary outline-primary-300 border rounded-md px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 gap-5" type="text" placeholder="Search Cooperation" value={searchTerm.cooperation} onChange={(e) => handleSearchChange(e, 'cooperation')} /></td>
                <td><input className="rounded-md border-primary outline-primary-300 border rounded-md px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 gap-5" type="text" placeholder="Search LSGD" value={searchTerm.LSGD} onChange={(e) => handleSearchChange(e, 'LSGD')} /></td>
                <td><input className="rounded-md border-primary outline-primary-300 border rounded-md px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 gap-5" type="text" placeholder="Search Ward" value={searchTerm.Ward} onChange={(e) => handleSearchChange(e, 'Ward')} /></td>
                <td><input className="rounded-md border-primary outline-primary-300 border rounded-md px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 gap-5" type="text" placeholder="Search Group Name" value={searchTerm.groupname} onChange={(e) => handleSearchChange(e, 'groupname')} /></td>
                <td><input className="rounded-md border-primary outline-primary-300 border rounded-md px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 gap-5" type="text" placeholder="Search Referred By" value={searchTerm.referredBy} onChange={(e) => handleSearchChange(e, 'referredBy')} /></td>
              </tr>
              {data.map((row, index) => (
                <tr key={index} onDoubleClick={() => handleDoubleClick(row)}>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.username}</td>
                  <td>{row.group}</td>
                  <td>{row.country}</td>
                  <td>{row.state}</td>
                  <td>{row.district}</td>
                  <td>{row.cooperation}</td>
                  <td>{row.LSGD}</td>
                  <td>{row.Ward}</td>
                  <td>{row.groupname}</td>
                  <td>{row.referredBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
