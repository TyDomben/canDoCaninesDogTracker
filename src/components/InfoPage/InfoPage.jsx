import React from "react";
import {
  Box,
  Typography,
  useTheme,
  List,
  ListItem,
  ListItemText,
  Link, 
} from "@mui/material";

function InfoPage() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: theme.spacing(3), // Consistent spacing from the theme
        backgroundColor: theme.palette.background.paper, // Use theme color for background
        minHeight: "calc(100vh - 64px)", // Subtract AppBar height
      }}
    >
      <Typography variant="h4" gutterBottom>
        How to Use the App
      </Typography>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem>
          <ListItemText primary="1. Sign Up/Register: Start by creating an account to access all features." />
        </ListItem>
        <ListItem>
          <ListItemText primary="2. Adding a Dog: Navigate to the 'Add Dog Form' to input details about new dogs." />
        </ListItem>
        <ListItem>
          <ListItemText primary="3. Volunteer for Tasks: Check out 'Data Grid' or 'All Dog Cards' to find dogs needing assistance or training." />
        </ListItem>
        <ListItem>
          <ListItemText primary="4. Update Dog Profiles: Owners and staff can edit dog profiles through the 'Edit Dog Profile' section." />
        </ListItem>
        <ListItem>
          <ListItemText primary="5. Request Care: If you're going away, use 'Request Care Form' to ensure your dog is looked after." />
        </ListItem>
      </List>
      <Typography variant="h5" sx={{ mt: 4 }}>
        FAQs
      </Typography>
      {/* Example FAQ */}
      <Typography variant="body1" paragraph>
        Q: How do I reset my password? - (for right now you just don't)
      </Typography>
      <Typography variant="body2" paragraph>
        A: Navigate to the login page and click on "Forgot Password" to initiate
        the reset process.
      </Typography>
      {/* Additional FAQs */}
      <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
        Need more help? Contact us at INSERT ACTUAL INFO HERE!{" "}
        <Link href="mailto:support@candocanines.org">
          support@candocanines.org
        </Link>
        .
      </Typography>
    </Box>
  );
}

export default InfoPage;
