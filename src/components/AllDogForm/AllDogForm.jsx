import React from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardActionArea, 
  CardContent, 
  CardMedia, 
  Typography, 
  AppBar, 
  Toolbar, 
  IconButton 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const DogCards = ({ dogs, onCardClick }) => {
  return (
    <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Can Do Canines
          </Typography>
        </Toolbar>
      </AppBar>
      <Typography variant="h4" sx={{ my: 2 }}>
        Can-Do Canines that Need Sitters
      </Typography>
      <Grid container spacing={3}>
        {dogs.map((dog) => (
          <Grid item xs={12} sm={6} md={3} key={dog.name}>
            <Card>
              <CardActionArea onClick={() => onCardClick(dog)}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/dog-placeholder.jpg" // Replace with actual image path
                  alt={dog.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {dog.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {dog.dates}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DogCards;
