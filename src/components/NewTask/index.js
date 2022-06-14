import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from "@mui/material/Box";
import style from './NewTask.module.css'
import {TaskAPI} from "../../API/api";


export default function FormDialogTask(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [values, setValues] = React.useState({
        name: '',
        description: '',
        estimatedHours: ''
    });

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };


    const handleSubmit = async () => {
        TaskAPI.newTask(values.name, values.description, parseInt(values.estimatedHours), props.userId, props.projectId)
        console.log(values.name, values.description, parseInt(values.estimatedHours), props.userId, props.projectId)
        setOpen(false)
    }

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                New Task
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create a new task. Please indicate the name of the task, description and customer.
                    </DialogContentText><br/>
                    <Box sx={{
                        '& > :not(style)': {width: '100%'},
                    }}>
                        <TextField
                            id="outlined-name"
                            label="task name"
                            value={values.name}
                            onChange={handleChange('name')}
                            className={style.field}
                        />
                        <TextField
                            id="outlined-name"
                            label="description"
                            value={values.description}
                            onChange={handleChange('description')}
                            className={style.field}
                        />
                        <TextField
                            type={"number"}
                            id="outlined-name"
                            label="estimatedHours"
                            value={values.estimatedHours}
                            onChange={handleChange('estimatedHours')}
                            className={style.field}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
