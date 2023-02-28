import React from "react";
import CustomButton from "../CustomButton/CustomButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "./login.svg";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signinEmail: "",
      signinPassword: "",
    };
  }
  onEmailChange = (e) => {
    this.setState({ signinEmail: e.target.value });
  };
  onPasswordChange = (e) => {
    this.setState({ signinPassword: e.target.value });
  };

  onSubmitSignin = () => {
    let bo = {
      email: this.state.signinEmail,
      password: this.state.signinPassword,
    };
    console.log("body before fetch, bo", bo);
    fetch("https://face-recognition-nodejs.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bo),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          this.props.loadUser(data);
          this.props.onRouteChange("inside");
        }
      });
  };

  render() {
    const theme = createTheme();
    return (
      <Container syle={{ height: "100vh" }} component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img
              style={{ width: "200px", height: "45px", marginBottom: "50px" }}
              src={logo}
              alt="clarifai"
            />

            <Typography
              component="h1"
              variant="h5"
              style={{ fontWeight: "bold" }}
            >
              Login to face-rocognition
            </Typography>
          </Box>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.onEmailChange}
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
              onChange={this.onPasswordChange}
            />

            <CustomButton
              color="rgb(25, 90, 255)"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => this.onSubmitSignin()}
            >
              Sign In
            </CustomButton>
          </Box>
        </Box>
      </Container>
    );
  }
}

export default Signin;
