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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { format } from "date-fns";

const DogCards = ({ dogs, onCardClick }) => {
  const dispatch = useDispatch();
  const history = useHistory()
  const [allDogs, setAllDogs] = useState([]);

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

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ my: 2 }}>
        Can-Do Canines that Need Sitters
      </Typography>
      <Grid container spacing={3}>
        {allDogs
          .filter((dog) => dog.status !== "confirmed")
          .map((dog, index) => (
            <Card key={index} onClick={() => history.push(`/volunteerSitterForm/${dog.dog_id}`)}>
              {/* this should go somewhere else, not sitter request persay - volunteer sitter form based on the id */}
              {/* // <Card key={index} onClick={() => console.log(dog)}> */}
              <CardContent>
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
                <Typography variant="body1">{dog.dog_name}</Typography>
                <Typography variant="body2">
                  Start:{" "}
                  {format(new Date(dog.start_date), "MMMM d, yyyy, h:mm a")}
                </Typography>
                <Typography variant="body2">
                  End: {format(new Date(dog.end_date), "MMMM d, yyyy, h:mm a")}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </Grid>
    </Container>
  );
};

export default DogCards;
