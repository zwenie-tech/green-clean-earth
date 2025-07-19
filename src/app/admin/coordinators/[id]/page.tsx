"use client";
import { ChevronLeft, Link } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CoordinatorForm } from "./coordinatorform";
import axios from "axios";
import { apiURL } from "@/app/requestsapi/request";
import Cookies from 'js-cookie';
import PaginationComponent from "../../PageComponent";

interface UserData {
  edu_district: string;
  edu_sub_district_name: string;
  sahodaya_name: string;
  block_name: string;
  project_name: string;
  chapter_name: string;
  zone_name: string;
  co_ord_name: string;
  email: string;
  username: string;
  group_type: string;
  cntry_name: string;
  st_name: string;
  dis_name: string;
  cop_name: string;
  lsg_name: string;
  gp_ward_no: string;
  gp_name: string;
  gp_refferal_name: string;
  co_ord_contact: string;
  co_ord_created_on: string;
  co_profession: string;
  type_name: string;
  gp_cat_name: string;
  co_username: string;
  co_email_id: string;
  gp_id: number;
}

interface InvitedUser {
  us_id: number;
  us_name: string;
  us_mobile: string;
}

interface InvitedCordinator {
  gp_id:number;
  co_ord_id: number;
  co_ord_name: string;
  co_ord_contact: string;
  gp_name: string;
}

function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const coId = pathname.split("/")[3];
  const token = Cookies.get("adtoken");

  const [userData, setUserData] = useState<UserData[]>([]);
  const [activeTab, setActiveTab] = useState<"users" | "cordinators">("users");
  const [invitedUsers, setInvitedUsers] = useState<InvitedUser[]>([]);
  const [invitedCords, setInvitedCords] = useState<InvitedCordinator[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [userTotalCount, setUserTotalCount] = useState(0);
  const [cordTotalCount, setCordTotalCount] = useState(0);

  const totalPages = activeTab === "users"
  ? Math.ceil(userTotalCount / limit)
  : Math.ceil(cordTotalCount / limit);


  const fetchInvitedData = async (type: "users" | "cordinators", pg = 1) => {
    const endpoint = type === "users" ? "/admin/invitedUsers" : "/admin/invitedCordinators";
    try {
      const response = await axios.post(
        `${apiURL}${endpoint}?page=${pg}&limit=${limit}`,
        { cordId: coId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        if (type === "users") {
          setInvitedUsers(response.data.invitedUsers || []);
          setUserTotalCount(response.data.total_count || 0);
        } else {
          setInvitedCords(response.data.invitedCordinators || []);
          setCordTotalCount(response.data.total_count || 0);
        }

      }
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
    }
  };

  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
    }
  }, [token]);

  useEffect(() => {
    async function fetchdata() {
      if (token) {
        try {
          const response = await axios.get(`${apiURL}/adminFrame/cordinatorDetails/${coId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.data.success && response.status !== 203) {
            const udata = response.data.cordinatorDetails[0];
            const allCookies = Cookies.get();
            Object.keys(allCookies).forEach(cookieName => {
              Cookies.remove(cookieName);
            });
            Cookies.set("adtoken", token, { expires: 1 });
            Cookies.set("co_ord_name", udata.co_ord_name, { expires: 1 });
            Cookies.set("co_email_id", udata.co_email_id, { expires: 1 });
            Cookies.set("co_username", udata.co_username, { expires: 1 });
            Cookies.set("co_ord_contact", udata.co_ord_contact, { expires: 1 });
            Cookies.set("co_profession", udata.co_profession, { expires: 1 });

            setUserData(response.data.cordinatorDetails);
            fetchInvitedData("users");
            fetchInvitedData("cordinators");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    }
    fetchdata();
  }, [token, coId]);

  useEffect(() => {
    if (activeTab === "users") {
      fetchInvitedData("users", currentPage);
    } else {
      fetchInvitedData("cordinators", currentPage);
    }
  }, [currentPage, activeTab]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <div
          className="flex items-center justify-start gap-2 my-4 cursor-pointer text-primary"
          onClick={() => window.history.back()}
        >
          <ChevronLeft />
          <span className="text-base">Manage coordinator</span>
        </div>
        <CoordinatorForm />
      </div>

      {/* --- Coordinator Details --- */}
      {userData[0] && (
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 p-2 md:p-5 md:border md:shadow-md md:rounded-lg">
          <div className="">
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-base">{userData[0].co_ord_name}</p>
          </div>
          <div className="">
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-base">{userData[0].co_email_id}</p>
          </div>
          <div className="">
            <p className="text-sm text-gray-500">Usernamer</p>
            <p className="text-base">{userData[0].co_username}</p>
          </div>
          <div className="">
            <p className="text-sm text-gray-500">Contact Number</p>
            <p className="text-base">{userData[0].co_ord_contact}</p>
          </div>
          <div className="">
            <p className="text-sm text-gray-500">Created Date</p>
            <p className="text-base">{userData[0].co_ord_created_on}</p>
          </div>
          <div className="">
            <p className="text-sm text-gray-500">Profession</p>
            <p className="text-base">{userData[0].co_profession}</p>
          </div>
          <div className="">
            <p className="text-sm text-gray-500">Group Name</p>
            <p className="text-base">{userData[0].gp_name}</p>
          </div>
          <div className="">
            <p className="text-sm text-gray-500">Group Type</p>
            <p className="text-base">{userData[0].group_type}</p>
          </div>
          <div className="">
            <p className="text-sm text-gray-500">School Type</p>
            <p className="text-base">{userData[0].type_name}</p>
          </div>
          <div className="">
            <p className="text-sm text-gray-500">School Category</p>
            <p className="text-base">{userData[0].gp_cat_name}</p>
          </div>
          {userData[0].edu_district ?
            <div className="">
              <p className="text-sm text-gray-500">Educational District</p>
              <p className="text-base">{userData[0].edu_district}</p>
            </div>
            : ""}
          {userData[0].edu_sub_district_name ?
            <div className="">
              <p className="text-sm text-gray-500">Educational Subdistrict </p>
              <p className="text-base">{userData[0].edu_sub_district_name}</p>
            </div>
            : ""}
          {userData[0].sahodaya_name ?
            <div className="">
              <p className="text-sm text-gray-500">Sahodaya</p>
              <p className="text-base">{userData[0].sahodaya_name}</p>
            </div>
            : ""}
          {userData[0].block_name ?
            <div className="">
              <p className="text-sm text-gray-500">Block</p>
              <p className="text-base">{userData[0].block_name}</p>
            </div>
            : ""}
          {userData[0].project_name ?
            <div className="">
              <p className="text-sm text-gray-500">Project </p>
              <p className="text-base">{userData[0].project_name}</p>
            </div>
            : ""}
          {userData[0].chapter_name ?
            <div className="">
              <p className="text-sm text-gray-500">Chapter </p>
              <p className="text-base">{userData[0].chapter_name}</p>
            </div>
            : ""}
          {userData[0].zone_name ?
            <div className="">
              <p className="text-sm text-gray-500">Zone </p>
              <p className="text-base">{userData[0].zone_name}</p>
            </div>
            : ""}
        </div>
      )}

      {/* --- Tabs --- */}
      <div className="mt-8">
        <div className="flex gap-4 border-b pb-2">
          <button
            className={`text-sm font-semibold ${activeTab === "users" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
            onClick={() => {
              setActiveTab("users");
              fetchInvitedData("users", 1);
              setPage(1);
            }}
          >
            Invited Users
          </button>
          <button
            className={`text-sm font-semibold ${activeTab === "cordinators" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
            onClick={() => {
              setActiveTab("cordinators");
              fetchInvitedData("cordinators", 1);
              setPage(1);
            }}
          >
            Invited Coordinators
          </button>
        </div>

        {/* --- Table --- */}
        <div className="mt-4 border rounded p-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <p className="text-sm text-gray-600 mb-2">
                  {activeTab === "users"
                    ? `Total Users: ${userTotalCount}`
                    : `Total Coordinators: ${cordTotalCount}`}
                </p>
                {activeTab === "users" ? (
                  <>
                    <th className="py-2 px-4">User Id</th>
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Mobile</th>
                  </>
                ) : (
                  <>
                    <th className="py-2 px-4">Group Id</th>
                    <th className="py-2 px-4">Group Name</th>
                    <th className="py-2 px-4">Coordinator Id</th>
                    <th className="py-2 px-4">Coordinator Name</th>
                    <th className="py-2 px-4">Contact</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {activeTab === "users"
                ? invitedUsers.map((item, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="py-2 px-4">{item.us_id}</td>
                      <td className="py-2 px-4">{item.us_name}</td>
                      <td className="py-2 px-4">{item.us_mobile}</td>
                    </tr>
                  ))
                : invitedCords.map((item, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="py-2 px-4">{item.gp_id}</td>
                      <td className="py-2 px-4">{item.gp_name}</td>
                      <td className="py-2 px-4">{item.co_ord_id}</td>
                      <td className="py-2 px-4">{item.co_ord_name}</td>
                      <td className="py-2 px-4">{item.co_ord_contact}</td>
                    </tr>
                  ))}
            </tbody>
          </table>

          {/* --- Pagination --- */}
          <div className="flex justify-end mt-4">
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
