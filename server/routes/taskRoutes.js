const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// All task routes require authentication
router.use(protect);

// Task collection & creation
router.route('/').post(createTask).get(getTasks);

// Productivity stats (placed before /:id to prevent matching as param)
router.get('/stats', getTaskStats);

// Single task operations
router.route('/:id').get(getTaskById).put(updateTask).delete(deleteTask);

module.exports = router;

