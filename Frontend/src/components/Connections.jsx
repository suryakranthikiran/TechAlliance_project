import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../../utils/connectionSlice";

function Connections() {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(response?.data?.data));
    } catch (error) {
      console.error("Failed to fetch connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <h1 className="font-mono font-bold text-2xl text-center mt-10 px-4">
        No connections found...!!
      </h1>
    );
  }

  return (
    <div className="text-center my-10 px-4">
      <h1 className="font-mono font-bold text-3xl mb-6">My Connections</h1>

      <div className="space-y-6">
        {connections.map((connection) => {
          if (!connection) return null;
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div
              key={_id}
              className="flex flex-col md:flex-row gap-4 items-center md:items-start bg-base-300 shadow-md rounded-xl p-4 w-full max-w-2xl mx-auto"
            >
              <img
                className="h-24 w-24 rounded-full object-cover"
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
              />

              <div className="text-start">
                <h2 className="font-mono font-bold text-xl sm:text-2xl">
                  {firstName + " " + lastName}
                </h2>
                <p className="font-mono text-sm sm:text-base">{about}</p>
                {age && gender && (
                  <p className="font-mono text-sm sm:text-base text-gray-600">{`${age}, ${gender}`}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Connections;
