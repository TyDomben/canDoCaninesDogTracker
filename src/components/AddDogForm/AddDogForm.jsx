import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, AppBar, Toolbar, IconButton, Stepper, Step, StepLabel, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';





const AddDogForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Dog Information', 'Meals', 'Medical Information', 'Potty Habits', 'Exercise Routine', 'Crating', 'Manners', 'Behavioral Information'];
  const [formValues, setFormValues] = useState({
    //dog basic information
    name: '',
    age: '',
    breed: '',
    spayed_neutered: '',
    // vetAppointments: '',
    //food info
    food_type: '',
    food_amount: '',
    meals_per_day: '',
    eating_times: '',

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
    crate_manners: '',
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

  const handleChangeFoodType = (event) => {
    setFormValues({
      ...formValues, 
      food_type: Number(event.target.value)
    })
  }

  const handleChangeBreed = (event) => {
    setFormValues ({
      ...formValues,
      breed: Number(event.target.value)
    })
  }
  console.log('food type:', formValues.food_type, formValues.breed)
  const handleSave = (event) => {
    console.log('in postDogForm Save', formValues)

    // Save the data

    event.preventDefault();
    dispatch({ type: "POST_DOG", payload: formValues });
    // setFormValues({
    //    dog_name: '',
    //   age: '',
    //   breed: '',
    //   spayed_neutered: '',
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
    //   crating_manners: '',
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
          <FormControl>
            <TextField
              fullWidth
              margin="normal"
              required id="dog_name"
              name="dog_name"
              label="Dog Name"
              value={formValues.name}
              onChange={handleChange}
              variant="outlined"
            />

            <TextField
              fullWidth
              margin="normal"
              id="age"
              name="age"
              label="Dog Age"
              value={formValues.age}
              onChange={handleChange}
              variant="outlined"
            />


            
              <FormLabel id="breed-label">Dog Breed</FormLabel>
              <RadioGroup
                aria-labelledby="breed-label"
                defaultValue="1"
                value={formValues.breed}
                onChange={handleChangeBreed}
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
           

          
              <FormLabel id="spayed_neutered">Is the dog spayed or neutered?</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue=" "
                name="spayed_neutered-radio-buttons-group"
              >
                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                <FormControlLabel value="false" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

        
        );
      case 1:
        return (

          <FormControl>
            <FormLabel id="food-label">Food Informations</FormLabel>
            <RadioGroup
              aria-labelledby="food-label"
              defaultValue="1"
              value={formValues.food_type}
              onChange={handleChangeFoodType}
              name="food-radio-buttons-group"
            >
              <FormControlLabel value={'1'} control={<Radio />} label="Purina Pro Plan Large Breed PUPPY" />
              <FormControlLabel value={'2'} control={<Radio />} label="Purina Pro Plan Large Breed ADULT" />
              <FormControlLabel value={'3'} control={<Radio />} label="Purina Pro Plan Sensitive Skin & Stomach" />
              <FormControlLabel value={'4'} control={<Radio />} label="Purina Pro Plan Sport 30/20" />
              <FormControlLabel value={'5'} control={<Radio />} label="Other" />

            </RadioGroup>

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

            <TextField
              fullWidth
              margin="normal"
              id="foodAmount"
              name="foodFrequency"
              label="Number of meals PER DAY?"
              value={formValues.food_frequency}
              onChange={handleChange}
              variant="outlined"
            />

          </FormControl>



        );
      case 2:
        return (

          <FormControl>
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
            <FormLabel id="">Is this dog currently recovering from a surgery or medical concern?</FormLabel>
            <RadioGroup
              aria-labelledby="surgery-radio-buttons-group-label"
              defaultValue="false "
              name="surgery-radio-buttons-group"
            >
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>



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

            <FormLabel id="">If you're fostering an spayed_neutered female are they in heat?</FormLabel>
            <RadioGroup
              aria-labelledby="heat-radio-buttons-group-label"
              defaultValue="3"
              name="surgery-radio-buttons-group"
            >
              <FormControlLabel value={1} control={<Radio />} label="Yes" />
              <FormControlLabel value={2} control={<Radio />} label="No" />
              <FormControlLabel value={3} control={<Radio />} label="Unknown" />

            </RadioGroup>
          </FormControl>


        );
      case 3:
        return (

          <FormControl>

            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '1' },
              }}
              noValidate
              autoComplete="off"
            >
              <p>Please describe the dog's daily potty routine as well as how the dog indicates it has to go.
              </p>
              <TextField
                id="outlined-multiline-static"
                label="pottyRoutine"
                multiline
                rows={12}
                value={formValues.pottyFrequency}
                onChange={handleChange}
              />
              <p>Is there anything else that fosters should know about this dog's potty habits?
              </p>
              <TextField
                id="outlined-multiline-static"
                label="pottyComments"
                multiline
                rows={12}
                value={formValues.pottyComments}
                onChange={handleChange}
              />
            </Box>
          </FormControl>

        );
      case 4:
        return (

          <FormControl>
            <p>Are there things we should about regarding this dog and exercise or play?</p>
            <FormGroup>
              <Paper elevation={5}>
                <FormControlLabel required control={<Checkbox />} label="Limit water" />
                <FormControlLabel required control={<Checkbox />} label="Limit toy play" />
                <FormControlLabel required control={<Checkbox />} label="May destroy toys (watch carefully)" />
                <FormControlLabel required control={<Checkbox />} label="May ingest toys" />
                <FormControlLabel required control={<Checkbox />} label='Plays "Keep Away" ' />
                <FormControlLabel required control={<Checkbox />} label="Does not share toys wiht other dogs?" />
              </Paper>


            </FormGroup>

            <p>Please indicate what equipment this dog uses for walks.</p>
            <RadioGroup
              aria-labelledby="food-label"
              defaultValue="1"
              name="food-radio-buttons-group"
            >
              <Paper elevation={5}>
                <FormControlLabel value={1} control={<Radio />} label="Gentle leader" />
                <FormControlLabel value={2} control={<Radio />} label="Halti Headcollar" />
                <FormControlLabel value={3} control={<Radio />} label="Collar only (unless pulling)" />
                <FormControlLabel value={4} control={<Radio />} label='"No pull" front front clip harness' />
                <FormControlLabel value={5} control={<Radio />} label="Walks not reccomended for exercise" />
              </Paper>
            </RadioGroup>

          </FormControl>

        );
      case 5:
        return (

          <FormControl>
            <p>Please describe this dogs crate manners and habits.                    </p>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '1' },
              }}
              noValidate
              autoComplete="off"
            >

              <TextField
                id="outlined-multiline-static"
                label="pottyRoutine"
                multiline
                rows={12}
                value={formValues.crate_habits}
                onChange={handleChange}
              />

            </Box>
          </FormControl>

        );
      case 6:
        return (

          <FormControl>
            <p>Please describe this dog's house manners, including any less-than-desirable behaviors. </p>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '1' },
              }}
              noValidate
              autoComplete="off"
            >

              <TextField
                id="crate_manners"
                label="Type here.."
                multiline
                rows={12}
                value={formValues.crate_manners}
                onChange={handleChange}
              />

            </Box>
          </FormControl>

        );
      case 7:
        return (

          <FormControl>
            <box>
              <p>This dog lives with:</p>
              <FormGroup>
                <FormControlLabel required control={<Checkbox />} label="Other dogs" />
                <FormControlLabel required control={<Checkbox />} label="Cats" />
                <FormControlLabel required control={<Checkbox />} label="Childred (under 10)" />
                <FormControlLabel required control={<Checkbox />} label="Children (10 and over)" />
                <FormControlLabel required control={<Checkbox />} label='Adults" ' />
                <FormControlLabel required control={<Checkbox />} label="Small Animals" />
                <FormControlLabel required control={<Checkbox />} label="Large Animals" />




              </FormGroup>
            </box>
            <box>
              <FormLabel id="Behavior1">How does this dog behave around other dogs?</FormLabel>
              <RadioGroup
                aria-labelledby="behavior type"
                defaultValue="1"
                name="Other-Dogs-behavior-button-group"
              >
                <FormControlLabel value={1} control={<Radio />} label="Unknown" />
                <FormControlLabel value={2} control={<Radio />} label="Comfortable" />
                <FormControlLabel value={3} control={<Radio />} label="Indifferent" />
                <FormControlLabel value={4} control={<Radio />} label="Uncomfortable" />

              </RadioGroup>
            </box>
            <box>
              <FormLabel id="Behavior1">How does this dog behave around cats?</FormLabel>
              <RadioGroup
                aria-labelledby="behavior type"
                defaultValue="1"
                name="Other-Dogs-behavior-button-group"
              >
                <FormControlLabel value={1} control={<Radio />} label="Unknown" />
                <FormControlLabel value={2} control={<Radio />} label="Comfortable" />
                <FormControlLabel value={3} control={<Radio />} label="Indifferent" />
                <FormControlLabel value={4} control={<Radio />} label="Uncomfortable" />
              </RadioGroup>
            </box>

            <box>
              <FormLabel id="Behavior1">How does this dog behave around children</FormLabel>
              <RadioGroup
                aria-labelledby="behavior type"
                defaultValue="1"
                name="Other-Dogs-behavior-button-group"
              >
                <FormControlLabel value={1} control={<Radio />} label="Unknown" />
                <FormControlLabel value={2} control={<Radio />} label="Comfortable" />
                <FormControlLabel value={3} control={<Radio />} label="Indifferent" />
                <FormControlLabel value={4} control={<Radio />} label="Uncomfortable" />
              </RadioGroup>
            </box>





          </FormControl>

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
