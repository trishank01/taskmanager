/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { UserContext } from "../../context/userContext";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATH } from "../../Utils/apiPaths";
import moment from "moment";
import InfoCard from "../../components/Cards/InfoCard";
import { IoMdCard } from "react-icons/io";
import { addThousandsSeparator } from "../../Utils/helper";
import { LuArrowRight } from "react-icons/lu";
import TaskListTable from "../../components/TaskListTable";

const Dashboard = () => {
  useUserAuth();
  const { user } = useContext(UserContext);

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  const navigate = useNavigate();

  //Prepare chart Data

  const prepareChartData = (data) => {
    const taskDistribution = data?.taskDistribution || null;
    const taskPriorityLevels = data?.taskPriorityLevels || null;

    const taskDistrubuionData = [
      {status : "Pending", count : taskDistrubuionData?.Pending || 0},
      {status : "InProgress", count : taskDistrubuionData?.InProgress || 0},
      {status : "Completed", count : taskDistrubuionData?.Completed || 0},

    ]
  }

  const getDashboardData = async () => {
    try {
      const res = await axiosInstance.get(API_PATH.TASKS.GET_DASHBOARD_DATA);
      if (res.data) {
        setDashboardData(res.data);
      }
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };
  
  const onSeeMore = () => {
    navigate("/admin/tasks")
  }

  useEffect(() => {
    getDashboardData();

    return () => {};
  }, []);

  console.log(dashboardData);
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="card my-5">
        <div>
          <div className="col-span-3">
            <h2 className="text-xl md:text-2xl">Good Morning! {user?.name}</h2>
            <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
              {moment().format("dddd Do MMM YYYY")}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-6 mt-5">
          <InfoCard
            label="Total Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.All || 0
            )}
            color="bg-blue-500"
          />

          <InfoCard
            label="Pending Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.pending || 0
            )}
            color="bg-violet-500"
          />

          <InfoCard
            label="In Progress Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Inprogress || 0
            )}
            color="bg-cyan-500"
          />

          <InfoCard
            label="Pending Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Completed || 0
            )}
            color="bg-lime-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6">
        <div className="md:col-span-2">
          <div className="card">
            <h5 className="text-lg">Recent Tasks</h5>

            <button className="card-btn" onClick={onSeeMore}>
              See All <LuArrowRight className="text-base"/>
            </button>
          </div>
          <TaskListTable tableData={dashboardData?.recentTasks || []}/>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
