const express = require('express');
const router = express.Router();

// this is to chcek is backend server(express api) is running or not ??
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'StudyZen API is running',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;

