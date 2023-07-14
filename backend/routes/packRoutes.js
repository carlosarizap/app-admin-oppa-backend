const express = require('express');
const router = express.Router();
const Pack = require('../models/pack.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Retrieve all packs
router.get('/', async (req, res) => {
  try {
    const packs = await Pack.find();
    res.json(packs);
    
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Retrieve a single pack by ID
router.get('/:id', async (req, res) => {
  try {
    const pack = await Pack.findById(req.params.id);
    res.json(pack);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Create a new pack
router.post('/', async (req, res) => {
  try {
    const newPack = new Pack({
      _id: new ObjectId().toString(),
      ...req.body
    });

    const savedPack = await newPack.save();
    res.json(savedPack);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Update a pack by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedPack = await Pack.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPack);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Delete a pack by ID
router.delete('/:id', async (req, res) => {
  try {
    await Pack.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pack deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Import packs
router.post('/import', async (req, res) => {
  try {
    const importedPacks = req.body;

    // Validate the imported packs if needed
    // ...

    // Get the IDs of the imported packs
    const importedPackIds = importedPacks.map((pack) => pack._id);

    // Find all packs in the database
    const existingPacks = await Pack.find();

    // Get the IDs of the existing packs
    const existingPackIds = existingPacks.map((pack) => pack._id);

    // Find the IDs of packs that should be deleted
    const packsToDelete = existingPackIds.filter(
      (packId) => !importedPackIds.includes(packId)
    );

    // Delete packs that should be deleted
    await Pack.deleteMany({ _id: { $in: packsToDelete } });

    // Update the database with the imported packs
    const updatedPacks = await Promise.all(
      importedPacks.map(async (pack) => {
        // Generate a new _id if _id is not specified in the imported pack
        if (!pack._id) {
          pack._id = new ObjectId().toString();
        }

        const updatedPack = await Pack.findOneAndUpdate(
          { _id: pack._id },
          pack,
          { upsert: true, new: true }
        );
        return updatedPack;
      })
    );

    res.json(updatedPacks);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});



module.exports = router;

