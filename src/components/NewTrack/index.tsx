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
import {FC} from "react";

type OwnToProps = {
    userId: number
    taskId: number
    setNewTrackThunk: (userId: number, taskId: number, startTime: string, hours: number) => void
}

const FormDialogTrack: FC<OwnToProps> = ({userId, taskId, setNewTrackThunk}) => {

    const [open, setOpen] = React.useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                        initialValues={{date: '', hours: ''}}
                        validate={values => {

                            const errors: any = {};
                            if (!values.date) {
                                errors.date = 'Required';
                            }
                            if (!values.hours) {
                                errors.hours = 'Required';
                            }

                            if (values.hours && +(values.hours) > 0 && +(values.hours) < 24) {
                                return errors;
                            } else if (!errors.hours) {
                                errors.hours = 'Enter a number within (0, 24) range';
                            }

                            return errors;
                        }}
                        onSubmit={(values, {setSubmitting, resetForm}) => {
                            setTimeout(() => {
                                setSubmitting(false);
                                // @ts-ignore
                                let gmt = new Date().toString().match(/([-\+][0-9]+)\s/)[1]
                                let gmtFirst = gmt.slice(0, 3)
                                let gmtSecond = gmt.slice(2, 4)
                                setNewTrackThunk(userId, taskId, values.date + gmtFirst + ':' + gmtSecond, Number(values.hours))
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

                                <Box sx={{
                                    '& > :not(style)': {width: '100%'},
                                }}>
                                    <TextField
                                        error={!!(errors.date && touched.date)}
                                        id="datetime-local"
                                        label="Next appointment"
                                        type="datetime-local"
                                        name="date"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        sx={{width: 250}}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Box>
                                <div style={{'width': '100%', 'margin': ' 1rem auto'}}>{errors.date && touched.date &&
                                    <Alert
                                        severity="error">{errors.date && touched.date && errors.date}</Alert>}</div>
                                <Box
                                    sx={{
                                        '& > :not(style)': {width: '100%'},
                                    }}>
                                    <TextField
                                        error={!!(errors.hours && touched.hours)}
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

export default FormDialogTrack
