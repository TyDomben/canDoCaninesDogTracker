import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
            Can Do Canines
          </Link>
        </Typography>

        {/* Show links depending on user role or authentication status */}
        {!user.id ? (
          // If there's no user logged in, show login/registration links
          <>
            <Button color="inherit" component={NavLink} to="/login">
              Login
            </Button>
            <Button color="inherit" component={NavLink} to="/registration">
              Register
            </Button>
          </>
        ) : (
          // If a user is logged in, show links based on their role
          <>
            <Button color="inherit" component={NavLink} to="/user">
              Home
            </Button>
            {user.role === "admin" && (
              <Button color="inherit" component={NavLink} to="/admin-home">
                Admin Home
              </Button>
            )}
            {user.role === "sitter" && (
              <Button color="inherit" component={NavLink} to="/sitter-home">
                Sitter Home
              </Button>
            )}
            <LogOutButton className="navLink" />
          </>
        )}

        <Button color="inherit" component={NavLink} to="/about">
          About
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
