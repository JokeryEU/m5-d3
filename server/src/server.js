import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import { join } from "path";
import studentsRoutes from "./students/index.js";
import projectsRoutes from "./projects/index.js";
import filesRoutes from "./files/index.js";
import { getCurrentFile } from "./library/fs-tools.js";

const server = express();

const port = process.env.PORT || 3002;
const publicFolder = join(getCurrentFile(import.meta.url), "../public");

server.use(express.static(publicFolder));
server.use(cors());
server.use(express.json());
server.use("/students", studentsRoutes);
server.use("/projects", projectsRoutes);
server.use("/files", filesRoutes);

console.log(listEndpoints(server));
server.listen(port, () => {
  console.log("Server is running on port ", port);
});
