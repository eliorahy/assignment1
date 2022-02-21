import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function LoginForm() {
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
  const [showFailureAlert, setShowFailureAlert] = React.useState(false);
  const [showWelcomePage, setShowWelcomePage] = React.useState(false);

  // This is used to show the alert
  React.useEffect(() => {
    if (showSuccessAlert) {
      setTimeout(() => {
        setShowSuccessAlert(false);
        setShowWelcomePage(true);
      }, 1500);
    }

    if (showFailureAlert) {
      setTimeout(() => setShowFailureAlert(false), 1500);
    }
  }, [showSuccessAlert, showFailureAlert]);




  // Handles when user clicks the login button, and sends a request to the backend.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // This is the fetch to backend, we send a POST request with username and password in the body
    let result = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.get("username"),
        password: data.get("password"),
      }),
    });
    result = await result.json();

    // If 200 it means it is successful, show him success alert and when the success alert is shown, it redirects to welcome.
    if (result.status === 200) {
      setShowSuccessAlert(true);
    } else {
      // Unauthorized (401), show him alert and stay on login page.
      setShowFailureAlert(true);
    }
  };


  // HTML for the welcome page
  if (showWelcomePage) {
    return (
      <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Welcome, admin.</h1>
      </div>
      <div>
        
        <Button
          type="submit"
          onClick={() => setShowWelcomePage(false)}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Logout
        </Button>
      </div>
      </>
    );
  }

  // Main HTML returned
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {showSuccessAlert && (
          <Alert severity="success">You have logged in successfully</Alert>
        )}
        {showFailureAlert && (
          <Alert severity="error">The entered credentials were invalid</Alert>
        )}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
