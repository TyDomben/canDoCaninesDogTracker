// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E31837', // Can Do Canines Red
    },
    secondary: {
      main: '#F4A620', // Example secondary color (Orange)
    },
    error: {
      main: '#D32F2F',
    },
    warning: {
      main: '#FFA000',
    },
    info: {
      main: '#1976D2',
    },
    success: {
      main: '#388E3C',
    },
    background: {
      default: '#fff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#231F20', // 100% Black
      secondary: '#AEB3B7', // 30% Grey
    },
    // Additional colors from the secondary palette
    additionalPalette: {
      purple: '#552D84',
      blueLight: '#88D1D1',
      blueDark: '#1B658F',
      green: '#B7B684',
    },
  },
  typography: {
    fontFamily: '"Helvetica Neue LT Std", "Georgia", sans-serif',
    button: {
      textTransform: 'none', // Buttons don't have uppercase text by default
    },
    // Custom styles for headings, body text, etc.
    // h1: {
    //   fontSize: '2.2rem',
    //   fontWeight: 500,
    // },
    // body1: {
    //   fontSize: '1rem',
    // },
    // h2: {
    //   fontSize: '2.0rem',
    //   fontWeight: 400,
    // },
    // h3: {
    //   fontSize: '1.8rem',
    //   fontWeight: 300,
    // }
  },
  overrides: {
    // Override MUI component styles here
    MuiButton: {
      root: {
        borderRadius: 4, // Example of customizing button border radius
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#E31837', // Override AppBar color to match brand primary color
      },
    },
  },
  breakpoints: {
    // Custom breakpoints if needed
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  // Custom mixins or functions to extend theme capabilities
  mixins: {
    toolbar: {
      minHeight: 56,
      '@media (min-width:600px)': {
        minHeight: 64,
      },
    },
  },
});

export default theme;
