//Array de métodos (c r u d)
const clientsController = {};
import client from "../models/clients.js";

// select
clientsController.getclients = async (req, res) => {
  const clients = await client.find();
  res.json(clients);
};

// delete 
clientsController.deleteclients = async (req, res) => {
const deletedClient = await client.findByIdAndDelete(req.params.id);
  if (!deletedClient) {
    return res.status(404).json({ message: "Cliente no encontrado" });
  }
  res.json({ message: "Cliente eliminado" });
};

// actualizar
clientsController.putclients = async (req, res) => {
  const { name, email, password, phone, address, dui } = req.body;

  await client.findByIdAndUpdate(
    req.params.id,
    { name, email, password, phone, address, dui },
    { new: true }
  );
  res.json({ message: "Cliente actualizado" });
};

export default clientsController;