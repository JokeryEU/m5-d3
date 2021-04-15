import express from "express";
import { writeStudentPics, readStudentPics } from "../library/fs-tools.js";
import multer from "multer";
import { pipeline } from "stream";

const router = express.Router();

router.post(
  "/upload",
  multer().single("profilePic"),
  async (req, res, next) => {
    try {
      await writeStudentPics(req.file.originalname, req.file.buffer);
      res.send("ok");
    } catch (error) {
      console.log(error);
    }
  }
);

router.post(
  "/uploadMultiple",
  multer().array("multipleProfilePic", 2),
  async (req, res, next) => {
    try {
      const arrayOfPromises = req.files.map(
        async (file) => await writeStudentPics(file.originalname, file.buffer)
      );
      await Promise.all(arrayOfPromises);
      res.send("ok");
    } catch (error) {
      console.log(error);
    }
  }
);

router.get("/:fileName/download", async (req, res, next) => {
  try {
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${req.params.fileName}`
    );
    const source = readStudentPics(req.params.fileName);
    const destination = res;

    pipeline(source, destination, (err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
});

export default router;
