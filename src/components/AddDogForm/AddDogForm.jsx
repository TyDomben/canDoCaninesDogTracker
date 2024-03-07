import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, AppBar, Toolbar, IconButton, Stepper, Step, StepLabel } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';




const AddDogForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Dog Information', 'Medical Information', 'Behavioral Information'];
  const [formValues, setFormValues] = useState({
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
    livingWithOtherDogs: '',
    livingWithCats: '',
    livingWithChildrenYoungerThanTen: '',
    living_with_adults: '',
    living_with_small_animals: '',
    living_with_large_animals: '',
    behavior_with_other_dogs: '',
    behavior_with_cats: '',
    behaviorWithChildren: ''





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
    console.log('in postDogForm Save', formValues)

    // Save the data

      event.preventDefault();
      dispatch({ type: "POST_DOG", payload: formValues });
      setFormValues({ 
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
      livingWithOtherDogs: '',
      livingWithCats: '',
      livingWithChildrenYoungerThanTen: '',
      living_with_adults: '',
      living_with_small_animals: '',
      living_with_large_animals: '',
      behavior_with_other_dogs: '',
      behavior_with_cats: '',
      behaviorWithChildren: ''})
      // history.push('/')
  }
    // Show confirmation alert
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    

  const handleGoBack = () => {
    // Confirm if the user wants to go back without saving
    // Redirect to home page
    history.push('/raiser-home')
  };
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              fullWidth
              margin="normal"
              id="hostName"
              name="hostName"
              label="Host Name"
              value={formValues.hostName}
              onChange={handleChange}
              variant="outlined"
            />
            {/* ... other host fields ... */}
          </>
        );
      case 1:
        return (
          <>
            <TextField
              fullWidth
              margin="normal"
              id="dogName"
              name="dogName"
              label="Dog Name"
              value={formValues.dogName}
              onChange={handleChange}
              variant="outlined"
            />
            {/* ... other dog fields ... */}
          </>
        );
      case 2:
        return (
          <>
            <TextField
              fullWidth
              margin="normal"
              id="vetAppointments"
              name="vetAppointments"
              label="Vet Appointments"
              value={formValues.vetAppointments}
              onChange={handleChange}
              variant="outlined"
            />
            {/* ... other medical fields ... */}
          </>
        );
      case 3:
        return (
          <>
            <TextField
              fullWidth
              margin="normal"
              id="houseManners"
              name="houseManners"
              label="House Manners"
              value={formValues.houseManners}
              onChange={handleChange}
              variant="outlined"
            />
            {/* ... other behavioral fields ... */}
          </>
        );
      default:
        return null;
    }
  };
  return (
    <Container maxWidth="sm">
      {/* ... AppBar and Toolbar ... */}
      <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Add a Dog to Your Profile
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {renderStepContent(activeStep)}
<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          {activeStep === 0 ? (
            <Button variant="outlined" color="secondary" onClick={handleGoBack}>
              Go Back
            </Button>
          ) : (
            <Button variant="outlined" color="secondary" onClick={handleBack}>
              Back
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save Information
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};
export default AddDogForm;
