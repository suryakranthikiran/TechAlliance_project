import React, { useState } from "react";
import Usercard from "./Usercard";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";

function EditProfile({ user }) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const response = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(response?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 px-4 py-10">
        {/* Form Section */}
        <div className="w-full max-w-md">
          <div className="card bg-base-300 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center text-xl sm:text-2xl">
                Edit Profile
              </h2>

              {/* First Name */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              {/* Last Name */}
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

              {/* Photo URL */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </div>

              {/* Age */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Age</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              {/* Gender */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Gender</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>

              {/* About */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">About</span>
                </label>
                <textarea
                  className="textarea textarea-info w-full"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </div>

              {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

              <div className="card-actions justify-center">
                <button
                  className="btn btn-primary w-full"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Card */}
        <div className="w-full max-w-md">
          <Usercard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
          />
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Saved Successfully.</span>
          </div>
        </div>
      )}
    </>
  );
}

export default EditProfile;
