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
import {setNewProjectThunk} from "../../redux/reducers/projectsReducer";




const FormDialog:FC = () => {

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
                New Project
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Project</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Create a new project. Please indicate the name of the project, description and customer.
                    </DialogContentText><br/>
                    <Formik
                        initialValues={{name: '', description: '', customer: ''}}
                        validate={values => {
                            const errors: any = {};
                            if (!values.name) {
                                errors.name = 'Required';
                            }
                            if (!values.description) {
                                errors.description = 'Required'
                            }
                            if (!values.customer) {
                                errors.customer = 'Required'
                            }
                            return errors;
                        }}
                        onSubmit={(values, {setSubmitting, resetForm}) => {
                            setTimeout(() => {
                                setSubmitting(false);
                                dispatch(setNewProjectThunk((values.name), (values.description), (values.customer)))
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

                                <div style={{'width': '100%', 'margin':' 1rem auto'}}>{errors.name && touched.name &&
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

                                <div style={{'width': '100%', 'margin':' 1rem auto'}}>{errors.description && touched.description &&
                                    <Alert
                                        severity="error">{errors.description && touched.description && errors.description}</Alert>}</div>

                                <Box
                                    sx={{
                                        '& > :not(style)': {width: '100%'},
                                    }}>
                                    <TextField
                                        error={!!(errors.customer && touched.customer)}
                                        type="text"
                                        name="customer"
                                        label="Customer"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.customer}
                                    />
                                </Box>

                                <div style={{'width': '100%', 'margin':' 1rem auto'}}>{errors.customer && touched.customer &&
                                    <Alert severity="error">{errors.customer && touched.customer && errors.customer}</Alert>}</div>
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

export default FormDialog
