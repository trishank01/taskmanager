import React, { useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATH } from "../../Utils/apiPaths";
import { LuFileSpreadsheet } from "react-icons/lu";
import TaskStatusTabs from "../../components/TaskStatusTabs";

const ManageTask = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const navigate = useNavigate();

  const getAllTasks = async () => {
    try {
      const response = await axiosInstance.get(API_PATH.TASKS.GET_ALL_TASKS, {
        params: {
          status: filterStatus === "All" ? "" : filterStatus,
        },
      });
      setAllTasks(response.data?.tasks?.length > 0 ? response.data.tasks : []);

      // map statusSummary data with fixed labels and order
      const statusSummary = response.data?.statusSummary || {};

      const StatusArray = [
        { label: "All", count: statusSummary.all || 0 },
        { label: "Pending", count: statusSummary.pendingTasks || 0 },
        { label: "In Progress", count: statusSummary.InProgress || 0 },
        { label: "Completed", count: statusSummary.completed || 0 },
      ];

      setTabs(StatusArray);
    } catch (error) {
      console.error("Error getting all task", error);
    }
  };

  const handleClick = (taskData) => {
    navigate(`/admin/create-task`, { state: { taskId: taskData._id } });
  };

  // download task report
  const handleDownloadReport = async () => {};

  useEffect(() => {
    getAllTasks(filterStatus);
    return () => {};
  }, [filterStatus]);

  return (
    <DashboardLayout activeMenu="Manage Tasks">
      <div className="my-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl md:text-xl font-medium">My Task</h2>
            <button
              className="flex lg:hidden download-btn"
              onClick={handleDownloadReport}
            >
              <LuFileSpreadsheet className="text-lg" />
              Download Report
            </button>
          </div>
           

           {allTasks?.length > 0 && (
            <div className="flex items-center gap-3">
              <TaskStatusTabs
              tabs={tabs}
              activeTab={filterStatus}
              setActiveTab={setFilterStatus}
              />

              <button className="hidden lg:flex download-btn" onClick={handleDownloadReport}>

                <LuFileSpreadsheet className="text-lg"/>
                Download Report
              </button>
            </div>
           )}

        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageTask;
