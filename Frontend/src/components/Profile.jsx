import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((store) => store.user);

  return (
    user && (
      <div className="px-4 sm:px-6 md:px-10 max-w-screen-xl mx-auto">
        <EditProfile user={user} />
      </div>
    )
  );
}

export default Profile;
