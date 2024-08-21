"use client";

// DO NOT EDIT 


import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ColDef, ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
// import "@ag-grid-community/styles/ag-grid.css";
// import "@ag-grid-community/styles/ag-theme-quartz.css";
import "@ag-grid-community/styles/ag-grid-theme-builder.css";
import React, { StrictMode, useMemo, useState } from "react";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const GridExample = () => {
  const [rowData, setRowData] = useState([
    {
      uploader_name: "Nihad",
      planter_name: "Adam",
      tree_name: "Mango",
      group_name: "ABCD",
      coordinator_name: "Noah",
      group_type: "PQR",
    },
    {
      uploader_name: "David",
      planter_name: "Joseph",
      tree_name: "Oak",
      group_name: "PEACE",
      coordinator_name: "Samuel",
      group_type: "XYZ",
    },
    {
      uploader_name: "Sarah",
      planter_name: "Rachel",
      tree_name: "Maple",
      group_name: "HOPE",
      coordinator_name: "Aaron",
      group_type: "ABC",
    },
    {
      uploader_name: "Michael",
      planter_name: "Benjamin",
      tree_name: "Cedar",
      group_name: "UNITY",
      coordinator_name: "Joshua",
      group_type: "PQR",
    },
    {
      uploader_name: "Rebecca",
      planter_name: "Leah",
      tree_name: "Birch",
      group_name: "LOVE",
      coordinator_name: "Caleb",
      group_type: "DEF",
    },
    {
      uploader_name: "Daniel",
      planter_name: "Elijah",
      tree_name: "Spruce",
      group_name: "FAITH",
      coordinator_name: "Nathan",
      group_type: "GHI",
    },
    {
      uploader_name: "Hannah",
      planter_name: "Miriam",
      tree_name: "Fir",
      group_name: "TRUTH",
      coordinator_name: "Gideon",
      group_type: "JKL",
    },
    {
      uploader_name: "Eli",
      planter_name: "Isaiah",
      tree_name: "Redwood",
      group_name: "LIGHT",
      coordinator_name: "Samuel",
      group_type: "MNO",
    },
    {
      uploader_name: "Naomi",
      planter_name: "Deborah",
      tree_name: "Cherry",
      group_name: "GRACE",
      coordinator_name: "Solomon",
      group_type: "QRS",
    },
    {
      uploader_name: "Joshua",
      planter_name: "Gideon",
      tree_name: "Ash",
      group_name: "POWER",
      coordinator_name: "Elisha",
      group_type: "TUV",
    },
    {
      uploader_name: "Esther",
      planter_name: "Ruth",
      tree_name: "Elm",
      group_name: "COURAGE",
      coordinator_name: "David",
      group_type: "WXY",
    },
    {
      uploader_name: "Caleb",
      planter_name: "Hosea",
      tree_name: "Willow",
      group_name: "STRENGTH",
      coordinator_name: "Jonathan",
      group_type: "ZAB",
    },
    {
      uploader_name: "Deborah",
      planter_name: "Hannah",
      tree_name: "Sycamore",
      group_name: "GLORY",
      coordinator_name: "Isaiah",
      group_type: "CDE",
    },

    {
      uploader_name: "Aaron",
      planter_name: "Samuel",
      tree_name: "Olive",
      group_name: "BLESSING",
      coordinator_name: "Jacob",
      group_type: "FGH",
    },
    {
      uploader_name: "Leah",
      planter_name: "Abigail",
      tree_name: "Palm",
      group_name: "MERCY",
      coordinator_name: "Jeremiah",
      group_type: "IJK",
    },
    {
      uploader_name: "Moses",
      planter_name: "Joshua",
      tree_name: "Pine",
      group_name: "REDEMPTION",
      coordinator_name: "Caleb",
      group_type: "LMN",
    },
    {
      uploader_name: "Jacob",
      planter_name: "Noah",
      tree_name: "Cypress",
      group_name: "SALVATION",
      coordinator_name: "Daniel",
      group_type: "OPQ",
    },
    {
      uploader_name: "Ruth",
      planter_name: "Naomi",
      tree_name: "Sequoia",
      group_name: "PEACE",
      coordinator_name: "Ezekiel",
      group_type: "RST",
    },
    {
      uploader_name: "Solomon",
      planter_name: "David",
      tree_name: "Cedar",
      group_name: "HOPE",
      coordinator_name: "Samuel",
      group_type: "UVW",
    },
    {
      uploader_name: "Jonathan",
      planter_name: "Goliath",
      tree_name: "Redwood",
      group_name: "UNITY",
      coordinator_name: "Nathan",
      group_type: "XYZ",
    },
    {
      uploader_name: "Ezekiel",
      planter_name: "Isaiah",
      tree_name: "Birch",
      group_name: "LOVE",
      coordinator_name: "Elijah",
      group_type: "ABC",
    },
    {
      uploader_name: "Abigail",
      planter_name: "Hosea",
      tree_name: "Maple",
      group_name: "TRUTH",
      coordinator_name: "Gideon",
      group_type: "DEF",
    },
  ]);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "uploader_name", headerName: "Uploader name" },
    { field: "planter_name", headerName: "Planter name" },
    { field: "tree_name", headerName: "Tree name" },
    { field: "group_name", headerName: "Group name" },
    { field: "coordinator_name", headerName: "Coordinator name" },
    { field: "group_type", headerName: "Group type" },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    };
  }, []);

  return (
    <div className=" bg-slate-100">
      <div className={"ag-theme-quartz"} style={{ height: 600 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
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
