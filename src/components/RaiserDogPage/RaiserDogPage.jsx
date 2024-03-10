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

const HomePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const doggos = useSelector((store) => store.raiserDogReducer);
  console.log(doggos);

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
  }, [dispatch]);

  return (
    <>
      <Container>
        <Typography variant="h5" gutterBottom>
          Raiser's Dogs
        </Typography>
        <Grid container spacing={2}>
          {/* Map your dog data to these cards */}
          {doggos.map((dog) => (
            <Grid item xs={12} sm={6} md={4}>
              <Card key={dog.id} onClick={() => history.push("/dog-profile")}>
                {/* <Card key={dog.id} onClick={() => console.log(dog)}> */}
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="Dog"
                />
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
        <Button variant="contained" onClick={() => history.push("/add-dog")}>
          Add a Dog Profile
        </Button>

        {/* Sitter Data Section */}
        <Box sx={{ my: 4 }}>
          {/* Sitter Data Components similar to the above */}
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
