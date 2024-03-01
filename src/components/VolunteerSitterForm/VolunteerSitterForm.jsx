import React, { useState } from 'react';
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Box 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const VolunteerSitterForm = ({ onGoBack, onSubmit }) => {
  const [dates, setDates] = useState({ startDate: '2024-04-03', endDate: '2024-04-07' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDates({ ...dates, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(dates);
    // Handle the submission, potentially navigate the user to a confirmation page
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
      <Typography variant="h4" align="center" sx={{ my: 2 }}>
        Volunteer to be a Sitter for Loki
      </Typography>
      <Box 
        component="form" 
        noValidate 
        autoComplete="off" 
        sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <TextField
          label="Start Date"
          type="date"
          name="startDate"
          value={dates.startDate}
          onChange={handleChange}
          sx={{ width: '100%', my: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="End Date"
          type="date"
          name="endDate"
          value={dates.endDate}
          onChange={handleChange}
          sx={{ width: '100%', my: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2 }}>
          <Button variant="outlined" onClick={onGoBack}>
            Go Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default VolunteerSitterForm;
