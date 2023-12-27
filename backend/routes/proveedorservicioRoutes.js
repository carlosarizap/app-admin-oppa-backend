const express = require('express');
const router = express.Router();
const ProveedorServicio = require('../models/proveedorservicio.model');

// Obtener proveedor servicio con IdProveedor
router.get('/:idProveedor', async (req, res) => {
    try {
        const proveedorServicio = await ProveedorServicio.findById(req.params.idProveedor);
        res.json(proveedorServicio)
    } catch (error) {
        res.status(500).json({ error: 'Server Error'});
    }
});

// Actualizar el proveedor servicio 
router.put('/:id', async (req, res) => {
    try {
        const updatedProveedorServicio = await ProveedorServicio.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true}
        );
        res.json(updatedProveedorServicio);
    } catch (error) {
        res.status(400).json({ error: 'Invalid Data'});
    }
});

module.exports = router;