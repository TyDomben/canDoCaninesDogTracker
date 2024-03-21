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
import {useTheme} from "@mui/material/styles"
import Box from "@mui/material/Box";
import logo from "../../../public/Images/CanDoCanines.jpeg";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// The Header creates links that can be used to navigate
// between routes.
function Nav() {
  const history = useHistory();
  const theme = useTheme();
  const user = useSelector((store) => store.user);
  const isAdmin = useSelector((store) => store.user.admin)
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  // Hamburger Menu links
  const navLinks = [
    
    { text: "Home", path: "/home" },
    { text: "Hosting Opportunities", path: "/data-grid" },
    { text: "Edit Profile", path: "/user-edit" },
    { text: "Info", path: "/info" },
    { text: "About", path: "/about" },
  ];
    if (isAdmin === true) {
      navLinks.push({ text: "Admin Home", path: "/admin-home" });
      navLinks.push({ text: "Add Admin ", path: "/allprofiles"})
    }
  
  

  // Nav bar (links)
  return ( 
    <AppBar position="static" sx={{ background: `linear-gradient(to right, white 0%, white 20%, ${theme.palette.primary.main} 80%, ${theme.palette.primary.main} 100%)` }}>
      {/* Drawer */}
      <Toolbar sx={{ justifyContent: 'space-between', maxHeight: '200px' }}>
      <img  onClick={() => history.push('/home')} src={logo} alt="Logo" style={{ maxHeight: '150px' }}/>

        {/* Red Nav Bar components */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'right' }}>
         
          {!user.id ? (
            <>
              <Button color="inherit" component={NavLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={NavLink} to="/registration">
                Register
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={NavLink}
                to="/data-grid"
                sx={{ fontSize: "1.0rem" }}
              >
                Hosting Opportunities
              </Button>

              
              
            </>
          )}
          </Box>

          {/* Hamburger Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: 0, marginBottom: 0 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon sx={{ fontSize: 50 }}/>
          </IconButton>
        </Box>

        {/* Drawer */}
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          {/* Drawer List */}
          <List>
            {user.id && (
              <>
                {user.role === "admin" && (
                  <ListItem
                    button
                    component={NavLink}
                    to="/admin-home"
                    onClick={toggleDrawer(false)}
                  >
                    <ListItemText primary="Admin" />
                  </ListItem>
                )}
              </>
            )}

            {/* Links inside the Hamburger Menu */}
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
            {user.id && (
              <ListItem button onClick={toggleDrawer(false)}>
                <LogOutButton />
              </ListItem>
            )}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
