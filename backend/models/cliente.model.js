const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
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
  Activo: Boolean,
  Fecha_Nacimiento: Date,
  Apoderados: Array,
},
{ collection: 'Cliente' , versionKey: false});

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;