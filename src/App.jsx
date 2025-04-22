import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SingUp from "./pages/Auth/SingUp";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Admin/Dashboard";
import ManageTask from "./pages/Admin/ManageTask";
import ManageUsers from "./pages/Admin/ManageUsers";
import CreateTask from "./pages/Admin/CreateTask";
import UserDashboard from "./pages/User/UserDashboard";
import MyTask from "./pages/User/MyTask";
import ViewTaskDetails from "./pages/User/ViewTaskDetails";


function App() {
  return (
    <>
      <div className="">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/singUp" element={<SingUp />} />

            {/* Admin Routes */}
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/tasks" element={<ManageTask />} />
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/admin/create-task" element={<CreateTask />} />
            </Route>

            {/* User Routes */}
            <Route element={<PrivateRoute allowedRoles={["admin", "user"]} />}>
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/user/my-task" element={<MyTask />} />
              <Route path="/user/task-details/:id" element={<ViewTaskDetails />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
