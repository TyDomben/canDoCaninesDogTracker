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


const EditDogProfile = ({ dogData, onGoBack, onSave }) => {
  const dispatch = useDispatch();
  const dog = useSelector((store) => store.dog)
  const history = useHistory();
  const [values, setValues] = useState({
    name: dog.name,
    age: dog.age,
    bred: dog.breed,
    spayedNeutered: dog.spayed_neutered,
    foodType: dog.food_type,
    foodAmount: dog.food_amount,
    mealsPerDay: dog.meals_per_day,
    eatingTimes: dog.eating_times,
    medicalConditions: dog.medical_conditions,
    recoveringFromSurgery: dog.recovering_from_surgery,
    medications: dog.medications,
    inHeat: dog.in_heat,
    pottyRoutine: dog.potty_routine,
    pottyHabitsNotes: dog.potty_habits_notes,
    exerciseLimitations: dog.exercise_limitations,
    exerciseEquipment: dog.exercise_equipment,
    crateManners: dog.crate_manners,
    houseManners: dog.house_manners,
    livingWithOtherDogs: dog.living_with_other_dogs,
    livingWithCats: dog.living_with_cats,
    livingWithChildrenOlderTen: dog.living_with_children_older_ten,
    livingWithChildrenYoungerTen: dog.living_with_children_younger_ten,
    livingWithAdults: dog.living_with_adults,
    livingWithSmallAnimals: dog.living_with_small_animals,
    livingWithLargeAnimals: dog.living_with_large_animals,
    behaviorWithOtherDogs: dog.behavior_with_other_dogs,
    behaviorWithCats: dog.behavior_with_cats,
    behaviorWithChildren: dog.behavior_with_children
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSave = () => {
    onSave(values);
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
          Edit {values.name}'s Profile
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          id="name"
          name="name"
          label="Name"
          value={values.name}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="age"
          name="age"
          label="Age"
          value={values.age}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="breed"
          name="breed"
          label="Breed"
          value={values.breed}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="spayed_neutered"
          name="spayed_neutered"
          label="Spayed/ Neutered"
          value={values.spayed_neutered}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="food_type"
          name="food_type"
          label="Food type"
          value={values.food_type}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="food_amount"
          name="food_amount"
          label="Food Amount"
          value={values.food_amount}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="meals_per_day"
          name="meals_per_day"
          label="Meals per day"
          value={values.meals_per_day}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="eating_times"
          name="eating_times"
          label="Eating Times"
          value={values.eating_times}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="medical_conditions"
          name="medical_conditions"
          label="Medical Conditions"
          value={values.medical_conditions}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="recovering_from_surgery"
          name="recovering_from_suregery"
          label="Recovering from Surgery"
          value={values.recovering_from_surgery}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="medications"
          name="medications"
          label="Medications"
          value={values.medications}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="in_heat"
          name="in_heat"
          label="In Heat"
          value={values.in_heat}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="potty_routine"
          name="potty_routine"
          label="Potty Routine"
          value={values.potty_routine}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="potty_habits_notes"
          name="potty_habits_notes"
          label="Potty Habits Notes"
          value={values.potty_habits_notes}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="exercise_limitations"
          name="exercise_limitations"
          label="Exercise Limitations"
          value={values.exercise_limitations}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="exercise_equipment"
          name="exercise_equipment"
          label="Exercise Equipment"
          value={values.exercise_equipment}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="crate_manners"
          name="crate_manners"
          label="Crate Manners"
          value={values.crate_manners}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="house_manners"
          name="house_manners"
          label="House Manners"
          value={values.house_manners}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="living_with_other_dogs"
          name="living_with_other_dogs"
          label="Living with other Dogs"
          value={values.living_with_other_dogs}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="living_with_cats"
          name="living_with_cats"
          label="Living with Cats"
          value={values.living_with_cats}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="living_with_children_older_ten"
          name="living_with_children_older_ten"
          label="Living with Children Older than 10"
          value={values.age}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="living_with_children_younger_ten"
          name="living_with_children_younger_ten"
          label="Living with Children Younger than 10"
          value={values.living_with_children_younger_ten}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="living_with_adults"
          name="living_with_adults"
          label="Living with Adults"
          value={values.living_with_adults}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="living_with_small_animals"
          name="living_with_small_animals"
          label="Living with Small Animals"
          value={values.living_with_small_animals}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="living_with_large_animals"
          name="living_with_large_animals"
          label="Living with Large Animals"
          value={values.living_with_large_animals}
          onChange={handleChange}
          variant="outlined"
        /><TextField
        fullWidth
        margin="normal"
        id="behavior_with_other_dogs"
        name="behavior_with_other_dogs"
        label="Behavior with other Dogs"
        value={values.behavior_with_other_dogs}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
          fullWidth
          margin="normal"
          id="behavior_with_cats"
          name="behavior_with_cats"
          label="Behavior with Cats"
          value={values.behavior_with_cats}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="behavior_with_children"
          name="behavior_with_children"
          label="Behavior with Children"
          value={values.behavior_with_children}
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
