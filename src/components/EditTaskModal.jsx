import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
  Textarea,
  Avatar,
  Typography,
} from "@material-tailwind/react";

export default function EditTaskModal({
  open,
  handleOpen,
  formData,
  handleInputChange,
  handleImageChange,
  handleUpdate,
}) {
  return (
    <Dialog open={open} handler={handleOpen} size="md">
      <DialogHeader className="text-blue-gray-900 font-bold">
        Edit Task
      </DialogHeader>
      <DialogBody className="space-y-4 ">
        {/* Image faylini yangilash uchun maxsus dizayn */}
        <div>
          <Typography variant="small" color="blue-gray" className="mb-2">
            Update Image (optional)
          </Typography>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full border-2 border-blue-gray-200 rounded-md p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Telegram */}
        <Input
          label="Telegram"
          name="telegram"
          value={formData.telegram || ""}
          onChange={handleInputChange}
          className="w-full"
        />

        {/* Instagram */}
        <Input
          label="Instagram"
          name="instagram"
          value={formData.instagram || ""}
          onChange={handleInputChange}
          className="w-full"
        />

        {/* YouTube */}
        <Input
          label="YouTube"
          name="youtube"
          value={formData.youtube || ""}
          onChange={handleInputChange}
          className="w-full"
        />

        {/* Twitter */}
        <Input
          label="Twitter"
          name="twitter"
          value={formData.twitter || ""}
          onChange={handleInputChange}
          className="w-full"
        />

        {/* Text */}
        <Textarea
          label="Text"
          name="text"
          value={formData.text || ""}
          onChange={handleInputChange}
          className="w-full"
        />

        {/* Number */}
        <Input
          label="Number"
          name="number"
          value={formData.number || ""}
          onChange={handleInputChange}
          className="w-full"
        />
      </DialogBody>
      <DialogFooter className="flex justify-end gap-3">
        <Button variant="outlined" color="gray" onClick={handleOpen}>
          Cancel
        </Button>
        <Button variant="gradient" color="green" onClick={handleUpdate}>
          Update
        </Button>
      </DialogFooter>
    </Dialog>
  );
}