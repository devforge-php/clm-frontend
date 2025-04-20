import React from 'react'

import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function NewTaskAddModal({ open, handleOpen, formData, handleInputChange, handleImageChange, handleSave }) {
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Add New Task</DialogHeader>
      <DialogBody divider>
        <div className="flex flex-col gap-4">
          <Input
            type="file"
            accept="image/*"
            label="Image"
            onChange={handleImageChange}
          />
          <Input
            label="Telegram"
            name="telegram"
            value={formData.telegram}
            onChange={handleInputChange}
          />
          <Input
            label="Instagram"
            name="instagram"
            value={formData.instagram}
            onChange={handleInputChange}
          />
          <Input
            label="YouTube"
            name="youtube"
            value={formData.youtube}
            onChange={handleInputChange}
          />
          <Input
            label="Twitter"
            name="twitter"
            value={formData.twitter}
            onChange={handleInputChange}
          />
          <Input
            label="Text"
            name="text"
            value={formData.text}
            onChange={handleInputChange}
          />
          <Input
            label="Number"
            name="number"
            value={formData.number}
            onChange={handleInputChange}
          />
          <div className="flex justify-between">
            <Typography variant="small" color="blue-gray">
              Reward: <span className="font-bold">gold</span>
            </Typography>
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          Cancel
        </Button>
        <Button variant="gradient" color="green" onClick={handleSave}>
          Save
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
