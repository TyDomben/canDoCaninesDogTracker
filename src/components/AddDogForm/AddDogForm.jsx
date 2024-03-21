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
    dog_name: '',
    age: '',
    breed: '',
    spayed_neutered: '',
    //food info
    food_type: 5,
    food_amount: '',
    meals_per_day: '',
    eating_times: '',

    // medicalAppointments: '',
    medical_conditions: '',
    recovering_from_surgery: false,
    medications: '',
    in_heat: 3,
    //pottyHabitis
    potty_routine: '',
    potty_habits_notes: '',
    //excercise
    limit_water: false,
    limit_toy_play: false,
    watch_carefully: false,
    ingest_toys: false,
    keep_away: false,
    shares_toys: false,
    exercise_equipment: '',
    //crating
    crate_manners: '',
    //houseManners
    house_manners: '',
    // environmentalPreferences: '',
    living_with_other_dogs: false,
    living_with_cats: false,
    living_with_children_younger_ten: false,
    living_with_children_ten_and_up: false,
    living_with_adults: false,
    living_with_small_animals: false,
    living_with_large_animals: false,
    behavior_with_other_dogs: '',
    behavior_with_cats: '',
    behavior_with_children: ''





    // ... other fields as needed
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleChangeRadioBtn = (event) => {
    const { name, value } = event.target
    console.log('radio btn', name, value)
    setFormValues({
      ...formValues,
      [name]: Number(value)
    })
  }

  const handleChangeBool = (event) => {
    const bool = event.target.value
    const name = event.target.name
    if (bool === "true") {
      setFormValues({
        ...formValues,
        [name]: true
      })
    }
    else {
      setFormValues({
        ...formValues,
        [name]: false
      })
    }
  }

  const handleChangeCheckBox = (event) => {
    console.log('inside handleCheckBox')
    const initVal = event.target.checked
    console.log('initVal', initVal)
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.checked,
    })
  }
  console.log('formValues', formValues)
  const handleSave = (event) => {
    console.log('in postDogForm Save', formValues)

    // Save the data

    event.preventDefault();
    dispatch({ type: "POST_DOG", payload: formValues });
    setFormValues({
      //dog basic information
    dog_name: '',
    age: '',
    breed: '',
    spayed_neutered: '',
    //food info
    food_type: 5,
    food_amount: '',
    meals_per_day: '',
    eating_times: '',

    // medicalAppointments: '',
    medical_conditions: '',
    recovering_from_surgery: false,
    medications: '',
    in_heat: 3,
    //pottyHabitis
    potty_routine: '',
    // potty_indicators: '',
    potty_habits_notes: '',
    //excercise
    limit_water: false,
    limit_toy_play: false,
    watch_carefully: false,
    ingest_toys: false,
    keep_away: false,
    shares_toys: false,


    exercise_equipment: '',
    //crating
    crate_manners: '',
    //houseManners
    house_manners: '',
    // environmentalPreferences: '',
    living_with_other_dogs: false,
    living_with_cats: false,
    living_with_children_younger_ten: false,
    living_with_children_ten_and_up: false,
    living_with_adults: false,
    living_with_small_animals: false,
    living_with_large_animals: false,
    behavior_with_other_dogs: '',
    behavior_with_cats: '',
    behavior_with_children: ''





    // ... other fields as needed
  });
    history.push('/home')
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
            <Paper elevation={5}>

              <TextField
                fullWidth
                margin="normal"
                required id="dog_name"
                name="dog_name"
                label="Dog Name"
                value={formValues.dog_name}
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

            </Paper>
            <Paper elevation={5}>

              <FormLabel id="breed-label">Dog Breed</FormLabel>
              <RadioGroup
                aria-labelledby="breed-label"
                value={formValues.breed}
                onChange={handleChangeRadioBtn}
                name="breed"
              >
                <FormControlLabel value={1} control={<Radio />} label="Labrador" />
                <FormControlLabel value={2} control={<Radio />} label="Golden Retriever" />
                <FormControlLabel value={3} control={<Radio />} label="Labrador Mix" />
                <FormControlLabel value={4} control={<Radio />} label="Golden Retriever Mix" />
                <FormControlLabel value={5} control={<Radio />} label="Poodle/Poodle Mix" />
                <FormControlLabel value={6} control={<Radio />} label="Collie" />
                <FormControlLabel value={7} control={<Radio />} label="I don't know" />



              </RadioGroup>

            </Paper>

            <FormLabel id="spayed_neutered">Is the dog spayed or neutered?</FormLabel>
            <RadioGroup
              aria-labelledby="spayed_neutered"
              value={formValues.spayed_neutered}
              onChange={handleChangeBool}
              name="spayed_neutered"
            >
              <Paper elevation={5}>

                <FormControlLabel value="true" control={<Radio />} label="Yes" />

                <FormControlLabel value="false" control={<Radio />} label="No" />
              </Paper>
            </RadioGroup>

          </FormControl>


        );
      case 1:
        return (

          <FormControl>
            <FormLabel id="food_type">Food Information</FormLabel>
            <RadioGroup
              aria-labelledby="food_type"
              value={formValues.food_type}
              onChange={handleChangeRadioBtn}
              name="food_type"
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
              id="food_amount"
              name="food_amount"
              label="Amount of food per MEAL?"
              value={formValues.food_amount}
              onChange={handleChange}
              variant="outlined"
            />

            <TextField
              fullWidth
              margin="normal"
              id="meal_per_day"
              name="meals_per_day"
              label="Number of meals PER DAY?"
              value={formValues.meals_per_day}
              onChange={handleChange}
              variant="outlined"
            />

            <TextField
              fullWidth
              margin="normal"
              id="eating_times"
              name="eating_times"
              label="At what times is the dog used to eating?"
              value={formValues.eating_times}
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
              id="medical_conditions"
              name="medical_conditions"
              label="Please list any medical conditions you are currently addressing with this dog"
              value={formValues.medical_conditions}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              margin="normal"
              id="medications"
              name="medications"
              label="Please list any medications this dog is taking along with dosages."
              value={formValues.medications}
              onChange={handleChange}
              variant="outlined"
            />

            <FormLabel id="">Is this dog currently recovering from a surgery or medical concern?</FormLabel>
            <RadioGroup
              aria-labelledby="surgery_recovery"

              value={formValues.recovering_from_surgery}
              name="recovering_from_surgery"
              onChange={handleChangeBool}
            >
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>







            <FormLabel id="in_heat">If you're fostering an spayed_neutered female are they in heat?</FormLabel>
            <RadioGroup
              // aria-labelledby="in_heat"
              name="in_heat"
              defaultValue=""
              value={formValues.in_heat}
              onChange={handleChangeRadioBtn}
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
              sx={{
                '& .MuiTextField-root': { m: 1, width: '1' },
              }}
              noValidate
              autoComplete="off"
            >
              <p>Please describe the dog's daily potty routine as well as how the dog indicates it has to go.
              </p>
              <TextField
                id="potty_routine"
                label="Type comments here..."
                name='potty_routine'
                multiline
                rows={12}
                value={formValues.potty_routine}
                onChange={handleChange}
              />
              <p>Is there anything else that fosters should know about this dog's potty habits?
              </p>
              <TextField
                id="potty_habits_notes"
                label="Type comments here..."
                name='potty_habits_notes'
                multiline
                rows={12}
                value={formValues.potty_habits_notes}
                onChange={handleChange}
              />
            </Box>
          </FormControl>

        );
      case 4:
        return (

          <FormControl>
            <FormLabel id="exercise_limitations">Are there things we should know about regarding this dog and exercise or play?"</FormLabel>
            <FormGroup>
              <Paper elevation={5}>
                <FormControlLabel defaultChecked='false' name='limit_water' onChange={handleChangeCheckBox} required control={<Checkbox />} label="Limit water" />
                <FormControlLabel defaultChecked='false' name='limit_toy_play' onChange={handleChangeCheckBox} required control={<Checkbox />} label="Limit toy play" />
                <FormControlLabel defaultChecked='false' name='watch_carefully' onChange={handleChangeCheckBox} required control={<Checkbox />} label="May destroy toys (watch carefully)" />
                <FormControlLabel defaultChecked='false' name='ingest_toys' onChange={handleChangeCheckBox} required control={<Checkbox />} label="May ingest toys" />
                <FormControlLabel defaultChecked='false' name='keep_away' onChange={handleChangeCheckBox} required control={<Checkbox />} label='Plays "Keep Away" ' />
                <FormControlLabel defaultChecked='false' name='shares_toys' onChange={handleChangeCheckBox} required control={<Checkbox />} label="Does not share toys with other dogs?" />
              </Paper>


            </FormGroup>

            <p>Please indicate what equipment this dog uses for walks.</p>
            <RadioGroup
              aria-labelledby="exercise_equipment"
              // defaultValue="1"
              name="exercise_equipment"
              onChange={handleChangeRadioBtn}
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
            <FormLabel>Please describe this dogs crate manners and habits.                    </FormLabel>
            <Box
              sx={{
                '& .MuiTextField-root': { m: 1, width: '1' },
              }}
              noValidate
              autoComplete="off"
            >

              <TextField
                id="crate_habits"
                label="Type here..."
                multiline
                rows={12}
                name="crate_manners"
                value={formValues.crate_manners}
                onChange={handleChange}
              />

            </Box>
          </FormControl>

        );
      case 6:
        return (

          <FormControl>
            <FormLabel>Please describe this dog's house manners, including any less-than-desirable behaviors. </FormLabel>
            <Box
              sx={{
                '& .MuiTextField-root': { m: 1, width: '1' },
              }}
              noValidate
              autoComplete="off"
            >

              <TextField
                id="house_manners"
                label="Type here.."
                name="house_manners"
                multiline
                rows={12}
                value={formValues.house_manners}
                onChange={handleChange}
              />

            </Box>
          </FormControl>

        );
      case 7:
        return (

          <FormControl>
            <Box>
              <FormLabel>This dog lives with:</FormLabel>
              <FormGroup>
                <FormControlLabel defaultChecked='false' name='living_with_other_dogs' onChange={handleChangeCheckBox} required control={<Checkbox />} label="Other dogs" />
                <FormControlLabel defaultChecked='false' name='living_with_cats' onChange={handleChangeCheckBox} required control={<Checkbox />} label="Cats" />
                <FormControlLabel defaultChecked='false' name='living_with_children_younger_ten' onChange={handleChangeCheckBox} required control={<Checkbox />} label="Childred (under 10)" />
                <FormControlLabel defaultChecked='false' name='living_with_children_ten_and_up' onChange={handleChangeCheckBox} required control={<Checkbox />} label="Children (10 and over)" />
                <FormControlLabel defaultChecked='false' name='living_with_adults' onChange={handleChangeCheckBox} required control={<Checkbox />} label='Adults" ' />
                <FormControlLabel defaultChecked='false' name='living_with_small_animals' onChange={handleChangeCheckBox} required control={<Checkbox />} label="Small Animals" />
                <FormControlLabel defaultChecked='false' name='living_with_large_animals' onChange={handleChangeCheckBox} required control={<Checkbox />} label="Large Animals" />




              </FormGroup>
            </Box>
            <Box>
              <FormLabel id="Behavior1">How does this dog behave around other dogs?</FormLabel>
              <RadioGroup
                aria-labelledby="behavior type"
                defaultValue="1"
                value={formValues.behavior_with_other_dogs}
                name="behavior_with_other_dogs"
                onChange={handleChangeRadioBtn}
              >
                <FormControlLabel value={1} control={<Radio />} label="Unknown" />
                <FormControlLabel value={2} control={<Radio />} label="Comfortable" />
                <FormControlLabel value={3} control={<Radio />} label="Indifferent" />
                <FormControlLabel value={4} control={<Radio />} label="Uncomfortable" />

              </RadioGroup>
            </Box>
            <Box>
              <FormLabel id="Behavior1">How does this dog behave around cats?</FormLabel>
              <RadioGroup
                aria-labelledby="behavior type"
                defaultValue="1"
                value={formValues.behavior_with_cats}
                name="behavior_with_cats"
                onChange={handleChangeRadioBtn}
              >
                <FormControlLabel value={1} control={<Radio />} label="Unknown" />
                <FormControlLabel value={2} control={<Radio />} label="Comfortable" />
                <FormControlLabel value={3} control={<Radio />} label="Indifferent" />
                <FormControlLabel value={4} control={<Radio />} label="Uncomfortable" />
              </RadioGroup>
            </Box>

            <Box>
              <FormLabel id="Behavior1">How does this dog behave around children</FormLabel>
              <RadioGroup
                aria-labelledby="behavior type"
                defaultValue="1"
                value={formValues.behavior_with_children}
                name="behavior_with_children"
                onChange={handleChangeRadioBtn}
              >
                <FormControlLabel value={1} control={<Radio />} label="Unknown" />
                <FormControlLabel value={2} control={<Radio />} label="Comfortable" />
                <FormControlLabel value={3} control={<Radio />} label="Indifferent" />
                <FormControlLabel value={4} control={<Radio />} label="Uncomfortable" />
              </RadioGroup>
            </Box>





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
