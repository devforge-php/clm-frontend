import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import SocialMediaTableDelete from "../../components/SocialMediaTableDelete";
import { Helmet } from "react-helmet";

export default function SocialMediaTable() {
  const [usernames, setUsernames] = useState({});
  const [socialMediaId, setSocialMediaId] = useState(null);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
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

  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    // 1️⃣ Profilni yuklaymiz
    fetchUserProfile();

    // 2️⃣ Cache’da usernames bormi? Agar bo‘lsa, ishlatamiz, aks holda API’dan so‘raymiz
    const cached = localStorage.getItem("usernames");
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && Object.keys(parsed).length > 0) {
        setUsernames(parsed);
        setLoading(false);
      } else {
        fetchUsernames();
      }
    } else {
      fetchUsernames();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await $api.get("/profile");
      setUser(response.data.user.username);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchUsernames = async () => {
    try {
      const response = await $api.get("/socialMedia");
      // API: response.data === Array || { data: Array }
      const dataArray = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];
      const firstItem = dataArray[0] || null;

      if (firstItem) {
        const { id, telegram, instagram, facebook, youtube, twitter } = firstItem;
        const obj = {
          telegram: telegram || "",
          instagram: instagram || "",
          facebook: facebook || "",
          youtube: youtube || "",
          twitter: twitter || "",
        };
        setSocialMediaId(id);
        setUsernames(obj);
        localStorage.setItem("usernames", JSON.stringify(obj));
      } else {
        // Agar ma'lumot bo‘sh bo‘lsa, keshni ham tozalaymiz
        setUsernames({});
        localStorage.removeItem("usernames");
      }
    } catch (err) {
      console.error("Error fetching usernames:", err);
      if (err.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = async (updated) => {
    try {
      const params = new URLSearchParams();
      Object.entries(updated).forEach(([key, val]) => {
        if (val && val.trim() !== "") {
          params.append(`${key}_user_name`, val.trim());
        }
      });
      if (socialMediaId) {
        await $api.put(`/socialMedia/${socialMediaId}?${params.toString()}`);
        await fetchUsernames();
      }
    } catch (err) {
      console.error("Error updating usernames:", err.response?.data || err.message);
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
      if (Object.values(payload).some((v) => v.trim() !== "")) {
        await $api.post("/socialMedia", payload);
        await fetchUsernames();
      }
    } catch (err) {
      console.error("Error adding usernames:", err);
    } finally {
      setOpenAdd(false);
    }
  };

  const handleDelete = async () => {
    try {
      await $api.delete("/socialMedia");
      setUsernames({});
      localStorage.removeItem("usernames");
    } catch (err) {
      console.error("Error deleting all usernames:", err);
    } finally {
      setOpenDelete(false);
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
              <Button size="sm" onClick={() => setOpenEdit(true)}>
                <PencilIcon strokeWidth={2} className="h-4 w-4" /> Edit
              </Button>
              <Button size="sm" onClick={() => setOpenAdd(true)}>
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add
                Username
              </Button>
              <Button size="sm" color="red" onClick={() => setOpenDelete(true)}>
                <TrashIcon strokeWidth={2} className="h-4 w-4" /> Delete All
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
        <SocialMediaTableDelete
          open={openDelete}
          handleClose={() => setOpenDelete(false)}
          handleDelete={handleDelete}
        />
      </Card>
    </div>
  );
}
