const express = require('express');
const router = express.Router();
const TipoAyuda = require('../models/tipoayuda.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Retrieve all TipoAyudas
router.get('/', async (req, res) => {
  try {
    const tipoAyudas = await TipoAyuda.find();
    res.json(tipoAyudas);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Retrieve a single TipoAyuda by ID
router.get('/:id', async (req, res) => {
  try {
    const tipoAyuda = await TipoAyuda.findById(req.params.id);
    res.json(tipoAyuda);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Create a new TipoAyuda
router.post('/', async (req, res) => {
  try {
    const newTipoAyuda = new TipoAyuda(req.body);
    const savedTipoAyuda = await newTipoAyuda.save();
    res.json(savedTipoAyuda);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Update a TipoAyuda by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTipoAyuda = await TipoAyuda.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTipoAyuda);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Delete a TipoAyuda by ID
router.delete('/:id', async (req, res) => {
  try {
    await TipoAyuda.findByIdAndDelete(req.params.id);
    res.json({ message: 'TipoAyuda deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

router.post('/import', async (req, res) => {
  try {
    const importedTipoAyudas = req.body;

    const importedTipoAyudaIds = importedTipoAyudas.map((tipoAyuda) => tipoAyuda._id);

    const existingTipoAyudas = await TipoAyuda.find();

    const existingTipoAyudaIds = existingTipoAyudas.map((tipoAyuda) => tipoAyuda._id);

    const tipoAyudasToDelete = existingTipoAyudaIds.filter(
      (tipoAyudaId) => !importedTipoAyudaIds.includes(tipoAyudaId)
    );

    await TipoAyuda.deleteMany({ _id: { $in: tipoAyudasToDelete } });

    const updatedTipoAyudas = await Promise.all(
      importedTipoAyudas.map(async (tipoAyuda) => {
        if (!tipoAyuda._id) {
          tipoAyuda._id = new ObjectId().toString();
        }

        const updatedTipoAyuda = await TipoAyuda.findOneAndUpdate(
          { _id: tipoAyuda._id },
          tipoAyuda,
          { upsert: true, new: true }
        );
        return updatedTipoAyuda;
      })
    );

    res.json(updatedTipoAyudas);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});


module.exports = router;
