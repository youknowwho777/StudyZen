const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'StudyZen API is running',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;

