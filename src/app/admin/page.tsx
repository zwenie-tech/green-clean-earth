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
import "./ag-grid-theme-builder.css";
import { useRouter } from "next/navigation";
import React, { StrictMode, useMemo, useState } from "react";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const GridExample = () => {
  const router = useRouter();
  const [rowData, setRowData] = useState([
    {
      id: 1,
      uploader_name: "Nihad",
      planter_name: "Adam",
      tree_name: "Mango",
      group_name: "ABCD",
      coordinator_name: "Noah",
      group_type: "PQR",
    },
    {
      id: 2,
      uploader_name: "David",
      planter_name: "Joseph",
      tree_name: "Oak",
      group_name: "PEACE",
      coordinator_name: "Samuel",
      group_type: "XYZ",
    },
    {
      id: 3,
      uploader_name: "Sarah",
      planter_name: "Rachel",
      tree_name: "Maple",
      group_name: "HOPE",
      coordinator_name: "Aaron",
      group_type: "ABC",
    },
    {
      id: 4,
      uploader_name: "Michael",
      planter_name: "Benjamin",
      tree_name: "Cedar",
      group_name: "UNITY",
      coordinator_name: "Joshua",
      group_type: "PQR",
    },
    {
      id: 5,
      uploader_name: "Rebecca",
      planter_name: "Leah",
      tree_name: "Birch",
      group_name: "LOVE",
      coordinator_name: "Caleb",
      group_type: "DEF",
    },
    {
      id: 6,
      uploader_name: "Daniel",
      planter_name: "Elijah",
      tree_name: "Spruce",
      group_name: "FAITH",
      coordinator_name: "Nathan",
      group_type: "GHI",
    },
    {
      id: 7,
      uploader_name: "Hannah",
      planter_name: "Miriam",
      tree_name: "Fir",
      group_name: "TRUTH",
      coordinator_name: "Gideon",
      group_type: "JKL",
    },
    {
      id: 8,
      uploader_name: "Eli",
      planter_name: "Isaiah",
      tree_name: "Redwood",
      group_name: "LIGHT",
      coordinator_name: "Samuel",
      group_type: "MNO",
    },
    {
      id: 9,
      uploader_name: "Naomi",
      planter_name: "Deborah",
      tree_name: "Cherry",
      group_name: "GRACE",
      coordinator_name: "Solomon",
      group_type: "QRS",
    },
    {
      id: 10,
      uploader_name: "Joshua",
      planter_name: "Gideon",
      tree_name: "Ash",
      group_name: "POWER",
      coordinator_name: "Elisha",
      group_type: "TUV",
    },
    {
      id: 11,
      uploader_name: "Esther",
      planter_name: "Ruth",
      tree_name: "Elm",
      group_name: "COURAGE",
      coordinator_name: "David",
      group_type: "WXY",
    },
    {
      id: 12,
      uploader_name: "Caleb",
      planter_name: "Hosea",
      tree_name: "Willow",
      group_name: "STRENGTH",
      coordinator_name: "Jonathan",
      group_type: "ZAB",
    },
    {
      id: 13,
      uploader_name: "Deborah",
      planter_name: "Hannah",
      tree_name: "Sycamore",
      group_name: "GLORY",
      coordinator_name: "Isaiah",
      group_type: "CDE",
    },
    {
      id: 14,
      uploader_name: "Aaron",
      planter_name: "Samuel",
      tree_name: "Olive",
      group_name: "BLESSING",
      coordinator_name: "Jacob",
      group_type: "FGH",
    },
    {
      id: 15,
      uploader_name: "Leah",
      planter_name: "Abigail",
      tree_name: "Palm",
      group_name: "MERCY",
      coordinator_name: "Jeremiah",
      group_type: "IJK",
    },
    {
      id: 16,
      uploader_name: "Moses",
      planter_name: "Joshua",
      tree_name: "Pine",
      group_name: "REDEMPTION",
      coordinator_name: "Caleb",
      group_type: "LMN",
    },
    {
      id: 17,
      uploader_name: "Jacob",
      planter_name: "Noah",
      tree_name: "Cypress",
      group_name: "SALVATION",
      coordinator_name: "Daniel",
      group_type: "OPQ",
    },
    {
      id: 18,
      uploader_name: "Ruth",
      planter_name: "Naomi",
      tree_name: "Sequoia",
      group_name: "PEACE",
      coordinator_name: "Ezekiel",
      group_type: "RST",
    },
    {
      id: 19,
      uploader_name: "Solomon",
      planter_name: "David",
      tree_name: "Cedar",
      group_name: "HOPE",
      coordinator_name: "Samuel",
      group_type: "UVW",
    },
    {
      id: 20,
      uploader_name: "Jonathan",
      planter_name: "Goliath",
      tree_name: "Redwood",
      group_name: "UNITY",
      coordinator_name: "Nathan",
      group_type: "XYZ",
    },
    {
      id: 21,
      uploader_name: "Ezekiel",
      planter_name: "Isaiah",
      tree_name: "Birch",
      group_name: "LOVE",
      coordinator_name: "Elijah",
      group_type: "ABC",
    },
    {
      id: 22,
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
  const onRowClicked = (event: RowClickedEvent) => {
    // console.log(event.data);
    const id = event.data.id;
    router.push(`admin/uploads/${id}`);
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
