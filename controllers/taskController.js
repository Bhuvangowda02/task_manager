// controllers/taskController.js
const Task = require('../models/taskModel');

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.createTask = async (req, res) => {
    const { title, description, dueDate } = req.body;
    try {
        const task = await Task.create({ title, description, dueDate });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, dueDate } = req.body;
    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        await task.destroy();
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};
