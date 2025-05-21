//Array de métodos (c r u d)
import movie from "../models/movies.js";
import { v2 as cloudinary } from "cloudinary";

import { config } from "../config.js";

// configuración de cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

// array de funciones vacío
const moviesController = {};

// select
moviesController.getAllMovies = async (req, res) => {
  const movies = await movie.find();
  res.json(movies);
};

// insert
moviesController.insertMovies = async (req, res) => {
  const { title, description, director, gender , year, duration } = req.body;
    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "public",
        allowed_formats: ["jpg", "png", "jpeg"],
      });
      imageUrl = result.secure_url;
    }
    
  const newMovies = new movie({ 
        title, description, director, gender , year, duration, image : imageUrl });
  await newMovies.save();
  res.json({ message: "Película guardada" });
};

// actualizar
moviesController.putMovies = async (req, res) => {
  const { title, description, director, gender , year, duration } = req.body;
    let imageUrl = ""
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "public",
        allowed_formats: ["jpg", "png", "jpeg"],
      });
      imageUrl = result.secure_url;
    }

  await movie.findByIdAndUpdate(
    req.params.id,
    { title, description, director, gender , year, duration, image : imageUrl },
    { new: true }
  );
  res.json({ message: "Película actualizada" });
};

// delete
moviesController.deleteMovies = async (req, res) => {
const deletedMovies = await movie.findByIdAndDelete(req.params.id);
  if (!deletedMovies) {
    return res.status(404).json({ message: "Película no encontrada" });
  }
  res.json({ message: "Película eliminada" });
};

export default moviesController;
