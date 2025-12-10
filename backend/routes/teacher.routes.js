import express from "express";
import {
  addTeacher,
  deleteTeacher,
  getAllTeacher,
  updateTeacher,
} from "../controller/teacher.controller.js";
import { isLogin } from "../middlewares/isLogin.js";
import { upload } from "../utils/multerHandler.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const teacherRouter = express.Router();
teacherRouter.post(
  "/add_teacher",
  isLogin,
  isAdmin,
  upload.single("image"),
  addTeacher
);
teacherRouter.get("/get_teacher", isLogin, getAllTeacher);
teacherRouter.delete("/delete_teacher/:id", isLogin, isAdmin, deleteTeacher);
teacherRouter.patch(
  "/update_teacher/:id",
  isLogin,
  isAdmin,
  upload.single("image"),
  updateTeacher
);

export default teacherRouter;
