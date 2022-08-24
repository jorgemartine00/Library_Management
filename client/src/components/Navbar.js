import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' color="transparent">
        <Container>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <Link to="/home" style={{textDecoration:"none",color:"#eee" }}>Jorge's Library Management</Link>
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate("/student/new")}
            >
              New Student
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/students/list")}
              style={{ marginLeft: ".5rem" }}
            >
              Students List
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/books/new")}
              style={{ marginLeft: ".5rem" }}
            >
              New Book
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/books/list")}
              style={{ marginLeft: ".5rem" }}
            >
              Book List
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
