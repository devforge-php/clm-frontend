import React, { useState, useEffect } from "react";
import {
  DocumentPlusIcon,
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { $apiAdmin } from "../../utils";
import NewTaskAddModal from "../../components/NewTaskAddModal";
import EditTaskModal from "../../components/EditTaskModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import { Link } from "react-router-dom";

const TABLE_HEAD = ["Image","ID", "Number", "Action"];

export default function NewTask() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [formData, setFormData] = useState({
    image: null,
    telegram: "",
    instagram: "",
    youtube: "",
    twitter: "",
    text: "",
    number: "",
    image_url: "",
  });

  const fetchData = async () => {
    try {
      const response = await $apiAdmin.get("admin/tasks");
      setTasks(
        Array.isArray(response.data)
          ? response.data?.data
          : response?.data?.data
      );
      // console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      if (error?.status === 401) {
        navigate("/login");
        localStorage.clear();
      }
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = () => setOpen(!open);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    // console.log("Selected file:", e.target.files[0]);
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSave = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("telegram", formData.telegram);
    formDataToSend.append("instagram", formData.instagram);
    formDataToSend.append("youtube", formData.youtube);
    formDataToSend.append("twitter", formData.twitter);
    formDataToSend.append("text", formData.text);
    formDataToSend.append("number", formData.number);
    formDataToSend.append("reward", "gold");

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      await $apiAdmin.post(
        "https://backendclm.uz/admin/tasks",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      await fetchData();
      setOpen(false);
      setFormData({
        image: null,
        telegram: "",
        instagram: "",
        youtube: "",
        twitter: "",
        text: "",
        number: "",
      });
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleEditOpen = (task) => {
    setEditOpen(true);
    setEditId(task.id);
    setFormData({
      telegram: task.telegram || "",
      instagram: task.instagram || "",
      youtube: task.youtube || "",
      twitter: task.twitter || "",
      text: task.text || "",
      number: task.number || "",
      image: null, // Yangi rasm hali tanlanmagan
      image_url: task.image_url || "", // Joriy rasm URL'ini saqlaymiz
    });
  };
  const handleUpdate = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("telegram", formData.telegram);
    formDataToSend.append("instagram", formData.instagram);
    formDataToSend.append("youtube", formData.youtube);
    formDataToSend.append("twitter", formData.twitter);
    formDataToSend.append("text", formData.text);
    formDataToSend.append("number", formData.number);
    formDataToSend.append("reward", "gold");

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await $apiAdmin.post(
        `admin/tasks/${editId}`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // API javobini tekshiramiz
      console.log("Update response:", response.data);

      // Ma'lumotlarni qayta yuklash
      await fetchData();
      // Modalni yopamiz va formani tozalaymiz
      setEditOpen(false);
      setEditId(null);
      setFormData({
        image: null,
        image_url: "", // image_urlni ham tozalaymiz
        telegram: "",
        instagram: "",
        youtube: "",
        twitter: "",
        text: "",
        number: "",
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteOpen = (id) => {
    setTaskToDelete(id);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await $apiAdmin.delete(`admin/tasks/${taskToDelete}`);
      await fetchData();
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setDeleteOpen(false);
      setTaskToDelete(null);
    }
  };

  return (
    <Card className="h-full  w-[500px]  m-4">
      <CardHeader floated={false} shadow={false} className="rounded-none p-4">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <Typography
            variant="h5"
            color="blue-gray"
            className="text-3xl text-blue-500"
          >
            New task
          </Typography>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <Button
              className="flex items-center gap-3"
              size="md"
              onClick={handleOpen}
            >
              <DocumentPlusIcon strokeWidth={2} className="h-4 w-4" /> Add
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-0  p-2">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task.id}>
                <td> <Avatar
                        src={task?.image_url || "https://www.example.com/logo.svg"}
                        alt="Task Image"
                        size="md"
                        className="mb-4 "
                      /></td>
                <td className="p-4">{task.id}</td>
                <td className="p-4">{task.number}</td>
                <td className="p-4">
                  <Tooltip content="View Details">
                    <Link to={`/newtaskDetail/${task.id}`}>
                      <IconButton variant="text" className="text-blue-700">
                        <EllipsisHorizontalIcon className="h-10 w-10" />
                      </IconButton>
                    </Link>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>

      <NewTaskAddModal
        open={open}
        handleOpen={handleOpen}
        formData={formData}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        handleSave={handleSave}
      />
      <EditTaskModal
        open={editOpen}
        handleOpen={() => setEditOpen(!editOpen)}
        formData={formData}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        handleUpdate={handleUpdate}
        editId={editId}
      />

      <DeleteConfirmationModal
        open={deleteOpen}
        handleClose={() => setDeleteOpen(false)}
        handleConfirm={handleDeleteConfirm}
      />
    </Card>
  );
}
