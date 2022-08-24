const { Router } = require("express");
const {
  getAllStudents,
  getStudent,
  createStudent,
  deleteStudent,
  updateStudent,
} = require("../controllers/students.controllers.jsx");

const studentsRouter = Router();

studentsRouter.get("/students", getAllStudents);
studentsRouter.get("/students/:id", getStudent);
studentsRouter.post("/students", createStudent);
studentsRouter.delete("/students/:id", deleteStudent);
studentsRouter.put("/students/:id", updateStudent);

module.exports = studentsRouter;
