import React, {useState} from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
    Alert,
    Box,
    Button,
    TextField
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import {NavLink} from "react-router-dom";
import './Registration.scss'
import {AuthAPI} from "../../API/api";
import {Formik} from "formik";

const RegistrationForm = () => {

    const [isSent, setIsSent] = useState(false)

    return (
        <div className="registration">
            <Card sx={{minWidth: 275}}>
                <h1>Sign Up</h1>
                <Formik
                    initialValues={{firstName: '', lastName: '', email: '', password: ''}}
                    validate={values => {
                        const errors = {};
                        if (!values.firstName) {
                            errors.firstName = 'Required'
                        }
                        if (!values.lastName) {
                            errors.lastName = 'Required'
                        }
                        if (!values.lastName) {
                            errors.lastName = 'Required'
                        }
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        if (!values.password) {
                            errors.password = 'Required'
                        }
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting, resetForm}) => {
                        setTimeout(() => {
                            setSubmitting(false);
                            AuthAPI.newUser((values.email), (values.firstName), (values.lastName), (values.password))
                                .then(response => {
                                    if (response.data.success){
                                        setIsSent(true)
                                    }
                                })
                            resetForm()
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
                                    '& > :not(style)': {m: 1, width: '30ch'},
                                }}>
                                <TextField
                                    error={errors.firstName && touched.firstName && 'error'}
                                    type="text"
                                    name="firstName"
                                    label="FirstName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.firstName}
                                />
                            </Box>
                            <div style={{'width': '30ch', 'margin': '0 auto'}}>{errors.firstName && touched.firstName &&
                                <Alert severity="error">{errors.firstName && touched.firstName && errors.firstName}</Alert>}</div>
                            <Box
                                sx={{
                                    '& > :not(style)': {m: 1, width: '30ch'},
                                }}>
                                <TextField
                                    error={errors.lastName && touched.lastName && 'error'}
                                    type="text"
                                    name="lastName"
                                    label="LastName"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.lastName}
                                />
                            </Box>
                            <div style={{'width': '30ch', 'margin': '0 auto'}}>{errors.lastName && touched.lastName &&
                                <Alert severity="error">{errors.lastName && touched.lastName && errors.lastName}</Alert>}</div>
                            <Box
                                sx={{
                                    '& > :not(style)': {m: 1, width: '30ch'},
                                }}>
                                <TextField
                                    error={errors.email && touched.email && 'error'}
                                    type="email"
                                    name="email"
                                    label="E-mail"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                            </Box>

                            <div style={{'width': '30ch', 'margin': '0 auto'}}>{errors.email && touched.email &&
                                <Alert severity="error">{errors.email && touched.email && errors.email}</Alert>}</div>
                            <Box sx={{
                                '& > :not(style)': {m: 1, width: '30ch'},
                            }}>
                                <TextField
                                    error={errors.password && touched.password && 'error'}
                                    type="password"
                                    name="password"
                                    label="Password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                            </Box>

                            <div style={{'width': '30ch', 'margin': '0 auto'}}>{errors.password && touched.password &&
                                <Alert
                                    severity="error">{errors.password && touched.password && errors.password}</Alert>}</div>

                            <Box sx={{
                                '& > :not(style)': {m: 1, width: '30ch'},
                            }}><Button endIcon={<SendIcon/>} variant="contained" size="large" type="submit"
                                       disabled={isSubmitting}>
                                Send
                            </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
                <div className="registration__registration">
                    <NavLink to='/login'>Sign In</NavLink>
                </div>
                {isSent &&  <div style={{'width': '30ch', 'margin': '1rem auto'}}><Alert severity="success">User created. Return to login page.</Alert></div>}
            </Card>
        </div>
    )
}

export default RegistrationForm
