import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import {
  PowerIcon,
  UserCircleIcon,
  TrashIcon,
  PencilSquareIcon,
  PhotoIcon
} from "@heroicons/react/24/solid";
import SignOut from "../pages/Profile/SignOut"; // 🚀 Sign Out Modal
import { useTranslation } from 'react-i18next';
import { $api } from "../utils";


export default function AvatarMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation(); // 🌍 Tarjima funksiyasi
  
  const [imageUrl, setImageUrl] = useState("");


  const profileMenuItems = [
    { label: t("MyProfile"), icon: UserCircleIcon, path: "/profile" },
    { label: t("EditProfile"), icon: PencilSquareIcon, path: "/editProfile" },
    { label: t("ProfileImage"), icon: PhotoIcon, path: "/profileImage" },
    { label: t("SignOut"), icon: PowerIcon, path: "signOut" }, // 🚀 Modal orqali ishlaydi
  ];


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    $api
      .get("/profile")
      .then((res) => {
        const profileData = res.data.profile;
        if (profileData?.image_url) {
          setImageUrl(profileData.image_url);
        }
        // console.log(res)
      })
      .catch((err) => {
        console.error("Profil yuklanmadi:", err);
      });
  }, []);

  const handleNavigation = (path) => {
    setIsMenuOpen(false);
    if (path === "signOut") {
      setIsSignOutModalOpen(true); // Sign Out modal ochish
    } else if (path === "deleteAccount") {
      setIsDeleteModalOpen(true); // Delete Account modal ochish
    } else {
      navigate(path);
    }
  };

  const handleSignOut = () => {
    localStorage.clear(); 
    navigate("/login"); 
  };


  return (
    <>
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-center">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center rounded-full p-0"
          >
               <Avatar
              variant="circular"
              size="md"
              alt="User"
              withBorder={true}
              color="blue-gray"
              className="p-0.5"
              src={
                imageUrl || "https://docs.material-tailwind.com/img/face-2.jpg"
              }
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1 mt-6">
          {profileMenuItems.map(({ label, icon, path }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={label}
                onClick={() => handleNavigation(path)}
                className={`flex items-center gap-2 rounded ${
                  isLastItem ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10" : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>

      {/* 🔹 Sign Out Modal */}
      <SignOut
        isOpen={isSignOutModalOpen}
        onClose={() => setIsSignOutModalOpen(false)}
        onConfirm={handleSignOut}
      />

    </>
  );
}
