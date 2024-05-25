const express = require('express');
const cors = require('cors')
const app = express();
const PORT = 8000;

// In-memory data storage
let tasks = [
    {
        id: 1,
        title: 'Sample Task 1',
        description: 'This is task 1',
        status: 'pending',
        dueDate: '2024-06-01',
    },
    {
        id: 2,
        title: 'Sample Task 2',
        description: 'This is task 2',
        status: 'in-progress',
        dueDate: '2024-06-15',
    },
];

const corsOptions = {
    origin: '*',
};

app.use(cors(corsOptions));
app.use(express.json());

// API endpoints

// GET /api/tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// GET /api/tasks/:id
app.get('/api/tasks/:id', (req, res) => {
    const task = tasks.find((t) => t.id === parseInt(req.params.id));
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// POST /api/tasks
app.post('/api/tasks', (req, res) => {
    const newTask = req.body;
    newTask.id = tasks.length + 1;
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT /api/tasks/:id
app.put('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const updatedTask = req.body;
    const taskIndex = tasks.findIndex((t) => t.id === taskId);

    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// DELETE /api/tasks/:id
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((t) => t.id === taskId);

    if (taskIndex !== -1) {
        const deletedTask = tasks.splice(taskIndex, 1)[0];
        res.json(deletedTask);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});