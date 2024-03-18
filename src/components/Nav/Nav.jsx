import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import LogOutButton from "../LogOutButton/LogOutButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
// The Header creates links that can be used to navigate
// between routes.
function Nav() {
  const user = useSelector((store) => store.user);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isAdmin = useSelector((store) => store.user.admin);

  // Drawer toggle function
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  // Nav links
  const navLinks = [
    { text: "Home", path: "/home" },
    { text: "About", path: "/about" },
    { text: "Data Grid", path: "/data-grid" },
    { text: "All Dog Cards", path: "/allDogCards" },
    { text: "Edit Profile", path: "/user-edit" },
    { text: "Info", path: "/info" },
    { text: "Volunteer Sitter Form", path: "/volunteerSitterForm" },
  ];

  console.log(isAdmin)
  // Conditionally add "Admin Home" link if the user is an admin
  if (isAdmin === true) {
    navLinks.push({ text: "Admin Home", path: "/admin-home" });
  }

  // Nav bar
  return (
    <AppBar position="static">
      {/* Drawer */}
      <Toolbar>
        {/* Hamburger Menu */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        {/* Drawer */}
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          {/* Drawer List */}
          <List>
            {/* Conditional rendering for admin links */}
            {user.id && user.role === "admin" && (
              <ListItem
                button
                component={NavLink}
                to="/admin-home"
                onClick={toggleDrawer(false)}
              >
                <ListItemText primary="Admin" />
              </ListItem>
            )}
            {/* Render other navigation links */}
            {navLinks.map((link) => (
              <ListItem
                key={link.path}
                button
                component={NavLink}
                to={link.path}
                onClick={toggleDrawer(false)}
              >
                <ListItemText primary={link.text} />
              </ListItem>
            ))}
            {/* Render logout button if user is logged in */}
            {user.id && (
              <ListItem button onClick={toggleDrawer(false)}>
                <LogOutButton />
              </ListItem>
            )}
          </List>
        </Drawer>
        {/* Render navigation buttons */}
        <Button color="inherit" component={NavLink} to="/">
          Home
        </Button>
        {!user.id && (
          <>
            <Button color="inherit" component={NavLink} to="/login">
              Login
            </Button>
            <Button color="inherit" component={NavLink} to="/registration">
              Register
            </Button>
          </>
        )}
        {user.id && (
          <Button color="inherit" component={NavLink} to="/user">
            Profile
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
