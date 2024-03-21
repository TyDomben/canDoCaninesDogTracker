import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import theme from "../../theme";
// import components
import AboutPage from "../AboutPage/AboutPage";
import AddDogForm from "../AddDogForm/AddDogForm";
import AdminHome from "../AdminHome/AdminHome";

import DataGrid from "../DataGrid/DataGrid";
import DogCards from "../AllDogForm/AllDogForm";
import DogProfile from "../DogProfile/DogProfile";
import EditDogProfile from "../EditDogProfile/EditDogProfile";
import Footer from "../Footer/Footer";
import InfoPage from "../InfoPage/InfoPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import Nav from "../Nav/Nav";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import RaiserDogPage from "../RaiserDogPage/RaiserDogPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import RequestCareForm from "../RequestCareForm/RequestCareForm";
import UserPage from "../UserPage/UserPage";
import UserProfileEdit from "../UserProfileEdit/UserProfileEdit";
import VolunteerSitterForm from "../VolunteerSitterForm/VolunteerSitterForm";
import AllProfiles from "../AllProfiles/AllProfiles";
import PhotoUpload from "../PhotoUpload/PhotoUpload";

import "./App.css";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const isAdmin = useSelector((store) => store.user.admin)
  const customTheme = createTheme(theme);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <ThemeProvider theme={customTheme}>
      <Router>
        <div>
          <Nav />
          <Box
            sx={{
              pb: "100px",
            }}
          >
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route exact path="/about">
                <AboutPage />
              </Route>
              {/* Add the new ProtectedRoutes here */}

              <ProtectedRoute exact path="/admin-home">
                <AdminHome />
              </ProtectedRoute>
              <ProtectedRoute exact path="/add-dog-form">
                <AddDogForm />
              </ProtectedRoute>
              <ProtectedRoute exact path="/data-grid">
                <DataGrid />
              </ProtectedRoute>
              <ProtectedRoute exact path="/user-edit">
                <UserProfileEdit />{" "}
              </ProtectedRoute>
              <ProtectedRoute exact path="/user">
                <UserPage />
              </ProtectedRoute>
              <ProtectedRoute exact path="/info">
                <InfoPage />
              </ProtectedRoute>
              <ProtectedRoute exact path="/home">
                <RaiserDogPage />
              </ProtectedRoute>

              <ProtectedRoute exact path="/allDogCards">
                <DogCards />
              </ProtectedRoute>
              <ProtectedRoute exact path="/dataGrid">
                <DataGrid />
              </ProtectedRoute>
              <ProtectedRoute exact path="/userEdit">
                <UserProfileEdit />
              </ProtectedRoute>
              <ProtectedRoute exact path="/user">
                <UserPage />
              </ProtectedRoute>
              <ProtectedRoute exact path="/info">
                <InfoPage />
              </ProtectedRoute>
              <ProtectedRoute exact path="/volunteersitterform/:requestId/:startDate/:endDate">
                <VolunteerSitterForm />
              </ProtectedRoute>
              <ProtectedRoute exact path="/requestcareform/:dogId">
                <RequestCareForm />
              </ProtectedRoute>
              <ProtectedRoute exact path="/editdogprofile/:dogId">
                <EditDogProfile />
              </ProtectedRoute>



              {/* <ProtectedRoute exact path="/all-profiles">
                <AllProfiles />
              </ProtectedRoute> */}

              <ProtectedRoute exact path="/dogprofile/:dogId">
                <DogProfile />
              </ProtectedRoute>

              {isAdmin === true &&
                <ProtectedRoute exact path="/adminHome">
                  <AdminHome />
                </ProtectedRoute>
              }


              {isAdmin === true && 
              <ProtectedRoute exact path="/allprofiles">
                <AllProfiles />
              </ProtectedRoute>
              }
              <ProtectedRoute exact path="/profilephoto/:dogId">
                <PhotoUpload />
              </ProtectedRoute>

              <Route exact path="/login">
                {user.id ? <Redirect to="/user" /> : <LoginPage />}
              </Route>
              <Route exact path="/registration">
                {user.id ? <Redirect to="/user" /> : <RegisterPage />}
              </Route>
              <Route exact path="/home">
                {user.id ? <Redirect to="/user" /> : <LandingPage />}
              </Route>
              <Route>
                <h1>404 - Page Not Found</h1>
              </Route>
            </Switch>
          </Box>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
