import React, { useEffect, useState } from "react";
import {
  ArrowUturnLeftIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button,
  Chip,
} from "@material-tailwind/react";
import { $apiAdmin } from "../../utils/index";
import { Helmet } from "react-helmet";
export default function UserDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const isAdmin = true;

  useEffect(() => {
    setLoading(true);
    $apiAdmin
      .get(`/admin/user/${id}`)
      .then((res) => {
        setUser(res.data.data);
        // console.log(res.data)
        setLoading(false);
      })
      .catch((err) => {
        console.error("Xatolik:", err);
        setLoading(false);
        if (err?.status === 401) {
          navigate("/login");
          localStorage.clear();
        }
      });
  }, [id]);

  const handleDelete = () => {
    $apiAdmin
      .delete(`/admin/user/${id}`)
      .then(() => {
        alert("Foydalanuvchi o‘chirildi.");
        setShowModal(false);
        navigate("/allUsers");
      })
      .catch((err) => {
        if (err?.status === 401) {
          navigate("/login");
          localStorage.clear();
        }
        alert("O‘chirishda xatolik yuz berdi.");
        console.error(err);
      });
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-600 text-lg">
        Yuklanmoqda...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-20 text-red-500 text-lg">
        Foydalanuvchi topilmadi.
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>User Details - CLM Admin</title>
        <meta
          name="description"
          content="View and analyze complete information about the selected user."
        />
      </Helmet>
      <div className="max-w-3xl mx-auto p-6 mt-10">
        <Card className="shadow-xl">
          <CardHeader floated={false} className="relative h-56 bg-blue-gray-50">
            <Avatar
              src={
                user?.profile?.image_url || "https://via.placeholder.com/150"
              }
              alt={`${user?.user?.firstname} ${user?.user?.lastname}`}
              size="xxl"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
            />
          </CardHeader>
          <CardBody className="p-6">
            <div className="text-center mb-6">
              <Typography variant="h4" color="blue-gray">
                {user?.user?.firstname} {user?.user?.lastname}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {user?.user?.username}
              </Typography>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Info */}
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Foydalanuvchi Ma'lumotlari
                </Typography>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-medium"
                    >
                      Email:
                    </Typography>
                    <Typography variant="small" color="blue-gray">
                      {user?.user?.email}
                    </Typography>
                  </div>
                  <div className="flex justify-between">
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-medium"
                    >
                      Telefon:
                    </Typography>
                    <Typography variant="small" color="blue-gray">
                      {user?.user?.phone}
                    </Typography>
                  </div>
                  <div className="flex justify-between">
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-medium"
                    >
                      Shahar:
                    </Typography>
                    <Typography variant="small" color="blue-gray">
                      {user?.user?.city}
                    </Typography>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Profil Ma'lumotlari
                </Typography>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-medium"
                    >
                      Level:
                    </Typography>
                    <Typography variant="small" color="blue-gray">
                      {user?.profile?.level}
                    </Typography>
                  </div>
                  <div className="flex justify-between">
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-medium"
                    >
                      Gold:
                    </Typography>
                    <Typography variant="small" color="blue-gray">
                      {user?.profile?.gold}
                    </Typography>
                  </div>
                  <div className="flex justify-between">
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-medium"
                    >
                      Referallar:
                    </Typography>
                    <Typography variant="small" color="blue-gray">
                      {user?.profile?.refferals}
                    </Typography>
                  </div>
                  <div className="flex justify-between">
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-medium"
                    >
                      Tasks:
                    </Typography>
                    <Typography variant="small" color="blue-gray">
                      {user?.profile?.tasks}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>

            {isAdmin && (
              <div className="mt-8 text-center flex">
                <Link to="/allUsers">
                  <Button
                    color="blue"
                    className="flex items-center gap-2 mx-auto"
                  >
                    <ArrowUturnLeftIcon className="h-5 w-5" />
                    Back
                  </Button>
                </Link>
                <Button
                  color="red"
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 mx-auto"
                >
                  <TrashIcon className="h-5 w-5" />
                  O‘chirish
                </Button>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <Typography variant="h6" color="blue-gray">
                  Tasdiqlash
                </Typography>
                <Button
                  variant="text"
                  color="gray"
                  onClick={() => setShowModal(false)}
                  className="p-1"
                >
                  <XMarkIcon className="h-5 w-5" />
                </Button>
              </div>
              <Typography color="gray" className="mb-6">
                Rostdan ham{" "}
                <span className="font-semibold text-red-600">
                  {user?.user?.firstname} {user?.user?.lastname}
                </span>{" "}
                foydalanuvchisini o‘chirmoqchimisiz?
              </Typography>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outlined"
                  color="gray"
                  onClick={() => setShowModal(false)}
                >
                  Bekor qilish
                </Button>
                <Button color="red" onClick={handleDelete}>
                  Ha, o‘chirish
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
