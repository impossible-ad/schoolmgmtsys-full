import express from "express";
import { isLogin } from "../middlewares/isLogin.js";
import { addVacancy, deleteVacancy, getVacancy } from "../controller/vacancy.controller.js";

const vacancyRouter = express.Router();

vacancyRouter.post("/add_vacancy", isLogin, addVacancy);
vacancyRouter.get("/get_vacancy", getVacancy);
vacancyRouter.delete("/delete_vacancy/:id", isLogin, deleteVacancy);


export default vacancyRouter;
