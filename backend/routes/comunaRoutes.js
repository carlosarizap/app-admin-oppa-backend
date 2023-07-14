const express = require('express');
const router = express.Router();
const Comuna = require('../models/comuna.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Retrieve all comunas
router.get('/', async (req, res) => {
  try {
    const comunas = await Comuna.find();
    res.json(comunas);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Retrieve a single comuna by ID
router.get('/:id', async (req, res) => {
  try {
    const comuna = await Comuna.findById(req.params.id);
    res.json(comuna);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Retrieve comunas by IdRegion
router.get('/byregion/:idRegion', async (req, res) => {
  try {
    const comunas = await Comuna.find({ IdRegion: req.params.idRegion });
    res.json(comunas);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Create a new comuna
router.post('/', async (req, res) => {
  try {
    const newComuna = new Comuna({
      _id: new ObjectId().toString(),
      ...req.body
    });
    const savedComuna = await newComuna.save();
    res.json(savedComuna);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Update a comuna by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedComuna = await Comuna.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedComuna);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Delete a comuna by ID
router.delete('/:id', async (req, res) => {
  try {
    await Comuna.findByIdAndDelete(req.params.id);
    res.json({ message: 'Comuna deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

router.post('/import/:idRegion', async (req, res) => {
  try {
    const idRegion = req.params.idRegion;
    const importedComunas = req.body;

    // Fetch the existing comunas for the specific region
    const existingComunas = await Comuna.find({ IdRegion: idRegion });

    const importedComunaIds = importedComunas.map((comuna) => comuna._id);
    const existingComunaIds = existingComunas.map((comuna) => comuna._id);

    // Find the comunas to delete that are not present in the imported data
    const comunasToDelete = existingComunaIds.filter(
      (comunaId) => !importedComunaIds.includes(comunaId)
    );

    // Delete the comunas that belong to the region and are not in the imported data
    await Comuna.deleteMany({ _id: { $in: comunasToDelete } });

    // Update or create the imported comunas
    const updatedComunas = await Promise.all(
      importedComunas.map(async (comuna) => {
        if (!comuna._id) {
          comuna._id = new ObjectId().toString();
        }

        const updatedComuna = await Comuna.findOneAndUpdate(
          { _id: comuna._id },
          { ...comuna, IdRegion: idRegion },
          { upsert: true, new: true }
        );
        return updatedComuna;
      })
    );

    res.json(updatedComunas);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});


module.exports = router;
