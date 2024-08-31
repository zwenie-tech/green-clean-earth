"use client";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  ColDef,
  ModuleRegistry,
  RowClickedEvent,
} from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import "@/app/admin/ag-grid-theme-builder.css"
import { useRouter } from "next/navigation";
import React, { StrictMode, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { apiURL } from "@/app/requestsapi/request";
import Cookies from 'js-cookie';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const AdminGrid = () => {
  const router = useRouter();
  const [rowData, setRowData] = useState([]);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "name", headerName: "Name" },
    { field: "email", headerName: "Email" },
    { field: "mobile", headerName: "Mobile" },
    { field: "district", headerName: "District" },
    { field: "state", headerName: "State" },
    { field: "country", headerName: "Country" },
    { field: "address", headerName: "Address" },
    { field: "registered_date", headerName: "Registered date" },
    { field: "group_name", headerName: "Group name" },
    { field: "coordinator_name", headerName: "Coordinator name" },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    };
  }, []);
  const onRowClicked = (event: RowClickedEvent) => {

    const id = event.data.up_id;
    router.push(`admin/uploads/${id}`);
  };

  useEffect(() => {
    async function fetchdata(){
      // const token = Cookies.get('token');
      // const response = await axios.post(`${apiURL}/admin/adminUploads`,{},{
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   }
      // })
      // if(response.data.success){
      //   setRowData(response.data.Uploads);
      // }
    };
    // fetchdata();
  }, []);
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
export default AdminGrid;
