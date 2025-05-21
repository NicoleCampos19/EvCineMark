import express from "express";
import multer from "multer"
import movieController from "../controllers/moviesController.js";

const router = express.Router();
//configurar una carpeta en local que guarde el registro de las imágenes subidas
const upload = multer({dest: "public/"})

router
  .route("/")
  .get(movieController.getAllMovies)
  .post(upload.single("image"), movieController.insertMovies);

router
  .route("/:id")
  .put(upload.single("image"), movieController.putMovies)
  .delete(movieController.deleteMovies);

export default router;