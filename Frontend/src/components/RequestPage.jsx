import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../../utils/requestSlice";

function Requests() {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.error("Error reviewing request:", error);
    }
  };

  const fetchRequest = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(response?.data?.data));
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return;

  if (requests.length === 0) {
    return (
      <h1 className="font-mono font-bold text-2xl m-10 text-center">
        No Requests Found...!!
      </h1>
    );
  }

  return (
    <div className="text-center my-10 px-4 sm:px-6 lg:px-10 max-w-screen-xl mx-auto">
      <h1 className="font-mono font-bold text-3xl mb-6">Connection Requests</h1>

      <div className="flex flex-col gap-6">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request?.fromUserId;

          return (
            <div
              key={_id}
              className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-md bg-base-300 shadow-md"
            >
              <img
                className="h-20 w-20 rounded-full object-cover"
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
              />

              <div className="text-center sm:text-left w-full">
                <h2 className="font-mono font-bold text-xl">
                  {firstName} {lastName}
                </h2>
                <p className="font-mono text-sm text-gray-700">{about}</p>
                {age && gender && (
                  <p className="font-mono text-sm mt-1">
                    {age}, {gender}
                  </p>
                )}

                <div className="mt-4 flex flex-col sm:flex-row justify-center sm:justify-start gap-2">
                  <button
                    className="btn btn-outline btn-secondary"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-outline btn-success"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Requests;
