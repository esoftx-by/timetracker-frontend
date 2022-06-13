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

export default function FormDialog(props) {
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
        customer: ''
    });

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };


    const handleSubmit = async () => {
        props.setNewProjectThunk(values.name, values.description, values.customer)
        setOpen(false)
    }

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                New Project
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Project</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create a new project. Please indicate the name of the project, description and customer.
                    </DialogContentText><br/>
                    <Box sx={{
                        '& > :not(style)': {width: '100%'},
                    }}>
                        <TextField
                            id="outlined-name"
                            label="project name"
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
                            id="outlined-name"
                            label="customer"
                            value={values.customer}
                            onChange={handleChange('customer')}
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
