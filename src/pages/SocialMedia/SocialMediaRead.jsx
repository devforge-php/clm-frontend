import React from "react";
import { useQuery } from "@tanstack/react-query";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
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
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const { t } = useTranslation();

  // 1) Profile so‘rovi
  const {
    data: profile,
    isLoading: profileLoading,
  } = useQuery(
    ["profile"],
    () => $api.get("/profile").then((res) => res.data.user),
    {
      staleTime: 5 * 60 * 1000,      // 5 daqiqa ichida qaytmasa, cache’dan oladi
      refetchOnWindowFocus: false,  // har oynaga qaytishda qaytarmaydi
    }
  );

  // 2) Social Media so‘rovi
  const {
    data: socialMedia,
    isLoading: mediaLoading,
  } = useQuery(
    ["socialMedia"],
    () =>
      $api.get("/socialMedia").then((res) => {
        const arr = Array.isArray(res.data)
          ? res.data
          : res.data.data || [];
        return arr[0] || { id: null, telegram: "", instagram: "", facebook: "", youtube: "", twitter: "" };
      }),
    {
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    }
  );

  // Darhol qo‘lga olingan data
  const user = profile?.username || "Noma'lum";
  const usernames = {
    telegram: socialMedia.telegram,
    instagram: socialMedia.instagram,
    facebook: socialMedia.facebook,
    youtube: socialMedia.youtube,
    twitter: socialMedia.twitter,
  };
  const socialMediaId = socialMedia.id;

  // Edit va Add funksiyalari o‘xshash, faqat fetch keyin React Query invalidate qilamiz:
  const queryClient = useQueryClient();

  const handleSaveEdit = async (updated) => {
    const params = new URLSearchParams();
    Object.entries(updated).forEach(([k, v]) => {
      if (v) params.append(`${k}_user_name`, v);
    });
    if (socialMediaId) {
      await $api.put(`/socialMedia/${socialMediaId}?${params.toString()}`);
      queryClient.invalidateQueries(["socialMedia"]);
    }
    setOpenEdit(false);
  };

  const handleAddUsernames = async (newData) => {
    const payload = {};
    Object.entries(newData).forEach(([k, v]) => {
      payload[`${k}_user_name`] = v || "";
    });
    if (Object.values(payload).some((v) => v.trim())) {
      await $api.post("/socialMedia", payload);
      queryClient.invalidateQueries(["socialMedia"]);
    }
    setOpenAdd(false);
  };

  return (
    <div>
      <Helmet>
        <title>Social Media Links - CLM</title>
      </Helmet>
      <Card className="w-full max-w-[900px] mx-auto mt-4 ml-2">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex items-center justify-between gap-8 flex-wrap">
            <Typography variant="h5" color="blue-gray">
              {t("socialMediaLinks")}
            </Typography>
            <div className="flex gap-4">
              <Button size="sm" onClick={() => setOpenEdit(true)}>
                <PencilIcon className="h-4 w-4" /> Edit
              </Button>
              <Button size="sm" onClick={() => setOpenAdd(true)}>
                <UserPlusIcon className="h-4 w-4" /> Add Username
              </Button>
            </div>
          </div>
          <Typography variant="h5" color="gray" className="text-md">
            {t("member")}: {profileLoading ? user : user}
            {/* profileLoading faqat birinchi ochilishda bo‘ladi, staleTime ichida keyin chiqmaydi */}
          </Typography>
        </CardHeader>

        <CardBody className="px-0">
          {mediaLoading && (
            // Umuman loading spinner ishlatmaymiz, eski ma'lumot ko‘rinishi uchun bo‘sh qoldirmadik
            null
          )}
          <table className="w-full table-auto text-left">
            <thead>…</thead>
            <tbody>
              {Object.entries(usernames).map(
                ([platform, username]) =>
                  username && (
                    <tr key={platform}>
                      <td>
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </td>
                      <td>{username}</td>
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
          newUsernames={usernames}
          setNewUsernames={() => {}}
          handleAdd={handleAddUsernames}
        />
      </Card>
    </div>
  );
}
// //// 