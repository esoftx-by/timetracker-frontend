import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from "@mui/material/Box";


export default function FormDialogTrack(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [values, setValues] = React.useState({
        hours: ''
    });

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };


    const handleSubmit = async () => {
        props.setNewTrackThunk(props.userId, props.taskId, parseInt(values.hours))
        //console.log(props.userId, props.taskId, parseInt(values.hours))
        setOpen(false)
    }

    return (
        <div>
            <Button style={{margin: '1rem 0 0 0'}} variant="contained" onClick={handleClickOpen}>
                Add Track
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Track</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create a new track. Please indicate the time.
                    </DialogContentText><br/>
                    <Box sx={{
                        '& > :not(style)': {width: '100%'},
                    }}>
                        <TextField
                            type={"number"}
                            id="outlined-name"
                            label="hours"
                            value={values.hours}
                            onChange={handleChange('hours')}
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
