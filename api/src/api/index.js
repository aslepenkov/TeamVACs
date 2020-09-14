const express = require('express');
const messages = require('./messages');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'BASIC CRUD API'
  });
});

router.use('/vacs', messages);

module.exports = router;
