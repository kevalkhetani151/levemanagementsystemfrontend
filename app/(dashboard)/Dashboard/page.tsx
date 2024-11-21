"use client";

import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaThLarge, FaUsers, FaUserPlus } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import GetAllLeaves from "@/app/servercoponent/GetallLeaves";
import Cookies from "js-cookie";

// Types for leave requests
interface LeaveRequest {
  leave_request_id: number;
  start_date: string;
  end_date: string;
  leave_days: number;
  status: string;
  reason: string;
  isUnpaid: boolean;
  user: {
    first_name: string;
    last_name: string;
  };
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

  // Fetch leave requests data from the server
  const fetchLeaveRequests = async () => {
    try {
      const response = await GetAllLeaves();
      if (response?.error) {
        toast.error(response.error, { position: "top-center" });
        return;
      }
      toast.success("Data fetched successfully!", { position: "top-center" });
      setLeaveRequests(response?.data || []);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
      toast.error("An error occurred while fetching leave requests.", {
        position: "top-center",
      });
    }
  };

  // Function to update the status of a leave request
  const updateLeaveStatus = async (status: string, id: number) => {
    try {
    //   const token = Cookies.get("sessionToken");
    //   if (!token) {
    //     throw new Error("No token found in cookies");
    //   }

      const response = await fetch(`http://localhost:3000/approvedleave/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsIlJvbGUiOiJhZG1pbiIsImlhdCI6MTczMjE2Njk1MywiZXhwIjoxNzMyMTcwNTUzfQ.oWK03dUrfi7F9eyqQw6Yzq8o3TFIEvXj96GZ7HiVH20`,
        },
        body: JSON.stringify({ status }),
      });

      const result = await response.json();
      if (result.error) {
        toast.error(result.error, { position: "top-center" });
        return;
      }

      // Update the leaveRequests array
      setLeaveRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.leave_request_id === id
            ? { ...request, status }
            : request
        )
      );

      toast.success(result.message || "Status updated successfully!", {
        position: "top-center",
      });
    } catch (error) {
      console.error("Error updating leave status:", error);
      toast.error("An error occurred while updating leave status.", {
        position: "top-center",
      });
    }
  };

  // Fetch leave requests on component mount
  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  // Table headers
  const headers = [
    "Request ID",
    "Employee Name",
    "Start Date",
    "End Date",
    "Leave Days",
    "Status",
    "Reason",
    "Unpaid",
    "Action",
  ];

  async function sendMail(email:any) {
    const url = "http://localhost:3000/sendmail";
    const emailPayload = {
      to: `${email}`,
      subject: "confrim leave Request",
      text: "Thank you for signing up! We’re excited to have you onboard.",
      html: "<p>Your leave is approved</p>"
    };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailPayload),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Error: ${error.message}`);
      }
  
      const data = await response.json();
      console.log("Email sent successfully:", data);
      
    } catch (error) {
      console.error("Error sending email:", error);
     
    }
  }
  

  

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
      <div className="bg-white shadow-md overflow-hidden">
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
              {`${request.user.first_name} ${request.user.last_name}`}
            </div>
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
            <div className="flex-1 text-center">
              {/* Conditional rendering of action buttons based on leave request status */}
              {request.status === "pending" ? (
                <>
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                    onClick={() =>
                    {
                        sendMail(request.user.email)
                        updateLeaveStatus("approved", request.leave_request_id)
                    }
                      
                    }
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                    onClick={() =>
                      updateLeaveStatus("rejected", request.leave_request_id)
                    }
                  >
                    Reject
                  </button>
                </>
              ) : (
                <p>Send Mail</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Dashboard;
