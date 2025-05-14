/* eslint-disable no-unused-vars */
import DashboardLayout from "../../components/layout/DashboardLayout";
import { PRIOPITY_DATA } from "../../Utils/data";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATH } from "../../Utils/apiPaths";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { LuTrash2 } from "react-icons/lu";
import { useState } from "react";
import SelectDropDown from "../../components/inputs/SelectDropDown";
import SelectUsers from "../../components/inputs/SelectUsers";

const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};

  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: null,
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });

  const [currentTask, setCurrentTask] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setTaskData((prev) => ({ ...prev, [key]: value }));
  };

  const clearData = () => {
    //reset form
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: null,
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });
  };

  // Create Task
  const createTask = async () => {};

  // Update Task
  const updateTask = async () => {};

  const handleSumbit = async () => {};

  //get Task info by ID
  const getTaskDetailsByID = async () => {};

  // Delete Task
  const deleteTask = async () => {};

  return (
    <DashboardLayout activeMenu="Creat Task">
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-xl font-medium">
                {taskId ? "UpdateTask" : "CreateTask"}
              </h2>

              {taskId && (
                <button
                  className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500"
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className="" />
                  Delete
                </button>
              )}
            </div>
            <div className="mt-4">
              <label className="text-xs font-medium text-slate-600">
                Task Title
              </label>

              <input
                placeholder="Create App UI"
                className="form-input"
                value={taskData.title}
                onChange={({ target }) => {
                  handleValueChange("title", target.value);
                }}
              />
            </div>
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Description
              </label>
              <textarea
                placeholder="Describe task"
                className="form-input"
                rows={4}
                value={taskData.description}
                onChange={({ target }) => {
                  handleValueChange("description"), target.value;
                }}
              />
            </div>

            <div className="grid grid-cols-12 gap-4 mt-2">
                <div className="col-span-6 md:col-span-4">
                  <label className="text-xs font-medium text-slate-600">
                    Priority
                  </label>

                  <SelectDropDown
                  options={PRIOPITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleValueChange("prioprity" , value)}
                  placeholder="Select Priority"
                  />
                </div>

                <div className="col-span-6 md:col-span-4">
                  <label className="text-xs font-medium text-slate-600">
                    Due Date
                  </label>

                  <input placeholder="Create App UI" 
                  className="form-input"
                  value={taskData.dueDate}
                  onChange={({target}) => handleValueChange("dueDate" , target.value)}
                  type="date"
                  />
                </div>
               

               <div className="col-span-12 md:col-span-3">
                <label className="text-sx font-medium text-slate-600">
                  Assign To
                </label>

                <SelectUsers
                selectedUsers={taskData.assignedTo}
                setSelectedUsers={(value) => {
                   handleValueChange("assingedTo" , value)
                }}
                />
               </div>
          
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateTask;
