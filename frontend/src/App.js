import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { Typography } from '@mui/material';

function App() {

    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const createTask = async (task) => {
        try {
            const response = await axios.post('http://localhost:8000/api/tasks', task);
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const updateTask = async (updatedTask) => {
        try {
            const response = await axios.put(`http://localhost:8000/api/tasks/${updatedTask.id}`, updatedTask);
            setTasks(tasks.map((task) => (task.id === updatedTask.id ? response.data : task)));
            setEditingTask(null);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/tasks/${id}`);
            setTasks(tasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f8f8ff', height: '100vh'}}>
            <Typography sx={{fontSize: '3rem', fontWeight: 'bold', color: '#646681', mt: 4}}>TO-DO LIST</Typography>
            <TaskForm
                editingTask={editingTask}
                onSubmit={editingTask ? updateTask : createTask}
                onCancel={() => setEditingTask(null)}
            />
            <TaskList
                tasks={tasks}
                onEdit={(task) => setEditingTask(task)}
                onDelete={deleteTask}
            />
        </div>
    );
}

export default App;
