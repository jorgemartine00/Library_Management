import { useEffect, useState } from "react";
import { Card, Typography, Box, CardContent, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const loadBook = async () => {
    const response = await fetch("http://localhost:3000/books");
    const data = await response.json();

    setBooks(data);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE",
      })
      
      setBooks(books.filter(book => book.id !== id)); 
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadBook();
  }, []);

  return (
    <>
      <Box textAlign="center">
        <Typography
          variant="5"
          style={{ fontWeight: "bold", fontSize: "2rem" }}
        >
          Book List
        </Typography>
      </Box>
      {books.map((book) => (
        <Card
          style={{
            marginBottom: ".8rem",
          }}
          key={book.id}
        >
          <CardContent
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography>
              ID: <br />
              {book.id}
            </Typography>
            <Typography>
              Title: <br />
              {book.title}
            </Typography>
            <Typography>
              Author: <br />
              {book.author}
            </Typography>
            <Typography>
              Published Year: <br />
              {book.published_year}
            </Typography>
            <Typography>
              Stock: <br />
              {book.stock}
            </Typography>
            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate(`/books/${book.id}/edit`)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleDelete(book.id)}
                style={{ marginLeft: ".5rem" }}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
