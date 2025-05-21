import EmployeeModel from "../models/employees.js";
import bcryptjs from "bcryptjs"; 
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const registeremployeesController = {};

registeremployeesController.register = async (req, res) => {
  const { name, email, password, phone, address, role, hireDate, salary, dui } = req.body;

  try {
    const existEmployee = await EmployeeModel.findOne({ email });
    if (existEmployee) {
      return res.json({ message: "Employee already exists" });
    }

    // Encriptar la contraseña
    const passwordHash = await bcryptjs.hash(password, 10);

    // Guardemos el empleado nuevo
    const newEmployee = new EmployeeModel({ name, email, password : passwordHash, phone, address, role, hireDate, salary, dui });
    await newEmployee.save();

    jsonwebtoken.sign(
      { id: newEmployee._id },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn },
      (error, token) => {
        if (error) console.log(error);
        res.cookie("authToken", token);
        res.json({message: "Empleado registrado"})
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export default registeremployeesController;
