
import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const UserProfileEdit = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const [profile, setProfile] = useState({
    name: user.name,
    username: user.username,
    phone: user.phone,
    address: user.address,
    email: user.email,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    dispatch({ type: 'UPDATE_USER', payload: { userId: user.id, updates: profile } });
    history.push("/user");
  };

  return (
    <Card sx={{ maxWidth: 345, margin: "auto" }}>
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
          label="username"
          name="username"
          value={profile.username}
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
          label="phone"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          label="address"
          name="address"
          value={profile.address}
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
