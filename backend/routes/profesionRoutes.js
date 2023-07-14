const express = require('express');
const router = express.Router();
const Profesion = require('../models/profesion.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Retrieve all profesiones
router.get('/', async (req, res) => {
  try {
    const profesiones = await Profesion.find();
    res.json(profesiones);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Retrieve a single profesion by ID
router.get('/:id', async (req, res) => {
  try {
    const profesion = await Profesion.findById(req.params.id);
    res.json(profesion);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Create a new profesion
router.post('/', async (req, res) => {
  try {
    const newProfesion = new Profesion({
      _id: new ObjectId().toString(),
      ...req.body
    });
    const savedProfesion = await newProfesion.save();
    res.json(savedProfesion);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Update a profesion by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedProfesion = await Profesion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProfesion);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Delete a profesion by ID
router.delete('/:id', async (req, res) => {
  try {
    await Profesion.findByIdAndDelete(req.params.id);
    res.json({ message: 'Profesion deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

router.post('/import', async (req, res) => {
  try {
    const importedProfesions = req.body;

    const importedProfesionIds = importedProfesions.map((profesion) => profesion._id);

    const existingProfesions = await Profesion.find();

    const existingProfesionIds = existingProfesions.map((profesion) => profesion._id);

    const profesionesToDelete = existingProfesionIds.filter(
      (profesionId) => !importedProfesionIds.includes(profesionId)
    );

    await Profesion.deleteMany({ _id: { $in: profesionesToDelete } });

    const updatedProfesions = await Promise.all(
      importedProfesions.map(async (profesion) => {
        if (!profesion._id) {
          profesion._id = new ObjectId().toString();
        }

        const updatedProfesion = await Profesion.findOneAndUpdate(
          { _id: profesion._id },
          profesion,
          { upsert: true, new: true }
        );
        return updatedProfesion;
      })
    );

    res.json(updatedProfesions);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

module.exports = router;