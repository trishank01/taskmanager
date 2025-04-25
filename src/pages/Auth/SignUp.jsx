/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { ValidateEmail } from "../../Utils/helper";
import ProfliePhotoSelector from "../../components/inputs/ProfliePhotoSelector";
import AuthLayout from "../../components/layout/AuthLayout";
import Input from "../../components/inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATH } from "../../Utils/apiPaths";
import uploadImage from "../../Utils/uploadImage";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");
  console.log("ProfilePicTop:", profilePic);

  const [error, setError] = useState(null);


  const {updateUser} = useContext(UserContext)
  const navigate = useNavigate();

  // Handle SignUp form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("ProfilePic in SignUp:", profilePic); // Ensure this logs the correct profilePic object
    
    let profileImageUrl = ''

    if (!fullName) {
      setError("Please enter full Name");
      return;
    }

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

    // SingUp API Call
    console.log("ProfilePicInSignUp", profilePic);
  
    try {
      // Upload Image if present
      if(profilePic){
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || 'no image'
      }
     
      const response = await axiosInstance.post(API_PATH.AUTH.REGISTER , {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminInviteToken,
      });
      const {token , role} = response.data

      if(token){
        localStorage.setItem("token" , token)
        updateUser(response.data)

          // Redirect based on role
          if(role === "admin"){
            navigate("/admin/dashboard")
          }else{
            navigate("/user/dashboard")
          }
      }
    } catch (error) {
       if(error.response && error.response.data.message){
        setError(error.response.data.message)
       }else{
        setError("Something went wrong. Please try again")
       }
    }


  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>
        <form onSubmit={handleSignUp}>
          <ProfliePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="full Name"
              placeholder="John cena"
              type="text"
            />

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
              label="Password"
              placeholder="Min 8 characters"
              type="password"
            />

            <Input
              value={adminInviteToken}
              onChange={({ target }) => setAdminInviteToken(target.value)}
              label="Admin Invite"
              placeholder="code"
              type="text"
            />
          </div>
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            SignUp
          </button>

          <p className="text-[13px] text-slate-800">
           Already have account {" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
