import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaYoutube,
    FaTwitter,
    FaTelegramPlane,
} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-white border-t-2 border-blue-500 py-6 px-6 shadow-sm">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-600">
                    &copy; {new Date().getFullYear()} Team Project
                </p>
                <div className="flex space-x-6 text-gray-600 text-xl">
                    <a
                        href="https://www.instagram.com/company_logistics_marketing?igsh=MW9hd2E3cTg2aGF1eA=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-pink-500 hover:scale-125 transition-all duration-300"
                    >
                        <FaInstagram />
                    </a>
                    <a
                        href="https://www.facebook.com/share/18u5RT42PC/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 hover:scale-125 transition-all duration-300"
                    >
                        <FaFacebookF />
                    </a>
                    <a
                        href="https://www.youtube.com/@CompanyLogisticsMarketing_CLM"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-red-600 hover:scale-125 transition-all duration-300"
                    >
                        <FaYoutube />
                    </a>
                    <a
                        href="https://x.com/clmgoo/status/1911819399285055884?t=pGvTv4ELfEWDD8PxmFmhKw&s=19"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-sky-400 hover:scale-125 transition-all duration-300"
                    >
                        <FaTwitter />
                    </a>
                    <a
                        href="c"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-sky-500 hover:scale-125 transition-all duration-300"
                    >
                        <FaTelegramPlane />
                    </a>
                </div>
            </div>
        </footer>
    );
}
