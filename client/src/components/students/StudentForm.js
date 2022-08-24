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

export default function StudentForm() {
  const [student, setStudent] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    role: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(JSON.stringify(student));

    if (editing) {
      const res = await fetch(`http://localhost:3000/students/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(student),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data)
    } else {

    }

    const res = await fetch("http://localhost:3000/students", {
      method: "POST",
      body: JSON.stringify(student),
      headers: { "Content-Type": "application/json" },
    });

    await res.json();
    setLoading(false);
    navigate("/");
  };
  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const loadStudent = async (id) => {
    const res = await fetch(`http://localhost:3000/students/${id}`);
    const data = await res.json();
    setStudent({
      username: data.username,
      password: data.password,
      first_name: data.first_name,
      last_name: data.last_name,
      role: data.role,
      email: data.email,
    });
    setEditing(true);
  };
  useEffect(() => {
    if (params.id) {
      loadStudent(params.id);
    }
  }, []);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item style={{ width: "50%" }}>
        <Card sx={{ mt: 5 }}>
          <Box textAlign="center">
            <Typography
              variant="5"
              style={{ fontWeight: "bold", fontSize: "2rem" }}
            >
              Create Student
            </Typography>
          </Box>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="First Name"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                fullWidth
                name="first_name"
                value={student.first_name}
                onChange={handleChange}
              />
              <TextField
                variant="filled"
                label="Last Name"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                fullWidth
                name="last_name"
                value={student.last_name}
                onChange={handleChange}
              />
              <TextField
                variant="filled"
                label="Username"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                fullWidth
                name="username"
                value={student.username}
                onChange={handleChange}
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
                value={student.password}
                onChange={handleChange}
              />
              <TextField
                variant="filled"
                label="Email"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                fullWidth
                name="email"
                value={student.email}
                onChange={handleChange}
              />
              <TextField
                variant="filled"
                label="Role"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                fullWidth
                name="role"
                value={student.role}
                onChange={handleChange}
              />
              <Box textAlign="center">
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ mt: 5 }}
                  disabled={
                    !student.first_name ||
                    !student.email ||
                    !student.last_name ||
                    !student.password ||
                    !student.role ||
                    !student.username
                  }
                >
                  {loading ? (
                    <CircularProgress color="inherit" size={24} />
                  ) : (
                    "Save"
                  )}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
