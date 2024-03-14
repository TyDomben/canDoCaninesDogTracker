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
  AppBar,
  Tabs,
  Tab,
  Box,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";

const AdminHome = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.adminReducer);

  useEffect(() => {
    dispatch({ type: "FETCH_REQUESTS" });
  }, []);

  return (
    <>
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
                <TableCell>{request.dog_name}</TableCell>
                <TableCell>
                  {format(new Date(request.start_date), "MM/dd/yyyy, h:mm a")}{" "}
                  to {format(new Date(request.end_date), "MM/dd/yyyy, h:mm a")}
                </TableCell>
                <TableCell>{request.requester_name}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      dispatch({
                        type: "SET_CONFIRMATION",
                        payload: request.request_id,
                      })
                    }
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() =>
                      dispatch({
                        type: "DENY_CONFIRMATION",
                        payload: request.request_id,
                      })
                    }
                  >
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
