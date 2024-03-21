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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const allProfiles = useSelector((store) => store.adminReducer);
  console.log(allProfiles);

  useEffect(() => {
    dispatch({ type: "FETCH_ALL_USERS" });
  }, []);

  return (
    <>
      <Container>
        <Typography variant="h5" gutterBottom>
          All User Profiles
        </Typography>
        <Grid container spacing={2}>
          {allProfiles.map((profile, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card key={profile.id}>
                <Box
                  sx={{
                    height: 300,
                    width: "auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {profile.name}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    {profile.email}
                  </Typography>
                  {(profile.admin === null || profile.admin === false) && (
                    <>
                      <Typography gutterBottom variant="h5" component="div">
                        Not Admin
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          dispatch({
                            type: "CONFIRM_ADMIN",
                            payload: profile.id,
                          })
                        }
                      >
                        Make Admin
                      </Button>


                    </>
                  )}
                  {(profile.admin === true && profile.id !== 1) && (
                    <>
                      <Typography gutterBottom variant="h5" component="div">
                        Admin
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_ADMIN",
                            payload: profile.id,
                          })
                        }
                      >
                        Remove Admin
                      </Button>


                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
