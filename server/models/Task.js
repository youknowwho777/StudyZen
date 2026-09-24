const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  //tells the objectId in this refers to User Model
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    priority: {
      type: String,
      enum: {
        values: ['High', 'Medium', 'Low'],
        message: 'Priority must be High, Medium, or Low',
      },
      default: 'Medium',
    },
    status: {
      type: String,
      enum: {
        values: ['Pending', 'In Progress', 'Completed'],
        message: 'Status must be Pending, In Progress, or Completed',
      },
      default: 'Pending',
    },
    deadline: {
      type: Date,
      default: null,
    },
    category: {
      type: String,
      trim: true,
      default: 'General',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient user task queries and search
taskSchema.index({ user: 1, status: 1, priority: 1, deadline: 1 });

module.exports = mongoose.model('Task', taskSchema);

