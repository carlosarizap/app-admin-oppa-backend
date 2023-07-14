const mongoose = require('mongoose');

const tipoayudaSchema = new mongoose.Schema({
  _id: String,
  Nombre: String,
},
{ collection: 'TipoAyuda' , versionKey: false});

const TipoAyuda = mongoose.model('TipoAyuda', tipoayudaSchema);

module.exports = TipoAyuda;