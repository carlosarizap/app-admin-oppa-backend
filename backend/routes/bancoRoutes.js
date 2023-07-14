const express = require('express');
const router = express.Router();
const Banco = require('../models/banco.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Retrieve all bancos
router.get('/', async (req, res) => {
  try {
    const bancos = await Banco.find();
    res.json(bancos);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Retrieve a single banco by ID
router.get('/:id', async (req, res) => {
  try {
    const banco = await Banco.findById(req.params.id);
    res.json(banco);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Create a new banco
router.post('/', async (req, res) => {
  try {
    const newBanco = new Banco({
      _id: new ObjectId().toString(),
      ...req.body
    });
    const savedBanco = await newBanco.save();
    res.json(savedBanco);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Update a banco by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedBanco = await Banco.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedBanco);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Delete a banco by ID
router.delete('/:id', async (req, res) => {
  try {
    await Banco.findByIdAndDelete(req.params.id);
    res.json({ message: 'Banco deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

router.post('/import', async (req, res) => {
  try {
    const importedBancos = req.body;

    const importedBancoIds = importedBancos.map((banco) => banco._id);

    const existingBancos = await Banco.find();

    const existingBancoIds = existingBancos.map((banco) => banco._id);

    const bancosToDelete = existingBancoIds.filter(
      (bancoId) => !importedBancoIds.includes(bancoId)
    );

    await Banco.deleteMany({ _id: { $in: bancosToDelete } });

    const updatedBancos = await Promise.all(
      importedBancos.map(async (banco) => {
        if (!banco._id) {
          banco._id = new ObjectId().toString();
        }

        const updatedBanco = await Banco.findOneAndUpdate(
          { _id: banco._id },
          banco,
          { upsert: true, new: true }
        );
        return updatedBanco;
      })
    );

    res.json(updatedBancos);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

module.exports = router;
