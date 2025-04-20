import React from 'react';
import {
  Dialog, DialogHeader, DialogBody, DialogFooter, Input, Button, Typography
} from '@material-tailwind/react';

export default function SocialMediaTableEdit({ open, handleClose, usernames, handleSave }) {
  const [updatedUsernames, setUpdatedUsernames] = React.useState(usernames);

  React.useEffect(() => {
    setUpdatedUsernames(usernames);
  }, [usernames]);

  return (
    <Dialog open={open} handler={handleClose}>
      <DialogHeader>Edit Social Media Usernames</DialogHeader>
      <DialogBody>
        {Object.entries(updatedUsernames).map(([platform, username]) => (
          username && (
            <div key={platform} className="mb-4">
              <Typography variant="small" color="blue-gray" className="mb-1">
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </Typography>
              <Input
                label={`${platform.charAt(0).toUpperCase() + platform.slice(1)} Username`}
                value={username || ''}
                onChange={(e) =>
                  setUpdatedUsernames((prev) => ({ ...prev, [platform]: e.target.value }))
                }
              />
            </div>
          )
        ))}
      </DialogBody>
      <DialogFooter>
        <Button onClick={handleClose} variant="text">Cancel</Button>
        <Button onClick={() => handleSave(updatedUsernames)} color="blue">Save</Button>
      </DialogFooter>
    </Dialog>
  );
}


