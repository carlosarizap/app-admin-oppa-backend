const mongoose = require('mongoose');

const proveedorSchema = new mongoose.Schema({
    _id: String,
    FechaHora: Date,
    Imagen: String,
    Rut: String,
    Password: String,
    Nombre: String,
    Apellidos: String,
    Genero: String,
    Correo: String,
    Telefono: String,
    Banco: String,
    TitularCuenta: String,
    RutCuenta: String,
    NumCuenta: String,
    TipoCuenta: String,
    Revisado: Boolean,
    Estado: Boolean,
    Fecha_Nacimiento: Date
},
    { collection: 'Proveedor', versionKey: false });



const Proveedor = mongoose.model('Proveedor', proveedorSchema);

module.exports = Proveedor;