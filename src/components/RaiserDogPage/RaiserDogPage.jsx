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
import { format,isFuture,isPast, parseISO } from "date-fns";

const HomePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const doggos = useSelector((store) => store.raiserDogReducer);
  const sitterData = useSelector((store) => store.dog);
  const [sitterDates, setSitterDates] = useState([]);
  const today = Date.now()
  let newTime = isFuture(new Date(sitterDates[0]?.end_date))
  // const past = isPast(new Date(sitterDates[0])
  console.log("doggos", doggos);
  console.log("sitter date", sitterDates);
  // console.log("today",today, newTime)
  // State and functions for handling the menu
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  // const handleMenu = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

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
      <Box
        sx={{
          height: 100,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid rgba(255, 0, 0, 0.25)",
        }}
      >
        <Typography variant="h3">Landing Page</Typography>
      </Box>

      <Box
        sx={{
          height: 150,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Dogs You are Hosting</Typography>
      </Box>

      <Container>
        <Grid container spacing={2}>
          {/* Map your dog data to these cards */}
          {doggos.map((dog, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                key={dog.dog_id}
                onClick={() => history.push(`/dogprofile/${dog.dog_id}`)}
              >
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
                    src={dog.photo}
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
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ textAlign: "center" }}
                  >
                    {dog.dog_name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container>
        <Box sx={{ textAlign: "center", mt: 2, mb: 2 }}>
          <Button
            variant="contained"
            onClick={() => history.push("/add-dog-form")}
          >
            Add a Dog Profile
          </Button>
        </Box>
      </Container>

      {/* Personal "Hosting Opportunities" Section  */}
      <Container>
        <Box
          sx={{
            height: 150,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderTop: "1px solid rgba(255, 0, 0, 0.25)",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
            Your Hosting Opportunities
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {/* Past Dogs Hosted */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                height: 75,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              Completed Hosting Commitments
            </Typography>
            {sitterDates
              .filter ((date)=> isPast(new Date(date?.end_date) ) === true)
              .map((date, index) =>
                index % 3 === 0 && (
                  <Card
                    key={index}
                    sx={{ mb: 2, border: "1px solid rgba(0, 0, 0, 0.2)" }}
                  >
                    <CardContent>
                      <Typography variant="body1" sx={{ textAlign: "center" }}>
                        {date.dog_name}
                      </Typography>
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
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                height: 75,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              Upcoming Confirmed Commitments
            </Typography>
            {sitterDates
              .filter((date) => date.status === "confirmed" && isFuture(new Date(date?.end_date)) === true)
              .map((date, index) => (
                <Card
                  key={index}
                  sx={{ mb: 2, border: "1px solid rgba(0, 0, 0, 0.2)" }}
                >
                  <CardContent>
                    <Typography variant="body1" sx={{ textAlign: "center" }}>
                      {date.dog_name}
                    </Typography>
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
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                height: 75,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              Hosting Requests Awaiting Admin Confirmation
            </Typography>
            {sitterDates
              .filter((date) => date.status !== "confirmed" && isFuture(new Date(date?.end_date)) === true)
              .map((date, index) => (
                <Card
                  key={index}
                  sx={{ mb: 2, border: "1px solid rgba(0, 0, 0, 0.2)" }}
                >
                  <CardContent>
                    <Typography variant="body1" sx={{ textAlign: "center" }}>
                      {date.dog_name}
                    </Typography>
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
