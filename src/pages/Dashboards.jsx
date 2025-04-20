import React, { useEffect, useState } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { $api } from "../utils/index"; 
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // window.location.href = "/login";
      return;
    }

    $api
      .get("/profile")
      .then((response) => {
        setProfile(response.data.profile);
        // console.log(response.data.profile);
      })
      .catch((error) => {
        // console.error("Error fetching profile:", error);
        setError(
          "🚨 Xatolik yuz berdi! 📌 Xatolik matni: " +
            error.response?.data?.message || "Noma’lum xatolik"
        );
        if(err?.status === 401){
          navigate('/login')
          localStorage.clear()
        }
      });
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography variant="h5" color="red" className="text-center">
          {error}
        </Typography>
      </div>
    );
  }

  return (
    <div>
     <Helmet>
        <title>Dashboard - CLM</title>
        <meta name="description" content="Overview of your CLM activity and subscriber stats." />
      </Helmet>

      <div className="container mx-auto p-4 flex flex-col ">
        <div>
          <h2 className="text-2xl font-semibold text-left text-blue-600 mb-4 mt-2">
            {t("profileStatistics")}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <InfoCard title="Gold" value={profile?.gold || 0} />
          <InfoCard title="Tasks" value={profile?.tasks || 0} />
          <InfoCard title="Referrals" value={profile?.refferals || 0} />
          <InfoCard title="Level" value={profile?.level || 0} />
        </div>
      </div>
    </div>
  );
}

const InfoCard = ({ title, value }) => (
  <Card className="border-2 border-blue-400 shadow-md transition-transform transform hover:scale-105 z-10">
    <CardBody className="flex flex-col items-center justify-center p-6">
      <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
        {title}
      </Typography>
      <Typography variant="h4" className="text-blue-500 font-bold text-center">
        {value}
      </Typography>
    </CardBody>
  </Card>
);
