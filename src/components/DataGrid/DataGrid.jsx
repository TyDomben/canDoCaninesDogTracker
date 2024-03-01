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
  Toolbar, 
  Typography, 
  IconButton 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const DataGrid = ({ dogs, onVolunteerClick }) => {
  return (
    <>
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
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Can Do Canines
          </Typography>
        </Toolbar>
      </AppBar>
      <TableContainer component={Paper} sx={{ my: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Photo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell align="right">Volunteer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dogs.map((dog) => (
              <TableRow
                key={dog.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {/* Replace with actual image */}
                  <img src="/static/images/dog-placeholder.jpg" alt={dog.name} style={{ width: 50, height: 50 }} />
                </TableCell>
                <TableCell>{dog.name}</TableCell>
                <TableCell>{dog.startDate}</TableCell>
                <TableCell>{dog.endDate}</TableCell>
                <TableCell align="right">
                  <Button variant="outlined" onClick={() => onVolunteerClick(dog)}>
                    Volunteer
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

export default DataGrid;
