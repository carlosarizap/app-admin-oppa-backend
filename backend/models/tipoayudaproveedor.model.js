const mongoose = require('mongoose');

const tipoayudaproveedorSchema = new mongoose.Schema({
  _id: String,
  Nombre: String,
},
{ collection: 'TipoAyudaProveedor' , versionKey: false});

const TipoAyudaProveedor = mongoose.model('TipoAyudaProveedor', tipoayudaproveedorSchema);

module.exports = TipoAyudaProveedor;