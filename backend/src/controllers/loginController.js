import clients from "../models/clients.js";
import employees from "../models/employees.js";
import bcryptjs from "bcryptjs"; 
import jsonwebtoken from "jsonwebtoken"; 
import { config } from "../config.js";

// Array de funciones
const loginController = {};

loginController.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let userFound; // Guardar el usuario encontrado
    let userType; // Guardar el tipo de usuario

    // Admin, Empleados y Clientes
    if (
      email === config.admin.email && password === config.admin.password ) {
      (userType = "admin");
      (userFound = { _id: "admin" });
    } else {
        // Empleado
      userFound = await employees.findOne({ email });
      userType = "employee";

      if (!userFound) {
        // Cliente 
        userFound = await clients.findOne({ email });
        userType = "client";
      }
    }

    // Si no encuentra el usuario
    if (!userFound) {
      return res.json({ message: "User not found" });
    }

    // Desincriptar la contraseña si no es admin
    if (userType !== "admin") {
      const isMatch = await bcryptjs.compare(password, userFound.password);
      if (!isMatch) {
        return res.json({ message: "Invalid password" });
      }
    }

    //TOKEN
    jsonwebtoken.sign(
         //1- ¿que voy a guardar?
      { id: userFound._id, userType },
      //2- secreto
      config.JWT.secret,
      //3- ¿cuando expira?
      { expiresIn: config.JWT.expiresIn },
      //4- función flecha
      (error, token) => {
        if (error) console.log("error" + error);
        res.cookie("authToken", token);
        res.json({ message: "login successful" });
      }
    );
  } catch (error) {
    console.log("error" + error);
  }
};

export default loginController;