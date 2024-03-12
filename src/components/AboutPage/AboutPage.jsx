import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

function AboutPage() {
  const theme = useTheme();
  // Example of using the theme's breakpoints for responsive design
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        p: theme.spacing(3), // Use theme spacing for padding
        backgroundColor: theme.palette.background.paper, // Use theme color for background
        color: theme.palette.text.primary, // Use theme color for text
      }}
    >
      <Typography
        variant="h1"
        gutterBottom
        align={matchesSM ? "center" : "left"}
      >
        About This App
      </Typography>
      <Typography variant="body1" paragraph>
        This app is a comprehensive platform designed to enhance the operational
        efficiency of Can Do Canines. Our mission is to streamline the process
        of dog adoption, training schedules, and management for both staff and
        volunteers.
      </Typography>
      <Typography variant="h2" gutterBottom>
        Features
      </Typography>
      <Typography variant="body1" paragraph>
        - Dog Profile Management: Keep track of all dogs, their statuses,
        medical information, and training progress.
      </Typography>
      <Typography variant="body1" paragraph>
        - Volunteer Scheduling: Easily assign volunteers to dogs, ensuring each
        canine receives the attention and training it needs.
      </Typography>
      {/* <Typography variant="body1" paragraph>
        - Event Calendar(TODO): Stay up-to-date with Can Do Canines events, training
        sessions, and volunteer opportunities.
      </Typography> */}
      {/* <Typography variant="body1" paragraph>
        - Success Stories: Share and read stories of how Can Do Canines has made
        a difference in people's lives.
      </Typography> */}
      <Typography variant="body1">
        We're committed to making a difference, one dog at a time. This app is
        our step towards a more organized and efficient way of achieving our
        mission. Thank you for being a part of our journey.
      </Typography>    
    </Box>
  );
}

export default AboutPage;
