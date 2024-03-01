import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";

function LandingPage() {
  const [heading, setHeading] = useState("Welcome");
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            id felis metus. Vestibulum et pulvinar tortor. Morbi pharetra lacus
            ut ex molestie blandit. Etiam et turpis sit amet risus mollis
            interdum. Suspendisse et justo vitae metus bibendum fringilla sed
            sed justo. Aliquam sollicitudin dapibus lectus, vitae consequat odio
            elementum eget. Praesent efficitur eros vitae nunc interdum, eu
            interdum justo facilisis. Sed pulvinar nulla ac dignissim efficitur.
            Quisque eget eros metus. Vestibulum bibendum fringilla nibh a
            luctus. Duis a sapien metus.
          </p>

          <p>
            Praesent consectetur orci dui, id elementum eros facilisis id. Sed
            id dolor in augue porttitor faucibus eget sit amet ante. Nunc
            consectetur placerat pharetra. Aenean gravida ex ut erat commodo, ut
            finibus metus facilisis. Nullam eget lectus non urna rhoncus
            accumsan quis id massa. Curabitur sit amet dolor nisl. Proin
            euismod, augue at condimentum rhoncus, massa lorem semper lacus, sed
            lobortis augue mi vel felis. Duis ultrices sapien at est convallis
            congue.
          </p>

          <p>
            Fusce porta diam ac tortor elementum, ut imperdiet metus volutpat.
            Suspendisse posuere dapibus maximus. Aliquam vitae felis libero. In
            vehicula sapien at semper ultrices. Vivamus sed feugiat libero. Sed
            sagittis neque id diam euismod, ut egestas felis ultricies. Nullam
            non fermentum mauris. Sed in enim ac turpis faucibus pretium in sit
            amet nisi.
          </p>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

// This code creates a centered login box with username and password fields and 'Sign In' and 'Register' buttons. The handleSubmit function is where you would implement the logic to verify the user's credentials.
// //import React from 'react';
// import { Container, Box, TextField, Button, Typography, Grid } from '@mui/material';
// import { styled } from '@mui/material/styles';

// const LoginContainer = styled(Container)({
//   height: '100vh',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// });

// const Logo = styled('div')({
//   textAlign: 'center',
//   marginBottom: '20px',
// });

// const LoginBox = styled(Box)({
//   width: '100%',
//   maxWidth: '400px',
//   padding: '20px',
//   border: '1px solid #ccc',
//   borderRadius: '4px',
// });

// const LoginPage = () => {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle login logic here
//   };

//   return (
//     <LoginContainer>
//       <LoginBox>
//         <Logo>
//           {/* You can replace this with an actual image tag if you have a logo */}
//           <Typography variant="h4" gutterBottom>
//             Can Do Canines
//           </Typography>
//         </Logo>
//         <Box component="form" onSubmit={handleSubmit} noValidate>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="username"
//             label="Username"
//             name="username"
//             autoComplete="username"
//             autoFocus
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//           />
//           <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//               >
//                 Sign In
//               </Button>
//             </Grid>
//             <Grid item xs={6}>
//               <Button
//                 fullWidth
//                 variant="outlined"
//                 color="secondary"
//                 // Implement the navigation to the User Registration page here
//                 onClick={() => { console.log('Go to registration'); }}
//               >
//                 Register
//               </Button>
//             </Grid>
//           </Grid>
//         </Box>
//       </LoginBox>
//     </LoginContainer>
//   );
// };

// export default LoginPage;
