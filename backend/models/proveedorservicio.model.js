const mongoose = require('mongoose');

const proveedorServicioSchema = new mongoose.Schema({
    _id: String,
    FechaHora: Date,
    IdServicio: String,
    IdCategoria: String,
    IdProveedor: String,
    IdRegion: String,
    IdProfesion: String,
    Region: String,
    GeneroCliente: String,
    Nombre: String,
    PausadoPorOPPA: Boolean,
    Precio: Number,
    Comunas: Array,
    Horarios: Array,
    Estado: Boolean
},
{collection:'ProveedorServicio', versionKey: false});

const ProveedorServicio = mongoose.model('ProveedorServicio', proveedorServicioSchema);

module.exports = ProveedorServicio;