const express = require('express');
const router = express.Router();
const Cliente = require('../models/cliente.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Retrieve all clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Retrieve a single cliente by ID
router.get('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Create a new cliente
router.post('/', async (req, res) => {
  try {
    const newCliente = new Cliente({
      _id: new ObjectId().toString(),
      ...req.body,
    });

    const savedCliente = await newCliente.save();
    res.json(savedCliente);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Update a cliente by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCliente = await Cliente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCliente);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Delete a cliente by ID
router.delete('/:id', async (req, res) => {
  try {
    await Cliente.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cliente deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

module.exports = router;
