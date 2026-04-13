const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Endpoint de publicaciones funcionando' });
});

module.exports = router;