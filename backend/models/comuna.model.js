const mongoose = require('mongoose');

const comunaSchema = new mongoose.Schema({
  _id: String,
  Nombre: String,
  IdRegion: String,
},
{ collection: 'Comuna' , versionKey: false});

const Comuna = mongoose.model('Comuna', comunaSchema);

module.exports = Comuna;