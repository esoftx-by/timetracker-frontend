import React from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import './Login.scss'
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


const LoginForm = () => {

    const [values, setValues] = React.useState({
        name: '',
        password: '',
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

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = () => {
        console.log(values)
    }

    return (
        <div className="login">
            <Card sx={{minWidth: 275}}>
                <h1>Log In</h1>
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
                            label="Name"
                            value={values.name}
                            onChange={handleChange('name')}
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
                        <Button variant="contained" size="large" onClick={handleSubmit} endIcon={<SendIcon/>}>
                            Send
                        </Button>
                    </Box>
                </CardContent>
                <div className="login__registration">
                    <NavLink to='/registration'>Sign Up</NavLink>
                </div>
            </Card>
        </div>
    )
}

export default LoginForm
