const express = require('express');
const router = express.Router();
const Servicio = require('../models/servicio.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Retrieve all servicios
router.get('/', async (req, res) => {
  try {
    const servicios = await Servicio.find();
    res.json(servicios);
    
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Retrieve a single servicio by ID
router.get('/:id', async (req, res) => {
  try {
    const servicio = await Servicio.findById(req.params.id);
    res.json(servicio);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Create a new servicio
router.post('/', async (req, res) => {
  try {
    const newServicio = new Servicio({
      _id: new ObjectId().toString(),
      ...req.body
    });

    const savedServicio = await newServicio.save();
    res.json(savedServicio);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Update a servicio by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedServicio = await Servicio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedServicio);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Delete a servicio by ID
router.delete('/:id', async (req, res) => {
  try {
    await Servicio.findByIdAndDelete(req.params.id);
    res.json({ message: 'Servicio deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Import servicios
router.post('/import', async (req, res) => {
  try {
    const importedServicios = req.body;

    // Validate the imported servicios if needed
    // ...

    // Get the IDs of the imported servicios
    const importedServicioIds = importedServicios.map((servicio) => servicio._id);

    // Find all servicios in the database
    const existingServicios = await Servicio.find();

    // Get the IDs of the existing servicios
    const existingServicioIds = existingServicios.map((servicio) => servicio._id);

    // Find the IDs of servicios that should be deleted
    const serviciosToDelete = existingServicioIds.filter(
      (servicioId) => !importedServicioIds.includes(servicioId)
    );

    // Delete servicios that should be deleted
    await Servicio.deleteMany({ _id: { $in: serviciosToDelete } });

    // Update the database with the imported servicios
    const updatedServicios = await Promise.all(
      importedServicios.map(async (servicio) => {
        // Generate a new _id if _id is not specified in the imported servicio
        if (!servicio._id) {
          servicio._id = new ObjectId().toString();
        }

        const updatedServicio = await Servicio.findOneAndUpdate(
          { _id: servicio._id },
          servicio,
          { upsert: true, new: true }
        );
        return updatedServicio;
      })
    );

    res.json(updatedServicios);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});



module.exports = router;

