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
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      let url = "";
      if (userId) {
        url = `/api/user/${userId}`;
      } else if (dogId) {
        url = `/api/dog/${dogId}`;
      }

      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, dogId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>No data found</div>;
  }

  // Conditional rendering based on what data is available
  const isUserData = !!userId;
  const name = isUserData ? data.name : data.dogName;
  const image = isUserData ? data.profileImage : data.dogImage;

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
