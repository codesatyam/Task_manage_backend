const mongoose = require('mongoose');

const taskHistorySchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default:Date.now(),
  },
  changes: {
    type: mongoose.Schema.Types.Mixed,
    
  },
});

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true,
  },
  status: {
    type: String,
    enum: ['to-do', 'in-progress', 'completed'],
    
  },
  historyLog: [taskHistorySchema], // Add the historyLog field as an array of taskHistorySchema
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
