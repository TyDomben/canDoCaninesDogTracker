import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import swal from "sweetalert";
import {
  Container,
  TextField,
  Button,
  Typography,
  AppBar,
  IconButton,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const RequestCareForm = () => {
  let dispatch = useDispatch("");
  let history = useHistory("");
  const dogProfile = useSelector((state) => state.fetchOneDogProfile);
  const { dogId } = useParams();
  console.log("dogId from useParams:", dogId);
  
  let [newRequest, setNewRequest] = useState({
    start_date: "",
    end_date: "",
    date_comments: "",
    appointments: "",
  });
  useEffect(() => {
    if (dogId) {
      dispatch({ type: "FETCH_ONE_DOG_PROFILE", payload: { dogId } });
    }
  }, [dogId]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewRequest({ ...newRequest, [name]: value });
  };
  const handleSave = async (event) => {
    event.preventDefault();
    console.log("dispatching REQUEST HOST action");
    dispatch({
      type: "REQUEST_HOST",
      payload: { dogId, formData: newRequest },
    });
    history.push(`/dogprofile/${dogId}`);
  };

  const onGoBack = async (event) => {
    event.preventDefault();
    try {
      const value = await swal({
        title: "Are you sure?",
        text: "Any data entered in your request will be lost.",
        icon: "warning",
        buttons: {
          cancel: "Go back to your request",
          delete: {
            text: "Continue without saving",
            value: "delete",
          },
        },
        dangerMode: true,
      });
      if (value === "delete") {
        console.log("going back to dog id:", dogId);
        await swal("Request was not saved");
        history.push(`/dogprofile/${dogId}`);
      } else {
        swal("Cancelled.");
      }
    } catch (error) {
      console.log("error", error);
      swal("error", "error");
    }
  };
  const today = new Date().toISOString().split("T")[0];
  return (
    <Container maxWidth="sm">
              <IconButton
          onClick={onGoBack}
          sx={{ color: "red", fontSize: "2.5rem" }}
        >
          <ArrowBackIcon sx={{ fontSize: "inherit" }} />
        </IconButton>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          mt: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Request a Sitter for {dogProfile?.dog_name}
        </Typography>
        <TextField
          label="Start Date"
          type="date"
          name="start_date"
          value={newRequest.start_date}
          onChange={handleChange}
          sx={{ width: 250, my: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: today,
          }}
        />
        <TextField
          label="End Date"
          type="date"
          name="end_date"
          value={newRequest.end_date}
          onChange={handleChange}
          sx={{ width: 250, my: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "55ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic-comments"
            variant="outlined"
            label="Comments"
            type="text"
            name="date_comments"
            onChange={handleChange}
            sx={{ width: 500, my: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
            multiline
            rows={4}
          />
        </Box>
        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "55ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic-appointments"
            variant="outlined"
            label="Appointment Notes"
            type="text"
            name="appointments"
            onChange={handleChange}
            sx={{ width: 500, my: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
            multiline
            rows={4}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            mt: 2,
          }}
        >
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default RequestCareForm;
