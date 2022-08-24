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

export default function BookForm() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    published_year: "",
    stock: "",
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(JSON.stringify(book));

    if (editing) {
      const res = await fetch(`http://localhost:3000/books/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(book),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
    } else {
    }

    const res = await fetch("http://localhost:3000/books", {
      method: "POST",
      body: JSON.stringify(book),
      headers: { "Content-Type": "application/json" },
    });

    await res.json();
    setLoading(false);
    navigate("/books/list");
  };
  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const loadBook = async (id) => {
    const res = await fetch(`http://localhost:3000/books/${id}`);
    const data = await res.json();
    setBook({
      title: data.title,
      author: data.author,
      published_year: data.published_year,
      stock: data.stock,
    });
    setEditing(true);
  };
  useEffect(() => {
    if (params.id) {
      loadBook(params.id);
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
              Create Book
            </Typography>
          </Box>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Title"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                fullWidth
                name="title"
                value={book.title}
                onChange={handleChange}
              />
              <TextField
                variant="filled"
                label="Author"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                fullWidth
                name="author"
                value={book.author}
                onChange={handleChange}
              />
              <TextField
                variant="filled"
                label="Published Year"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                fullWidth
                name="published_year"
                value={book.published_year}
                onChange={handleChange}
              />
              <TextField
                variant="filled"
                label="Stock"
                sx={{
                  display: "block",
                  margin: ".5rem 0",
                }}
                fullWidth
                name="stock"
                value={book.stock}
                onChange={handleChange}
              />
              <Box textAlign="center">
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ mt: 5 }}
                  disabled={
                    !book.title ||
                    !book.author ||
                    !book.published_year ||
                    !book.stock
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
