import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useParams } from "react-router-dom";
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
import axios from 'axios';

function PhotoUpload() {
  const { dogId } = useParams();

  let [newPhoto, setPhoto] = useState({
    photo_url: null,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPhoto({ ...newPhoto, photo_url: file });
  };

  const addNewPhoto = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    // Object.entries(newPhoto).forEach(([key, value]) => {
      formData.append('photo', newPhoto.photo_url);
    

    try {
      await axios.post(`/api/dog/photo/${dogId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // dispatch({ type: "ADD_PHOTO", payload: newPhoto });
      // setShouldRedirect(true);
    } catch (error) {
      console.error("Error adding photo:", error);
    }
  };





  return (
    <div>
      <form onSubmit={addNewPhoto}>
      <p>Add Profile Picture</p>
        <input type="file" name= "photo" onChange={handleFileChange} />
        <Button onClick={addNewPhoto}>Upload Photo</Button>
      </form>
    </div>
  );
}

export default PhotoUpload;