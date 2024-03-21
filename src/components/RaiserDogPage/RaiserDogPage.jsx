import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { isFuture, isPast, format } from "date-fns";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Container,
} from "@mui/material";

const HomePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const doggos = useSelector((store) => store.raiserDogReducer);
  const [sitterDates, setSitterDates] = useState([]);
   const [hostingData, setHostingData] = useState([]);

  useEffect(() => {
    dispatch({ type: "FETCH_USER_DOGS" });
    axios
      .get("/api/sitterRequest")
      .then((response) => {
        setSitterDates(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sitter requests:", error);
      });
  }, [dispatch]);

  const filterDates = (dates, condition) => dates.filter(condition);

  const completedHostings = filterDates(sitterDates, date => isPast(new Date(date.end_date)));
  const upcomingConfirmedHostings = filterDates(sitterDates, date => date.status === "confirmed" && isFuture(new Date(date.end_date)));
  const pendingHostings = filterDates(sitterDates, date => date.status !== "confirmed" && isFuture(new Date(date.end_date)));

  const renderHostings = (hostingData, title) => (
    <Grid item xs={12} sm={6} md={4}>
      <Typography variant="h6" gutterBottom sx={{ height: 75, display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        {title}
      </Typography>
      {hostingData.map((date, index) => (
        <Card key={index} sx={{ mb: 2, border: "1px solid rgba(0, 0, 0, 0.2)" }}>
          <CardContent>
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              {date.dog_name}
            </Typography>
            <Typography variant="body2">{`${format(new Date(date.start_date), "MMMM d, yyyy, h:mm a")} - ${format(new Date(date.end_date), "MMMM d, yyyy, h:mm a")}`}</Typography>
          </CardContent>
        </Card>
      ))}
    </Grid>
  );

  return (
    <>
      <Box sx={{ height: 100, width: "100%", display: "flex", justifyContent: "center", alignItems: "center", borderBottom: "1px solid rgba(255, 0, 0, 0.25)" }}>
        <Typography variant="h3">Landing Page</Typography>
      </Box>

      <Box sx={{ height: 150, width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h4">Dogs You are Hosting</Typography>
      </Box>

      <Container>
        <Grid container spacing={2}>
          {doggos.map((dog, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card onClick={() => history.push(`/dogprofile/${dog.dog_id}`)}>
                <Box sx={{ height: 300, width: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <img src={dog.photo} alt="Dog" style={{ height: "100%", width: "auto", maxWidth: "100%", objectFit: "contain" }} />
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "center" }}>
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
          <Button variant="contained" onClick={() => history.push("/add-dog-form")}>Add a Dog Profile</Button>
        </Box>
      </Container>

      <Container>
        <Box sx={{ height: 150, width: "100%", display: "flex", justifyContent: "center", alignItems: "center", borderTop: "1px solid rgba(255, 0, 0, 0.25)" }}>
          <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>Your Hosting Opportunities</Typography>
          <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
            Your Hosting Opportunities
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {renderHostings(completedHostings, "Completed Hosting Commitments")}
          {renderHostings(upcomingConfirmedHostings, "Upcoming Confirmed Commitments")}
          {renderHostings(pendingHostings, "Hosting Requests Awaiting Admin Confirmation")}
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;

