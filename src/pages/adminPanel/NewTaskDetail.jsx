import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  DocumentPlusIcon,
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
import EditTaskModal from "../../components/EditTaskModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

const TABLE_HEAD = [
  "Image",
  "Telegram",
  "Instagram",
  "YouTube",
  "Twitter",
  "Text",
  "Number",
  "Reward",
  "Action",
];

export default function NewTaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState(null);  // Bitta task uchun
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [loading, setLoading] = useState(false);

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
      const response = await $apiAdmin.get(`admin/tasks/${id}`);
      // console.log(response.data.task);
      setTask(response.data?.task);  // Faqat bitta taskni saqlaymiz
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      if (error?.status === 401) {
        navigate("/login");
        localStorage.clear();
      }
      setTask(null);  // Taskni tozalash
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]); // `id` o'zgarganda qayta chaqiriladi

  const handleOpen = () => setOpen(!open);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleEditOpen = () => {
    setEditOpen(true);
    setEditId(task.id);
    setFormData({
      telegram: task.telegram || "",
      instagram: task.instagram || "",
      youtube: task.youtube || "",
      twitter: task.twitter || "",
      text: task.text || "",
      number: task.number || "",
      image: null,
      image_url: task.image_url || "",
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

      console.log("Update response:", response.data);

      await fetchData();
      setEditOpen(false);
      setEditId(null);
      setFormData({
        image: null,
        image_url: "",
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

  const handleDeleteOpen = () => {
    setTaskToDelete(task.id);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await $apiAdmin.delete(`admin/tasks/${taskToDelete}`);
      navigate("/newtask"); 
      // await fetchData();
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setDeleteOpen(false);
      setTaskToDelete(null);
    }
  };

  return (
    <Card className="h-full w-[600px] mx-auto m-4">
  <CardHeader floated={false} shadow={false} className="rounded-none p-4">
    <div className="mb-6 flex flex-col justify-between gap-8 md:flex-row md:items-center">
      <Typography variant="h5" color="blue-gray" className="text-3xl text-blue-500">
        New Task
      </Typography>
      <Link to='/newtask'>
        <Button variant="outlined" color="blue" className="mr-4 ">
          Back
        </Button>
      </Link>
    </div>
  </CardHeader>
  
  <CardBody className="px-0  ">
    <div className="flex justify-center mb-6 ">
      <Avatar
        src={task?.image_url || "https://www.example.com/logo.svg"}
        alt="Task Image"
        size="xl"
        className="mb-4 w-[100px] h-[100px]"
      />
    </div>

    <div className="space-y-4 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <Typography variant="h6">Telegram:</Typography>
          <Typography variant="small" color="blue-gray">{task?.telegram || "-"}</Typography>
        </div>
        <div className="flex flex-col">
          <Typography variant="h6">Instagram:</Typography>
          <Typography variant="small" color="blue-gray">{task?.instagram || "-"}</Typography>
        </div>
        <div className="flex flex-col">
          <Typography variant="h6">YouTube:</Typography>
          <Typography variant="small" color="blue-gray">{task?.youtube || "-"}</Typography>
        </div>
        <div className="flex flex-col">
          <Typography variant="h6">Twitter:</Typography>
          <Typography variant="small" color="blue-gray">{task?.twitter || "-"}</Typography>
        </div>
        <div className="flex flex-col">
          <Typography variant="h6">Text:</Typography>
          <Typography variant="small" color="blue-gray">{task?.text || "-"}</Typography>
        </div>
        <div className="flex flex-col">
          <Typography variant="h6">Number:</Typography>
          <Typography variant="small" color="blue-gray">{task?.number || "-"}</Typography>
        </div>
        <div className="flex flex-col">
          <Typography variant="h6">Reward:</Typography>
          <Typography variant="small" color="blue-gray">{task?.reward || "-"}</Typography>
        </div>
      </div>

      <div className="mt-6 flex space-x-4">
        <Tooltip content="Edit Task">
          <IconButton variant="text" className="text-yellow-700" onClick={handleEditOpen}>
            <PencilIcon className="h-4 w-4" />
          </IconButton>
        </Tooltip>
        <Tooltip content="Delete Task">
          <IconButton variant="text" className="text-red-700" onClick={handleDeleteOpen}>
            <TrashIcon className="h-4 w-4" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  </CardBody>

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
