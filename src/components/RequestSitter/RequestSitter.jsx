import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Container,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';

const RequestSitterForm = ({ sitterId, onGoBack, onVolunteer }) => {
  const [sitter, setSitter] = useState(null);

  useEffect(() => {
    const fetchSitterData = async () => {
      try {
        const response = await axios.get(`/api/sitter/${sitterId}`);
        setSitter(response.data);
      } catch (error) {
        console.error('Error fetching sitter data:', error);
      }
    };

    fetchSitterData();
  }, [sitterId]);

  if (!sitter) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Can Do Canines
          </Typography>
        </Toolbar>
      </AppBar>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Button startIcon={<ArrowBackIcon />} onClick={onGoBack}>
            Go Back
          </Button>
          <Typography gutterBottom variant="h5" component="div" align="center">
            {sitter.name}'s Profile
          </Typography>
          <CardMedia
            component="img"
            height="140"
            image={sitter.profileImage}
            alt={sitter.name}
          />
          <Typography variant="body1">Username: {sitter.username}</Typography>
          <Typography variant="body1">Phone: {sitter.phone}</Typography>
          <Typography variant="body1">Address: {sitter.address}</Typography>
          <Typography variant="body1">Email: {sitter.email}</Typography>
        </CardContent>
        <Button fullWidth variant="contained" onClick={onVolunteer}>
          Volunteer to Sit
        </Button>
      </Card>
    </Container>
  );
};

export default RequestSitterForm;