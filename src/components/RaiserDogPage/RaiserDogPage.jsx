//*HOMEPAGE
import React from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { format } from "date-fns";

const HomePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const doggos = useSelector((store) => store.raiserDogReducer);
  const sitterData = useSelector((store) => store.dog);
  const [sitterDates, setSitterDates] = useState([]);

  console.log("doggos", doggos);
  console.log("sitter date", sitterData);

  // State and functions for handling the menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Add your data fetching and event handling logic here
  useEffect(() => {
    dispatch({ type: "FETCH_USER_DOGS" });
    console.log("Updated sitterDates", sitterDates);
    axios
      .get("/api/sitterRequest")
      .then((response) => {
        setSitterDates(response.data);
        // Assuming response.data is your sitterDates array
        // const pastDogs = response.data.filter((_, index) => index % 3 === 0);
        // const confirmedDogs = response.data.filter(
        //   (_, index) => index % 3 === 1
        // );
        // const awaitingDogs = response.data.filter(
        //   (_, index) => index % 3 === 2
        // );
        // Now you can set your state with these three new arrays
      })
      .catch((error) => {
        console.error("Error fetching sitter requests:", error);
      });
  }, [dispatch]);

  return (
    <>
      <Container>
        <Typography variant="h5" gutterBottom>
          Dogs You Are Hosting
        </Typography>
        <Grid container spacing={2}>
          {/* Map your dog data to these cards */}
          {doggos.map((dog) => (
            <Grid item xs={12} sm={6} md={4}>
              <Card
                key={dog.id}
                onClick={() => history.push(`/dogprofile/${dog.id}`)}
              >
                {/* <Card key={dog.id} onClick={() => console.log(dog)}> */}
                <Box
                  sx={{
                    height: 300,
                    width: "auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="/public/images/dogoutline.jpeg"
                    alt="Dog"
                    style={{
                      height: "100%",
                      width: "auto",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {dog.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {/* ... other dogs */}
        </Grid>
        <Button
          variant="contained"
          // TODO need to center button
          onClick={() => history.push("/add-dog-form")}
        >
          Add a Dog Profile
        </Button>

        {/* Sitter Data Section */}
        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
          Sitter Data
        </Typography>
        <Grid container spacing={2}>
          {/* Past Dogs Hosted */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Past Dogs You Have Hosted
            </Typography>
            {sitterDates.map(
              (date, index) =>
                index % 3 === 0 && (
                  <Card key={index}>
                    <CardContent>
                      <Typography variant="body1">{date.dog_name}</Typography>
                      <Typography variant="body2">{`${format(
                        new Date(date.start_date),
                        "MMMM d, yyyy, h:mm a"
                      )} - ${format(
                        new Date(date.end_date),
                        "MMMM d, yyyy, h:mm a"
                      )}`}</Typography>
                    </CardContent>
                  </Card>
                )
            )}
          </Grid>

          {/* Confirmed Commitments */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Your Confirmed Commitments
            </Typography>
            {sitterDates
              .filter((date) => date.status === "confirmed")
              .map((date, index) => (
                <Card key={index}>
                  <CardContent>
                    <Typography variant="body1">{date.dog_name}</Typography>
                    <Typography variant="body2">
                      Start:{" "}
                      {format(
                        new Date(date.start_date),
                        "MMMM d, yyyy, h:mm a"
                      )}
                    </Typography>
                    <Typography variant="body2">
                      End:{" "}
                      {format(new Date(date.end_date), "MMMM d, yyyy, h:mm a")}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
          </Grid>

          {/* Requests Awaiting Confirmation */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Sitter Requests Awaiting Confirmation
            </Typography>
            {sitterDates
              .filter((date) => date.status !== "confirmed")
              .map((date, index) => (
                <Card key={index}>
                  <CardContent>
                    <Typography variant="body1">{date.dog_name}</Typography>
                    <Typography variant="body2">
                      Start:{" "}
                      {format(
                        new Date(date.start_date),
                        "MMMM d, yyyy, h:mm a"
                      )}
                    </Typography>
                    <Typography variant="body2">
                      End:{" "}
                      {format(new Date(date.end_date), "MMMM d, yyyy, h:mm a")}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
