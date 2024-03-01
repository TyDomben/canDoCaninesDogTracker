import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Typography, 
  Container, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Box 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const DogProfileCard = ({ dogData, onGoBack, onDelete, onEdit, onRequestCareDates }) => {
  // You would replace the `dogData` with actual data pulled from your backend or state management
  const handleDelete = () => {
    // Confirm deletion and call onDelete
  };

  const handleEdit = () => {
    // Navigate to Edit Dog Profile
  };

  const handleRequestCareDates = () => {
    // Navigate to Request Care Dates
  };

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
          <IconButton onClick={onGoBack}>
            <ArrowBackIcon />
          </IconButton>
          <Typography gutterBottom variant="h5" component="div">
            Dog 1’s Profile
          </Typography>
          <CardMedia
            component="img"
            height="140"
            image="/static/images/dog-placeholder.jpg" // Replace with actual image path
            alt="Dog"
          />
          {/* Display the rest of the dog's information here */}
          <Typography variant="body1">Name: {dogData.name}</Typography>
          <Typography variant="body1">Date of Birth: {dogData.dateOfBirth}</Typography>
          <Typography variant="body1">Breed: {dogData.breed}</Typography>
          {/* ... other dog details */}
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete Profile
          </Button>
          <Button variant="outlined" onClick={handleEdit} sx={{ mx: 1 }}>
            Edit Profile
          </Button>
          <Button variant="contained" color="primary" onClick={handleRequestCareDates}>
            Request Care Dates
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default DogProfileCard;
