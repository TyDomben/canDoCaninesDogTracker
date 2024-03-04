import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function UserProfile () {
  // You can pass a user object as a prop to this component
  const user = useSelector((store) => store.user);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Box display="flex" alignItems="center" marginBottom={2}>
          <Avatar
            sx={{ width: 56, height: 56, marginRight: 2 }}
            src="/path-to-your-image.jpg" // Replace with path to user's image
          />
          <Typography variant="h5">{user.name}</Typography>
        </Box>
        <Typography variant="subtitle1" color="textSecondary">
          Username:
        </Typography>
        <Typography variant="body1" gutterBottom>
          {user.username}
        </Typography>

        <Typography variant="subtitle1" color="textSecondary">
          Email:
        </Typography>
        <Typography variant="body1" gutterBottom>
          {user.email}
        </Typography>

        <Typography variant="subtitle1" color="textSecondary">
          Phone #:
        </Typography>
        <Typography variant="body1" gutterBottom>
          {user.phone || 'None'}
        </Typography>

        <Typography variant="subtitle1" color="textSecondary">
          Address:
        </Typography>
        <Typography variant="body1" gutterBottom>
          {user.address}
        </Typography>

        <Typography variant="subtitle1" color="textSecondary">
          Type:
        </Typography>
        <Typography variant="body1">
          {/* {user.petTypes.join(', ')}  */}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserProfile;

// Example usage of UserProfile component
// <UserProfile user={{ name: 'Christine', email: 'christine@prime.com', children: 'None', otherPets: true, petTypes: ['Cats', 'Dogs'] }} />
