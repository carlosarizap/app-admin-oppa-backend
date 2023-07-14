const mongoose = require('mongoose');

const profesionEstadoSchema = new mongoose.Schema({
  _id: String,
  FechaHora: Date,
  IdCategoria: String,
  IdProveedor: String,
  IdProfesion: String,
  Nombre: String,
  Rating: Number,
  Activa: Boolean,
  SumaRatings: Number,
  TotalRatings: Number
},
{ collection: 'ProfesionEstado' , versionKey: false});

const ProfesionEstado = mongoose.model('ProfesionEstado', profesionEstadoSchema);

module.exports = ProfesionEstado;