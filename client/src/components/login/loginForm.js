import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    TextField,
    Typography,
  } from "@mui/material";
  import { useState, useEffect } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  
  export default function loginForm() {

  
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item style={{ width: "30%" }}>
          <Card sx={{ mt: 5 }}>
            <Box textAlign="center">
              <Typography
                variant="5"
                style={{ fontWeight: "bold", fontSize: "2rem" }}
              >
                Login
              </Typography>
            </Box>
            <CardContent>
              <form>
                <TextField
                  variant="filled"
                  label="Username"
                  sx={{
                    display: "block",
                    margin: ".5rem 0",
                  }}
                  fullWidth
                  name="username"
                />
                <TextField
                  variant="filled"
                  label="Password"
                  sx={{
                    display: "block",
                    margin: ".5rem 0",
                  }}
                  fullWidth
                  name="password"

                />              <Box textAlign="center">
                  <Button variant="contained">
                    Login
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
  