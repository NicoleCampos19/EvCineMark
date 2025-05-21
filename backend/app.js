import express from "express";
import cookieParser from "cookie-parser";
import clientsRoutes from "./src/routes/clients.js"
import employeesRoutes from "./src/routes/employees.js"
import moviesRoutes from "./src/routes/movies.js"
import registerClientsRoutes from "./src/routes/registerclients.js"
import registerEmployeesRoutes from "./src/routes/registeremployees.js"
import logInRoutes from "./src/routes/login.js"
import logOutRoutes from "./src/routes/logout.js"
import recoveryPasswordRoutes from "./src/routes/recoveryPassword.js";

// Creo una constante que es igual a la libreria que importé
const app = express();
//Que acepte datos en json
app.use(express.json());
// Para que postman guarde el token en una cookie
app.use(cookieParser());

app.use("/api/clients", clientsRoutes);

app.use("/api/employees", employeesRoutes);

app.use("/api/movies", moviesRoutes);

app.use("/api/registerEmployees", registerEmployeesRoutes);

app.use("/api/registerClients", registerClientsRoutes);

app.use("/api/login", logInRoutes);

app.use("/api/logout", logOutRoutes);

app.use("/api/recoverPassword", recoveryPasswordRoutes);

export default app;
