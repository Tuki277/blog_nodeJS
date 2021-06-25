var express = require('express');
var router = express.Router();
const taskController = require('../controllers/todoapp')

router.route('/task')
    .get(taskController.getAllTask)
    .post(taskController.addTask)

router.route('task/:id')
    .put(taskController.updateTask)
    .patch(taskController.updateStatus)
    .delete(taskController.deleteTask)

module.exports = router;
