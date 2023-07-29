const Task = require('../models/taskModel');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks.' });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching the task.' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const taskData = req.body;
    
    // Create a new history log entry with the current timestamp and task data
    const historyEntry = {
      timestamp: new Date(),
      changes: { ...taskData } 
    };
    // console.log(changes);
    // Create a new task with the given data
    const task = new Task(taskData);
    // Initialize the history log with the initial entry
    task.historyLog.push(historyEntry);

    // Save the task to the database
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error creating a task.' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedData = req.body;

    // Find the task by ID
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    // Create a new history log entry with the current timestamp and changes
    // const historyEntry = {
    //   timestamp: new Date(),
    //   changes: { ...updatedData } // Clone the updated data to capture the changes
    // };

    // Add the history entry to the task's history log
    // if (!task.historyLog) {
    //   task.historyLog = []; // Initialize the history log if it doesn't exist
    // }
    // task.historyLog.push(historyEntry);

    // Update the task with the new data
    task.set(updatedData);

    // Save the updated task to the database
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating the task.' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    // Find the task by ID and delete it
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.json({ message: 'Task deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the task.' });
  }
};