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
import axios from "axios";

const AdminHome = () => {
  const dispatch = useDispatch();

  const requests = useSelector((store) => store.adminReducer);
  console.log("requests", requests);

  useEffect(() => {
    dispatch({ type: "FETCH_REQUESTS" });
  }, []);

  const handleConfirm = (requestId, hostingId) => {
    if (typeof hostingId === 'undefined') {
      console.error('hostingId is undefined for requestId:', requestId)
    return;}
    // Dispatch an action with requestId and confirmation status
    dispatch({
      type: "SET_CONFIRMATION",
      payload: {
        requestId,
        hostingId,
        status: true, // Assuming true indicates confirmation
      },
    });
  };

  const handleDeny = (requestId, hostingId) => {
    // Dispatch an action with requestId and denial status
    dispatch({
      type: "DENY_CONFIRMATION",
      payload: {
        requestId,
        hostingId,
        status: false, // Assuming false indicates denial
      },
    });
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ my: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="admin table">
          <TableHead>
            <TableRow>
              <TableCell>Photo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Dates Needed</TableCell>
              <TableCell>Host Name</TableCell>
              <TableCell>Volunteer Name</TableCell>
              <TableCell>Dates Available</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>Confirmed or Denied</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {/* Placeholder image, replace with actual */}
                  <img
                    src={"/public/images/dogoutline.jpeg"}
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
                  {format(
                    new Date(request.volunteer_start_date),
                    "MM/dd/yyyy, h:mm a"
                  )}{" "}
                  to{" "}
                  {format(
                    new Date(request.volunteer_end_date),
                    "MM/dd/yyyy, h:mm a"
                  )}
                </TableCell>
                <TableCell>{request.host_name}</TableCell>
                <TableCell>{request.volunteer_name}</TableCell>
               
                <TableCell>
                  {format(
                    new Date(request.host_start_date),
                    "MM/dd/yyyy, h:mm a"
                  )}{" "}
                  to{" "}
                  {format(
                    new Date(request.host_end_date),
                    "MM/dd/yyyy, h:mm a"
                  )}
                </TableCell>
                <TableCell>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleConfirm(request.request_id, request.hosting_id)}
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeny(request.request_id, request.hosting_id)}
                  >
                    Deny
                  </Button>
                </TableCell>
                 <TableCell>{request.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminHome;
