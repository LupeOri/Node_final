const mongoose = require("mongoose");

const BeautyCentersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  specialty: {
    type: String,
    enum: ["Nails", "Hair", "Skincare", "Cosmetic Surgery", "Lashes"],
    required: true,
    trim: true,
  },
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Services",
    },
  ],
  description: {
    type: String,
    required: false,
    trim: true,
  },
});

// Índice espacial para búsqueda geográfica
BeautyCentersSchema.index({ location: "2dsphere" });

const BeautyCenter = mongoose.model("BeautyCenter", BeautyCentersSchema);
module.exports = BeautyCenter;
