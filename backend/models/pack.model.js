const mongoose = require('mongoose');

const packSchema = new mongoose.Schema({
  _id: String,
  Nombre: String,
  Descripcion: String,
  Foto: String,
  Precio: Number,
  Usos: Number,
  Tope: Number,
  Estado: Boolean,
  IdServicios: Array,
  FechaDesde: Date,
  FechaHasta: Date
},
{ collection: 'Pack' , versionKey: false});

const Pack = mongoose.model('Pack', packSchema);

module.exports = Pack;