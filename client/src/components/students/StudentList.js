import { useEffect, useState } from "react";
import { Card, Typography, Box, CardContent, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function StudentList() {
  const [students, setStudent] = useState([]);
  const navigate = useNavigate();

  const loadStudent = async () => {
    const response = await fetch("http://localhost:3000/students");
    const data = await response.json();

    setStudent(data);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/students/${id}`, {
        method: "DELETE",
      })
      
      setStudent(students.filter(student => student.id !== id)); 
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadStudent();
  }, []);

  return (
    <>
      <Box textAlign="center">
        <Typography
          variant="5"
          style={{ fontWeight: "bold", fontSize: "2rem" }}
        >
          Student List
        </Typography>
      </Box>
      {students.map((student) => (
        <Card
          style={{
            marginBottom: ".8rem",
          }}
          key={student.id}
        >
          <CardContent
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography>
              ID: <br />
              {student.id}
            </Typography>
            <Typography>
              First Name: <br />
              {student.first_name}
            </Typography>
            <Typography>
              Last Name: <br />
              {student.last_name}
            </Typography>
            <Typography>
              Username: <br />
              {student.username}
            </Typography>
            <Typography>
              Password: <br />
              {student.password}
            </Typography>
            <Typography>
              Email: <br />
              {student.email}
            </Typography>
            <Typography>
              Role: <br />
              {student.role}
            </Typography>
            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate(`/student/${student.id}/edit`)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleDelete(student.id)}
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
