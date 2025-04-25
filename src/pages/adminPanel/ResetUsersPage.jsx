import React, { useState } from "react";
import ResetUsersModal from "../../components/ResetUsersModal";
import { useNavigate } from 'react-router-dom';

const ResetUsersPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate(); 

  const handleSuccess = () => {
    alert("Foydalanuvchilar muvaffaqiyatli reset qilindi.");
    setModalOpen(false);
    navigate("/admin/reset-users"); 
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Foydalanuvchilarni boshqarish</h1>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        Foydalanuvchilarni reset qilish
      </button>

      <ResetUsersModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default ResetUsersPage;
