// import React from 'react'

// function Page() {
//   return (
//     <div>coordinators</div>
//   )
// }

// export default Page
"use client";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  ColDef,
  ModuleRegistry,
  RowClickedEvent,
} from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
// import "@ag-grid-community/styles/ag-grid.css";
// import "@ag-grid-community/styles/ag-theme-quartz.css";
import "../../admin/ag-grid-theme-builder.css";
import { useRouter } from "next/navigation";
import React, { StrictMode, useMemo, useState } from "react";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const GridExample = () => {
  const router = useRouter();
  const [rowData, setRowData] = useState([
    {
      id: 1,
      name: "John",
      email: "john@gmail.com",
      username: "jonh",
      group: "abc",
      country: "India",
      state: "Kerala",
      district:"MLP",
      cooperation:"Tirur",
      LSGD:"edfs",
      Ward:12,
      groupname:"ABCD",
      referredBy:"Anus"
    },
    {
      id: 2,
      name: "anus",
      email: "anus@gmail.com",
      username: "anu",
      group: "ertyuioiuyg",
      country: "India",
      state: "Kerala",
      district:"MLP",
      cooperation:"Tirur",
      LSGD:"Tirur",
      Ward:12,
      groupname:"ABCD",
      referredBy:"Alex"
    },
    {
      id: 3,
      name: "alex",
      email: "alex@gmail.com",
      username: "New York",
      group: "ertyuioiuyg",
      country: "India",
      state: "Kerala",
      district:"MLP",
      cooperation:"Tirur",
      LSGD:"Tirur",
      Ward:12,
      groupname:"ABCD",
      referredBy:"Anusz"
    },
    {
      id: 4,
      name: "John",
      email: "abc@gmail.com",
      username: "New York",
      group: "ertyuioiuyg",
      country: "India",
      state: "Kerala",
      district:"MLP",
      cooperation:"Tirur",
      LSGD:"Tirur",
      Ward:12,
      groupname:"ABCD",
      referredBy:"Anusz"},
    {
      id: 5,
      name: "John",
      email: "abc@gmail.com",
      username: "New York",
      group: "ertyuioiuyg",
      country: "India",
      state: "Kerala",
      district:"MLP",
      cooperation:"Tirur",
      LSGD:"Tirur",
      Ward:12,
      groupname:"ABCD",
      referredBy:"Anusz"
    },
    {
      id: 6,
      name: "John",
      email: "abc@gmail.com",
      username: "New York",
      group: "ertyuioiuyg",
      country: "India",
      state: "Kerala",
      district:"MLP",
      cooperation:"Tirur",
      LSGD:"Tirur",
      Ward:12,
      groupname:"ABCD",
      referredBy:"Anusz"
    },
    {
      id: 7,
      name: "John",
      email: "abc@gmail.com",
      username: "New York",
      group: "ertyuioiuyg",
      country: "India",
      state: "Kerala",
      district:"MLP",
      cooperation:"Tirur",
      LSGD:"Tirur",
      Ward:12,
      groupname:"ABCD",
      referredBy:"Anusz"
    },
    {
      id: 8,
      name: "John",
      email: "abc@gmail.com",
      username: "New York",
      group: "ertyuioiuyg",
      country: "India",
      state: "Kerala",
      district:"MLP",
      cooperation:"Tirur",
      LSGD:"Tirur",
      Ward:12,
      groupname:"ABCD",
      referredBy:"Anusz"
    },
    {
      id: 9,
      name: "John",
      email: "abc@gmail.com",
      username: "New York",
      group: "ertyuioiuyg",
      country: "India",
      state: "Kerala",
      district:"MLP",
      cooperation:"Tirur",
      LSGD:"Tirur",
      Ward:12,
      groupname:"ABCD",
      referredBy:"Anusz"
    },
    {
      id: 10,
      name: "John",
      email: "abc@gmail.com",
      username: "New York",
      group: "ertyuioiuyg",
      country: "India",
      state: "Kerala",
      district:"MLP",
      cooperation:"Tirur",
      LSGD:"Tirur",
      Ward:12,
      groupname:"ABCD",
      referredBy:"Anusz"
    },
    {
      id: 11,
      name: "John",
      email: "abc@gmail.com",
      username: "New York",
      group: "ertyuioiuyg",
      country: "India",
      state: "Kerala",
      district:"MLP",
      cooperation:"Tirur",
      LSGD:"Tirur",
      Ward:12,
      groupname:"ABCD",
      referredBy:"Anusz"
    },
    {
      id: 12,
      name: "John",
      email: "abc@gmail.com",
      username: "New York",
      group: "ertyuioiuyg",
      country: "India",
      state: "Kerala",
      district:"MLP",
      cooperation:"Tirur",
      LSGD:"Tirur",
      Ward:12,
      groupname:"ABCD",
      referredBy:"Anusz"
    },
    {
      id: 13,
      name: "John",
      email: "abc@gmail.com",
      username: "New York",
      group: "ertyuioiuyg",
      country: "India",
      state: "Kerala",
      district:"MLP",
      cooperation:"Tirur",
      LSGD:"Tirur",
      Ward:12,
      groupname:"ABCD",
      referredBy:"Anusz"
    },
    {
      id: 14,
      name: "John",
      email: "abc@gmail.com",
      username: "New York",
      group: "ertyuioiuyg",
      country: "India",
      state: "Kerala",
      district:"MLP",
      cooperation:"Tirur",
      LSGD:"Tirur",
      Ward:12,
      groupname:"ABCD",
      referredBy:"Anusz"
    },
    {
      id: 15,
      name: "John",
      email: "abc@gmail.com",
      username: "New York",
      group: "ertyuioiuyg",
      country: "India",
      state: "Kerala",
      district:"MLP",
      cooperation:"Tirur",
      LSGD:"Tirur",
      Ward:12,
      groupname:"ABCD",
      referredBy:"Anusz"
    },
    {
      id: 16,
      name: "John",
      email: "abc@gmail.com",
      username: "New York",
      group: "ertyuioiuyg",
      country: "India",
      state: "Kerala",
      district:"MLP",
      cooperation:"Tirur",
      LSGD:"Tirur",
      Ward:12,
      groupname:"ABCD",
      referredBy:"Anusz"
    },
    {
      id: 17,
      name: "John",
      email: "abc@gmail.com",
      username: "New York",
      group: "ertyuioiuyg",
      country: "India",
      state: "Kerala",
      district:"MLP",
      cooperation:"Tirur",
      LSGD:"Tirur",
      Ward:12,
      groupname:"ABCD",
      referredBy:"Anusz"
    },
    {
      id: 18,
      name: "John",
      email: "abc@gmail.com",
      username: "New York",
      group: "ertyuioiuyg",
      country: "India",
      state: "Kerala",
      district:"MLP",
      cooperation:"Tirur",
      LSGD:"Tirur",
      Ward:12,
      groupname:"ABCD",
      referredBy:"Anusz"
    },
    {
      id: 19,
      name: "John",
      email: "abc@gmail.com",
      username: "New York",
      group: "ertyuioiuyg",
      country: "India",
      state: "Kerala",
      district:"MLP",
      cooperation:"Tirur",
      LSGD:"Tirur",
      Ward:12,
      groupname:"ABCD",
      referredBy:"Anusz"
    },
    {
      id: 20,
      name: "John",
      email: "abc@gmail.com",
      username: "New York",
      group: "ertyuioiuyg",
      country: "India",
      state: "Kerala",
      district:"MLP",
      cooperation:"Tirur",
      LSGD:"Tirur",
      Ward:12,
      groupname:"ABCD",
      referredBy:"Anusz"
    },
    {
      id: 21,
      name: "John",
      email: "abc@gmail.com",
      username: "New York",
      group: "ertyuioiuyg",
      country: "India",
      state: "Kerala",
      district:"MLP",
      cooperation:"Tirur",
      LSGD:"Tirur",
      Ward:12,
      groupname:"ABCD",
      referredBy:"Anusz"
    },
    {
      id: 22,
      name: "John",
      email: "abc@gmail.com",
      username: "New York",
      group: "ertyuioiuyg",
      country: "India",
      state: "Kerala",
      district:"MLP",
      cooperation:"Tirur",
      LSGD:"Tirur",
      Ward:12,
      groupname:"ABCD",
      referredBy:"Anusz"
    },
  ]);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "name", headerName: "Name" },
    { field: "email", headerName: "Email" },
    { field: "username", headerName: "Username" },
    { field: "group", headerName: "Group" },
    { field: "country", headerName: "Country" },
    { field: "state", headerName: "State" },
    { field: "district", headerName: "District" },
    { field: "cooperation", headerName: "Cooperation" },
    { field: "LSGD", headerName: "LSGD" },
    { field: "Ward", headerName: "Ward" },
    { field: "groupname", headerName: "Group Name" },
    { field: "referredBy", headerName: "Referred By" },

  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    };
  }, []);
  const onRowClicked = (event: RowClickedEvent) => {
    // console.log(event.data);
    const id = event.data.id;
    router.push(`coordinators/edit-coordinator/${id}`);
  };

  return (
    <div className=" bg-slate-100">
      <div className={"ag-theme-quartz"} style={{ height: 600 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onRowClicked={onRowClicked}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 25, 50]}
        />
      </div>
    </div>
  );
};
export default GridExample;
