import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../../utils/feedSlice";
import Usercard from "./Usercard";

function Feed() {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed && feed.length > 0) return;
    try {
      const response = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(response?.data?.data));
    } catch (error) {
      console.error("Failed to fetch feed:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (feed.length === 0) {
    return (
      <div className="text-center mt-10 text-lg font-mono font-semibold">
        No users were found.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 px-4 py-8">
      {feed.map((user) => (
        <Usercard key={user._id} user={user} />
      ))}
    </div>
  );
}

export default Feed;
