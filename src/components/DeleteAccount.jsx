import React from "react";
import { Button } from "@material-tailwind/react";

export default function DeleteAccount({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null; // Modal ochilmagan bo‘lsa, hech narsa qaytarmaydi

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-red-600">Delete Account?</h2>
        <p className="text-gray-600 mb-6">
          This action is irreversible. All your data will be permanently deleted.
        </p>
        <div className="flex justify-end space-x-3">
          <Button color="gray" onClick={onClose}>
            Cancel
          </Button>
          <Button color="red" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
