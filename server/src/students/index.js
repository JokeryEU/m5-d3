/* STUDENTS CRUD
1. get all students --> GET http://localhost:3001/students
2. get single student --> GET http://localhost:3001/students/:id
3. create single student --> POST http://localhost:3001/students
4. edit single student --> PUT http://localhost:3001/students/:id
5. delete single student --> DELETE http://localhost:3001/students/:id
*/

import express from "express";
import uniqid from "uniqid";
import { check, validationResult } from "express-validator";

import { getStudents, writeStudents } from "../library/fs-tools.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const students = await getStudents();

    res.send(students);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  console.log("UNIQUE id: ", req.params.id);
  try {
    const students = await getStudents();

    const student = students.find((student) => student.id === req.params.id);
    res.send(student);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const students = await getStudents();
    console.log(students);
    const newStudent = { ...req.body, id: uniqid(), createdAt: new Date() };

    // const existingEmailFilter = students.filter(
    //   (student) =>
    //     student.email.toLowerCase() === newStudent.email.toLowerCase()
    // );

    // if (existingEmailFilter.length === 0) {
    students.push(newStudent);

    await writeStudents(newStudent);

    res.status(201).send({ id: newStudent.id });
    // } else {
    //   console.log("Duplicated email address");
    //   res.status(409).send("This email address is already in use");
    // }
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const students = await getStudents();

    const newStudentsArray = students.filter(
      (student) => student.id !== req.params.id
    );

    const modifiedStudent = {
      ...req.body,
      id: req.params.id,
      modifiedAt: new Date(),
    };

    newStudentsArray.push(modifiedStudent);

    await writeStudents(newStudentsArray);

    res.send({ data: "HELLO FROM PUT ROUTE!" });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const students = await getStudents();

    const newStudentsArray = students.filter(
      (student) => student.id !== req.params.id
    );

    await writeStudents(newStudentsArray);

    res.status(204).send();
  } catch (error) {
    console.log(error);
  }
});

export default router;
