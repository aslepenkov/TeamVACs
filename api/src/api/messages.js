const express = require('express');
const monk = require('monk');
const Joi = require('@hapi/joi');

const db = monk(process.env.MONGO_URI);
const router = express.Router();

const vacations = db.get('vacs');
const schema = Joi.object({
 
});

// READ ALL
router.get('/', async (req, res, next) => {
  try {
    const items = await vacations.find({});
    res.json(items);
  } catch (error) {
    next(error);
  }
});

// READ ONE
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await vacations.findOne({
      _id: id,
    });
    if (!item) return next();

    res.json(item);
  } catch (error) {
    next(error);
  }
  return null;
});

// CREATE ONE
router.post('/', async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    const inserted = await vacations.insert(value);
    res.json(inserted);
  } catch (error) {
    next(error);
  }
});

// UPDATE ONE
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const value = await schema.validateAsync(req.body);
    const item = await vacations.findOne({
      _id: id,
    });
    if (!item) return next();
    const updated = await vacations.update({
      _id: id
    }, {
      $set: value,
    });
    res.json(updated);
  } catch (error) {
    next(error);
  }
  return null;
});

// DELETE ONE
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await vacations.remove({ _id: id });
    res.status(200).send(`DEL ${id} Success`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
