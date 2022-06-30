import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from "@mui/material/Box";
import {Alert} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import {Formik} from "formik";


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
                    <Formik
                        initialValues={{hours: ''}}
                        validate={values => {
                            const errors = {};
                            if (!values.hours) {
                                errors.hours = 'Required';
                            }
                            return errors;
                        }}
                        onSubmit={(values, {setSubmitting, resetForm}) => {
                            setTimeout(() => {
                                setSubmitting(false);
                                props.setNewTrackThunk(props.userId, props.taskId, Number(values.hours))
                                resetForm()
                                setOpen(false)
                            }, 400);
                        }}
                    >
                        {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              isSubmitting,
                              /* and other goodies */
                          }) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    sx={{
                                        '& > :not(style)': {width: '100%'},
                                    }}>
                                    <TextField
                                        error={errors.hours && touched.hours && 'error'}
                                        type="number"
                                        name="hours"
                                        label="Hours"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.hours}
                                    />
                                </Box>

                                <div style={{'width': '100%', 'margin': ' 1rem auto'}}>{errors.hours && touched.hours &&
                                    <Alert
                                        severity="error">{errors.hours && touched.hours && errors.hours}</Alert>}</div>

                                <Box sx={{
                                    '& > :not(style)': {width: '100%'},
                                }}><Button endIcon={<SendIcon/>} variant="contained" size="large" type="submit"
                                           disabled={isSubmitting}>
                                    Create
                                </Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
