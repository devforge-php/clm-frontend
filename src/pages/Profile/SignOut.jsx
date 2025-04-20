import React, { useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate ,} from "react-router-dom";
export default function SignOut({ isOpen, onClose}) {
  if (!isOpen) return null; // Modal ochilmagan bo‘lsa, hech narsa qaytarmaydi
  const navigate = useNavigate(); // navigate hookni chaqiramiz
    // Escape tugmasi bosilganda modalni yopish
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);
  // Sign out confirm qilganda
  const handleSignOut = () => {
    // Tokenni o‘chiramiz
    localStorage.removeItem("token"); // yoki sessionStorage.removeItem("token");

    // Login sahifasiga yo‘naltiramiz
    navigate("/login");
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96"  onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
        <p className="text-gray-600 mb-6">Do you really want to sign out?</p>
        <div className="flex justify-end space-x-3">
          <Button color="gray" onClick={onClose}>
            Cancel
          </Button>
          <Button color="red" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
