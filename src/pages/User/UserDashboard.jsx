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
import CustomPieChart from "../../components/Charts/CustomPieChart";
import CustomBarChart from "../../components/Charts/CustomBarChart";

const COLORS = ["#8D51FF", "#00B8DB", "#7BCE00"];

const UserDashboard = () => {
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

    const taskDistributionData = [
      { status: "Pending", count: taskDistribution?.Pending || 0 },
      { status: "InProgress", count: taskDistribution?.InProgress || 0 },
      { status: "Completed", count: taskDistribution?.Completed || 0 },
    ];
    setPieChartData(taskDistributionData);

    const PriorityLevelData = [
      { priority: "Low", count: taskPriorityLevels.low || 0 },
      { priority: "Medium", count: taskPriorityLevels?.Medium || 0 },
      { priority: "High", count: taskPriorityLevels?.High || 0 },
    ];

    setBarChartData(PriorityLevelData);
  };

  const getDashboardData = async () => {
    try {
      const res = await axiosInstance.get(API_PATH.TASKS.GET_USER_DASHBOARD_DATA);
      if (res.data) {
        setDashboardData(res.data);
        prepareChartData(res.data?.charts || null);
      }
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const onSeeMore = () => {
    navigate("/admin/tasks");
  };

  useEffect(() => {
    getDashboardData();

    return () => {};
  }, []);

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4 md:my-6">
          <div className="card">
            <h5 className="font-medium">Task Distrubtion</h5>
            <div className="flex items-center justify-between mt-2">
              <CustomPieChart
                data={pieChartData}
                label="Total Balance"
                colors={COLORS}
              />
            </div>
          </div>

          <div className="card">
            <h5 className="font-medium">Task Priority Levels</h5>
            <div className="flex items-center justify-between mt-2">
              <CustomBarChart
                data={barChartData}
                colors={COLORS}
              />
        
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="card">
            <h5 className="text-lg">Recent Tasks</h5>

            <button className="card-btn" onClick={onSeeMore}>
              See All <LuArrowRight className="text-base" />
            </button>
          </div>
          <TaskListTable tableData={dashboardData?.recentTasks || []} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
