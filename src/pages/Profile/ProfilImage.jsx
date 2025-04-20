import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { $api } from "../../utils/index";
import { Helmet } from "react-helmet";

export default function ProfileImage() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await $api.get("/profile");
        const imageUrl = response.data.profile.image_url;

        // Check if it's a full URL or relative path
        const finalUrl = imageUrl?.startsWith("http")
          ? imageUrl
          : `https://backendclm.uz/storage/${imageUrl}`;

        setProfileImage(finalUrl);
        console.log("Fetched profile data:", response.data);
      } catch (err) {
        setError("Profil rasmini olishda xatolik yuz berdi.");
        console.error("Error fetching profile image:", err);
        if (err?.status === 401) {
          navigate("/login");
          localStorage.clear();
        }
      }
    };
    fetchProfileImage();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Oldindan ko‘rish
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Iltimos, rasm tanlang!");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await $api.post("/profileImage", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Upload response:", response.data); // Backend’dan kelgan javobni tekshirish
      const newImageUrl = response.data.image_url; // Backend’dan kelgan yangi URL
      if (newImageUrl) {
        setProfileImage(`https://backendclm.uz/storage/${newImageUrl}`);
      } else {
        setError("Backend’dan rasm URL’i qaytmadi.");
      }
      navigate("/profile");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Rasmni yuklashda xatolik yuz berdi.";
      setError(errorMessage);
      console.error("Upload error:", err.response);
      if (err?.status === 401) {
        navigate("/login");
        localStorage.clear();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Change Profile Photo - CLM</title>
        <meta
          name="description"
          content="Upload or update your profile picture. Customize your appearance on the platform."
        />
      </Helmet>

      <div className="max-w-lg mx-auto p-8 bg-white border border-gray-300 rounded-lg shadow-lg mt-10 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Upload Profile Image
        </h2>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-center mb-4">
          <img
            src={
              profileImage ||
              "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
            }
            alt="Profile Preview"
            className="w-40 h-40   rounded-full "
          />
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-gray-700 file:bg-white hover:file:bg-gray-100"
          />

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Save Image"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
