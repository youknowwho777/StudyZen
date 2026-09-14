const Task = require('../models/Task');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res, next) => {
  try {
    const { title, description, priority, status, deadline, category } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Task title is required',
      });
    }

    const task = await Task.create({
      user: req.user._id,
      title: title.trim(),
      description: description ? description.trim() : '',
      priority: priority || 'Medium',
      status: status || 'Pending',
      deadline: deadline ? new Date(deadline) : null,
      category: category ? category.trim() : 'General',
    });

    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all tasks for logged-in user with filters & search
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res, next) => {
  try {
    const { status, priority, category, search, sort } = req.query;

    // Base query strictly enforcing user ownership
    const query = { user: req.user._id };

    // Status filter
    if (status && status !== 'All') {
      query.status = status;
    }

    // Priority filter
    if (priority && priority !== 'All') {
      query.priority = priority;
    }

    // Category filter
    if (category && category !== 'All') {
      query.category = category;
    }

    // Keyword search in title or description
    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [{ title: searchRegex }, { description: searchRegex }];
    }

    // Sorting option
    let sortOption = { createdAt: -1 };
    if (sort === 'deadline_asc') {
      sortOption = { deadline: 1 };
    } else if (sort === 'deadline_desc') {
      sortOption = { deadline: -1 };
    } else if (sort === 'priority') {
      // High first
      sortOption = { priority: 1 };
    }

    const tasks = await Task.find(query).sort(sortOption);

    res.json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Security requirement: Ensure user owns this task
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this task',
      });
    }

    res.json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Security check: Only the owner can update
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this task',
      });
    }

    const { title, description, priority, status, deadline, category } = req.body;

    if (title !== undefined) task.title = title.trim();
    if (description !== undefined) task.description = description.trim();
    if (priority !== undefined) task.priority = priority;
    if (status !== undefined) task.status = status;
    if (deadline !== undefined) task.deadline = deadline ? new Date(deadline) : null;
    if (category !== undefined) task.category = category.trim();

    const updatedTask = await task.save();

    res.json({
      success: true,
      task: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Security check: Only the owner can delete
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this task',
      });
    }

    await task.deleteOne();

    res.json({
      success: true,
      message: 'Task deleted successfully',
      taskId: req.params.id,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user productivity metrics & analytics (Phase 4)
// @route   GET /api/tasks/stats
// @access  Private
const getTaskStats = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const now = new Date();

    const tasks = await Task.find({ user: userId });

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
    const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length;
    const pendingTasks = tasks.filter((t) => t.status === 'Pending').length;

    // Overdue tasks: deadline passed and not yet completed
    const overdueTasks = tasks.filter(
      (t) => t.deadline && new Date(t.deadline) < now && t.status !== 'Completed'
    ).length;

    // Safety rule from roadmap: Never divide by zero
    const completionRate =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Priority breakdown
    const priorityBreakdown = {
      High: tasks.filter((t) => t.priority === 'High').length,
      Medium: tasks.filter((t) => t.priority === 'Medium').length,
      Low: tasks.filter((t) => t.priority === 'Low').length,
    };

    // Category breakdown
    const categoryMap = {};
    tasks.forEach((t) => {
      const cat = t.category || 'General';
      categoryMap[cat] = (categoryMap[cat] || 0) + 1;
    });

    const categoryBreakdown = Object.keys(categoryMap).map((cat) => ({
      category: cat,
      count: categoryMap[cat],
    }));

    res.json({
      success: true,
      stats: {
        totalTasks,
        completedTasks,
        inProgressTasks,
        pendingTasks,
        overdueTasks,
        completionRate,
        priorityBreakdown,
        categoryBreakdown,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats,
};
