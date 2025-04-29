import { Request, Response } from 'express';
import Task from '../models/Task';
const express = require('express');
const router = express.Router();

// Hämta alla tasks
router.get('/', async (req: Request, res: Response) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// Skapa en ny task
router.post('/', async (req: Request, res: Response) => {
    try {
        const { title } = req.body;

        const task = await Task.create({ title });
        res.status(201).json(task);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Failed to create task' });
    }
});

// Ta bort en task
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);

        if (!task) {
            return console.log('test');
        }

        await task.destroy();
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

// Uppdatera en task
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;

        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        task.set({ completed });
        await task.save();

        res.json(task);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Failed to update task' });
    }
});

export default router;
