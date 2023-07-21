const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const servicioRoutes = require('./routes/servicioRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const supercategoriaRoutes = require('./routes/supercategoriaRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const apoderadoRoutes = require('./routes/apoderadoRoutes');
const regionRoutes = require('./routes/regionRoutes');
const comunaRoutes = require('./routes/comunaRoutes');
const tiempoRoutes = require('./routes/tiempoRoutes');
const tipoAyudaRoutes = require('./routes/tipoAyudaRoutes');
const tipoAyudaProveedorRoutes = require('./routes/tipoAyudaProveedorRoutes');
const ayudaRoutes = require('./routes/ayudaRoutes');
const ayudaproveedorRoutes = require('./routes/ayudaproveedorRoutes');
const tipoRecordatorioRoutes = require('./routes/tipoRecordatorioRoutes');
const profesionRoutes = require('./routes/profesionRoutes');
const proveedorRoutes = require('./routes/proveedorRoutes');
const bancoRoutes = require('./routes/bancoRoutes');
const profesionestadoRoutes = require('./routes/profesionestadoRoutes');
const packRoutes = require('./routes/packRoutes');
const uploadImageRoutes = require('./routes/uploadImageRoutes');

const corsOpts = {
    //origin: ['https://app-admin-oppa.onrender.com','http://localhost:3000'],
    origin: ['https://app-admin-oppa.onrender.com','http://localhost:3000'],
    credentials: true,
    methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type']
};

app.use(cors(corsOpts))
app.use(express.json())

mongoose.connect('mongodb+srv://user:user@oppatest.c7oxgel.mongodb.net/OppaTest?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
});

app.use('/api/servicios', servicioRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/supercategorias', supercategoriaRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/apoderados', apoderadoRoutes);
app.use('/api/regiones', regionRoutes);
app.use('/api/comunas', comunaRoutes);
app.use('/api/tiempo', tiempoRoutes);
app.use('/api/tiporecordatorio', tipoRecordatorioRoutes);
app.use('/api/ayuda', ayudaRoutes);
app.use('/api/ayudaproveedor', ayudaproveedorRoutes);
app.use('/api/tipoayuda', tipoAyudaRoutes);
app.use('/api/tipoayudaproveedor', tipoAyudaProveedorRoutes);
app.use('/api/profesiones', profesionRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/bancos', bancoRoutes);
app.use('/api/profesionEstados', profesionestadoRoutes);
app.use('/api/packs', packRoutes);
app.use('/api/upload', uploadImageRoutes);


app.listen(4000, () => {
    console.log('Server started on 4000')
})