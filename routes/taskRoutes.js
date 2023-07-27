const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask); // Add route for updating a task
router.delete('/:id', taskController.deleteTask); // Add route for deleting a task

module.exports = router;
