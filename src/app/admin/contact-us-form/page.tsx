
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

const Contact = () => {
  const router = useRouter();
  const [rowData, setRowData] = useState([
    {
      id: 1,
      name: "John",
      email: "john@gmail.com",
      subject: "jonh",
      messege: "abc",
      LSGD: "India",
      district: "Kerala",
      
    },
    {
      id: 2,
      name: "John",
      email: "john@gmail.com",
      subject: "jonh",
      messege: "abc",
      LSGD: "India",
      district: "Kerala",
    },
    {
      id: 3,
      name: "John",
      email: "john@gmail.com",
      subject: "jonh",
      messege: "abc",
      LSGD: "India",
      district: "Kerala",
    },
    {
      id: 4,
      name: "John",
      email: "john@gmail.com",
      subject: "jonh",
      messege: "abc",
      LSGD: "India",
      district: "Kerala",},
    {
      id: 5,
      name: "John",
      email: "john@gmail.com",
      subject: "jonh",
      messege: "abc",
      LSGD: "India",
      district: "Kerala",
    }
  ]);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "name", headerName: "Name" },
    { field: "email", headerName: "Email" },
    { field: "subject", headerName: "Subject" },
    { field: "messege", headerName: "Messege" },
    { field: "LSGD", headerName: "LSGD" },
    { field: "district", headerName: "District " },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    };
  }, []);
  const onRowClicked = (event: RowClickedEvent) => {
   
    const id = event.data.id;
    router.push(`contact-us-form/${id}`);
  };

  return (
    <div className=" bg-slate-100">
      <button
          className= "text-white m-3 text-sm py-2 px-4 bg-[#3C6E1F] rounded-xl shadow-lg"
          
          // onClick={}
        >
          Export To Excel
        </button>
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
export default Contact;
