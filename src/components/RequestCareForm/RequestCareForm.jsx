import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const RequestCareForm = ({ onGoBack, onSave }) => {
  const [dates, setDates] = useState({ startDate: "", endDate: "" });
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDates({ ...dates, [name]: value });
  };

  const handleSave = () => {
    onSave(dates);
    setDialogContent("Your request has been saved successfully!");
    setOpenDialog(true);
  };

  const handleGoBack = () => {
    setDialogContent("Are you sure you want to go back without saving?");
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmGoBack = () => {
    onGoBack();
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="sm">
      <AppBar position="static">
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleGoBack}
        >
          <ArrowBackIcon />
        </IconButton>
      </AppBar>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          mt: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Request a Host for Loki
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
        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "55ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic-comments"
            variant="outlined"
            label="Comments"
            type="text"
            name="Comments"
            onChange={handleChange}
            sx={{ width: 500, my: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
            multiline 
            rows={4} 
          />
        </Box>

        <Box
          sx={{
            "& > :not(style)": { m: 1, width: "55ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic-appointments"
            variant="outlined"
            label="Appointment Notes"
            type="text"
            name="Appointment"
            onChange={handleChange}
            sx={{ width: 500, my: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
            multiline 
            rows={4} 
          />
        </Box>

      
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            mt: 2,
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleConfirmGoBack}
          >
            Go Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1" align="center" sx={{ my: 2 }}>
          Status:
        </Typography>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmGoBack} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RequestCareForm;
