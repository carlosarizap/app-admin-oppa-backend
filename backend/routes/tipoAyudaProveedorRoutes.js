const express = require('express');
const router = express.Router();
const TipoAyudaProveedor = require('../models/tipoayudaproveedor.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Retrieve all TipoAyudaProveedors
router.get('/', async (req, res) => {
  try {
    const tipoAyudaProveedors = await TipoAyudaProveedor.find();
    res.json(tipoAyudaProveedors);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Retrieve a single TipoAyudaProveedor by ID
router.get('/:id', async (req, res) => {
  try {
    const tipoAyudaProveedor = await TipoAyudaProveedor.findById(req.params.id);
    res.json(tipoAyudaProveedor);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Create a new TipoAyudaProveedor
router.post('/', async (req, res) => {
  try {
    const newTipoAyudaProveedor = new TipoAyudaProveedor(req.body);
    const savedTipoAyudaProveedor = await newTipoAyudaProveedor.save();
    res.json(savedTipoAyudaProveedor);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Update a TipoAyudaProveedor by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTipoAyudaProveedor = await TipoAyudaProveedor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTipoAyudaProveedor);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Delete a TipoAyudaProveedor by ID
router.delete('/:id', async (req, res) => {
  try {
    await TipoAyudaProveedor.findByIdAndDelete(req.params.id);
    res.json({ message: 'TipoAyudaProveedor deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

router.post('/import', async (req, res) => {
  try {
    const importedTipoAyudaProveedors = req.body;

    const importedTipoAyudaProveedorIds = importedTipoAyudaProveedors.map((tipoAyudaProveedor) => tipoAyudaProveedor._id);

    const existingTipoAyudaProveedors = await TipoAyudaProveedor.find();

    const existingTipoAyudaProveedorIds = existingTipoAyudaProveedors.map((tipoAyudaProveedor) => tipoAyudaProveedor._id);

    const tipoAyudaProveedorsToDelete = existingTipoAyudaProveedorIds.filter(
      (tipoAyudaProveedorId) => !importedTipoAyudaProveedorIds.includes(tipoAyudaProveedorId)
    );

    await TipoAyudaProveedor.deleteMany({ _id: { $in: tipoAyudaProveedorsToDelete } });

    const updatedTipoAyudaProveedors = await Promise.all(
      importedTipoAyudaProveedors.map(async (tipoAyudaProveedor) => {
        if (!tipoAyudaProveedor._id) {
          tipoAyudaProveedor._id = new ObjectId().toString();
        }

        const updatedTipoAyudaProveedor = await TipoAyudaProveedor.findOneAndUpdate(
          { _id: tipoAyudaProveedor._id },
          tipoAyudaProveedor,
          { upsert: true, new: true }
        );
        return updatedTipoAyudaProveedor;
      })
    );

    res.json(updatedTipoAyudaProveedors);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});


module.exports = router;
