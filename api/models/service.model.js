const mongoose = require("mongoose");

const ServicesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

// Índice espacial para búsqueda geográfica
ServicesSchema.index({ location: "2dsphere" });

const Services = mongoose.model("Services", ServicesSchema);
module.exports = Services;
