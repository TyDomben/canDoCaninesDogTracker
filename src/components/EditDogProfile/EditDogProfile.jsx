import React, { useState } from "react";
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
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import { Label, PanToolAlt } from "@mui/icons-material";
import axios from "axios";

const EditDogProfile = () => {
  const dispatch = useDispatch();
  const editDog = useSelector((store) => store.dog.editDog);
  const dogProfile = useSelector((store) => store.dog.dogProfile);
  const { dogId } = useParams();
  const history = useHistory();
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    dispatch({
      type: "EDIT_DOG",
      payload: { property: name, value: value },
    });
  };

  const handleChangeRadioBtn = (event) => {
    const { name, value } = event.target;
    dispatch({
      type: "EDIT_DOG",
      payload: { property: name, value: Number(value) },
    });
  };

  const handleChangeBool = (event) => {
    const bool = event.target.value;
    const name = event.target.name;
    if (bool === "true") {
      dispatch({
        type: "EDIT_DOG",
        payload: { property: name, value: true },
      });
    } else {
      dispatch({
        type: "EDIT_DOG",
        payload: { property: name, value: false },
      });
    }
  };

  const handleChangeCheckBox = (event) => {
    const initVal = event.target.checked;
    dispatch({
      type: "EDIT_DOG",
      payload: { property: event.target.name, value: initVal },
    });
  };
  const handleSave = (event) => {
    event.preventDefault();
    axios
      .put(`api/raiser-dog/${dogId}`, editDog)
      .then((response) => {
        dispatch({ type: "EDIT_CLEAR" });
        history.push(`/dogprofile/${dogId}`);
      })
      .catch((error) => {
        console.log("Error sending employee update:", error);
      });
  };

  const onGoBack = async (event) => {
    event.preventDefault();
    try {
      const value = await swal({
        title: "Are you sure?",
        text: "Any information you edited will not be saved.",
        icon: "warning",
        buttons: {
          cancel: "Keep Editing",
          delete: {
            text: "Continue without saving",
            value: "delete",
          },
        },
        dangerMode: true,
      });
      if (value === "delete") {
        await swal("Profile was not updated");
        history.push(`/home`);
      } else {
        swal("Cancelled.");
      }
    } catch (error) {
      console.log("error", error);
      swal("error", "error");
    }
  };

  return (
    <Container maxWidth="lg">
      <IconButton onClick={onGoBack} sx={{ color: "red", fontSize: "2.5rem" }}>
        <ArrowBackIcon sx={{ fontSize: "inherit" }} />
      </IconButton>
      <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Edit {editDog?.dog_name}'s Profile
        </Typography>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Paper elevation={5}>
                <Typography variant="h5">Dog Information</Typography>

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

                <FormLabel id="breed-label">Dog Breed</FormLabel>
                <RadioGroup
                  aria-labelledby="breed-label"
                  row
                  value={editDog?.breed_id}
                  onChange={handleChangeRadioBtn}
                  name="breed_id"
                >
                  <FormControlLabel
                    value={1}
                    control={<Radio />}
                    label="Labrador"
                  />
                  <FormControlLabel
                    value={2}
                    control={<Radio />}
                    label="Golden Retriever"
                  />
                  <FormControlLabel
                    value={3}
                    control={<Radio />}
                    label="Labrador Mix"
                  />
                  <FormControlLabel
                    value={4}
                    control={<Radio />}
                    label="Golden Retriever Mix"
                  />
                  <FormControlLabel
                    value={5}
                    control={<Radio />}
                    label="Poodle/Poodle Mix"
                  />
                  <FormControlLabel
                    value={6}
                    control={<Radio />}
                    label="Collie"
                  />
                  <FormControlLabel
                    value={7}
                    control={<Radio />}
                    label="I don't know"
                  />
                </RadioGroup>

                <FormLabel id="spayed_neutered">
                  Is the dog spayed or neutered?
                </FormLabel>
                <RadioGroup
                  aria-labelledby="spayed_neutered"
                  row
                  value={editDog?.spayed_neutered}
                  onChange={handleChangeBool}
                  name="spayed_neutered"
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper elevation={5}>
                <Typography variant="h5">Meals</Typography>

                <FormLabel id="food_type">Food Information</FormLabel>
                <RadioGroup
                  aria-labelledby="food_type"
                  row
                  value={editDog?.food_type_id}
                  onChange={handleChangeRadioBtn}
                  name="food_type_id"
                >
                  <FormControlLabel
                    value={"1"}
                    control={<Radio />}
                    label="Purina Pro Plan Large Breed PUPPY"
                  />
                  <FormControlLabel
                    value={"2"}
                    control={<Radio />}
                    label="Purina Pro Plan Large Breed ADULT"
                  />
                  <FormControlLabel
                    value={"3"}
                    control={<Radio />}
                    label="Purina Pro Plan Sensitive Skin & Stomach"
                  />
                  <FormControlLabel
                    value={"4"}
                    control={<Radio />}
                    label="Purina Pro Plan Sport 30/20"
                  />
                  <FormControlLabel
                    value={"5"}
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>

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
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper elevation={5}>
                <Typography variant="h5">Medical Information</Typography>
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

                <FormLabel id="">
                  Is this dog currently recovering from a surgery or medical
                  concern?
                </FormLabel>
                <RadioGroup
                  aria-labelledby="surgery_recovery"
                  row
                  value={editDog?.recovering_from_surgery}
                  name="recovering_from_surgery"
                  onChange={handleChangeBool}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>

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

                <FormLabel id="in_heat">
                  If you're fostering an spayed/neutered female are they in
                  heat?
                </FormLabel>
                <RadioGroup
                  // aria-labelledby="in_heat"
                  row
                  name="in_heat_id"
                  value={editDog?.in_heat_id}
                  onChange={handleChangeRadioBtn}
                >
                  <FormControlLabel value={1} control={<Radio />} label="Yes" />
                  <FormControlLabel value={2} control={<Radio />} label="No" />
                  <FormControlLabel
                    value={3}
                    control={<Radio />}
                    label="Unknown"
                  />
                </RadioGroup>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper elevation={5}>
                <Typography variant="h5">Excercise</Typography>
                <Typography variant="h6">Exercise limitations:</Typography>
                <FormControlLabel
                  id="limit_water"
                  name="limit_water"
                  label="Limit Water"
                  checked={editDog?.limit_water}
                  onChange={handleChangeCheckBox}
                  required
                  control={<Checkbox />}
                />

                <FormControlLabel
                  id="limit_toy_play"
                  name="limit_toy_play"
                  label="Limit Toy Play"
                  checked={editDog?.limit_toy_play}
                  onChange={handleChangeCheckBox}
                  required
                  control={<Checkbox />}
                />

                <FormControlLabel
                  id="watch_carefully"
                  name="watch_carefully"
                  label="May Destroy Toys"
                  checked={editDog?.watch_carefully}
                  onChange={handleChangeCheckBox}
                  required
                  control={<Checkbox />}
                />

                <FormControlLabel
                  id="ingest_toys"
                  name="ingest_toys"
                  label="May Ingest Toys"
                  checked={editDog?.ingest_toys}
                  onChange={handleChangeCheckBox}
                  required
                  control={<Checkbox />}
                />

                <FormControlLabel
                  id="keep_away"
                  name="keep_away"
                  label="May Play Keep Away"
                  checked={editDog?.keep_away}
                  onChange={handleChangeCheckBox}
                  required
                  control={<Checkbox />}
                />

                {/* <Paper elevation={5}> */}
                <Typography variant="h6" id="exercise_equipment">
                  Please indicate what equipment this dog uses for walks.
                </Typography>
                <RadioGroup
                  aria-labelledby="exercise_equipment"
                  row
                  value={editDog?.exercise_equipment_id}
                  name="exercise_equipment_id"
                  onChange={handleChangeRadioBtn}
                >
                  <FormControlLabel
                    value={1}
                    control={<Radio />}
                    label="Gentle leader"
                  />
                  <FormControlLabel
                    value={2}
                    control={<Radio />}
                    label="Halti Headcollar"
                  />
                  <FormControlLabel
                    value={3}
                    control={<Radio />}
                    label="Collar only (unless pulling)"
                  />
                  <FormControlLabel
                    value={4}
                    control={<Radio />}
                    label='"No pull" front front clip harness'
                  />
                  <FormControlLabel
                    value={5}
                    control={<Radio />}
                    label="Walks not reccomended for exercise"
                  />
                </RadioGroup>
                {/* </Paper> */}
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper elevation={5}>
                <Typography variant="h5">Potty Habits</Typography>
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
            </Grid>

            <Grid item xs={6}>
              <Paper elevation={5}>
                <Typography variant="h5">Crate and House Manners</Typography>
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
            </Grid>

            <Grid item xs={12}>
              <Paper elevation={5}>
                <Typography variant="h5">Behavorial Information</Typography>

                <Typography varient="h6">This dog is Comfortable:</Typography>
                <FormControlLabel
                  id="living_with_other_dogs"
                  name="living_with_other_dogs"
                  label="Living with other dogs"
                  checked={editDog?.living_with_other_dogs}
                  onChange={handleChangeCheckBox}
                  required
                  control={<Checkbox />}
                />

                <FormControlLabel
                  id="living_with_cats"
                  name="living_with_cats"
                  label="Living with cats"
                  checked={editDog?.living_with_cats}
                  onChange={handleChangeCheckBox}
                  required
                  control={<Checkbox />}
                />

                <FormControlLabel
                  id="living_with_children_ten_and_up"
                  name="living_with_children_ten_and_up"
                  label="Living with children 10 and up"
                  checked={editDog?.living_with_children_ten_and_up}
                  onChange={handleChangeCheckBox}
                  required
                  control={<Checkbox />}
                />

                <FormControlLabel
                  id="living_with_children_younger_ten"
                  name="living_with_children_younger_ten"
                  label="Living with children under 10"
                  value={editDog?.living_with_children_younger_ten}
                  onChange={handleChangeCheckBox}
                  required
                  control={<Checkbox />}
                />

                <FormControlLabel
                  id="living_with_adults"
                  name="living_with_adults"
                  label="Living with Adults"
                  checked={editDog?.living_with_adults}
                  onChange={handleChangeCheckBox}
                  required
                  control={<Checkbox />}
                />

                <FormControlLabel
                  id="living_with_small_animals"
                  name="living_with_small_animals"
                  label="Living with Small Animals"
                  checked={editDog?.living_with_small_animals}
                  onChange={handleChangeCheckBox}
                  required
                  control={<Checkbox />}
                />

                <FormControlLabel
                  name="living_with_large_animals"
                  onChange={handleChangeCheckBox}
                  required
                  control={<Checkbox />}
                  label="Large Animals"
                  checked={editDog?.living_with_large_animals}
                />

                <Box>
                  <FormLabel id="Behavior1">
                    How does this dog behave around other dogs?
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="behavior type"
                    // defaultValue="1"
                    value={editDog?.behavior_with_other_dogs_id}
                    name="behavior_with_other_dogs_id"
                    onChange={handleChangeRadioBtn}
                  >
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label="Unknown"
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio />}
                      label="Comfortable"
                    />
                    <FormControlLabel
                      value={3}
                      control={<Radio />}
                      label="Indifferent"
                    />
                    <FormControlLabel
                      value={4}
                      control={<Radio />}
                      label="Uncomfortable"
                    />
                  </RadioGroup>
                </Box>

                <Box>
                  <FormLabel id="Behavior1">
                    How does this dog behave around cats?
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="behavior type"
                    value={editDog?.behavior_with_cats_id}
                    name="behavior_with_cats_id"
                    onChange={handleChangeRadioBtn}
                  >
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label="Unknown"
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio />}
                      label="Comfortable"
                    />
                    <FormControlLabel
                      value={3}
                      control={<Radio />}
                      label="Indifferent"
                    />
                    <FormControlLabel
                      value={4}
                      control={<Radio />}
                      label="Uncomfortable"
                    />
                  </RadioGroup>
                </Box>

                <Box>
                  <FormLabel id="Behavior1">
                    How does this dog behave around children
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="behavior type"
                    value={editDog?.behavior_with_children_id}
                    name="behavior_with_children_id"
                    onChange={handleChangeRadioBtn}
                  >
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label="Unknown"
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio />}
                      label="Comfortable"
                    />
                    <FormControlLabel
                      value={3}
                      control={<Radio />}
                      label="Indifferent"
                    />
                    <FormControlLabel
                      value={4}
                      control={<Radio />}
                      label="Uncomfortable"
                    />
                  </RadioGroup>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Save Information
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default EditDogProfile;
