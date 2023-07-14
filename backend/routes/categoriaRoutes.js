const express = require('express');
const router = express.Router();
const Categoria = require('../models/categoria.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Retrieve all categorias
router.get('/', async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Retrieve a single categoria by ID
router.get('/:id', async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Create a new categoria
router.post('/', async (req, res) => {
  try {
    const newCategoria = new Categoria({
      _id: new ObjectId().toString(),
      ...req.body
    });
    const savedCategoria = await newCategoria.save();
    res.json(savedCategoria);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Update a categoria by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedCategoria = await Categoria.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCategoria);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

// Delete a categoria by ID
router.delete('/:id', async (req, res) => {
  try {
    await Categoria.findByIdAndDelete(req.params.id);
    res.json({ message: 'Categoria deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

router.post('/import', async (req, res) => {
  try {
    const importedCategorias = req.body;

    const importedCategoriaIds = importedCategorias.map((categoria) => categoria._id);

    const existingCategorias = await Categoria.find();

    const existingCategoriaIds = existingCategorias.map((categoria) => categoria._id);

    const categoriasToDelete = existingCategoriaIds.filter(
      (categoriaId) => !importedCategoriaIds.includes(categoriaId)
    );

    await Categoria.deleteMany({ _id: { $in: categoriasToDelete } });

    const updatedCategorias = await Promise.all(
      importedCategorias.map(async (categoria) => {
        if (!categoria._id) {
          categoria._id = new ObjectId().toString();
        }

        const updatedCategoria = await Categoria.findOneAndUpdate(
          { _id: categoria._id },
          categoria,
          { upsert: true, new: true }
        );
        return updatedCategoria;
      })
    );

    res.json(updatedCategorias);
  } catch (error) {
    res.status(400).json({ error: 'Invalid Data' });
  }
});

module.exports = router;