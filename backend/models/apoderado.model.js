const mongoose = require('mongoose');

const apoderadoSchema = new mongoose.Schema({
  _id: String,
  FechaHora: Date,
  Rut: String,
  Password: String,
  Nombre: String,
  Apellidos: String,
  Genero: String,
  Correo: String,
  Numero_Telefonico: String,
  IdApoderadoPrincipal: String,
  EsSubscriptor: Boolean,
  EsApoderadoPrincipal: Boolean,
  Activo: Boolean,
  Fecha_Nacimiento: Date,
  Clientes: Array,
},
{ collection: 'Apoderado' , versionKey: false});

const Apoderado = mongoose.model('Apoderado', apoderadoSchema);

module.exports = Apoderado;