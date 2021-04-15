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
import { check, validationResult } from "express-validator";

const router = express.Router();

const filename = fileURLToPath(import.meta.url);
const dirName = dirname(filename);

const getStudents = () => {
  const fileAsABuffer = fs.readFileSync(join(dirName, "students.json"));
  return JSON.parse(fileAsABuffer.toString());
};

const studentsJSONPath = join(dirname(filename), "students.json");

router.get("/", (req, res) => {
  try {
    const students = getStudents();

    res.send(students);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", (req, res) => {
  console.log("UNIQUE id: ", req.params.id);
  try {
    const students = getStudents();

    const student = students.find((s) => s.id === req.params.id);
    res.send(student);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", (req, res) => {
  try {
    const students = getStudents();

    const newStudent = req.body;

    const existingEmailFilter = students.filter(
      (student) =>
        student.email.toLowerCase() === newStudent.email.toLowerCase()
    );

    if (existingEmailFilter.length === 0) {
      newStudent.id = uniqid();

      students.push(newStudent);

      fs.writeFileSync(
        join(dirName, "students.json"),
        JSON.stringify(students)
      );

      res.status(201).send({ id: newStudent.id });
    } else {
      console.log("Duplicated email address");
      res.status(409).send("This email address is already in use");
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", (req, res) => {
  try {
    const students = getStudents();

    const newStudentsArray = students.filter(
      (student) => student.id !== req.params.id
    );

    const modifiedUser = req.body;
    modifiedUser.id = req.params.id;

    newStudentsArray.push(modifiedUser);

    fs.writeFileSync(
      join(dirName, "students.json"),
      JSON.stringify(newStudentsArray)
    );

    res.send({ data: "HELLO FROM PUT ROUTE!" });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", (req, res) => {
  try {
    const students = getStudents();

    const newStudentsArray = students.filter(
      (student) => student.id !== req.params.id
    );

    fs.writeFileSync(
      join(dirName, "students.json"),
      JSON.stringify(newStudentsArray)
    );

    res.status(204).send();
  } catch (error) {
    console.log(error);
  }
});

export default router;
