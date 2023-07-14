const mongoose = require('mongoose');

const ayudaProveedorSchema = new mongoose.Schema({
  _id: String,
  FechaHora: Date,
  IdCliente: String,
  Nombre: String,
  Correo: String,
  Numero: String,
  Tipo: String,
  Detalle: String,
  Fecha: Date,
  Revisado: Boolean
},
{ collection: 'AyudaProveedor' , versionKey: false});

const AyudaProveedor = mongoose.model('AyudaProveedor', ayudaProveedorSchema);

module.exports = AyudaProveedor;