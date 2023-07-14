const mongoose = require('mongoose');

const tiporecordatorioSchema = new mongoose.Schema({
  _id: String,
  Nombre: String,
},
{ collection: 'TipoRecordatorio' , versionKey: false});

const TipoRecordatorio = mongoose.model('TipoRecordatorio', tiporecordatorioSchema);

module.exports = TipoRecordatorio;