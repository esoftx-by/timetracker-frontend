import React, {FC, useState} from 'react';
import ModalWindow from "../Modal";
import MenuItem from "@mui/material/MenuItem";
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import {ProjectType} from "../../types";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {Alert} from "@mui/material";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import {Formik} from "formik";
import {UpdateProjectThunk} from "../../redux/reducers/thunk-creators/projectThunk";
import {AppDispatch} from "../../redux/store";
import {useDispatch} from "react-redux";


type OwnToProps = {
    project: ProjectType
}

const UpdateProject: FC<OwnToProps> = ({project}) => {

    const [open, setOpen] = useState(false)

    const {id, description, name, customer} = project

    const dispatch: AppDispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <ModalWindow
            title={'Update Project'}
            description={'Editing a project. Change data or click cancel.'}
            open={open}
            setOpen={setOpen} buttonComponent={
            <MenuItem onClick={handleClickOpen} disableRipple>
                <AccountTreeRoundedIcon/>
                Update Project
            </MenuItem>
        }>
            <Formik
                initialValues={{name: name, description: description, customer: customer}}
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
                        dispatch(UpdateProjectThunk(id, values.name, values.description, values.customer))
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
                                '& > :not(style)': {width: '100%', margin: '.5rem 0 0'},
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
                                error={!!(errors.customer && touched.customer)}
                                type="text"
                                name="customer"
                                label="Customer"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.customer}
                            />
                        </Box>

                        <div style={{
                            'width': '100%',
                            'margin': ' 1rem auto'
                        }}>{errors.customer && touched.customer &&
                            <Alert
                                severity="error">{errors.customer && touched.customer && errors.customer}</Alert>}</div>
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
    );
};


export default UpdateProject;
