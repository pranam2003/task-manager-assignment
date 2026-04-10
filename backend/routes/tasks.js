const express = require('express');
const router = express.Router();
const TaskModel = require('../models/tasks');


router.get('/', (req, res) => {
    try {
        const tasks = TaskModel.getAll();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});


router.post('/', (req, res) => {
    try {
        const { title } = req.body;


        if (!title || typeof title !== 'string' || title.trim() === '') {
            return res.status(400).json({ error: 'A valid title is required' });
        }

        const newTask = TaskModel.create(title.trim());
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create task' });
    }
});

router.patch('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;

        if (title === undefined && completed === undefined) {
            return res.status(400).json({ error: 'Provide title or completed status to update' });
        }

        if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
            return res.status(400).json({ error: 'Title must be a non-empty string' });
        }

        if (completed !== undefined && typeof completed !== 'boolean') {
            return res.status(400).json({ error: 'Completed must be a boolean' });
        }

        const updates = {};
        if (title !== undefined) updates.title = title.trim();
        if (completed !== undefined) updates.completed = completed;

        const updatedTask = TaskModel.update(id, updates);

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update task' });
    }
});

router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;

        const deleted = TaskModel.delete(id);

        if (!deleted) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

module.exports = router;
