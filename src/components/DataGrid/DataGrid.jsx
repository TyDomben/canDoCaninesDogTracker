import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";

const DataGrid = () => {
  const [sittingDogs, setSittingDogs] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const [toggle, setToggle] = React.useState("left");

  const handleToggle = (event, newToggle) => {
    setToggle(newToggle);
    if (newToggle === "left") {
      history.push("/datagrid");
    } else if (newToggle === "right") {
      history.push("/alldogcards");
    }
  };

  useEffect(() => {
    dispatch({ type: "FETCH_USER_DOGS" });

    axios
      .get("/api/sitterRequest")
      .then((response) => {
        console.log(response.data);
        setSittingDogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sitter requests:", error);
      });
  }, [dispatch]);

  return (
    <>
      <Box
        sx={{
          height: 100,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid rgba(255, 0, 0, 0.25)",
        }}
      >
        <Typography variant="h3">Hosting Opportunities</Typography>
      </Box>

      <Box sx={{ mt: 1, mb: 2, display: "flex", justifyContent: "center" }}>
        <ToggleButtonGroup
          color="primary"
          value={toggle}
          exclusive
          onChange={handleToggle}
        >
          <ToggleButton value="left">List View</ToggleButton>
          <ToggleButton value="right">Dog Profiles View</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <TableContainer component={Paper} sx={{ my: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ textAlign: "center" }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Photo
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Start Date
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                End Date
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Volunteer
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sittingDogs
              .filter((dog) => dog.status !== "confirmed")
              .sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
              .map((dog, index) => (
                <TableRow
                  key={dog.name + index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {/* Replace with actual image */}
                    <img
                    onClick={() => history.push(`/dogprofile/${dog.dog_id}`)}
                      src={dog.photo}
                      alt="Dog"
                      style={{
                        maxHeight: "100px",
                        maxWidth: "100px",
                        width: "auto",
                        height: "auto",
                        objectFit: "contain",
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">{dog.dog_name}</TableCell>
                  <TableCell align="center">
                    {format(new Date(dog.start_date), "MMMM d, yyyy, h:mm a")}
                  </TableCell>
                  <TableCell align="center">
                    {format(new Date(dog.end_date), "MMMM d, yyyy, h:mm a")}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      onClick={() => history.push(`/volunteerSitterForm/${dog.dog_id}/${dog.start_date}/${dog.end_date}`)}
                      // this should go to the volunteer sitter form based on dog id
                    >
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
