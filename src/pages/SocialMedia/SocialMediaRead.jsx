import React, { useState, useEffect } from "react";
import { PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
} from "@material-tailwind/react";
import { $api } from "../../utils/index";
import { useTranslation } from "react-i18next";
import SocialMediaTableEdit from "../../components/SocialMediaTableEdit";
import SocialMediaTableAdd from "../../components/SocialMediaTableAdd";
import { Helmet } from "react-helmet";

export default function SocialMediaTable() {
  const [usernames, setUsernames] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [newUsernames, setNewUsernames] = useState({
    telegram: "",
    instagram: "",
    facebook: "",
    youtube: "",
    twitter: "",
  });
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [socialMediaId, setSocialMediaId] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetchUsernames();
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await $api.get("/profile");
      // console.log(response.data)
      const profileData = response.data;
       
      if (profileData && profileData.user) {
        setUser(profileData.user.username); // username
        localStorage.setItem("id", profileData.user.id); // foydalanuvchi id
      }
    } finally {
      setLoading(false);
    }
  };
  
  const fetchUsernames = async () => {
    try {
      const response = await $api.get("/socialMedia");
      const firstItem = response.data[0];
  
      if (firstItem) {
        const {
          id,
          telegram_user_name,
          instagram_user_name,
          facebook_user_name,
          youtube_user_name,
          twitter_user_name,
        } = firstItem;
  
        setSocialMediaId(id); // ID'ni saqlaymiz
        setUsernames({
          telegram: telegram_user_name || "",
          instagram: instagram_user_name || "",
          facebook: facebook_user_name || "",
          youtube: youtube_user_name || "",
          twitter: twitter_user_name || "",
        });
      }
    } catch (error) {
      console.error("Error fetching usernames:", error);
      if (error?.status === 401) {
        navigate("/login");
        localStorage.clear();
      }
    }
  };
  

  const handleSaveEdit = async (updatedUsernames) => {
    try {
      const userId = localStorage.getItem("id");
  
      const payload = {};
      if (updatedUsernames.telegram) payload.telegram_user_name = updatedUsernames.telegram;
      if (updatedUsernames.instagram) payload.instagram_user_name = updatedUsernames.instagram;
      if (updatedUsernames.facebook) payload.facebook_user_name = updatedUsernames.facebook;
      if (updatedUsernames.youtube) payload.youtube_user_name = updatedUsernames.youtube;
      if (updatedUsernames.twitter) payload.twitter_user_name = updatedUsernames.twitter;
  
      if (socialMediaId) {
        await $api.patch(`/socialMedia/${socialMediaId}`, payload);
        console.log("PATCH sent with:", payload);
        await fetchUsernames(); // reload data
      } else {
        console.warn("ID not available, PATCH request not sent.");
      }
    } catch (error) {
      console.error("Error updating usernames:", error.response?.data || error.message);
    } finally {
      setOpenEdit(false);
    }
  };
  

  const handleAddUsernames = async (newData) => {
    try {
      const payload = {
        telegram_user_name: newData.telegram || "",
        instagram_user_name: newData.instagram || "",
        facebook_user_name: newData.facebook || "",
        youtube_user_name: newData.youtube || "",
        twitter_user_name: newData.twitter || "",
      };
      const hasData = Object.values(payload).some((value) => value.trim() !== "");
      if (hasData) {
        await $api.post("/socialMedia", payload);
        await fetchUsernames(); // Yangi username qo'shilganda yangilash
      }
    } catch (error) {
      console.error("Error adding usernames:", error);
    } finally {
      setOpenAdd(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Social Media Links - CLM</title>
        <meta
          name="description"
          content="View and manage your subscriber acquisition links for Instagram, Telegram, YouTube, Facebook, and X (Twitter)."
        />
      </Helmet>
      <Card className="w-full max-w-[900px] mx-auto mt-4 ml-2">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex items-center justify-between gap-8 flex-wrap">
            <Typography variant="h5" color="blue-gray">
              {t("socialMediaLinks")}
            </Typography>
            <div className="flex gap-4">
              <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={() => setOpenEdit(true)}
              >
                <PencilIcon strokeWidth={2} className="h-4 w-4" /> Edit
              </Button>
              <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={() => setOpenAdd(true)}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add
                Username
              </Button>
            </div>
          </div>
          <Typography variant="h5" color="gray" className="text-md">
            {t("member")}: {loading ? "Loading..." : user || "Noma'lum"}
          </Typography>
        </CardHeader>

        <CardBody className="px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  Social Media
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  Username
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(usernames).map(
                ([platform, username]) =>
                  username && (
                    <tr key={platform}>
                      <td className="p-4 border-b border-blue-gray-50">
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        {username}
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </CardBody>

        <SocialMediaTableEdit
          open={openEdit}
          handleClose={() => setOpenEdit(false)}
          usernames={usernames}
          handleSave={handleSaveEdit}
        />
        <SocialMediaTableAdd
          open={openAdd}
          handleClose={() => setOpenAdd(false)}
          newUsernames={newUsernames}
          setNewUsernames={setNewUsernames}
          handleAdd={handleAddUsernames}
        />
      </Card>
    </div>
  );
}
