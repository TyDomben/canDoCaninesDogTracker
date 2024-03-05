import React, { useEffect } from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import theme 
//import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// import components
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import UserProfileEdit from '../UserProfileEdit/UserProfileEdit';

// Import the new pages
import SitterHomePage from '../SitterHome/SitterHome';
import AdminHome from '../AdminHome/AdminHome';
import DogCards from '../AllDogForm/AllDogForm';
import DataGrid from '../DataGrid/DataGrid';
import DogProfile from '../DogProfile/DogProfile';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route exact path="/about"><AboutPage /></Route>
          
          {/* Add the new ProtectedRoutes here */}
          <ProtectedRoute exact path="/sitter-home"><SitterHomePage /></ProtectedRoute>
          <ProtectedRoute exact path="/admin-home"><AdminHome /></ProtectedRoute>
          <ProtectedRoute exact path="/all-dog-cards"><DogCards /></ProtectedRoute>
          <ProtectedRoute exact path="/data-grid"><DataGrid /></ProtectedRoute>
          <ProtectedRoute exact path="/user-edit"><UserProfileEdit /> </ProtectedRoute>
          <ProtectedRoute exact path="/user"><UserPage /></ProtectedRoute>
          <ProtectedRoute exact path="/info"><InfoPage /></ProtectedRoute>
     

          <Route exact path="/login">
            {user.id ? <Redirect to="/user" /> : <LoginPage />}
          </Route>

          <Route exact path="/registration">
            {user.id ? <Redirect to="/user" /> : <RegisterPage />}
          </Route>

          <Route exact path="/home">
            {user.id ? <Redirect to="/user" /> : <LandingPage />}
          </Route>

          <Route exact path="/dog-profile">
            <DogProfile />
          </Route>

          <Route><h1>404 - Page Not Found</h1></Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
