import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';

const UserProfileEdit = ({ user, onSave }) => {
  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    children: user.children,
    otherPets: user.otherPets,
    petTypes: user.petTypes.join(', ') // Assuming petTypes is an array
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Implement the save logic here
    onSave(profile);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 'auto' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Edit Your Profile
        </Typography>
        <TextField
          label="Name"
          name="name"
          value={profile.name}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Children"
          name="children"
          value={profile.children}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Other Pets"
          name="otherPets"
          value={profile.otherPets}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Type"
          name="petTypes"
          value={profile.petTypes}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ marginTop: 2 }}
        >
          Save Information
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserProfileEdit;

// Example usage:
// <UserProfileEdit user={user} onSave={handleProfileSave} />
