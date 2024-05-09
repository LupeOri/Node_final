const BeautyCenter = require("../models/beautyCenters.model");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");
const Service = require("../models/services.model");

//CONSULTAR
//OBTENGO SOLO UN CENTRO
const getBeautyCenter = async (res, req, next) => {
  try {
    //OBTENGO LA ID QUE HA SOLICITADO EL USUARIO
    const id = req.params.id;
    //BUSCO EN LA BBDD POR ID
    const center = await BeautyCenter.findById(id).populate("services");
    //RESPONDO AL USUARIO
    res.status(201).json({
      status: 200,
      message: HTTPSTATUSCODE[201],
      center: center,
    });
  } catch (error) {
    next(error);
  }
};
//OBTENGO TODOS LOS CENTROS
const getBeautyCenters = async (res, req, next) => {
  try {
    //OBTENGO LA ID QUE HA SOLICITADO EL USUARIO
    const id = req.params.id; //params: Usado para acceder a los parámetros de la URL en las solicitudes HTTP, generalmente para identificar recursos específicos.
    //BUSCO EN LA BBDD POR ID
    const center = await BeautyCenter.findById(id).populate("services");
    //RESPONDO AL USUARIO
    res.status(201).json({
      status: 200,
      message: HTTPSTATUSCODE[201],
      center: center,
    });
  } catch (error) {
    next(error);
  }
};
//CREAR

const createBeautyCenter = async (req, res, next) => {
  //CREAR VARIABLE QUE RECOJA LOS DATOS QUE ENVIA EL USUARIO
  const center = new BeautyCenter(req.body); //va a traves de body porque es un post, si fuera get iria a traves de query. body: Usado para acceder a los datos enviados en el cuerpo de la solicitud HTTP, comúnmente utilizado en solicitudes POST y PUT para crear o actualizar recursos.
  try {
    //GUARDAR EN BBDD
    await center.save();
    //CONTESTAR AL USUARIO
    res.status(201).json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      center: center,
    });
  } catch (error) {
    next(error);
  }
};

//UPDATE - PATCH

const updateBeautyCenter = async (req, res, next) => {
  try {
    //OBTENGO LA ID QUE HA SOLICITADO EL USUARIO PARA PODER USARLO EN LA CONST CENTER. AQUI BUSCAMOS EL CENTER QUE HAY QUE MODIFICAR
    const id = req.params.id;
    //RECOPILAR LOS DATOS QUE HAY QUE MODIFCAR
    const body = req.body;
    //ACTUALIZAR LA FUNCION CON ID
    const center = await BeautyCenter.findByIdAndUpdate(id, body, {
      new: true,
    });
    //RESPUESTA AL USUARIO
    if (!center) {
      return res.status(404).json({
        status: 404,
        message: HTTPSTATUSCODE[404],
      });
    }
    //RESPONDO AL USUARIO
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: center,
    });
  } catch (error) {
    next(error);
  }
};

//DELETE

const deleteBeautyCenter = async (req, res, next) => {
  try {
    //OBTENGO LA ID QUE HA SOLICITADO EL USUARIO PARA PODER USARLO EN LA CONST CENTER. AQUI BUSCAMOS EL CENTER QUE HAY QUE MODIFICAR
    const id = req.params.id;
    //ACTUALIZAR LA FUNCION CON ID
    const center = await BeautyCenter.findByIdAndUpdate(id);
    //RESPUESTA AL USUARIO
    if (!center) {
      return res.status(404).json({
        status: 404,
        message: "Centro no encontrado",
      });
    }
    //RESPONDO AL USUARIO
    res.status(200).json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: center,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBeautyCenter,
  getBeautyCenters,
  createBeautyCenter,
  updateBeautyCenter,
  deleteBeautyCenter,
};
