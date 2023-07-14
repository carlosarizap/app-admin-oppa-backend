const mongoose = require('mongoose');

const ayudaSchema = new mongoose.Schema({
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
{ collection: 'Ayuda' , versionKey: false});

const Ayuda = mongoose.model('Ayuda', ayudaSchema);

module.exports = Ayuda;