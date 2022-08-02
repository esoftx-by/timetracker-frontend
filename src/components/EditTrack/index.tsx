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
import {AppDispatch} from "../../redux/store";
import {useDispatch} from "react-redux";
import {updateTrackThunk} from "../../redux/reducers/trackReducer";

type OwnToProps = {
    id: number
}

const UpdateTrack: FC<OwnToProps> = ({id}) => {

    const [open, setOpen] = React.useState<boolean>(false);

    const dispatch: AppDispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Edit Track
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit track</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit track. Please indicate the time.
                    </DialogContentText><br/>
                    <Formik
                        initialValues={{dateStart: '', dateEnd: ''}}
                        validate={values => {

                            const errors: any = {};
                            if (!values.dateStart) {
                                errors.dateStart = 'Required';
                            }
                            if (!values.dateEnd) {
                                errors.dateEnd = 'Required';
                            }

                            return errors;
                        }}
                        onSubmit={(values, {setSubmitting, resetForm}) => {
                            setTimeout(() => {
                                setSubmitting(false);
                                // @ts-ignore
                                let gmt = new Date().toString().match(/([-\+][0-9]+)\s/)[1]
                                let gmtFirst = gmt.slice(0, 3)
                                let gmtSecond = gmt.slice(3, 5)
                                dispatch(updateTrackThunk(id, values.dateStart + gmtFirst + ':' + gmtSecond, values.dateEnd + gmtFirst + ':' + gmtSecond))
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
                                        error={!!(errors.dateStart && touched.dateStart)}
                                        id="datetime-local"
                                        label="Next appointment"
                                        type="datetime-local"
                                        name="dateStart"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        sx={{width: 250}}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Box>
                                <div style={{
                                    'width': '100%',
                                    'margin': ' 1rem auto'
                                }}>{errors.dateStart && touched.dateStart &&
                                    <Alert
                                        severity="error">{errors.dateStart && touched.dateStart && errors.dateStart}</Alert>}</div>

                                <Box sx={{
                                    '& > :not(style)': {width: '100%'},
                                }}>
                                    <TextField
                                        error={!!(errors.dateEnd && touched.dateEnd)}
                                        id="datetime-local"
                                        label="Next appointment"
                                        type="datetime-local"
                                        name="dateEnd"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        sx={{width: 250}}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Box>
                                <div style={{
                                    'width': '100%',
                                    'margin': ' 1rem auto'
                                }}>{errors.dateEnd && touched.dateEnd &&
                                    <Alert
                                        severity="error">{errors.dateEnd && touched.dateEnd && errors.dateEnd}</Alert>}</div>
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

export default UpdateTrack
