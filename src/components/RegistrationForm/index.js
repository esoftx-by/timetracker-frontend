import React from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import {NavLink} from "react-router-dom";
import './Registration.scss'
import {AuthAPI} from "../../API/api";

const RegistrationForm = () => {

    const [values, setValues] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: '',
        repeatShowPassword: false,
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const repeatHandleClickShowPassword = () => {
        setValues({
            ...values,
            repeatShowPassword: !values.repeatShowPassword,
        });
    };

    const handleSubmit = () => {
        AuthAPI.newUser(values.email, values.firstName, values.lastName, values.password)
    }


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className="registration">
            <Card sx={{minWidth: 275}}>
                <h1>Sign Up</h1>
                <CardContent>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': {m: 1, width: '30ch'},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="outlined-name"
                            label="First Name"
                            value={values.firstName}
                            onChange={handleChange('firstName')}
                        />
                        <TextField
                            id="outlined-name"
                            label="Last Name"
                            value={values.lastName}
                            onChange={handleChange('lastName')}
                        />
                        <TextField
                            id="outlined-name"
                            label="Email"
                            value={values.email}
                            onChange={handleChange('email')}
                        />
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Repeat Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.repeatShowPassword ? 'text' : 'password'}
                                value={values.repeatPassword}
                                onChange={handleChange('repeatPassword')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={repeatHandleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.repeatShowPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Repeat Password"
                            />
                        </FormControl>
                        <Button variant="contained" size="large" onClick={handleSubmit} endIcon={<SendIcon/>}>
                            Send
                        </Button>
                    </Box>
                </CardContent>
                <div className="registration__registration">
                    <NavLink to='/login'>Sign In</NavLink>
                </div>
            </Card>
        </div>
    )
}

export default RegistrationForm
