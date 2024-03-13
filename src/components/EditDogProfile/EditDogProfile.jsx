import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Grid,
  InputLabel,
  Paper
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';


const EditDogProfile = ({ dogData, onGoBack, onSave }) => {
  const dispatch = useDispatch();
  const editDog = useSelector((store) => store.dog.editDog);
  const dogProfile = useSelector((store) => store.dog.dogProfile)

  const { dogId } = useParams();
  const history = useHistory();
  // const [ formValues, setEditDog ] = useState(editDog);
  console.log('edit dog initial', editDog)
  console.log('dog profile set values', dogProfile)
  const handleChange = (event) => {
    console.log(event.target)
    event.preventDefault()
    const { name, value } = event.target;
    console.log('name and value', name, value);
    dispatch({
      type: 'EDIT_DOG',
      payload: { property: name, value: value }

    });
  }
  console.log('edit dog:', editDog)

  const handleChangeRadioBtn = (event) => {
    const { name, value } = event.target
    console.log('radio btn', name, value)
    dispatch({
      type: 'EDIT_DOG',
      payload: { property: name, value: value }
    })

  }

  const handleChangeBool = (event) => {
    const bool = event.target.value
    const name = event.target.name
    if (bool === "true") {
      dispatch({
        type: 'EDIT_DOG',
        payload: { property: name, value: true }
      })
    }
    else {
      dispatch({
        type: 'EDIT_DOG',
        payload: { property: name, value: false }
      })
    }
  }

  const handleChangeCheckBox = (event) => {
    console.log('inside handleCheckBox')
    const initVal = event.target.checked
    console.log('initVal', initVal)
    dispatch({
      type: 'EDIT_DOG',
      payload: { property: event.target.name, value: initVal }
    })
  }
  const handleSave = () => {
    dispatch({ type: 'UPDATE_DOG_PROFILE', payload: { dogId: dogProfile, updates: formValues } })
    // Show confirmation alert
  };

  const handleGoBack = () => {
    // Confirm if the user wants to go back without saving
    onGoBack();
    // Show confirmation alert
  };

  return (
    <Container maxWidth="sm">
      <AppBar position="static">
      </AppBar>
      <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>


        <Typography variant="h4" align="center" gutterBottom>
          Edit {editDog?.dog_name}'s Profile
        </Typography>


        <Typography variant="h5">Dog Information</Typography>
        <Paper elevation={5}>
          <TextField
            fullWidth
            margin="normal"
            id="dog_name"
            name="dog_name"
            label="Name"
            value={editDog?.dog_name}
            onChange={handleChange}
            variant="outlined"
          />
          {/* </FormLabel> */}

          <TextField
            fullWidth
            margin="normal"
            id="age"
            name="age"
            label="Age"
            value={editDog?.age}
            onChange={handleChange}
            variant="outlined"
          />

          <FormLabel id="breed-label">Dog Breed</FormLabel>
          <RadioGroup
            aria-labelledby="breed-label"
            value={editDog?.breed}
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

          <FormLabel id="spayed_neutered">Is the dog spayed or neutered?</FormLabel>
          <RadioGroup
            aria-labelledby="spayed_neutered"
            value={editDog?.spayed_neutered}
            onChange={handleChangeBool}
            name="spayed_neutered"
          >


            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>

        </Paper>





        <Typography variant="h5">Meals</Typography>
        <Paper elevation={5}>

          <FormLabel id="food_type">Food Information</FormLabel>
          <RadioGroup
            aria-labelledby="food_type"
            value={editDog?.food_type}
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
            id="food_type"
            name="food_type"
            label="Food type"
            value={editDog?.food_type}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            fullWidth
            margin="normal"
            id="food_amount"
            name="food_amount"
            label="Food Amount"
            value={editDog?.food_amount}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            fullWidth
            margin="normal"
            id="meals_per_day"
            name="meals_per_day"
            label="Meals per day"
            value={editDog?.meals_per_day}
            onChange={handleChange}
            variant="outlined"
          />

          <TextField
            fullWidth
            margin="normal"
            id="eating_times"
            name="eating_times"
            label="Eating Times"
            value={editDog?.eating_times}
            onChange={handleChange}
            variant="outlined"
          />
        </ Paper>

        <Typography variant='h5'>Medical Information</Typography>
        <Paper elevation={5}>
        <TextField
          fullWidth
          margin="normal"
          id="medical_conditions"
          name="medical_conditions"
          label="Medical Conditions"
          value={editDog?.medical_conditions}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="recovering_from_surgery"
          name="recovering_from_suregery"
          label="Recovering from Surgery"
          value={editDog?.recovering_from_surgery}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="medications"
          name="medications"
          label="Medications"
          value={editDog?.medications}
          onChange={handleChange}
          variant="outlined"
        />

        <FormLabel id="in_heat">If you're fostering an spayed/neutered female are they in heat?</FormLabel>
        <RadioGroup
          // aria-labelledby="in_heat"
          name="in_heat"
          value={editDog?.in_heat}
          onChange={handleChangeRadioBtn}
        >
          <FormControlLabel value={1} control={<Radio />} label="Yes" />
          <FormControlLabel value={2} control={<Radio />} label="No" />
          <FormControlLabel value={3} control={<Radio />} label="Unknown" />

        </RadioGroup>
        </Paper>
        <TextField
          fullWidth
          margin="normal"
          id="in_heat"
          name="in_heat"
          label="In Heat"
          value={editDog?.in_heat}
          onChange={handleChange}
          variant="outlined"
        />

        <Typography variant='h5'>Potty Habits</Typography>
        <Paper elevation={5}>
        <TextField
          fullWidth
          margin="normal"
          id="potty_routine"
          name="potty_routine"
          label="Potty Routine"
          value={editDog?.potty_routine}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="potty_habits_notes"
          name="potty_habits_notes"
          label="Potty Habits Notes"
          value={editDog?.potty_habits_notes}
          onChange={handleChange}
          variant="outlined"
        />
        </Paper>

        <Typography variant='5'>Crate and House Manners</Typography>
        <Paper elevation={5}>
        <TextField
          fullWidth
          margin="normal"
          id="crate_manners"
          name="crate_manners"
          label="Crate Manners"
          value={editDog?.crate_manners}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="house_manners"
          name="house_manners"
          label="House Manners"
          value={editDog?.house_manners}
          onChange={handleChange}
          variant="outlined"
        />
        </Paper>

        <FormControlLabel

          id="living_with_other_dogs"
          name="living_with_other_dogs"
          label="Living with other dogs"
          checked={editDog?.living_with_cats}
          onChange={handleChangeCheckBox}
          required control={<Checkbox />}
        />

        {/* <TextField
          fullWidth
          margin="normal"
          id="living_with_other_dogs"
          name="living_with_other_dogs"
          label="Living with other Dogs"
          value={editDog?.living_with_other_dogs}
          onChange={handleChange}
          variant="outlined"
        /> */}
        <FormControlLabel

          id="living_with_cats"
          name="living_with_cats"
          label="Living with cats"
          checked={editDog?.living_with_cats}
          onChange={handleChangeCheckBox}
          required control={<Checkbox />}
        />

        {/* <TextField
          fullWidth
          margin="normal"
          id="living_with_cats"
          name="living_with_cats"
          label="Living with Cats"
          value={editDog?.living_with_cats}
          onChange={handleChange}
          variant="outlined"
        /> */}
        <FormControlLabel

          id="living_with_children_older_ten"
          name="living_with_children_older_ten"
          label="Living with children 10 and up"
          checked={editDog?.living_with_children_older_ten}
          onChange={handleChangeCheckBox}
          required control={<Checkbox />}
        />

        {/* <TextField
          fullWidth
          margin="normal"
          id="living_with_children_older_ten"
          name="living_with_children_older_ten"
          label="Living with Children Older than 10"
          value={editDog?.living_with_children_older_ten}
          onChange={handleChange}
          variant="outlined"
        /> */}
        <FormControlLabel

          id="living_with_children_younger_ten"
          name="living_with_children_yonger_ten"
          label="Living with children under 10"
          value={editDog?.living_with_children_younger_ten}
          onChange={handleChangeCheckBox}
          required control={<Checkbox />}
        />

        {/* <TextField
          fullWidth
          margin="normal"
          id="living_with_children_younger_ten"
          name="living_with_children_younger_ten"
          label="Living with Children Younger than 10"
          value={editDog?.living_with_children_younger_ten}
          onChange={handleChange}
          variant="outlined"
        /> */}
        <FormControlLabel

          id="living_with_adults"
          name="living_with_adults"
          label="Living with Adults"
          checked={editDog?.living_with_adults}
          onChange={handleChangeCheckBox}
          required control={<Checkbox />}
        />
        {/* <TextField
          fullWidth
          margin="normal"
          id="living_with_adults"
          name="living_with_adults"
          label="Living with Adults"
          value={editDog?.living_with_adults}
          onChange={handleChange}
          variant="outlined"
        /> */}
        <FormControlLabel

          id="living_with_small_animals"
          name="living_with_small_animals"
          label="Living with Small Animals"
          checked={editDog?.living_with_small_animals}
          onChange={handleChangeCheckBox}
          required control={<Checkbox />}
        />

        <FormControlLabel
          name='living_with_large_animals'
          onChange={handleChangeCheckBox}
          required control={<Checkbox />}
          label="Large Animals"
          checked={editDog?.living_with_large_animals}
        />


        <Box>
          <FormLabel id="Behavior1">How does this dog behave around other dogs?</FormLabel>
          <RadioGroup
            aria-labelledby="behavior type"
            // defaultValue="1"
            value={editDog?.behavior_with_other_dogs}
            name="behavior_with_other_dogs"
            onChange={handleChangeRadioBtn}
          >
            <FormControlLabel value={1} control={<Radio />} label="Unknown" />
            <FormControlLabel value={2} control={<Radio />} label="Comfortable" />
            <FormControlLabel value={3} control={<Radio />} label="Indifferent" />
            <FormControlLabel value={4} control={<Radio />} label="Uncomfortable" />

          </RadioGroup>
        </Box>
        <TextField
          fullWidth
          margin="normal"
          id="behavior_with_other_dogs"
          name="behavior_with_other_dogs"
          label="Behavior with other Dogs"
          value={editDog?.behavior_with_other_dogs}
          onChange={handleChange}
          variant="outlined"
        />

        <Box>
          <FormLabel id="Behavior1">How does this dog behave around cats?</FormLabel>
          <RadioGroup
            aria-labelledby="behavior type"
            defaultValue="1"
            value={editDog?.behavior_with_cats}
            name="behavior_with_cats"
            onChange={handleChangeRadioBtn}
          >
            <FormControlLabel value={1} control={<Radio />} label="Unknown" />
            <FormControlLabel value={2} control={<Radio />} label="Comfortable" />
            <FormControlLabel value={3} control={<Radio />} label="Indifferent" />
            <FormControlLabel value={4} control={<Radio />} label="Uncomfortable" />
          </RadioGroup>
        </Box>
        <TextField
          fullWidth
          margin="normal"
          id="behavior_with_cats"
          name="behavior_with_cats"
          label="Behavior with Cats"
          value={editDog?.behavior_with_cats}
          onChange={handleChange}
          variant="outlined"
        />

        <Box>
          <FormLabel id="Behavior1">How does this dog behave around children</FormLabel>
          <RadioGroup
            aria-labelledby="behavior type"
            value={editDog?.behavior_with_children}
            name="behavior_with_children"
            onChange={handleChangeRadioBtn}
          >
            <FormControlLabel value={1} control={<Radio />} label="Unknown" />
            <FormControlLabel value={2} control={<Radio />} label="Comfortable" />
            <FormControlLabel value={3} control={<Radio />} label="Indifferent" />
            <FormControlLabel value={4} control={<Radio />} label="Uncomfortable" />
          </RadioGroup>
        </Box>
        <TextField
          fullWidth
          margin="normal"
          id="behavior_with_children"
          name="behavior_with_children"
          label="Behavior with Children"
          value={editDog?.behavior_with_children}
          onChange={handleChange}
          variant="outlined"
        />
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

export default EditDogProfile;
