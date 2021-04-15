import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";
import { check, validationResult } from "express-validator";

const router = express.Router();

const filename = fileURLToPath(import.meta.url);
const dirName = dirname(filename);

const getProjects = () => {
  const fileAsABuffer = fs.readFileSync(join(dirName, "projects.json"));
  return JSON.parse(fileAsABuffer.toString());
};

router.get("/", (req, res) => {
  try {
    const projects = getProjects();

    res.send(projects);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", (req, res) => {
  console.log("UNIQUE id: ", req.params.id);
  try {
    const projects = getProjects();

    const project = projects.find((s) => s.id === req.params.id);
    res.send(project);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", (req, res) => {
  try {
    const projects = getProjects();

    const newProject = req.body;

    const existingEmailFilter = projects.filter(
      (project) =>
        project.email.toLowerCase() === newProject.email.toLowerCase()
    );

    if (existingEmailFilter.length === 0) {
      newProject.id = uniqid();

      projects.push(newProject);

      fs.writeFileSync(
        join(dirName, "projects.json"),
        JSON.stringify(projects)
      );

      res.status(201).send({ id: newProject.id });
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
    const projects = getProjects();

    const newProjectArray = projects.filter(
      (project) => project.id !== req.params.id
    );

    const modifiedUser = req.body;
    modifiedUser.id = req.params.id;

    newProjectArray.push(modifiedUser);

    fs.writeFileSync(
      join(dirName, "projects.json"),
      JSON.stringify(newProjectArray)
    );

    res.send({ data: "HELLO FROM PUT ROUTE!" });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", (req, res) => {
  try {
    const projects = getProjects();

    const newProjectArray = projects.filter(
      (project) => project.id !== req.params.id
    );

    fs.writeFileSync(
      join(dirName, "projects.json"),
      JSON.stringify(newProjectArray)
    );

    res.status(204).send();
  } catch (error) {
    console.log(error);
  }
});

export default router;
