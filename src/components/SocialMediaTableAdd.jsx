import React from 'react';
import {
  Dialog, DialogHeader, DialogBody, DialogFooter, Input, Button, Typography
} from '@material-tailwind/react';

export default function SocialMediaTableAdd({ open, handleClose, newUsernames, setNewUsernames, handleAdd }) {
  return (
    <Dialog open={open} handler={handleClose}>
      <DialogHeader>Add Social Media Usernames</DialogHeader>
      <DialogBody>
        {['telegram', 'instagram', 'facebook', 'youtube', 'twitter'].map((platform) => (
          <div key={platform} className="mb-4">
            <Typography variant="small" color="blue-gray" className="mb-1">
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </Typography>
            <Input
              label={`${platform.charAt(0).toUpperCase() + platform.slice(1)} Username`}
              value={newUsernames[platform] || ''}
              onChange={(e) =>
                setNewUsernames((prev) => ({ ...prev, [platform]: e.target.value }))
              }
            />
          </div>
        ))}
      </DialogBody>
      <DialogFooter>
        <Button onClick={handleClose} variant="text">Cancel</Button>
        <Button onClick={() => handleAdd(newUsernames)} color="blue">Add</Button>
      </DialogFooter>
    </Dialog>
  );
}

