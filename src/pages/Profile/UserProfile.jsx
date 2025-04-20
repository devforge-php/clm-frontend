import React, { useEffect, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { $api } from "../../utils/index";
import { Helmet } from "react-helmet";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await $api.get("/profile");
        setUser(response.data);
        // console.log(response.data);
      } catch (err) {
        setError("Foydalanuvchi ma'lumotlarini olishda xatolik yuz berdi");
        if (err?.status === 401) {
          navigate("/login");
          localStorage.clear();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <p className="text-center mt-10">Yuklanmoqda...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div>
      <Helmet>
        <title>User Profile - CLM</title>
        <meta
          name="description"
          content="View and edit your personal profile. All information related to your CLM account is here."
        />
      </Helmet>

      <div className="max-w-lg mx-auto p-8 bg-white border border-gray-300 rounded-lg shadow-lg mt-10 text-center">
        {/* Profil rasmi */}
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-40">
            {/* Profile Image */}
            <img
              src={
                user?.profile?.image_url ||
                "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
              }
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover"
            />

            {/* Edit Icon (absolute positioning) */}
            <Link to="/profileImage">
              <PencilSquareIcon className="absolute bottom-2 right-2 w-8 h-8 text-gray-700 bg-white rounded-full p-1 shadow-md cursor-pointer hover:text-blue-500" />
            </Link>
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            {user?.user?.firstname} {user?.user?.lastname}
          </h2>
          <p className="text-gray-500 flex items-center justify-center gap-2">
            {user?.user?.username}
            <Link to="/editProfile">
              <PencilSquareIcon className="h-4 w-4 text-blue-500 cursor-pointer" />
            </Link>
          </p>
        </div>

        {/* Ma'lumotlar jadvali */}
        <div className="mt-6">
          {["username", "email", "city", "phone"].map((key, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-3 text-gray-700"
            >
              <span className="font-medium capitalize">{key}</span>
              <Link to="/editProfile">
                <span className="text-gray-600 flex items-center gap-2">
                  {user?.user?.[key] || "Noma'lum"}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
