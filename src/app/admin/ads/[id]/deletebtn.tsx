"use client";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  ColDef,
  ModuleRegistry,
  RowClickedEvent,
} from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import "@/app/admin/ag-grid-theme-builder.css"
import { usePathname, useRouter } from "next/navigation";
import React, { StrictMode, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { apiURL } from "@/app/requestsapi/request";
import Cookies from 'js-cookie';
import * as XLSX from 'xlsx';
import { toast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";


const DeleteBtn = () => {
  const router = useRouter();
  const token = Cookies.get("adtoken");

  const pathname = usePathname();
  const coId = pathname.split("/")[3];
  const handleDelete = async () => {
    try {
      const response = await axios.post(`${apiURL}/adminEdit/addAds?recordId=${coId}`, {
        "isdeleted": true
    },{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
      if (response.data.success && response.status!=203) {
        toast({
            title: "Delete Successfully.",
            description: "",
          });


          setTimeout(function() {
            window.history.back();
          }, 1800);
      } else {
        console.error("Failed to export data");
      }
    } catch (error) {
      console.error("Error during exporting:", error);
    }
  };
  return (
    <div className="flex items-center justify-start gap-2 my-4 cursor-pointer text-primary ml-3" onClick={handleDelete}>
          <Trash2 />
          <span className="text-base">Delete</span>
        </div>
  );
};
export default DeleteBtn;
