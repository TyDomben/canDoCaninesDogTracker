import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const RequestCareForm = ({ onGoBack, onSave }) => {
  const [dates, setDates] = useState({ startDate: '', endDate: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDates({ ...dates, [name]: value });
  };

  const handleSave = () => {
    onSave(dates);
    // Show confirmation alert
  };

  const handleGoBack = () => {
    // Confirm if the user wants to go back without saving
    onGoBack();
    // Show confirmation alert
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
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Request a Sitter for Loki
        </Typography>
        <TextField
          label="Start Date"
          type="date"
          name="startDate"
          value={dates.startDate}
          onChange={handleChange}
          sx={{ width: 250, my: 2 }}
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
          sx={{ width: 250, my: 2 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2 }}>
          <Button variant="outlined" color="secondary" onClick={handleGoBack}>
            Go Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RequestCareForm;
