const express = require('express');
const router = express.Router();
const Region = require('../models/region.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Retrieve all regions
router.get('/', async (req, res) => {
  try {
    const regions = await Region.find();
    res.json(regions);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Retrieve a single region by ID
router.get('/:id', async (req, res) => {
  try {
    const region = await Region.findById(req.params.id);
    res.json(region);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Create a new region
router.post('/', async (req, res) => {
  try {
    const newRegion = new Region({
      _id: new ObjectId().toString(),
      ...req.body
    });
    const savedRegion = await newRegion.save();
    res.json(savedRegion);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Update a region by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedRegion = await Region.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedRegion);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Delete a region by ID
router.delete('/:id', async (req, res) => {
  try {
    await Region.findByIdAndDelete(req.params.id);
    res.json({ message: 'Region deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

router.post('/import', async (req, res) => {
  try {
    const importedRegiones = req.body;

    const importedRegionIds = importedRegiones.map((region) => region._id);

    const existingRegiones = await Region.find();

    const existingRegionIds = existingRegiones.map((region) => region._id);

    const regionsToDelete = existingRegionIds.filter(
      (regionId) => !importedRegionIds.includes(regionId)
    );

    await Region.deleteMany({ _id: { $in: regionsToDelete } });

    const updatedRegiones = await Promise.all(
      importedRegiones.map(async (region) => {
        if (!region._id) {
          region._id = new ObjectId().toString();
        }

        const updatedRegion = await Region.findOneAndUpdate(
          { _id: region._id },
          region,
          { upsert: true, new: true }
        );
        return updatedRegion;
      })
    );

    res.json(updatedRegiones);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

module.exports = router;
