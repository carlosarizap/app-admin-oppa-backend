const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  _id: String,
  idSuperCategoria: String,
  Nombre: String,
},
{ collection: 'Categoria' , versionKey: false});

const Categoria = mongoose.model('Categoria', categoriaSchema);

module.exports = Categoria;