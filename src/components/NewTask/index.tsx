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
import {ThunkDispatch} from "redux-thunk";
import {AppStateType} from "../../redux/store";
import {AnyAction} from "redux";
import {useDispatch} from "react-redux";
import {setNewTaskThunk} from "../../redux/reducers/taskReducer";

type OwnToProps = {
    userId: number
    projectId: number
}

const FormDialogTask: FC<OwnToProps> = ({userId, projectId}) => {

    type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction>;
    const dispatch: AppDispatch = useDispatch()

    const [open, setOpen] = React.useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                New Task
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create a new task. Please indicate the name of the task, description and estimated hours.
                    </DialogContentText><br/>
                    <Formik
                        initialValues={{name: '', description: '', estimatedHours: ''}}
                        validate={values => {
                            const errors: any = {};
                            if (!values.name) {
                                errors.name = 'Required';
                            }
                            if (!values.description) {
                                errors.description = 'Required'
                            }
                            if (!values.estimatedHours) {
                                errors.estimatedHours = 'Required'
                            }
                            return errors;
                        }}
                        onSubmit={(values, {setSubmitting, resetForm}) => {
                            setTimeout(() => {
                                setSubmitting(false);
                                dispatch(setNewTaskThunk((values.name), (values.description), (+(values.estimatedHours)), userId, projectId))
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
                                        error={!!(errors.name && touched.name)}
                                        type="text"
                                        name="name"
                                        label="Name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                    />
                                </Box>

                                <div style={{'width': '100%', 'margin': ' 1rem auto'}}>{errors.name && touched.name &&
                                    <Alert severity="error">{errors.name && touched.name && errors.name}</Alert>}</div>
                                <Box sx={{
                                    '& > :not(style)': {width: '100%'},
                                }}>
                                    <TextField
                                        error={!!(errors.description && touched.description)}
                                        type="text"
                                        name="description"
                                        label="Description"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.description}
                                    />
                                </Box>

                                <div style={{
                                    'width': '100%',
                                    'margin': ' 1rem auto'
                                }}>{errors.description && touched.description &&
                                    <Alert
                                        severity="error">{errors.description && touched.description && errors.description}</Alert>}</div>

                                <Box
                                    sx={{
                                        '& > :not(style)': {width: '100%'},
                                    }}>
                                    <TextField
                                        error={!!(errors.estimatedHours && touched.estimatedHours)}
                                        type="number"
                                        name="estimatedHours"
                                        label="Estimated Hours"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.estimatedHours}
                                    />
                                </Box>

                                <div style={{
                                    'width': '100%',
                                    'margin': ' 1rem auto'
                                }}>{errors.estimatedHours && touched.estimatedHours &&
                                    <Alert
                                        severity="error">{errors.estimatedHours && touched.estimatedHours && errors.estimatedHours}</Alert>}</div>
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

export default FormDialogTask
