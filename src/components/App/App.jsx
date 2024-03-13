import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
import SitterHomePage from "../SitterHome/SitterHome";
import UserPage from "../UserPage/UserPage";
import UserProfileEdit from "../UserProfileEdit/UserProfileEdit";
import VolunteerSitterForm from "../VolunteerSitterForm/VolunteerSitterForm";
import "./App.css";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const customTheme = createTheme(theme);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <ThemeProvider theme={customTheme}>
      <Router>
        <div>
          <Nav />
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route exact path="/about">
              <AboutPage />
            </Route>
            {/* Add the new ProtectedRoutes here */}

            <ProtectedRoute exact path="/sitter-home">
              <SitterHomePage />
            </ProtectedRoute>
            <ProtectedRoute exact path="/admin-home">
              <AdminHome />
            </ProtectedRoute>
            <ProtectedRoute exact path="/add-dog-form">
              <AddDogForm />
            </ProtectedRoute>
            <ProtectedRoute exact path="/data-grid">
              <DataGrid />
            </ProtectedRoute>
            <ProtectedRoute exact path="/raiser-home">
              <RaiserDogPage />
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
            <ProtectedRoute exact path="/sitterHome">
              <SitterHomePage />
            </ProtectedRoute>
            <ProtectedRoute exact path="/adminHome">
              <AdminHome />
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
            <ProtectedRoute exact path="/volunteersitterform/:requestId">
              <VolunteerSitterForm />
            </ProtectedRoute>
            <ProtectedRoute exact path="/requestcareform/:dogId">
              <RequestCareForm />
              </ProtectedRoute>
            {/* //! right now the request care form is not working, UNLESS it is pulling the dog id */}
            <ProtectedRoute exact path="/dogprofile/:dogId">
              <DogProfile />
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
            {/* <Route path="/dogprofile/:dogId" component={DogProfile} />
            <Route path="/editdogprofile/:id" component={EditDogProfile} />
            <Route path="/requestcareform/:dogId" component={RequestCareForm} /> */}
            <Route>
              <h1>404 - Page Not Found</h1>
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
