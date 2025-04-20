import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { $apiAdmin } from "../../utils/index";
import { Helmet } from "react-helmet";

export function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;

  useEffect(() => {
    setLoading(true);
    $apiAdmin
      .get(`/admin/user?page=${currentPage}&per_page=${perPage}`)
      .then((response) => {
        setUsers(response?.data?.data || []);
        // console.log(response.data.data);
        setTotalPages(response.data.total_pages || 1);
      })
      .catch((error) => {
        console.error("Foydalanuvchilarni yuklashda xatolik:", error);
        setLoading(false);
        if (error?.status === 401) {
          navigate("/login");
          localStorage.clear();
        }
      })
      .finally(() => setLoading(false));
  }, [currentPage]);

  console.log(users);

  return (
    <div>
      <Helmet>
        <title>All Users - CLM Admin</title>
        <meta
          name="description"
          content="View and control a list of all users through the admin panel."
        />
      </Helmet>
      <div className="px-2 sm:px-4 md:px-6 lg:px-8 py-4">
        <Card className="w-full max-w-full md:max-w-4xl mx-auto shadow-md">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <Typography variant="h5" color="blue-gray" className="text-center">
              Users List
            </Typography>
          </CardHeader>
          <CardBody className="px-0 overflow-x-auto">
            {loading ? (
              <Typography className="text-center text-gray-500">
                Loading...
              </Typography>
            ) : (
              <table className="mt-4 w-full min-w-[300px] sm:min-w-[400px] table-auto text-left text-sm">
                <thead>
                  <tr>
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-left">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        Member
                      </Typography>
                    </th>
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((i, index) => (
                    <tr key={index}>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={i?.profile?.image_url || "/default-avatar.png"}
                            alt={i?.user?.username}
                            size="md"
                          />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {i?.user?.username}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {i?.user?.email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Tooltip content="More Details">
                          <Link to={`/userDetails/${i?.user?.id}`}>
                            <IconButton variant="text">
                              <EllipsisHorizontalIcon className="w-6 h-6 text-gray-500" />
                            </IconButton>
                          </Link>
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardBody>
          <CardFooter className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              Page {currentPage} of {totalPages}
            </Typography>
            <div className="flex gap-2">
              <Button
                variant="outlined"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
