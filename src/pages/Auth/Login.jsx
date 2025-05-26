/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { ValidateEmail } from "../../Utils/helper";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATH } from "../../Utils/apiPaths";
import { UserContext } from "../../context/userContext";
import Model from "../../components/Model";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!ValidateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    if (password.length < 8) {
      setError("Minimum 8 characters required");
      return;
    }

    let Passwordregax = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
    if (!Passwordregax.test(password)) {
      setError(
        "Password must contain at least 1 lowercase, 1 uppercase, 1 number, and 1 special character."
      );
      return;
    }

    setError("");

    // Login API Call
    try {
      const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        // Redirect based on role
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsModalOpen(true);
    }, 2500);
  }, []);

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black"> Welcome Back</h3>
        <p className="">Please enter your details to log in</p>
        <Model
          isOpen={isModalOpen}
          onclose={() => setIsModalOpen(false)}
          title="Login Crediential"
        >
          <div class="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6">
            <div>
              <h2 class="text-xl font-semibold text-gray-800">
                Admin Credential
              </h2>
              <p class="text-gray-600 mt-2">
                <span class="font-medium">Email:</span> jack@gmail.com
              </p>
              <p class="text-gray-600">
                <span class="font-medium">Password:</span> Test@123
              </p>
            </div>

            <div>
              <h2 class="text-xl font-semibold text-gray-800">User Credential</h2>
              <p class="text-gray-600 mt-2">Regular user access only</p>
              <p class="text-gray-600 mt-2">
                <span class="font-medium">Email:</span> satya1@gmail.com
              </p>
              <p class="text-gray-600">
                <span class="font-medium">Password:</span> Test@123
              </p>
            </div>

            <div>
              <h2 class="text-xl font-semibold text-gray-800">
                Admin Invite Code
              </h2>
              <p class="text-gray-600 mt-2">9621930</p>
            </div>
          </div>
        </Model>
        <form onSubmit={handleLogin} className="pt-4">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Enter your Password"
            placeholder="Min 8 characters"
            type="password"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            LOGIN
          </button>

          <p className="text-[13px] text-slate-800">
            Don't have an account{" "}
            <Link className="font-medium text-primary underline" to="/signup">
              SingUp
            </Link>
          </p>
        </form>
        <div className=" w-[160px] mt-6">
          <button onClick={() => setIsModalOpen(true)} className="btn-primary">admin credential</button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
