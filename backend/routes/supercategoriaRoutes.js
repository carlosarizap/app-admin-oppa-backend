const express = require('express');
const router = express.Router();
const SuperCategoria = require('../models/supercategoria.model');

// Retrieve all supercategorias
router.get('/', async (req, res) => {
  try {
    const supercategorias = await SuperCategoria.find();
    res.json(supercategorias);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Retrieve a single supercategoria by ID
router.get('/:id', async (req, res) => {
  try {
    const supercategoria = await SuperCategoria.findById(req.params.id);
    res.json(supercategoria);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Create a new supercategoria
router.post('/', async (req, res) => {
  try {
    const newSupercategoria = new SuperCategoria({
      _id: req.body._id,
      Nombre: req.body.Nombre,
    });

    const savedSupercategoria = await newSupercategoria.save();
    res.json(savedSupercategoria);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Update a supercategoria by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedSupercategoria = await SuperCategoria.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedSupercategoria);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Delete a supercategoria by ID
router.delete('/:id', async (req, res) => {
  try {
    await SuperCategoria.findByIdAndDelete(req.params.id);
    res.json({ message: 'Supercategoria deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

module.exports = router;
