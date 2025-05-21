import express from "express";
import employeeController from "../controllers/employeesController.js";

const router = express.Router();

router
  .route("/")
  .get(employeeController.getemployees)
router
  .route("/:id")
  .put(employeeController.putemployees)
  .delete(employeeController.deleteemployees);
export default router;