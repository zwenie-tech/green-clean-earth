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

const Activity = () => {
  const router = useRouter();
  const [rowData, setRowData] = useState([
    {
      id: 1,
      name: "John",
      activityLink: "john@gmail.com",
      Description: "jonh",
      viewLike: "abc",
      value: "India",
      groupname: "Kerala",
      schoolcategory:"MLP",
      schooltypr:"Tirur",
      eductionDist:"edfs",
      educationSubDist:12,
      sohodaya:"ABCD",
      block:"Anus",
      project:"edfs",
      chapter:12,
      conutry:"ABCD",
      state:"Anus"
    },
    {
      id: 2,
      name: "John",
      activityLink: "john@gmail.com",
      Description: "jonh",
      viewLike: "abc",
      value: "India",
      groupname: "Kerala",
      schoolcategory:"MLP",
      schooltypr:"Tirur",
      eductionDist:"edfs",
      educationSubDist:12,
      sohodaya:"ABCD",
      block:"Anus",
      project:"edfs",
      chapter:12,
      conutry:"ABCD",
      state:"Anus"
    },
    {
      id: 3,
      name: "John",
      activityLink: "john@gmail.com",
      Description: "jonh",
      viewLike: "abc",
      value: "India",
      groupname: "Kerala",
      schoolcategory:"MLP",
      schooltypr:"Tirur",
      eductionDist:"edfs",
      educationSubDist:12,
      sohodaya:"ABCD",
      block:"Anus",
      project:"edfs",
      chapter:12,
      conutry:"ABCD",
      state:"Anus"
    },
    {
      id: 4,
      name: "John",
      activityLink: "john@gmail.com",
      Description: "jonh",
      viewLike: "abc",
      value: "India",
      groupname: "Kerala",
      schoolcategory:"MLP",
      schooltypr:"Tirur",
      eductionDist:"edfs",
      educationSubDist:12,
      sohodaya:"ABCD",
      block:"Anus",
      project:"edfs",
      chapter:12,
      conutry:"ABCD",
      state:"Anus"},
    {
      id: 5,
      name: "John",
      activityLink: "john@gmail.com",
      Description: "jonh",
      viewLike: "abc",
      value: "India",
      groupname: "Kerala",
      schoolcategory:"MLP",
      schooltype:"Tirur",
      eductionDist:"edfs",
      educationSubDist:12,
      sohodaya:"ABCD",
      block:"Anus",
      project:"edfs",
      chapter:12,
      conutry:"ABCD",
      state:"Anus"
    }
  ]);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "name", headerName: "Name" },
    { field: "activityLink", headerName: "Activity Link" },
    { field: "Description", headerName: "Description" },
    { field: "viewLike", headerName: "View and Like" },
    { field: "value", headerName: "Value" },
    { field: "groupname", headerName: "Group Name" },
    { field: "schoolcategory", headerName: "School Category" },
    { field: "schooltype", headerName: "School Type" },
    { field: "eductionDist", headerName: "Education District" },
    { field: "educationSubDist", headerName: "Education Sub District" },
    { field: "sohodaya", headerName: "Sahodaya" },
    { field: "block", headerName: "Block" },
    { field: "project", headerName: "Project" },
    { field: "chapter", headerName: "Chapter" },
    { field: "conutry", headerName: "Conutry" },
    { field: "state", headerName: "State" },
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
    router.push(`activity/edit-activity/${id}`);
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
export default Activity;
