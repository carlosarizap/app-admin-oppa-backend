const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const tiempoSchema = new mongoose.Schema({
  _id: String,
  TiempoAnadido: Number,
  TiempoMinimo: Number,
  TiempoMaximo: Number,
},
{ collection: 'Tiempo' , versionKey: false});

const Tiempo = mongoose.model('Tiempo', tiempoSchema);

module.exports = Tiempo;