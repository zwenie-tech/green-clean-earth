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
  const token = Cookies.get("adtoken");

  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
    }
  }, [token, router]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "gp_name", headerName: "Group name" },
    { field: "group_type", headerName: "Group type" },
    { field: "school_category", headerName: "School category" },
    { field: "school_type", headerName: "School type" },
    { field: "edu_district", headerName: "Edu district" },
    { field: "edu_sub_district", headerName: "Edu sub district" },
    { field: "sahodaya", headerName: "Sahodaya" },
    { field: "block", headerName: "Block" },
    { field: "project", headerName: "Project" },
    { field: "chapter", headerName: "Chapter" },
    { field: "zone", headerName: "Zone" },
    { field: "st_name", headerName: "State" },
    { field: "cntry_name", headerName: "Country" },
    { field: "co_ord_name", headerName: "Coordinator name" },
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
      if(token){

        const response = await axios.post(`${apiURL}/admin/adminGroupList?limit=100000`,{},{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        if(response.data.success){
          setRowData(response.data.groupList);
        }
      }
    };
    fetchdata();
  }, [token]);
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
