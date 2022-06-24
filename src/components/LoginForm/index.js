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
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {AuthAPI} from "../../API/api";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Formik} from "formik";

const LoginForm = (props) => {

    const auth = useContext(AuthContext)

    return (
        <div className="login">
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
                    <NavLink to='/registration'>Sign Up</NavLink>
                    <ToastContainer/>
                </div>
            </Card>
            {/*<Card sx={{minWidth: 275}}>*/}
            {/*    <h1>Log In</h1>*/}
            {/*    <CardContent>*/}
            {/*        <Box*/}
            {/*            component="form"*/}
            {/*            sx={{*/}
            {/*                '& > :not(style)': {m: 1, width: '30ch'},*/}
            {/*            }}*/}
            {/*            noValidate*/}
            {/*            autoComplete="off"*/}
            {/*        >*/}
            {/*            <TextField*/}
            {/*                id="outlined-name"*/}
            {/*                label="E-mail"*/}
            {/*                value={values.email}*/}
            {/*                onChange={handleChange('email')}*/}
            {/*            />*/}
            {/*            <FormControl variant="outlined">*/}
            {/*                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>*/}
            {/*                <OutlinedInput*/}
            {/*                    id="outlined-adornment-password"*/}
            {/*                    type={values.showPassword ? 'text' : 'password'}*/}
            {/*                    value={values.password}*/}
            {/*                    onChange={handleChange('password')}*/}
            {/*                    endAdornment={*/}
            {/*                        <InputAdornment position="end">*/}
            {/*                            <IconButton*/}
            {/*                                aria-label="toggle password visibility"*/}
            {/*                                onClick={handleClickShowPassword}*/}
            {/*                                onMouseDown={handleMouseDownPassword}*/}
            {/*                                edge="end"*/}
            {/*                            >*/}
            {/*                                {values.showPassword ? <VisibilityOff/> : <Visibility/>}*/}
            {/*                            </IconButton>*/}
            {/*                        </InputAdornment>*/}
            {/*                    }*/}
            {/*                    label="Password"*/}
            {/*                />*/}
            {/*            </FormControl>*/}
            {/*            <Button variant="contained" size="large" onClick={handleSubmit} endIcon={<SendIcon/>}>*/}
            {/*                Send*/}
            {/*            </Button>*/}
            {/*        </Box>*/}
            {/*    </CardContent>*/}
            {/*    <div className="login__registration">*/}
            {/*        <NavLink to='/registration'>Sign Up</NavLink>*/}
            {/*        <ToastContainer/>*/}
            {/*    </div>*/}
            {/*</Card>*/}
            {/*<Basic/>*/}
        </div>
    )
}


export default LoginForm
