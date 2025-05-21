import express from "express";
import clientController from "../controllers/clientsController.js";

const router = express.Router();

router
  .route("/")
  .get(clientController.getclients)
router
  .route("/:id")
  .put(clientController.putclients)
  .delete(clientController.deleteclients);

export default router;