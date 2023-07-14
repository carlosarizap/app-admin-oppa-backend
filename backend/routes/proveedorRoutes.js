const express = require('express');
const router = express.Router();
const Proveedor = require('../models/proveedor.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Retrieve all proveedores
router.get('/', async (req, res) => {
  try {
    const proveedores = await Proveedor.find();
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Retrieve a single proveedor by ID
router.get('/:id', async (req, res) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id);
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Create a new proveedor
router.post('/', async (req, res) => {
  try {
    const newProveedor = new Proveedor({
      _id: new ObjectId().toString(),
      ...req.body,
    });

    const savedProveedor = await newProveedor.save();
    res.json(savedProveedor);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Update a proveedor by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedProveedor = await Proveedor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProveedor);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Delete a proveedor by ID
router.delete('/:id', async (req, res) => {
  try {
    await Proveedor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Proveedor deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

module.exports = router;