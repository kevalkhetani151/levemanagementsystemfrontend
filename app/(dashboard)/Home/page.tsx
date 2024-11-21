"use client";

import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaThLarge, FaUsers, FaUserPlus } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import MeApi from "@/app/servercoponent/Me";
import AddpartenersPopup from "./Popup";

// Types for leave requests
interface LeaveRequest {
  leave_request_id: number;
  start_date: string;
  end_date: string;
  leave_days: number;
  status: string;
  reason: string;
  isUnpaid: boolean;
}

// Reusable StatCard component
const StatCard = ({
  label,
  icon,
  value,
}: {
  label: string;
  icon: React.ReactNode;
  value: string | number;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <span className="text-gray-700 font-medium">{label}</span>
      <div className="text-gray-500 text-xl">{icon}</div>
    </div>
    <div className="text-2xl font-bold text-gray-800 mt-3">{value}</div>
  </div>
);

const Dashboard = () => {
    
  // State for pipeline statistics
  const [pipelineData] = useState({
    pipelines: 0,
    activeLeads: 0,
    customers: 0,
  });

  // State for leave requests
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [items,setItems] = useState([])
  const [error, setError] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Fetch data from the server
  const fetchLeaveRequests = async () => {
    try {
      const response = await MeApi();
      if (response?.error) {
        toast.error(response.error, { position: "top-center" });
        return;
      }
      if (response?.data?.status === "error") {
        toast.error(response?.data?.message, { position: "top-center" });
      } else {
        toast.success(response?.message || "Data fetched successfully!", {
          position: "top-center",
        });
        setLeaveRequests(response?.data.leaveRequests || []);
        localStorage.setItem("token", response?.data?.token);
      }
    } catch (error) {
      console.error("Error fetching leave requests:", error);
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
      });
    }
  };

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);
  // Fetch data on component mount
  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  // Table headers
  const headers = [
    "Request ID",
    "Start Date",
    "End Date",
    "Leave Days",
    "Status",
    "Reason",
    "Unpaid",
  ];



  return (
    <div className="flex flex-col gap-6 bg-gray-100 w-full min-h-screen p-6">
      <h1 className="text-3xl font-bold text-blue-900">Dashboard</h1>

      {/* Statistics Section */}
      <div className="grid grid-cols-3 gap-6">
        <StatCard
          label="Available Leaves"
          icon={<FaThLarge />}
          value={pipelineData.pipelines}
        />
        <StatCard
          label="Paid Leaves"
          icon={<FaUsers />}
          value={pipelineData.activeLeads}
        />
        <StatCard
          label="Unpaid Leaves"
          icon={<FaUserPlus />}
          value={pipelineData.customers}
        />
      </div>

      {/* Leave Requests Table */}
      <div className="bg-white shadow-md  overflow-hidden">
        {/* Table Header */}
        <div className="flex bg-blue-600 text-white font-medium">
          {headers.map((header, index) => (
            <div key={index} className="flex-1 text-center py-3">
              {header}
            </div>
          ))}
        </div>

        {/* Table Rows */}
        {leaveRequests.map((request, index) => (
          <div
            key={request.leave_request_id}
            className={`flex py-3 ${
              index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
            } hover:bg-blue-100 transition`}
          >
            <div className="flex-1 text-center">{request.leave_request_id}</div>
            <div className="flex-1 text-center">
              {new Date(request.start_date).toLocaleDateString()}
            </div>
            <div className="flex-1 text-center">
              {new Date(request.end_date).toLocaleDateString()}
            </div>
            <div className="flex-1 text-center">{request.leave_days}</div>
            <div
              className={`flex-1 text-center font-bold ${
                request.status === "approved"
                  ? "text-green-600"
                  : request.status === "pending"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {request.status}
            </div>
            <div className="flex-1 text-center">{request.reason}</div>
            <div className="flex-1 text-center">
              {request.isUnpaid ? "Yes" : "No"}
            </div>
          </div>
        ))}
      </div>
      <div>
          <button
            className="bg-blue-800 text-white font-semibold rounded-md m-2 p-2 px-4"
            onClick={openPopup}
          >
            Create Leave
          </button>
          <AddpartenersPopup 
          //@ts-ignore
          isOpen={isPopupOpen} onClose={closePopup} setitems={setItems} />
        </div>

      <ToastContainer />
    </div>
  );
};

export default Dashboard;
