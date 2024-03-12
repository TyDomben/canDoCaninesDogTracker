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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';


const EditDogProfile = ({ dogData, onGoBack, onSave }) => {
  const dispatch = useDispatch();
  const editDog = useSelector((store) => store.dog.editDog);
  const { dogId } = useParams();
  const history = useHistory();
  // const [ formValues, setEditDog ] = useState(editDog);
  console.log('edit dog initial', editDog)
  const handleChange = (event) => {
    console.log(event.target)
    event.preventDefault()
    const { name, value } = event.target;
    console.log('name and value', name, value);
    dispatch({
      type: 'EDIT_DOG',
       payload: { property:name, value: value}
       
    });
}
  console.log('edit dog:', editDog)

  const handleSave = () => {
    dispatch({ type: 'UPDATE_DOG_PROFILE', payload: {dogId: dogProfile, updates: formValues}})
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
        <Typography variant="h5" align="center" gutterBottom>
          Edit {editDog?.dog_name}'s Profile
        </Typography>
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
        <TextField
          fullWidth
          margin="normal"
          id="breed"
          name="breed"
          label="Breed"
          value={editDog?.breed}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="spayed_neutered"
          name="spayed_neutered"
          label="Spayed/ Neutered"
          value={editDog?.spayed_neutered}
          onChange={handleChange}
          variant="outlined"
        />
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
        <TextField
          fullWidth
          margin="normal"
          id="exercise_limitations"
          name="exercise_limitations"
          label="Exercise Limitations"
          value={editDog?.exercise_limitations}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="exercise_equipment"
          name="exercise_equipment"
          label="Exercise Equipment"
          value={editDog?.exercise_equipment}
          onChange={handleChange}
          variant="outlined"
        />
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
        <TextField
          fullWidth
          margin="normal"
          id="living_with_other_dogs"
          name="living_with_other_dogs"
          label="Living with other Dogs"
          value={editDog?.living_with_other_dogs}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="living_with_cats"
          name="living_with_cats"
          label="Living with Cats"
          value={editDog?.living_with_cats}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="living_with_children_older_ten"
          name="living_with_children_older_ten"
          label="Living with Children Older than 10"
          value={editDog?.living_with_children_older_ten}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="living_with_children_younger_ten"
          name="living_with_children_younger_ten"
          label="Living with Children Younger than 10"
          value={editDog?.living_with_children_younger_ten}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="living_with_adults"
          name="living_with_adults"
          label="Living with Adults"
          value={editDog?.living_with_adults}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="living_with_small_animals"
          name="living_with_small_animals"
          label="Living with Small Animals"
          value={editDog?.living_with_small_animals}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="living_with_large_animals"
          name="living_with_large_animals"
          label="Living with Large Animals"
          value={editDog?.living_with_large_animals}
          onChange={handleChange}
          variant="outlined"
        /><TextField
        fullWidth
        margin="normal"
        id="behavior_with_other_dogs"
        name="behavior_with_other_dogs"
        label="Behavior with other Dogs"
        value={editDog?.behavior_with_other_dogs}
        onChange={handleChange}
        variant="outlined"
      />
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
