const Task = require('../model/TaskModel');


exports.createTask = async (req, res) => {
  const { taskOwner, subject, dueDate, contact, account, status, priority } = req.body;

  try {
    const task = new Task({ taskOwner, subject, dueDate, contact, account, status, priority });
    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
exports.getTasks = async (req, res) => {
    try {
      const tasks = await Task.find().exec();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };
  

