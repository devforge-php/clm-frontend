import React, { useState , forwardRef} from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  CreditCardIcon,
  ClipboardDocumentCheckIcon,
  ShareIcon,
  KeyIcon,
  GlobeAltIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function SiteBar() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const role = localStorage.getItem("role");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const renderLink = (to, icon, label) => (
    <Link to={to} onClick={closeSidebar} className="text-white">
      <ListItem
        className={`${pathname === to ? "!bg-white !text-blue-600" : ""}`}
      >
        <ListItemPrefix>{icon}</ListItemPrefix>
        {label}
      </ListItem>
    </Link>
  );

  return (
    <>
      {/* Menu Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow-lg"
      >
        {isSidebarOpen ? "✖" : "☰"}
      </button>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed z-50 top-0 left-0 h-full w-[75%] max-w-xs bg-blue-500 transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:static md:translate-x-0 md:w-[20rem] md:block`}
      >
        <Card className="h-full p-4 bg-blue-500 !rounded-none overflow-y-auto">
          {/* Logo */}
          <div className="mb-2 flex items-center gap-4 justify-center">
            <Link to="/" className="flex items-center gap-2" onClick={closeSidebar}>
              <svg
                className="w-[50px] h-[50px]"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path d="M248 106.6c18.9-9 32-28.3 32-50.6c0-30.9-25.1-56-56-56s-56 25.1-56 56c0 22.3 13.1 41.6 32 50.6l0 98.8c-2.8 1.3-5.5 2.9-8 4.7l-80.1-45.8c1.6-20.8-8.6-41.6-27.9-52.8C57.2 96 23 105.2 7.5 132S1.2 193 28 208.5c1.3 .8 2.6 1.5 4 2.1l0 90.8c-1.3 .6-2.7 1.3-4 2.1C1.2 319-8 353.2 7.5 380S57.2 416 84 400.5c19.3-11.1 29.4-32 27.8-52.8l50.5-28.9c-11.5-11.2-19.9-25.6-23.8-41.7L88 306.1c-2.6-1.8-5.2-3.3-8-4.7l0-90.8c2.8-1.3 5.5-2.9 8-4.7l80.1 45.8c-.1 1.4-.2 2.8-.2 4.3c0 22.3 13.1 41.6 32 50.6l0 98.8c-18.9 9-32 28.3-32 50.6c0 30.9 25.1 56 56 56c30.7 0 55.6-24.7 56-55.2c-7.5-12.9-13.5-26.8-17.6-41.5c-4.2-4-9.1-7.3-14.4-9.9l0-98.8c2.8-1.3 5.5-2.9 8-4.7l10.5 6c5.5-15.3 13.1-29.5 22.4-42.5l-9.1-5.2c.1-1.4 .2-2.8 .2-4.3c0-22.3-13.1-41.6-32-50.6l0-98.8zM440.5 132C425 105.2 390.8 96 364 111.5c-19.3 11.1-29.4 32-27.8 52.8l-50.6 28.9c11.5 11.2 19.9 25.6 23.8 41.7L360 205.9c.4 .3 .8 .6 1.3 .9c21.7-9.5 45.6-14.8 70.8-14.8c2 0 4 0 5.9 .1c12.1-17.3 13.8-40.6 2.6-60.1zM432 512a144 144 0 1 0 0-288 144 144 0 1 0 0 288zm47.9-225c4.3 3.7 5.4 9.9 2.6 14.9L452.4 356l35.6 0c5.2 0 9.8 3.3 11.4 8.2s-.1 10.3-4.2 13.4l-96 72c-4.5 3.4-10.8 3.2-15.1-.6s-5.4-9.9-2.6-14.9L411.6 380 376 380c-5.2 0-9.8-3.3-11.4-8.2s.1-10.3 4.2-13.4l96-72c4.5-3.4 10.8-3.2 15.1 .6z"  />
              </svg>
              <Typography variant="h5" color="white" className="text-2xl">
                CLM
              </Typography>
            </Link>
          </div>

          <List>
            <hr className=" border-blue-gray-50 mb-4" />

            {role === "user" && (
              <>
                {renderLink(
                  "/dashboard",
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                  />
                </svg>,
                  t("dashboard")
                )}

                {renderLink("/socialMediaLink", <GlobeAltIcon className="h-5 w-5" />, t("sidebarAccounts"))}
                {renderLink("/referralGet", <KeyIcon className="h-5 w-5" />, t("referralGet"))}
                {renderLink("/referralPost", <ShareIcon className="h-5 w-5" />, t("referralPost"))}
                {renderLink("/userTask", <ClipboardDocumentCheckIcon className="h-5 w-5" />, t("userTask"))}
                {renderLink("/payment", <CreditCardIcon className="h-5 w-5" />, t("payment"))}
              </>
            )}

            {role === "admin" && (
              <>
                {renderLink("/newtask", <ClipboardDocumentListIcon className="h-5 w-5" />, t("newTask"))}
                {renderLink("/allUsers", <UserGroupIcon className="h-5 w-5" />, t("allUsers"))}
              </>
            )}

            {renderLink("docs", <DocumentTextIcon className="h-5 w-5" />, t("docs"))}
          </List>
        </Card>
      </div>
    </>
  );
}
