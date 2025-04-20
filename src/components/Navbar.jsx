import React, { useEffect, useState } from "react";
import AvatarMenu from "./AvatarMenu";
import { LanguageSwitch } from "./LanguageSwitch";
import "../js/i18n";
import LogoutAdmin from "./LogOutAdmin";
import { useNavigate } from "react-router-dom";

export default function Navbar({ toggleSidebar, isSidebarOpen }) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role === "admin") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, []);

    const handleLogOut = () => {
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        navigate("/login");
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div className="bg-white p-4 shadow-sm w-full flex justify-end items-center border-b-2 border-blue-500 md:px-8">
            {/* Menyu ikonasi (faqat kichik ekranlarda ko'rsatiladi) */}
            <button
                onClick={toggleSidebar}
                className={`focus:outline-none h-8 w-8 md:hidden ${isSidebarOpen ? "hidden" : ""}`}
            >
            </button>

            {/* O'ng tomondagi menyular */}
            <div className="flex items-center gap-6 pr-16 md:gap-6 pr-8">
                <input type="checkbox" id="switch-mode" hidden />
                <label htmlFor="switch-mode" className="switch-mode"></label>
                <a href="#" className="profile">
                    {isAdmin ? (
                        <>
                            <button onClick={toggleModal} className="text-blue-500">
                                Log Out
                            </button>
                            {showModal && (
                                <LogoutAdmin onClose={toggleModal} onLogOut={handleLogOut} />
                            )}
                        </>
                    ) : (
                        <AvatarMenu />
                    )}
                </a>
                <LanguageSwitch />
            </div>
        </div>
    );
}