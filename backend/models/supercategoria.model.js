const mongoose = require('mongoose');

const supercategoriaSchema = new mongoose.Schema({
  _id: String,
  Nombre: String,
},
{ collection: 'SuperCategoria' , versionKey: false});

const SuperCategoria = mongoose.model('SuperCategoria', supercategoriaSchema);

module.exports = SuperCategoria;