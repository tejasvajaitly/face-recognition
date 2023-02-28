import React from "react";
import CustomButton from "../CustomButton/CustomButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import logo from "./login.svg";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  onInputChange = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  onSubmit = () => {
    fetch("http://localhost:3001/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state),
    })
      .then((res) => res.json)
      .then((data) => this.props.onRouteChange("signin"));
  };

  render() {
    return (
      <Container component="main" maxWidth="xs">
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
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={(e) => this.onInputChange(e, "name")}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => this.onInputChange(e, "email")}
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
              onChange={(e) => this.onInputChange(e, "password")}
            />

            <CustomButton
              color="rgb(25, 90, 255)"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={this.onSubmit}
            >
              Sign Up
            </CustomButton>
          </Box>
        </Box>
      </Container>
    );
  }
}

export default Register;
