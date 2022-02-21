import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    let result = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.get("username"),
        password: data.get("password"),
      }),
    });
    result = await result.json();

    if (result.status === 200) {
      setShowSuccessAlert(true);
    } else {
      setShowFailureAlert(true);
    }
  };

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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
