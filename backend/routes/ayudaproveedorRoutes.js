const express = require('express');
const router = express.Router();
const AyudaProveedor = require('../models/ayudaproveedor.model');

// Retrieve all AyudaProveedors
router.get('/', async (req, res) => {
  try {
    const ayudaProveedors = await AyudaProveedor.find();
    res.json(ayudaProveedors);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Retrieve a single AyudaProveedor by ID
router.get('/:id', async (req, res) => {
  try {
    const ayudaProveedor = await AyudaProveedor.findById(req.params.id);
    res.json(ayudaProveedor);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Create a new AyudaProveedor
router.post('/', async (req, res) => {
  try {
    const newAyudaProveedor = new AyudaProveedor(req.body);
    const savedAyudaProveedor = await newAyudaProveedor.save();
    res.json(savedAyudaProveedor);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Update an AyudaProveedor by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedAyudaProveedor = await AyudaProveedor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedAyudaProveedor);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Delete an AyudaProveedor by ID
router.delete('/:id', async (req, res) => {
  try {
    await AyudaProveedor.findByIdAndDelete(req.params.id);
    res.json({ message: 'AyudaProveedor deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

module.exports = router;
