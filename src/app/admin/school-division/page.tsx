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

const School = () => {
  const router = useRouter();
  const [rowData1, setRowData1] = useState([
    {
      id: 1,  
      district:"edfs",
      educationDist:"sdfghjkl;poi765r",
    },
    {
      id: 2,
      district:"edfs",
      educationDist:"sdfghjkl;poi765r",
    },
    {
      id: 3,
      district:"edfs",
      educationDist:"sdfghjkl;poi765r",
    },
    {
      id: 4,
      district:"edfs",
      educationDist:"sdfghjkl;poi765r",
    },
    {
      id: 5,
      district:"edfs",
      educationDist:"sdfghjkl;poi765r",
    }
  ]);
  const [rowData2, setRowData2] = useState([
    {
      id: 1,  
      district:"edfs",
      educationDist:"sdfghjkl;poi765r",
      educationsubdis:"ertyuijhbn"
    },
    {
      id: 2,
      district:"edfs",
      educationDist:"sdfghjkl;poi765r",
      educationsubdis:"ertyuijhbn"
    },
    {
      id: 3,
      district:"edfs",
      educationDist:"sdfghjkl;poi765r",
      educationsubdis:"ertyuijhbn"
    },
    {
      id: 4,
      district:"edfs",
      educationDist:"sdfghjkl;poi765r",
      educationsubdis:"ertyuijhbn"
    },
    {
      id: 5,
      district:"edfs",
      educationDist:"sdfghjkl;poi765r",
      educationsubdis:"ertyuijhbn"
    }
  ]);
  const [rowData3, setRowData3] = useState([
    {
      id: 1,  
      state:"edfs",
      sahodayaname:"sdfghjkl;poi765r",
    },
    {
      id: 2,  
      state:"edfs",
      sahodayaname:"sdfghjkl;poi765r",
    },
    {
      id: 3,  
      state:"edfs",
      sahodayaname:"sdfghjkl;poi765r",
    },
    {
      id: 4,
      state:"edfs",
      sahodayaname:"sdfghjkl;poi765r",
    },
    {
      id: 5,
      state:"edfs",
      sahodayaname:"sdfghjkl;poi765r",
    }
  ]);
  const [rowData4, setRowData4] = useState([
    {
      id: 1,  
      district:"edfs",
      block:"sdfghjkl;poi765r",
    },
    {
      id: 2,
      district:"edfs",
      block:"sdfghjkl;poi765r",
    },
    {
      id: 3,
      district:"edfs",
      block:"sdfghjkl;poi765r",
    },
    {
      id: 4,
      district:"edfs",
      block:"sdfghjkl;poi765r",
    },
    {
      id: 5,
      district:"edfs",
      block:"sdfghjkl;poi765r",
    }
  ]);
  const [rowData5, setRowData5] = useState([
    {
      id: 1,  
      district:"edfs",
      block:"sdfghjkl;poi765r",
      project:"wertygfgh"
    },
    {
      id: 2,
      district:"edfs",
      block:"sdfghjkl;poi765r",
      project:"wertygfgh"
    },
    {
      id: 3,
      district:"edfs",
      block:"sdfghjkl;poi765r",
      project:"wertygfgh"
    },
    {
      id: 4,
      district:"edfs",
      block:"sdfghjkl;poi765r",
      project:"wertygfgh"
    },
    {
      id: 5,
      district:"edfs",
      block:"sdfghjkl;poi765r",
      project:"wertygfgh"
    }
  ]);
  const [rowData6, setRowData6] = useState([
    {
      id: 1,  
      chapterType:"edfs",
      chapterName:"sdfghjkl;poi765r",
    },
    {
      id: 2,  
      chapterType:"edfs",
      chapterName:"sdfghjkl;poi765r",
    },
    {
      id: 3,  
      chapterType:"edfs",
      chapterName:"sdfghjkl;poi765r",
    },
    {
      id: 4,
      chapterType:"edfs",
      chapterName:"sdfghjkl;poi765r",
    },
    {
      id: 5,
      chapterType:"edfs",
      chapterName:"sdfghjkl;poi765r",
    }
  ]);
  const [rowData7, setRowData7] = useState([
    {
      id: 1,  
      chapterType:"edfs",
      chapterName:"sdfghjkl;poi765r",
      zoneName:"fgtyui"
    },
    {
      id: 2,  
      chapterType:"edfs",
      chapterName:"sdfghjkl;poi765r",
      zoneName:"fgtyui"
    },
    {
      id: 3,  
      chapterType:"edfs",
      chapterName:"sdfghjkl;poi765r",
      zoneName:"fgtyui"
    },
    {
      id: 4,
      chapterType:"edfs",
      chapterName:"sdfghjkl;poi765r",
      zoneName:"fgtyui"
    },
    {
      id: 5,
      chapterType:"edfs",
      chapterName:"sdfghjkl;poi765r",
      zoneName:"fgtyui"
    }
  ]);
  const [columnDefs1, setColumnDefs1] = useState<ColDef[]>([
    { field: "district", headerName: "District" },
    { field: "educationDist", headerName: "Education District" },
  ]);

  const [columnDefs2, setColumnDefs2] = useState<ColDef[]>([
    { field: "district", headerName: "District" },
    { field: "educationDist", headerName: "Education District" },
    { field: "educationsubdis", headerName: "Education Sub District" },
  ]);
  const [columnDefs3, setColumnDefs3] = useState<ColDef[]>([
    { field: "state", headerName: "State" },
    { field: "sahodayaname", headerName: "Sahodaya Name" },
  ]);
  const [columnDefs4, setColumnDefs4] = useState<ColDef[]>([
    { field: "district", headerName: "District" },
    { field: "block", headerName: "Block" },
  ]);
  const [columnDefs5, setColumnDefs5] = useState<ColDef[]>([
    { field: "district", headerName: "District" },
    { field: "block", headerName: "Block" },
    { field: "project", headerName: "Project" },
  ]);
  const [columnDefs6, setColumnDefs6] = useState<ColDef[]>([
    { field: "chapterType", headerName: "Chapter Type" },
    { field: "chapterName", headerName: "Chapter Name" },
  ]);
  const [columnDefs7, setColumnDefs7] = useState<ColDef[]>([
    { field: "chapterType", headerName: "Chapter Type" },
    { field: "chapterName", headerName: "Chapter Name" },
    { field: "zoneName", headerName: "Zone Name" },
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
          rowData={rowData1}
          columnDefs={columnDefs1}
          defaultColDef={defaultColDef}
          onRowClicked={onRowClicked}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 25, 50]}
        />
      </div>
      <div className={"ag-theme-quartz"} style={{ height: 600 }}>
        <AgGridReact
          rowData={rowData2}
          columnDefs={columnDefs2}
          defaultColDef={defaultColDef}
          onRowClicked={onRowClicked}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 25, 50]}
        />
      </div>
      <div className={"ag-theme-quartz"} style={{ height: 600 }}>
        <AgGridReact
          rowData={rowData3}
          columnDefs={columnDefs3}
          defaultColDef={defaultColDef}
          onRowClicked={onRowClicked}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 25, 50]}
        />
      </div>
      <div className={"ag-theme-quartz"} style={{ height: 600 }}>
        <AgGridReact
          rowData={rowData4}
          columnDefs={columnDefs4}
          defaultColDef={defaultColDef}
          onRowClicked={onRowClicked}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 25, 50]}
        />
      </div>
      <div className={"ag-theme-quartz"} style={{ height: 600 }}>
        <AgGridReact
          rowData={rowData5}
          columnDefs={columnDefs5}
          defaultColDef={defaultColDef}
          onRowClicked={onRowClicked}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 25, 50]}
        />
      </div>
      <div className={"ag-theme-quartz"} style={{ height: 600 }}>
        <AgGridReact
          rowData={rowData6}
          columnDefs={columnDefs6}
          defaultColDef={defaultColDef}
          onRowClicked={onRowClicked}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 25, 50]}
        />
      </div>
      <div className={"ag-theme-quartz"} style={{ height: 600 }}>
        <AgGridReact
          rowData={rowData7}
          columnDefs={columnDefs7}
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
export default School;
