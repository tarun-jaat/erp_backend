const express = require('express');
const { createTask, getTasks } = require('../controllers/TaskController');
const router = express.Router();

router.post('/createTask', createTask);
router.get('/',getTasks)
module.exports = router;
