import express from "express";
import registeremployeeController from "../controllers/registeremployeesController.js";
const router = express.Router();

router.route("/").post(registeremployeeController.register)

export default router;