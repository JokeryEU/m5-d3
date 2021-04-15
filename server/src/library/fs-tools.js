import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, writeJSON, writeFile, createReadStream } = fs;

const wholeData = join(dirname(fileURLToPath(import.meta.url)), "../data");
const studentsFiles = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../public/img/students"
);

export const getStudents = async () =>
  await readJSON(join(wholeData, "students.json"));

export const getProjects = async () =>
  await readJSON(join(wholeData, "projects.json"));

export const writeStudents = async (content) =>
  await writeJSON(join(wholeData, "students.json"), content);

export const writeProjects = async (content) =>
  await writeJSON(join(wholeData, "projects.json"), content);

export const writeStudentPics = async (fileName, content) =>
  await writeFile(join(studentsFiles, fileName), content);

export const getCurrentFile = (currentFile) =>
  dirname(fileURLToPath(currentFile));

export const readStudentPics = (fileName) =>
  createReadStream(join(studentsFiles, fineName));
