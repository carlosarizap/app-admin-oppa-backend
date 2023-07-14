const express = require('express');
const router = express.Router();
const Apoderado = require('../models/apoderado.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Retrieve all apoderados
router.get('/', async (req, res) => {
  try {
    const apoderados = await Apoderado.find();
    res.json(apoderados);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Retrieve a single apoderado by ID
router.get('/:id', async (req, res) => {
  try {
    const apoderado = await Apoderado.findById(req.params.id);
    res.json(apoderado);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Create a new apoderado
router.post('/', async (req, res) => {
  try {
    const newApoderado = new Apoderado({
      _id: new ObjectId().toString(),
      ...req.body,
    });

    const savedApoderado = await newApoderado.save();
    res.json(savedApoderado);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Update an apoderado by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedApoderado = await Apoderado.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedApoderado);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Delete an apoderado by ID
router.delete('/:id', async (req, res) => {
  try {
    await Apoderado.findByIdAndDelete(req.params.id);
    res.json({ message: 'Apoderado deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

module.exports = router;
