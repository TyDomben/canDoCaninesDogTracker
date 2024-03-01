import React from 'react';
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

const RequestSitterProfileCard = ({ dog, onGoBack, onVolunteer }) => {
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
            {dog.name}'s Profile
          </Typography>
          <CardMedia
            component="img"
            height="140"
            image="/static/images/dog-placeholder.jpg" // Replace with actual image path
            alt={dog.name}
          />
          <Typography variant="body1" color="text.secondary" align="center">
            {dog.startDate} - {dog.endDate}
          </Typography>
          <Typography variant="body1">Date of Birth: {dog.dateOfBirth}</Typography>
          <Typography variant="body1">Breed: {dog.breed}</Typography>
        </CardContent>
        <Button fullWidth variant="contained" onClick={onVolunteer}>
          Volunteer to Sit
        </Button>
      </Card>
    </Container>
  );
};

export default RequestSitterProfileCard;
