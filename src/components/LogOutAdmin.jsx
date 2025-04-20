import React from "react";

const LogoutAdmin = ({ onClose, onLogOut }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Are you sure you want to log out?</h2>
                <div className="flex justify-between">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onLogOut}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutAdmin;
