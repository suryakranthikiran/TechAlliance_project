import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { removeUser } from "../../utils/userSlice";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleLogOut = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-md px-4 sm:px-6 flex-wrap">
      {/* Left: Logo / Brand */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-lg sm:text-xl normal-case">
          🧑‍💻 TechAlliance
        </Link>
      </div>

      {/* Right: User Section */}
      {user && (
        <div className="flex-none flex items-center gap-2 sm:gap-4">
          <p className="text-sm sm:text-base whitespace-nowrap">
            Welcome, <span className="font-semibold">{user?.firstName}</span>
          </p>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User avatar" src={user?.photoUrl} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile">My Profile</Link>
              </li>
              <li>
                <Link to="/connections">My Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <a onClick={handleLogOut}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
