const mongoose = require('mongoose');

const bancoSchema = new mongoose.Schema({
  _id: String,
  Nombre: String,
},
{ collection: 'Banco' , versionKey: false});

const Banco = mongoose.model('Banco', bancoSchema);

module.exports = Banco;