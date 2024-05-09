const Service = require("../models/services.model");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

// CONSULTAR
// OBTENER SOLO UN SERVICIO
const getService = async (req, res, next) => {
  try {
    // OBTENGO LA ID QUE HA SOLICITADO EL USUARIO
    const id = req.params.id;
    // BUSCO EN LA BBDD POR ID
    const service = await Service.findById(id);
    // RESPONDO AL USUARIO
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      service: service,
    });
  } catch (error) {
    next(error);
  }
};

// OBTENER TODOS LOS SERVICIOS
const getServices = async (req, res, next) => {
  try {
    // BUSCO EN LA BBDD TODOS LOS SERVICIOS
    const services = await Service.find();
    // RESPONDO AL USUARIO
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      services: services,
    });
  } catch (error) {
    next(error);
  }
};

// CREAR UN SERVICIO
const createService = async (req, res, next) => {
  try {
    // CREAR VARIABLE QUE RECOJA LOS DATOS QUE ENVIA EL USUARIO
    const service = new Service(req.body);
    // GUARDAR EN BBDD
    await service.save();
    // CONTESTAR AL USUARIO
    res.status(201).json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      service: service,
    });
  } catch (error) {
    next(error);
  }
};

// ACTUALIZAR UN SERVICIO
const updateService = async (req, res, next) => {
  try {
    // OBTENER LA ID QUE HA SOLICITADO EL USUARIO
    const id = req.params.id;
    // RECOPILAR LOS DATOS QUE HAY QUE MODIFICAR
    const body = req.body;
    // ACTUALIZAR EL SERVICIO CON LA ID
    const service = await Service.findByIdAndUpdate(id, body, { new: true });
    // RESPONDER AL USUARIO
    if (!service) {
      return res.status(404).json({
        status: 404,
        message: HTTPSTATUSCODE[404],
      });
    }
    // RESPONDO AL USUARIO
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

// ELIMINAR UN SERVICIO
const deleteService = async (req, res, next) => {
  try {
    // OBTENER LA ID QUE HA SOLICITADO EL USUARIO
    const id = req.params.id;
    // ELIMINAR EL SERVICIO CON LA ID
    const service = await Service.findByIdAndDelete(id);
    // RESPUESTA AL USUARIO
    if (!service) {
      return res.status(404).json({
        status: 404,
        message: "Servicio no encontrado",
      });
    }
    // RESPONDER AL USUARIO
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getService,
  getServices,
  createService,
  updateService,
  deleteService,
};
