import React, {useContext} from 'react'
import Card from "@mui/material/Card";
import './Login.scss'
import {
    Alert,
    Box,
    Button,
    TextField
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import {NavLink, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {AuthAPI} from "../../API/api";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Formik} from "formik";
import {Helmet} from "react-helmet";

const LoginForm = (props) => {

    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    return (
        <div className="login">
            <Helmet>
                <title>login</title>
            </Helmet>
            <Card sx={{minWidth: 275}}>
                <h1>Log In</h1>
                <Formik
                    initialValues={{email: '', password: ''}}
                    validate={values => {
                        const errors = {};
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
                            AuthAPI.auth((values.email), (values.password))
                                .then(response => {
                                    if (response.data.token) {
                                        auth.login(response.data.token, response.data.user.id, response.data.user.lastName)
                                        navigate('/')
                                    } else {
                                        toast.error(response.data.response.message, {
                                            position: "top-right",
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                        });
                                    }
                                })
                            setSubmitting(false);
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
                <div className="login__registration">
                    {/*<NavLink to='/registration'>Sign Up</NavLink>*/}
                    <ToastContainer/>
                </div>
            </Card>
        </div>
    )
}


export default LoginForm
