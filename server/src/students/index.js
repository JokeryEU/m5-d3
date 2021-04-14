/* STUDENTS CRUD
1. get all students --> GET http://localhost:3001/students
2. get single student --> GET http://localhost:3001/students/:id
3. create single student --> POST http://localhost:3001/students
4. edit single student --> PUT http://localhost:3001/students/:id
5. delete single student --> DELETE http://localhost:3001/students/:id
*/

import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

const router = express.Router();

const filename = fileURLToPath(import.meta.url);

const studentsJSONPath = join(dirname(filename), "students.json");

router.get("/", (req, res) => {
  console.log("GET ROUTE");
  const fileAsABuffer = fs.readFileSync(studentsJSONPath);

  const fileAsAString = fileAsABuffer.toString();

  const fileAsAJSON = JSON.parse(fileAsAString);
  res.send(fileAsAJSON);
});

router.get("/:id", (req, res) => {
  console.log("UNIQUE id: ", req.params.id);
  const fileAsABuffer = fs.readFileSync(studentsJSONPath);

  const fileAsAString = fileAsABuffer.toString();

  const students = JSON.parse(fileAsAString);

  const student = students.find((s) => s.id === req.params.id);
  res.send(student);
});

router.post("/", (req, res) => {
  const fileAsABuffer = fs.readFileSync(studentsJSONPath);

  const fileAsAString = fileAsABuffer.toString();

  const students = JSON.parse(fileAsAString);

  const newStudent = req.body;

  const existingEmailFilter = students.filter(
    (student) => student.email.toLowerCase() === newStudent.email.toLowerCase()
  );

  if (existingEmailFilter.length === 0) {
    newStudent.id = uniqid();

    students.push(newStudent);

    fs.writeFileSync(studentsJSONPath, JSON.stringify(students));

    res.status(201).send({ id: newStudent.id });
  } else {
    console.log("Duplicated email address");
    res.status(409).send("This email address is already in use");
  }
});

router.put("/:id", (req, res) => {
  const fileAsABuffer = fs.readFileSync(studentsJSONPath);

  const fileAsAString = fileAsABuffer.toString();

  const students = JSON.parse(fileAsAString);

  const newStudentsArray = students.filter(
    (student) => student.id !== req.params.id
  );

  const modifiedUser = req.body;
  modifiedUser.id = req.params.id;

  newStudentsArray.push(modifiedUser);

  fs.writeFileSync(studentsJSONPath, JSON.stringify(newStudentsArray));

  res.send({ data: "HELLO FROM PUT ROUTE!" });
});

router.delete("/:id", (req, res) => {
  const fileAsABuffer = fs.readFileSync(studentsJSONPath);

  const fileAsAString = fileAsABuffer.toString();

  const students = JSON.parse(fileAsAString);

  const newStudentsArray = students.filter(
    (student) => student.id !== req.params.id
  );

  fs.writeFileSync(studentsJSONPath, JSON.stringify(newStudentsArray));

  res.status(204).send();
});

export default router;
