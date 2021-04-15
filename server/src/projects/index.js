import express from "express";
import fs from "fs-extra";
import uniqid from "uniqid";
import { check, validationResult } from "express-validator";

import { getProjects, writeProjects } from "../library/fs-tools.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await getProjects();

    res.send(projects);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  console.log("UNIQUE id: ", req.params.id);
  try {
    const projects = await getProjects();

    const project = projects.find((project) => project.id === req.params.id);
    res.send(project);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const projects = await getProjects();

    const newProject = { ...req.body, id: uniqid(), createdAt: new Date() };

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

router.put("/:id", async (req, res) => {
  try {
    const projects = await getProjects();

    const newProject = projects.filter(
      (project) => project.id !== req.params.id
    );

    const modifiedProject = {
      ...req.body,
      id: req.params.id,
      modifiedAt: new Date(),
    };

    newProject.push(modifiedProject);

    fs.writeFileSync(
      join(dirName, "projects.json"),
      JSON.stringify(newProject)
    );

    res.send({ data: "HELLO FROM PUT ROUTE!" });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const projects = await getProjects();

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
