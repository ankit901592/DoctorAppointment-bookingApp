import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { AppContext } from "../context/Appcontext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backEndUrl, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      image && formData.append("image", image);
      const { data } = await axios.post(
        `
        ${backEndUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Make sure token is valid and present
          },
        },
      );
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    userData && (
      <div className="max-w-2xl mx-auto pb-12 text-sm text-gray-700">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8">
          {isEdit ? (
            <label htmlFor="image" className="shrink-0 cursor-pointer">
              <div className="relative w-28 h-28 group">
                <img
                  className="w-full h-full object-cover rounded-2xl border border-gray-200"
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt="Profile"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <img
                    className="w-7 h-7"
                    src={assets.upload_icon}
                    alt="Upload"
                  />
                  <span className="text-white text-xs mt-1">Change Photo</span>
                </div>
              </div>

              <input
                hidden
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                type="file"
                id="image"
              />
            </label>
          ) : (
            <img
              className="w-28 h-28 object-cover rounded-2xl border border-gray-200 shrink-0"
              src={userData.image}
              alt="Profile"
            />
          )}

          <div className="flex-1 min-w-0">
            {isEdit ? (
              <input
                className="w-full max-w-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-2xl font-semibold text-gray-800 outline-none focus:border-primary"
                value={userData.name}
                type="text"
                placeholder="Enter your name"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            ) : (
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 break-words">
                {userData.name}
              </h1>
            )}

            <p className="text-gray-500 mt-2">
              {isEdit
                ? "Update your personal details below."
                : "Manage your personal information"}
            </p>

            {!isEdit && (
              <span className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Patient Profile
              </span>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <section className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 mb-5 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-primary">
              <span className="text-lg">@</span>
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-800">
                Contact Information
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Your email, phone and address
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-x-5 gap-y-5">
            <p className="font-medium text-gray-500 self-center">
              Email Address
            </p>
            <p className="text-gray-700 break-all py-2">{userData.email}</p>

            <p className="font-medium text-gray-500 self-center">
              Phone Number
            </p>
            {isEdit ? (
              <input
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary"
                value={userData.phone || ""}
                type="tel"
                placeholder="Enter phone number"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
              />
            ) : (
              <p className="py-2 text-gray-700">
                {userData.phone || "Not provided"}
              </p>
            )}

            <p className="font-medium text-gray-500 sm:self-start sm:pt-2">
              Address
            </p>

            {isEdit ? (
              <div className="flex flex-col gap-3">
                <input
                  className="w-full min-w-0 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary"
                  placeholder="Address line 1"
                  value={userData.address?.line1 || ""}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: {
                        ...(prev.address || {}),
                        line1: e.target.value,
                      },
                    }))
                  }
                />

                <input
                  className="w-full min-w-0 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary"
                  placeholder="Address line 2"
                  value={userData.address?.line2 || ""}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: {
                        ...(prev.address || {}),
                        line2: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            ) : (
              <p className="text-gray-700 leading-6 py-1 break-words">
                {userData.address?.line1 || "Address not provided"}
                {userData.address?.line2 && (
                  <>
                    <br />
                    {userData.address.line2}
                  </>
                )}
              </p>
            )}
          </div>
        </section>

        {/* Basic Information */}
        <section className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <span className="text-lg">♙</span>
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-800">
                Basic Information
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Your personal details
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-x-5 gap-y-5">
            <p className="font-medium text-gray-500 self-center">Gender</p>

            {isEdit ? (
              <select
                className="w-full sm:max-w-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    gender: e.target.value,
                  }))
                }
                value={userData.gender || ""}
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="py-2 text-gray-700">
                {userData.gender || "Not specified"}
              </p>
            )}

            <p className="font-medium text-gray-500 self-center">
              Date of Birth
            </p>

            {isEdit ? (
              <input
                className="w-full sm:max-w-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-primary"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    dob: e.target.value,
                  }))
                }
                value={userData.dob || ""}
                type="date"
              />
            ) : (
              <p className="py-2 text-gray-700">
                {userData.dob || "Not provided"}
              </p>
            )}
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {isEdit ? (
            <>
              <button
                type="button"
                className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:opacity-90 active:scale-95 transition-all"
                onClick={updateUserProfileData}
              >
                Save Information
              </button>

              <button
                type="button"
                className="border border-gray-300 text-gray-600 px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition-all"
                onClick={() => {
                  setIsEdit(false);
                  setImage(null);
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:opacity-90 active:scale-95 transition-all"
              onClick={() => setIsEdit(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
