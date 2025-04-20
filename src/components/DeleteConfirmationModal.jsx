import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function DeleteConfirmationModal({ open, handleClose, handleConfirm }) {
  return (
    <Dialog open={open} handler={handleClose}>
      <DialogHeader>Delete Task</DialogHeader>
      <DialogBody>
        <Typography variant="paragraph" color="blue-gray">
          Are you sure you want to delete this task? This action cannot be undone.
        </Typography>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="gray" onClick={handleClose}>Cancel</Button>
        <Button variant="gradient" color="red" onClick={handleConfirm}>Delete</Button>
      </DialogFooter>
    </Dialog>
  );
}
