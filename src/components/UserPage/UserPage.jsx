import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';

const UserProfile = ({ user }) => {
  // You can pass a user object as a prop to this component
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Box display="flex" alignItems="center" marginBottom={2}>
          <Avatar
            sx={{ width: 56, height: 56, marginRight: 2 }}
            src="/path-to-your-image.jpg" // Replace with path to user's image
          />
          <Typography variant="h5">Your Profile</Typography>
        </Box>
        <Typography variant="subtitle1" color="textSecondary">
          Name:
        </Typography>
        <Typography variant="body1" gutterBottom>
          {user.name}
        </Typography>

        <Typography variant="subtitle1" color="textSecondary">
          Email:
        </Typography>
        <Typography variant="body1" gutterBottom>
          {user.email}
        </Typography>

        <Typography variant="subtitle1" color="textSecondary">
          Children:
        </Typography>
        <Typography variant="body1" gutterBottom>
          {user.children || 'None'}
        </Typography>

        <Typography variant="subtitle1" color="textSecondary">
          Other Pets:
        </Typography>
        <Typography variant="body1" gutterBottom>
          {user.otherPets ? 'Yes' : 'No'}
        </Typography>

        <Typography variant="subtitle1" color="textSecondary">
          Type:
        </Typography>
        <Typography variant="body1">
          {user.petTypes.join(', ')} {/* Assuming petTypes is an array */}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserProfile;

// Example usage of UserProfile component
// <UserProfile user={{ name: 'Christine', email: 'christine@prime.com', children: 'None', otherPets: true, petTypes: ['Cats', 'Dogs'] }} />
