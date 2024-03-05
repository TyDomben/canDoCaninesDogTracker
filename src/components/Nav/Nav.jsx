import React from "react";
import { NavLink } from "react-router-dom";
// import { Link } from "@mui/material";
import { useSelector } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <AppBar position="static">
      <Toolbar>
        {/* ... other components */}
        {user.id && (
          // Only show these links if a user is logged in
          <>
            <Button color="inherit" component={NavLink} to="/user-home">
              User Home
            </Button>
            {user.role === "admin" && (
              // Only show this link for admins
              <Button color="inherit" component={NavLink} to="/admin-home">
                Admin
              </Button>
            )}
            {user.role === "raiser" && (
              // Only show this link for raisers
              <Button color="inherit" component={NavLink} to="/raiser-dog-page">
                Raiser
              </Button>
            )}
            {user.role === "sitter" && (
              // Only show this link for sitters
              <Button color="inherit" component={NavLink} to="/sitter-home">
                Sitter
              </Button>
            )}
            {/* ... other links for different roles */}
          </>
        )}
        <Button color="inherit" component={NavLink} to="/about">
          About
        </Button>
        <Button color="inherit" component={NavLink} to="/data-grid">
          Data Grid
        </Button>
        <Button color="inherit" component={NavLink} to="/all-dog-cards">
          All Dog Cards
        </Button>
        <Button color="inherit" component={NavLink} to="/login">
          Login
        </Button>
        <Button color="inherit" component={NavLink} to="/registration">
          Register
        </Button>
        <Button color="inherit" component={NavLink} to="/sitter-home">
          Sitter Home
        </Button>
        <Button color="inherit" component={NavLink} to="/user-home">
          User Home
        </Button>
        <Button color="inherit" component={NavLink} to="/admin-home">
          Admin Home
        </Button>
        <Button color="inherit" component={NavLink} to="/user-edit">
          User Edit
        </Button>
        <Button color="inherit" component={NavLink} to="/user">
          User
        </Button>
        <Button color="inherit" component={NavLink} to="/info">
          Info
        </Button>

        {/* Include the logout button only if a user is logged in */}
        {user.id && <LogOutButton className="navLink" />}
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
