const express = require('express');
const router = express.Router();
const Ayuda = require('../models/ayuda.model');

// Retrieve all Ayudas
router.get('/', async (req, res) => {
  try {
    const ayudas = await Ayuda.find();
    res.json(ayudas);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Retrieve a single Ayuda by ID
router.get('/:id', async (req, res) => {
  try {
    const ayuda = await Ayuda.findById(req.params.id);
    res.json(ayuda);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Create a new Ayuda
router.post('/', async (req, res) => {
  try {
    const newAyuda = new Ayuda(req.body);
    const savedAyuda = await newAyuda.save();
    res.json(savedAyuda);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Update an Ayuda by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedAyuda = await Ayuda.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedAyuda);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Delete an Ayuda by ID
router.delete('/:id', async (req, res) => {
  try {
    await Ayuda.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ayuda deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

module.exports = router;
