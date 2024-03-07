import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, AppBar, Toolbar, IconButton, Stepper, Step, StepLabel } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';





const AddDogForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Dog Information', 'Meals', 'Medical Information', 'Potty Habits','Exercise Routine','Crating','Manners','Behavioral Information'];
  const [formValues, setFormValues] = useState({
    //dog basic information
    dogName: '',
    dogAge: '',
    breed: '',
    intact: '',
    // vetAppointments: '',
    //food info
    foodType: '',
    feedingFrequency: '',
    feedingAmount: '',
    // medicalAppointments: '',
    medicalConditions: '',
    surgeryRecovery: '',
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
  };

  const handleSave = (event) => {
    console.log('in postDogForm Save', formValues)

    // Save the data

    event.preventDefault();
    dispatch({ type: "POST_DOG", payload: formValues });
    // setFormValues({
    //   dogName: '',
    //   dogAge: '',
    //   breed: '',
    //   intact: '',
    //   // vetAppointments: '',
    //   foodType: '',
    //   feedingFrequency: '',
    //   feedingAmount: '',
    //   // medicalAppointments: '',
    //   medicalConditions: '',
    //   surguryRecovery: '',
    //   currentMedications: '',
    //   inHeat: '',
    //   //pottyHabitis
    //   pottyFrequency: '',
    //   pottyIndicators: '',
    //   pottyComments: '',
    //   //excercise
    //   exerciseRestrictions: '',
    //   exerciseEquipment: '',
    //   //crating
    //   cratingHabits: '',
    //   //houseManners
    //   houseManners: '',
    //   //preferences
    //   //lives with ?
    //   // environmentalPreferences: '',
    //   livingWithOtherDogs: '',
    //   livingWithCats: '',
    //   livingWithChildrenYoungerThanTen: '',
    //   living_with_adults: '',
    //   living_with_small_animals: '',
    //   living_with_large_animals: '',
    //   behavior_with_other_dogs: '',
    //   behavior_with_cats: '',
    //   behaviorWithChildren: ''
    // })
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
              required id="dogName"
              name="dogName"
              label="Dog Name"
              value={formValues.dogName}
              onChange={handleChange}
              variant="outlined"
            />

            <TextField
              fullWidth
              margin="normal"
              id="dogAge"
              name="dogAge"
              label="Dog Age"
              value={formValues.dogAge}
              onChange={handleChange}
              variant="outlined"
            />


            <FormControl>
              <FormLabel id="breed-label">Dog Breed</FormLabel>
              <RadioGroup
                aria-labelledby="breed-label"
                defaultValue="1"
                name="breed-radio-buttons-group"
              >
                <FormControlLabel value={1} control={<Radio />} label="Labrador" />
                <FormControlLabel value={2} control={<Radio />} label="Golden Retriever" />
                <FormControlLabel value={3} control={<Radio />} label="Labrador Mix" />
                <FormControlLabel value={4} control={<Radio />} label="Golden Retriever Mix" />
                <FormControlLabel value={5} control={<Radio />} label="Poodle/Poodle Mix" />
                <FormControlLabel value={6} control={<Radio />} label="Collie" />
                <FormControlLabel value={7} control={<Radio />} label="I don't know" />



              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel id="intact">Is the dog spayed or neutered?</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue=" "
                name="intact-radio-buttons-group"
              >
                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                <FormControlLabel value="false" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {/* ... other host fields ... */}
          </>
        );
      case 1:
        return (
          <>
            <FormControl>
              <FormLabel id="food-label">Dog Breed</FormLabel>
              <RadioGroup
                aria-labelledby="food-label"
                defaultValue="1"
                name="food-radio-buttons-group"
              >
                <FormControlLabel value={1} control={<Radio />} label="Purina Pro Plan Large Breed PUPPY" />
                <FormControlLabel value={2} control={<Radio />} label="Purina Pro Plan Large Breed ADULT" />
                <FormControlLabel value={3} control={<Radio />} label="Purina Pro Plan Sensitive Skin & Stomach" />
                <FormControlLabel value={4} control={<Radio />} label="Purina Pro Plan Sport 30/20" />
                <FormControlLabel value={5} control={<Radio />} label="Other" />

              </RadioGroup>
            </FormControl>
          
            <TextField
              fullWidth
              margin="normal"
              id="foodAmount"
              name="foodAmount"
              label="Amount of food per MEAL?"
              value={formValues.food_amount}
              onChange={handleChange}
              variant="outlined"
            />



          </>
        );
      case 2:
        return (
          <>
            <TextField
              fullWidth
              margin="normal"
              id="medicalConditions"
              name="medicalConditions"
              label="Please list any medical conditions you are currently addressing with this dog"
              value={formValues.medicalConditions}
              onChange={handleChange}
              variant="outlined"
            />
            <FormControl>
              <FormLabel id="">Is this dog currently recovering from a surgery or medical concern?</FormLabel>
              <RadioGroup
                aria-labelledby="surgery-radio-buttons-group-label"
                defaultValue="false "
                name="surgery-radio-buttons-group"
              >
                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                <FormControlLabel value="false" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>


            <TextField
              fullWidth
              margin="normal"
              id="medications"
              name="medications"
              label="Please list any medications this dog is taking along with dosages."
              value={formValues.currentMedications}
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
