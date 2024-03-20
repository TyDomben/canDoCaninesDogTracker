import React from "react";
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { format } from "date-fns";

const DogCards = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [allDogs, setAllDogs] = useState([]);
  const [toggle, setToggle] = React.useState("right");

  useEffect(() => {
    dispatch({ type: "FETCH_USER_DOGS" });

    axios
      .get("/api/sitterRequest")
      .then((response) => {
        setAllDogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sitter requests:", error);
      });
  }, [dispatch]);

  console.log("Updated allDogs", allDogs);

  const handleToggle = (event, newToggle) => {
    setToggle(newToggle);
    if (newToggle === "left") {
      history.push("/datagrid");
    } else if (newToggle === "right") {
      history.push("/alldogcards");
    }
  };

  return (
    <Container maxWidth="lg">
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
        <Typography variant="h3">Hosting Opportunities</Typography>
      </Box>

      <Box sx={{ mt: 1, mb: 4, display: "flex", justifyContent: "center" }}>
        <ToggleButtonGroup
          color="primary"
          value={toggle}
          exclusive
          onChange={handleToggle}
        >
          <ToggleButton value="left">List View</ToggleButton>
          <ToggleButton value="right">Dog Profiles View</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Grid container spacing={3}>
        {allDogs
          .filter((dog) => dog.status !== "confirmed")
          .sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
          .map((dog, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card elevation={3}>
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                  {dog.dog_name}
                </Typography>
                <CardActionArea
                  onClick={() => history.push(`/dogprofile/${dog.dog_id}`)}
                >
                  <CardMedia
                    component="img"
                    image={dog.photo}
                    alt={dog.dog_name}
                    sx={{
                      height: 200, 
                      objectFit: 'contain',
                      backgroundSize: 'contain',
                      width: '100%', 
                      margin: '0 auto', }}
                  />

                  <CardContent>
                  <Typography variant="body2" sx={{ textAlign: "center" }}>
                    Start:{" "}
                    {format(new Date(dog.start_date), "MMMM d, yyyy, h:mm a")}
                  </Typography>
                  <Typography variant="body2" sx={{ textAlign: "center" }}>
                    End:{" "}
                    {format(new Date(dog.end_date), "MMMM d, yyyy, h:mm a")}
                  </Typography>
                  </CardContent>

                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default DogCards;
