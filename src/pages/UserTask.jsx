import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import { $api } from "../utils/index";
import UsertaskCard from "../components/UsertaskCard";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

export default function UserTask() {
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await $api.get("/tasks");
        setTasks(response.data.data);
        // console.log(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        if (err?.status === 401) {
          navigate("/login");
          localStorage.clear();
        }
      }
    };

    fetchTasks();
  }, []);

  // Yuklanish holati
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography variant="h6" color="blue-gray">
          {t("yuklanmoqda")}...
        </Typography>
      </div>
    );
  }

  // Xatolik holati
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography variant="h6" color="red">
          {t("xatolikberdi")}: {error}
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>My Tasks - CLM</title>
        <meta
          name="description"
          content="See a list of tasks you need to complete. There are bonuses for each task."
        />
      </Helmet>
      <div className="container mx-auto px-4">
        {/* flex-col kichik ekranlar uchun, lg:flex-row esa katta ekranlar uchun */}
        <div className="flex flex-col mx-auto lg:flex-row gap-10 justify-center items-start mt-4">
          {/* Boshqa shartlar o‘zgarishsiz qoladi */}
          {!tasks || Object.keys(tasks).length === 0 ? (
            <Card className="w-full lg:w-1/2 p-4 shadow-lg">
              <CardBody className="px-0">
                <Typography variant="h5" color="red" className="text-center">
                  {t("vazifahaliberilmagan")}
                </Typography>
              </CardBody>
            </Card>
          ) : (
            <Card className="w-full lg:w-1/2 p-4 shadow-lg mb-4">
              <CardHeader
                floated={false}
                shadow={false}
                className="rounded-none"
              >
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="text-center mb-4"
                >
                  {t("adminVazifalari")}
                </Typography>

                {tasks.image ? (
                  <img
                    src={tasks.image_url}
                    alt="Task image"
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-t-lg">
                    <Typography variant="small" color="gray">
                      {t("rasmyoq")}
                    </Typography>
                  </div>
                )}
              </CardHeader>

              <CardBody className="space-y-2">
                {[
                  { label: t("id"), value: tasks.id },
                  { label: t("telegram"), value: tasks.telegram },
                  { label: t("instagram"), value: tasks.instagram },
                  { label: t("youtube"), value: tasks.youtube },
                  { label: t("twitter"), value: tasks.twitter },
                ].map(({ label, value }, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between border-b py-2 text-sm"
                  >
                    <Typography className="font-semibold">{label}:</Typography>
                    {value ? (
                      <a
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {value}
                      </a>
                    ) : (
                      <Typography>{t("yoq")}</Typography>
                    )}
                  </div>
                ))}

                <div className="mt-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold"
                  >
                    {t("adminIzohi")}:
                  </Typography>
                  <Typography variant="small" color="blue-gray">
                    {tasks.text || t("izohyoq")}
                  </Typography>
                </div>
              </CardBody>
            </Card>
          )}

          {/* Bu component ham yarim o‘lchamda tursin katta ekranda */}
          <div className="w-full lg:w-1/2">
            <UsertaskCard />
          </div>
        </div>
      </div>
    </div>
  );
}
