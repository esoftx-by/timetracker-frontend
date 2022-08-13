import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import {Alert} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import {Formik} from "formik";
import {FC} from "react";
import {AppDispatch} from "../../redux/store";
import {useDispatch} from "react-redux";
import {setNewTrackThunk} from "../../redux/reducers/thunk-creators/trackThunk";
import Utilities from "../../utilities";
import ModalWindow from "../Modal";

type OwnToProps = {
    userId: number | null
    taskId: number
}

const FormDialogTrack: FC<OwnToProps> = ({userId, taskId}) => {

    const [open, setOpen] = React.useState<boolean>(false);

    const dispatch: AppDispatch = useDispatch()

    return (
        <div>
            <ModalWindow btnName="Add Track"
                         description="Create a new track. Please indicate the time."
                         btnType="contained"
                         title="New Track"
                         open={open}
                         setOpen={setOpen}>
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
                            dispatch(setNewTrackThunk(userId as number, taskId, Utilities.formatDateTime(values.date), Number(values.hours)))
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
            </ModalWindow>
        </div>
    );
}

export default FormDialogTrack
