const express = require('express');
const router = express.Router();
const ProfesionEstado = require('../models/profesionestado.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Retrieve all profesionEstados
router.get('/', async (req, res) => {
  try {
    const profesionEstados = await ProfesionEstado.find();
    res.json(profesionEstados);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});
// Retrieve a single profesionEstado by ID
router.get('/:id', async (req, res) => {
  try {
    const profesionEstado = await ProfesionEstado.findById(req.params.id);
    res.json(profesionEstado);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Create a new profesionEstado
router.post('/', async (req, res) => {
  try {
    const newProfesionEstado = new ProfesionEstado({
      _id: new ObjectId().toString(),
      ...req.body,
    });

    const savedProfesionEstado = await newProfesionEstado.save();
    res.json(savedProfesionEstado);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Update a profesionEstado by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedProfesionEstado = await ProfesionEstado.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProfesionEstado);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Delete a profesionEstado by ID
router.delete('/:id', async (req, res) => {
  try {
    await ProfesionEstado.findByIdAndDelete(req.params.id);
    res.json({ message: 'ProfesionEstado deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

module.exports = router;
