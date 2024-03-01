import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  AppBar,
  Tabs,
  Tab,
  Box,
  Typography,
} from '@mui/material';

const AdminHome = ({ requests, onConfirm, onDeny }) => {
  // Tab navigation state and handler
  const [value, setValue] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static">
        <Tabs value={value} onChange={handleTabChange} aria-label="admin navigation tabs">
          <Tab label="Home Page" />
          <Tab label="Data Grid" />
          <Tab label="Care Requests" />
          <Tab label="User Profile" />
        </Tabs>
      </AppBar>
      <TableContainer component={Paper} sx={{ my: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="admin table">
          <TableHead>
            <TableRow>
              <TableCell>Photo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Dates Needed</TableCell>
              <TableCell>Volunteer Name</TableCell>
              <TableCell>Dates Available</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {/* Placeholder image, replace with actual */}
                  <img src="/static/images/dog-placeholder.jpg" alt="Dog" style={{ width: 50, height: 50 }} />
                </TableCell>
                <TableCell>{request.dogName}</TableCell>
                <TableCell>{request.datesNeeded}</TableCell>
                <TableCell>{request.volunteerName}</TableCell>
                <TableCell>{request.datesAvailable}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => onConfirm(request)}>
                    Confirm
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => onDeny(request)}>
                    Deny
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminHome;
