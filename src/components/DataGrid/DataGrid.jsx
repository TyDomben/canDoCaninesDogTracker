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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { format } from "date-fns";

const DataGrid = () => {
  const [sittingDogs, setSittingDogs] = useState([]);
  const dispatch = useDispatch();

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
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Can-Do Canines that Need Sitters
      </Typography>
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
            {sittingDogs
              .filter((dog) => dog.status === "not confirmed")
              .map((dog, index) => (
                <TableRow key={dog.name + index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {/* Replace with actual image */}
                    <img
                      src="/public/images/dogoutline.jpeg"
                      alt="Dog"
                      style={{
                        height: "100%",
                        width: "auto",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </TableCell>
                  <TableCell>{dog.dog_name}</TableCell>
                  <TableCell>
                    {format(new Date(dog.start_date), "MMMM d, yyyy, h:mm a")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(dog.end_date), "MMMM d, yyyy, h:mm a")}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      onClick={() => onVolunteerClick(dog)}
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
