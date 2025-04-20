import React from 'react';
import {
  Dialog, DialogHeader, DialogBody, DialogFooter, Button, Typography
} from '@material-tailwind/react';

export default function SocialMediaTableDelete({ open, handleClose, handleDelete }) {
  return (
    <Dialog open={open} handler={handleClose}>
      <DialogHeader>Delete All Social Media Usernames</DialogHeader>
      <DialogBody>
        <Typography variant="small" color="blue-gray">
          Are you sure you want to delete all social media usernames?
        </Typography>
      </DialogBody>
      <DialogFooter>
        <Button onClick={handleClose} variant="text">Cancel</Button>
        <Button onClick={handleDelete} color="red">Delete</Button>
      </DialogFooter>
    </Dialog>
  );
}