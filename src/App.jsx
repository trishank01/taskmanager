/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import SingUp from "./pages/Auth/SignUp";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Admin/Dashboard";
import ManageTask from "./pages/Admin/ManageTask";
import ManageUsers from "./pages/Admin/ManageUsers";
import CreateTask from "./pages/Admin/CreateTask";
import UserDashboard from "./pages/User/UserDashboard";
import MyTask from "./pages/User/MyTask";
import ViewTaskDetails from "./pages/User/ViewTaskDetails";
import UserProvider, { UserContext } from "./context/userContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <UserProvider>
        <div className="">
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SingUp />} />

              {/* Admin Routes */}
              <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/tasks" element={<ManageTask />} />
                <Route path="/admin/users" element={<ManageUsers />} />
                <Route path="/admin/create-task" element={<CreateTask />} />
              </Route>

              {/* User Routes */}
              <Route
                element={<PrivateRoute allowedRoles={["admin", "user"]} />}
              >
                <Route path="/user/dashboard" element={<UserDashboard />} />
                <Route path="/user/tasks" element={<MyTask />} />
                <Route
                  path="/user/task-details/:id"
                  element={<ViewTaskDetails />}
                />
              </Route>

              {/* Default Route */}

              <Route path="/" element={<Root />} />
            </Routes>
          </Router>
        </div>

        <Toaster
          toastOptions={{
            className: "",
            style: {
              fontSize: "13px",
            },
          }}
        />
      </UserProvider>
    </>
  );
}

export default App;

const Root = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <Outlet />;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return user.role === "admin" ? (
    <Navigate to="/admin/dashboard" />
  ) : (
    <Navigate to="/user/dashboard" />
  );
};
