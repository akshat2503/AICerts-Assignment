import React from 'react'
import { Chip, Grid, IconButton, List, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function TaskList({ tasks, onEdit, onDelete }) {
    return (
        <div style={{ backgroundColor: '#ecedf6', padding: '0.5rem', width: '50%', borderRadius: '1rem' }}>
            <Grid item xs={12} md={6}>
                <List sx={{px: '1rem'}}>
                    {tasks.map((task) => (
                        <ListItem key={task.id} sx={{ backgroundColor: 'white', borderRadius: '0.5rem', m: '1rem 0' }}
                            secondaryAction={
                                <>
                                    <Chip sx={{display: `${task.status==='completed'||'none'}`}} label="Completed" color="success" />
                                    <Chip sx={{display: `${task.status==='pending'||'none'}`}} label="Pending" color="secondary" />
                                    <Chip sx={{display: `${task.status==='in-progress'||'none'}`}} label="In-Progress" color="primary" />
                                    <IconButton onClick={() => onEdit(task)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => onDelete(task.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            }
                        >
                            <ListItemText
                                primary={task.title}
                                secondary={task.description + " - " + task.dueDate}
                            />
                        </ListItem>
                    ))}
                </List>
            </Grid>

        </div>
    )
}