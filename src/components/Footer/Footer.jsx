import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const theme = useTheme();
  
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: theme.palette.background.default, // Use theme's background color
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1">
          Can Do Canines - Enhancing Lives Through Assistance Dogs.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {"© "}
          <Link color="inherit" href="https://candocanines.org/">
            Can Do Canines
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
