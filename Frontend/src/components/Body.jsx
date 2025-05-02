import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../utils/userSlice";

function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const response = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(response?.data));
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/login");
      }
      // console.log(error);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content">
      {/* Navbar always on top */}
      <NavBar />

      {/* Main content grows to fill the space */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Outlet />
      </main>

      {/* Footer sticks to bottom */}
      <Footer />
    </div>
  );
}

export default Body;
