import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, AppBar, Toolbar, IconButton, Stepper, Step, StepLabel } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';



const AddDogForm = () => {
  const history = useHistory();
  const [formValues, setFormValues] = useState({
    hostName: '',
    hostEmail: '',
    dogName: '',
    dogAge: '',
    breed: '',
    intact: '',
    // vetAppointments: '',
    foodType: '',
    feedingFrequency: '',
    feedingAmount: '',
    // medicalAppointments: '',
    medicalConditions: '',
    surguryRecovery: '',
    currentMedications: '',
    inHeat: '',
    //pottyHabitis
    pottyFrequency: '',
    pottyIndicators: '',
    pottyComments: '',
    //excercise
    exerciseRestrictions: '',
    exerciseEquipment: '',
    //crating
    cratingHabits: '',
    //houseManners
    houseManners: '',
    //preferences
    //lives with ?
    // environmentalPreferences: '',
    living_with_other_dogs: '',
    living_with_cats: '',
    living_with_children_younger_ten: '',
    living_with_adults: '',
    living_with_small_animals: '',
    living_with_large_animals: '',
    behavior_with_other_dogs: '',
    behavior_with_cats: '',
    behavior_with_cats: ''





    // ... other fields as needed
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    // console.log('formValues:', formValues)
  };

  const handleSave = (event) => {
    console.log('in postDogForm Save')
    // Save the data

      event.preventDefault();
      // dispatch({ type: "POST_DOG", payload: formValues })
      // history.push('/reviewemployees')
  }
    // Show confirmation alert
  

  const handleGoBack = () => {
    // Confirm if the user wants to go back without saving
    // Redirect to home page
    history.push('/raiser-home')
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
