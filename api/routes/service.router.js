const express = require("express");
const servicesRouter = express.Router();
const { isAuth } = require("../middlewares/auth.middleware");
const {
  getService,
  getServices,
  createService,
  updateService,
  deleteService,
} = require("../controllers/services.controller");

//beautyCentersRouter.get("/", (req, res, next) => {
//res.status(200).json({
//  status: 200,
//   message: "get beautyCenters",
// app: "My App",
// });
//});

//OBTENER UN CENTRO
servicesRouter.get("/:id", getService);

//OBTENER TODOS LOS CENTROS
servicesRouter.get("/", getServices);

//CREAR UN CENTRO
servicesRouter.post("/", [isAuth], createService);

//MODIFICAR UN CENTRO O HACER UPDATE
servicesRouter.patch("/:id", [isAuth], updateService);

//DELETE CENTRO
servicesRouter.delete("/:id", [isAuth], deleteService);

module.exports = servicesRouter;
