import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";

import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

function Login() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(response?.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(response?.data?.data));
      navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card bg-base-300 shadow-xl w-full max-w-md">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>

          {!isLoginForm && (
            <>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder={isLoginForm ? "e.g. john@example.com" : ""}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-control mb-4 relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="input input-bordered w-full"
              placeholder={isLoginForm ? "Enter your password" : ""}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center mt-4">
              <button
                type="button"
                className="focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOffIcon className="  h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>
          <p
            className="mt-4 text-sm text-primary cursor-pointer text-center hover:underline"
            onClick={() => setIsLoginForm((prev) => !prev)}
          >
            {isLoginForm
              ? "New here? Sign up instead"
              : "Already have an account? Login"}
          </p>
          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-primary w-full"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
