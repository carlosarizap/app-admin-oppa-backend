const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema({
  _id: String,
  Nombre: String,
},
{ collection: 'Region' , versionKey: false});

const Region = mongoose.model('Region', regionSchema);

module.exports = Region;