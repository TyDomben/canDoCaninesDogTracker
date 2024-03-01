import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const AddDogForm = () => {
  const [formValues, setFormValues] = useState({
    hostName: '',
    hostEmail: '',
    startDate: '',
    endDate: '',
    dateComments: '',
    dogName: '',
    dogAge: '',
    breed: '',
    intact: '',
    vetAppointments: '',
    foodType: '',
    feedingFrequency: '',
    feedingAmount: '',
    medicalAppointments: '',
    medicalConcerns: '',
    pottyFrequency: '',
    pottyIndicators: '',
    exerciseRestrictions: '',
    exerciseEquipment: '',
    cratingHabits: '',
    houseManners: '',
    environmentalPreferences: '',
    // ... other fields as needed
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Save the data
    // Show confirmation alert
  };

  const handleGoBack = () => {
    // Confirm if the user wants to go back without saving
    // Redirect to home page
  };

  return (
    <Container maxWidth="sm">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Can Do Canines
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Add a Dog to Your Profile
        </Typography>
        {Object.keys(formValues).map((key) => (
          <TextField
            key={key}
            fullWidth
            margin="normal"
            id={key}
            name={key}
            label={key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())} // Converts camelCase to Title Case
            value={formValues[key]}
            onChange={handleChange}
            variant="outlined"
          />
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="outlined" color="secondary" onClick={handleGoBack}>
            Go Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Information
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddDogForm;
