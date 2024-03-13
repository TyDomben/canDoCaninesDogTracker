import React from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";

const SitterHomePage = ({
  pastDogs,
  confirmedCommitments,
  pendingRequests,
  onDogSelect,
  onHomeClick,
}) => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Column for past hosted dogs */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Past Dogs You Have Hosted</Typography>
          {/* Map through the pastDogs array to render cards */}
          {pastDogs &&
            pastDogs.map((dog) => (
              <Card
                key={dog.name}
                sx={{ my: 2 }}
                onClick={() => onDogSelect(dog)}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/dog-placeholder.jpg" // Replace with actual image path
                  alt={dog.name}
                />
                <CardContent>
                  <Typography variant="body1">{dog.name}</Typography>
                </CardContent>
              </Card>
            ))}
        </Grid>

        {/* Column for confirmed commitments */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Your Confirmed Commitments</Typography>
          {/* Map through confirmedCommitments to list them */}
          {confirmedCommitments &&
            confirmedCommitments.map((commitment) => (
              <Typography key={commitment.name} variant="body1" sx={{ my: 1 }}>
                {commitment.name} - {commitment.date}
              </Typography>
            ))}
        </Grid>

        {/* Column for requests awaiting confirmation */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">
            Sitter Requests Awaiting Confirmation
          </Typography>
          {/* Map through pendingRequests to list them */}
          {pendingRequests &&
            pendingRequests.map((request) => (
              <Typography key={request.name} variant="body1" sx={{ my: 1 }}>
                {request.name} - {request.date}
              </Typography>
            ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SitterHomePage;
