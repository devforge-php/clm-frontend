import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const ResetUsersModal = ({ isOpen, onClose, onSuccess }) => {
  const navigate = useNavigate(); 

  if (!isOpen) return null;

  const handleReset = async () => {
    try {
      await axios.post("https://backendclm.uz/admin/reset-users/");
      onClose();
      onSuccess?.(); 
      navigate("resetUsers");
    } catch (error) {
      console.error("Reset xatoligi:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Foydalanuvchilarni tiklash</h2>
        <p>Haqiqatan ham barcha foydalanuvchilarni reset qilmoqchimisiz?</p>
        <div className="mt-6 flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Bekor qilish</button>
          <button onClick={handleReset} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Ha, reset qilish</button>
        </div>
      </div>
    </div>
  );
};

export default ResetUsersModal;
