const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Endpoint de usuarios funcionando' });
});

module.exports = router;