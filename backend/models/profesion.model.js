const mongoose = require('mongoose');

const profesionSchema = new mongoose.Schema({
  _id: String,
  Nombre: String,
  idCategoria: String
},
  { collection: 'Profesion', versionKey: false });

const Profesion = mongoose.model('Profesion', profesionSchema);

module.exports = Profesion;