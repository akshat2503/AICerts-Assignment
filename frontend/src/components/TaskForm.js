import { Box, Button, FormControlLabel, FormLabel, Modal, Radio, RadioGroup, Stack, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#f8f8ff',
    border: '1px solid grey',
    boxShadow: 24,
    borderRadius: '0.5rem',
    p: 4,
};

const TaskForm = ({ editingTask, onSubmit, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [dueDate, setDueDate] = useState('');
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {setOpen(false); clearForm()};

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            setStatus(editingTask.status);
            setDueDate(editingTask.dueDate);
            handleOpen();
        } else {
            setTitle('');
            setDescription('');
            setStatus('pending');
            setDueDate('');
        }
    }, [editingTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const task = {
            id: editingTask ? editingTask.id : null,
            title,
            description,
            status,
            dueDate,
        };
        onSubmit(task);
        clearForm();
        handleClose();
    };

    const clearForm = () => {
        setTitle('');
        setDescription('');
        setStatus('pending');
        setDueDate('');
    };

    return (
        <Box sx={{ display: 'flex', width: '50%', justifyContent: 'flex-end', my: 1 }}>
            <Button size='large' variant="contained" onClick={handleOpen}>Add Task</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={1}>
                            <TextField id="title" label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            <TextField id="description" label="Description" variant="outlined" value={description} onChange={(e) => setDescription(e.target.value)} required />
                            <Stack>

                                <FormLabel id="status">Status</FormLabel>
                                <RadioGroup
                                    row
                                    id='status'
                                    name="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <FormControlLabel value="pending" control={<Radio />} label="Pending" />
                                    <FormControlLabel value="in-progress" control={<Radio />} label="In-Progress" />
                                    <FormControlLabel value="completed" control={<Radio />} label="Completed" />
                                </RadioGroup>
                            </Stack>
                            <Stack>
                                <FormLabel id="dueDate">Due Date</FormLabel>
                                <TextField type='date' id="dueDate" variant="outlined" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
                            </Stack>
                        </Stack>

                        <Stack direction='row' justifyContent={'space-between'} mt={2}>
                            <Button variant='contained' type="submit">{editingTask ? 'Update Task' : 'Create Task'}</Button>
                            {editingTask && <Button variant='contained' color='error' onClick={()=>{onCancel(); handleClose()}}>Cancel</Button>}
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </Box>
    );
};

export default TaskForm;