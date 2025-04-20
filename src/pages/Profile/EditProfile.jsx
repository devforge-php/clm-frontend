import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { $api } from "../../utils/index";
import { Helmet } from "react-helmet";

export default function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    city: "",
    phone: "",
    email: "",
    password: "",
    profileImage: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🚀 **API orqali user ma’lumotlarini olish**
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await $api.get("/profile");
        setFormData(response.data.user); // Ma’lumotlarni holatga yuklash
      } catch (err) {
        setError("Foydalanuvchi ma'lumotlarini olishda xatolik yuz berdi.");
        console.error("Error:", err);
        if (err?.status === 401) {
          navigate("/login");
          localStorage.clear();
        }
      }
    };

    fetchUserData();
  }, []);

  // 🔄 **Input qiymatlarini o‘zgartirish**
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ **Profilni yangilash**
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await $api.post("/profile", formData); // Token bilan POST so‘rov yuborish
      navigate("/profile");
    } catch (err) {
      setError("Ma'lumotlarni yangilashda xatolik yuz berdi.");
      console.error("Error:", err);
      if (err?.status === 401) {
        navigate("/login");
        localStorage.clear();
      }
    } finally {
      setLoading(false);
    }
  };

  // Filtrlash uchun kerakli maydonlarni aniqlash
  const editableFields = Object.keys(formData).filter(
    (key) => key !== "profileImage" && key !== "id" // 'id' ni chiqarib tashlaymiz
  );

  return (
    <div>
      <Helmet>
        <title>Edit Profile - CLM</title>
        <meta
          name="description"
          content="Edit user information page. Change your name, login, email, and other details."
        />
      </Helmet>

      <div className="max-w-[600px] mx-auto p-8 bg-white border border-gray-300 rounded-lg shadow-lg mt-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Edit Profile
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {editableFields.map((key) => (
            <div key={key}>
              <label className="block text-gray-700 font-medium capitalize">
                {key}
              </label>
              <input
                type={key === "password" ? "password" : "text"}
                name={key}
                value={formData[key] || ""}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
          ))}

          <div className="flex justify-between items-center mt-4">
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
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
