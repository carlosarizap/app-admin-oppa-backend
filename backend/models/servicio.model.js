const mongoose = require('mongoose');

const servicioSchema = new mongoose.Schema({
  _id: String,
  idCategoria: String,
  Nombre: String,
  Descripcion: String,
  Foto: String,
  Precio: Number,
  Comision: Number,
  Descuento: Number,
  TieneDescuento: Boolean,
  Estado: Boolean,
  FechaDesde: Date,
  FechaHasta: Date
},
{ collection: 'Servicio' , versionKey: false});

const Servicio = mongoose.model('Servicio', servicioSchema);

module.exports = Servicio;