const express = require('express');
const router = express.Router();
const Tiempo = require('../models/tiempo.model');

// Retrieve all Tiempos
router.get('/', async (req, res) => {
  try {
    const tiempos = await Tiempo.find();
    res.json(tiempos);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Retrieve a single Tiempo by ID
router.get('/:id', async (req, res) => {
  try {
    const tiempo = await Tiempo.findById(req.params.id);
    res.json(tiempo);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Create a new Tiempo
router.post('/', async (req, res) => {
  try {
    const newTiempo = new Tiempo(req.body);
    const savedTiempo = await newTiempo.save();
    res.json(savedTiempo);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Update a Tiempo by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTiempo = await Tiempo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTiempo);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Delete a Tiempo by ID
router.delete('/:id', async (req, res) => {
  try {
    await Tiempo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tiempo deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

module.exports = router;
