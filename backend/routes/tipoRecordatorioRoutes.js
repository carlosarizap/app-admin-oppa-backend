const express = require('express');
const router = express.Router();
const TipoRecordatorio = require('../models/tiporecordatorio.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Retrieve all TipoRecordatorios
router.get('/', async (req, res) => {
  try {
    const tipoRecordatorios = await TipoRecordatorio.find();
    res.json(tipoRecordatorios);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Retrieve a single TipoRecordatorio by ID
router.get('/:id', async (req, res) => {
  try {
    const tipoRecordatorio = await TipoRecordatorio.findById(req.params.id);
    res.json(tipoRecordatorio);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Create a new TipoRecordatorio
router.post('/', async (req, res) => {
  try {
    const newTipoRecordatorio = new TipoRecordatorio(req.body);
    const savedTipoRecordatorio = await newTipoRecordatorio.save();
    res.json(savedTipoRecordatorio);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Update a TipoRecordatorio by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTipoRecordatorio = await TipoRecordatorio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTipoRecordatorio);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Delete a TipoRecordatorio by ID
router.delete('/:id', async (req, res) => {
  try {
    await TipoRecordatorio.findByIdAndDelete(req.params.id);
    res.json({ message: 'TipoRecordatorio deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

router.post('/import', async (req, res) => {
  try {
    const importedTipoRecordatorios = req.body;

    const importedTipoRecordatorioIds = importedTipoRecordatorios.map((tipoRecordatorio) => tipoRecordatorio._id);

    const existingTipoRecordatorios = await TipoRecordatorio.find();

    const existingTipoRecordatorioIds = existingTipoRecordatorios.map((tipoRecordatorio) => tipoRecordatorio._id);

    const tipoRecordatoriosToDelete = existingTipoRecordatorioIds.filter(
      (tipoRecordatorioId) => !importedTipoRecordatorioIds.includes(tipoRecordatorioId)
    );

    await TipoRecordatorio.deleteMany({ _id: { $in: tipoRecordatoriosToDelete } });

    const updatedTipoRecordatorios = await Promise.all(
      importedTipoRecordatorios.map(async (tipoRecordatorio) => {
        if (!tipoRecordatorio._id) {
          tipoRecordatorio._id = new ObjectId().toString();
        }

        const updatedTipoRecordatorio = await TipoRecordatorio.findOneAndUpdate(
          { _id: tipoRecordatorio._id },
          tipoRecordatorio,
          { upsert: true, new: true }
        );
        return updatedTipoRecordatorio;
      })
    );

    res.json(updatedTipoRecordatorios);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

module.exports = router;
