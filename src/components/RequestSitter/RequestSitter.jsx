// DEPRECIATED DO NOT USE

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  // TextField,
  // MenuItem,
  // Select,
  // FormControl,
  // InputLabel,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";

const RequestSitterForm = ({ userId, dogId, onGoBack, onVolunteer }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`/api/sitter-request/${id}`).then((response) => {
      console.log("sitter request", response.data);
    });
  }, []);

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
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Button startIcon={<ArrowBackIcon />} onClick={onGoBack}>
            Go Back
          </Button>
          <Typography gutterBottom variant="h5" component="div" align="center">
            {name}'s Profile
          </Typography>
          <CardMedia component="img" height="140" image={image} alt={name} />
          {/* Display additional details based on whether it's user or dog data */}
          {isUserData ? (
            <>
              <Typography variant="body1">Username: {data.username}</Typography>
              <Typography variant="body1">Phone: {data.phone}</Typography>
              <Typography variant="body1">Address: {data.address}</Typography>
              <Typography variant="body1">Email: {data.email}</Typography>
            </>
          ) : (
            <>
              <Typography variant="body1">Breed: {data.breed}</Typography>
              <Typography variant="body1">Age: {data.age}</Typography>
            </>
          )}
        </CardContent>
        <Button fullWidth variant="contained" onClick={onVolunteer}>
          Volunteer to Sit
        </Button>
      </Card>
    </Container>
  );
};

export default RequestSitterForm;
