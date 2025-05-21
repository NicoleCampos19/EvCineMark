//Array de métodos (c r u d)
const employeesController = {};
import employee from "../models/employees.js";

// select
employeesController.getemployees = async (req, res) => {
  const employees = await employee.find();
  res.json(employees);
};

// eliminar
employeesController.deleteemployees = async (req, res) => {
const deletedEmployee = await employee.findByIdAndDelete(req.params.id);
  if (!deletedEmployee) {
    return res.status(404).json({ message: "Empleado no encontrado" });
  }
  res.json({ message: "Empleado eliminado" });
};

// actualizar
employeesController.putemployees = async (req, res) => {
  const { name, email, password, phone, address, role, hireDate, salary, dui} = req.body;

  await employee.findByIdAndUpdate(
    req.params.id,
    { name, email, password, phone, address, role, hireDate, salary, dui },
    { new: true }
  );
  res.json({ message: "Empleado actualizado" });
};

export default employeesController;