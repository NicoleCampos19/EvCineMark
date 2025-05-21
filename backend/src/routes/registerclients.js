import express from "express";
import registerclientsController from "../controllers/registerclientsController.js";
const router = express.Router();

router.route("/").post(registerclientsController.register);
router.route("/verifyCodeEmail").post(registerclientsController.verifyCodeEmail);

export default router;
