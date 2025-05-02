import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../utils/constants";
import { removeUserFromFeed } from "../../utils/feedSlice";

function Usercard({ user }) {
  const dispatch = useDispatch();

  if (!user) return null;

  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
    user;

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <div className="card bg-base-300 shadow-xl w-full max-w-md mx-auto ">
      <figure className="w-full h-72 sm:h-80 overflow-hidden">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="object-cover w-full h-full"
        />
      </figure>

      <div className="card-body px-4 sm:px-6 py-4">
        <h2 className="card-title text-lg sm:text-xl font-semibold mb-1">
          {`${firstName} ${lastName}`}
        </h2>

        {age && gender && (
          <p className="text-sm sm:text-base text-gray-600 mb-1">
            Age: {age}, Gender: {gender}
          </p>
        )}

        {about && (
          <p className="text-sm sm:text-base text-gray-700 mb-1">
            About: {about}
          </p>
        )}

        {skills?.length > 0 && (
          <p className="text-sm sm:text-base text-gray-700">
            Skills: {skills.join(", ")}
          </p>
        )}

        <div className="card-actions mt-4 flex flex-col sm:flex-row gap-2 justify-between">
          <button
            className="btn btn-outline btn-secondary w-full sm:w-auto"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-outline btn-primary w-full sm:w-auto"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
}

export default Usercard;
