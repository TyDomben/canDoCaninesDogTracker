
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  
} from "@mui/material";
import { format } from "date-fns"
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const VolunteerSitterForm = (minStartDate, maxEndDate) => {
  const { startDate } = useParams();
  const { endDate } = useParams();
  const minDate = format(new Date(startDate), 'yyyy-MM-dd');
  const maxDate = format(new Date(endDate), 'yyyy-MM-dd');

  let dispatch = useDispatch("");
  let history = useHistory("");
  const { requestId } = useParams();
  console.log('date', minDate, maxDate )
  
  // const requestHost = useSelector((state) => state.requestHost)
  // useEffect(() => {
  //   if (requestId) {
  //     dispatch({ type: "REQUEST_HOST", payload: { start_date, end_date } });
  //   }
  // }, [requestId]);

  let [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    comments: "",
  });



  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("dispatching VOLUNTEER_TO_HOST action");

    dispatch({
      type: "VOLUNTEER_TO_HOST",
      payload: { requestId, formData },
    });
    history.push("/home");
  };

  const handleGoBack = async (event) => {
    event.preventDefault();
try{
  const value = await 
swal({
  title: "Are you sure?",
  text: "Your request to host will be lost.",
  icon: "warning",
  buttons: {
    cancel: "Complete Request",
    delete: {
      text: "Continue without saving",
      value: "delete",
    },
  },
  dangerMode: true,
});
if (value === "delete"){
  console.log("going back to requestId:", requestId)
  await swal("Request was not saved")
  history.push(`/home`)
} else {
  swal("Cancelled.")
}
} catch (error) {
  console.log("error", error)
  swal("error", "error")
}
  };

  return (


    <Container maxWidth="sm">
      <Typography variant="h4" align="center" sx={{ my: 2 }}>
        Volunteer to Host
      </Typography>
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
                <TextField
          label="Start Date"
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          sx={{ width: "100%", my: 2 }}
          InputLabelProps={{ shrink: true }}
           inputProps={{ 
            min: minDate,
            max: maxDate
          }}
            // max: maxDate, 
          
        />
        <TextField
          label="End Date"
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          sx={{ width: "100%", my: 2 }}
          InputLabelProps={{ shrink: true }}
          inputProps={{
            min: minDate,
            max: maxDate, 
          }}
        />
            <TextField
              id="outlined-basic-comments"
              variant="outlined"
              label="Comments"
              type="text"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              sx={{ width: 500, my: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
              multiline
              rows={4}
            />
           

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Hosting Requirements
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", color: "primary.main", mt: 2, mb: 1 }}
              >
                Raiser Responsibilities (7+ Days)
              </Typography>
              <List dense={true} sx={{ mb: 2 }}>
                {[
                  "Training",
                  "Public outings",
                  "Grooming/husbandry",
                  "Ensuring preventatives are given",
                  "Transport to events",
                  "Health clearances",
                  "BCLs",
                  "etc.",
                ].map((item) => (
                  <ListItem key={item} sx={{ py: 0.5 }}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", color: "primary.main", mt: 3, mb: 1 }}
              >
                Sitter Responsibilities (Less than 7 Days)
              </Typography>
              <Typography variant="body2">
                Requests for less than seven days require a sitter and do not
                generally include public outings.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 3,
              }}
            >
              <Button variant="outlined" color="primary" onClick={handleGoBack} sx={{ width: "48%" }}>
                Go Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ width: "48%" }}
              >
                Submit
              </Button>
            </Box>
          </Box>
    </Container>
  );
};

export default VolunteerSitterForm;
