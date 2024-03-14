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
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { format } from "date-fns";

const AdminHome = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.adminReducer);

  useEffect(() => {
    dispatch({ type: "FETCH_REQUESTS" });
  }, []);

  const onConfirm = (id) => {
    dispatch({ type: "SET_CONFIRMATION", payload: { request_id: id } });
    // axios
    //   .put(`/api/admin/${id}`, { status: "confirmed" })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const onDeny = () => {};

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
                  {format(new Date(request.start_date), "MMMM d, yyyy, h:mm a")}{" "}
                  to{" "}
                  {format(new Date(request.end_date), "MMMM d, yyyy, h:mm a")}
                </TableCell>
                <TableCell>{request.requester_name}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      onConfirm(request.request_id, request.status)
                    }
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => onDeny(request)}
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
