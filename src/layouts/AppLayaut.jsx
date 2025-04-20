import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import SiteBar from "../components/SiteBar";
import Footer from "../components/Footer";

export default function AppLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Sidebar-ni ochish/yopish funksiyasi
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    // Kichik ekranlarda sidebar avtomatik yopiladi
    useEffect(() => {
        if (window.innerWidth < 700) {
            setIsSidebarOpen(false);
        }
    }, []);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <SiteBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <div className="flex flex-col w-full">
                {/* Navbar */}
                <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

                {/* Page Content */}
                <div className="h-[90vh] overflow-y-scroll">
                    <Outlet />
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
}