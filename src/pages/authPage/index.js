import React from 'react'
import './authPage.scss'
import {Routes, Route, Navigate} from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import RegistrationForm from "../../components/RegistrationForm";
import {Container} from "@mui/material";

const AuthPage = ({isAuthenticated}) => {
    if (!isAuthenticated) {
        return (
            <Container maxWidth="sm">
                <Routes>
                    <Route exact path="/" element={<Navigate to={'/login'} replace/>}/>
                    <Route exact path="/mainPage" element={<Navigate to='/login' replace/>}/>
                    <Route exact path="/login" element={<LoginForm/>}/>
                    <Route exact path="/registation" element={<RegistrationForm/>}/>
                </Routes>
            </Container>
        )
    } else {
        return <Navigate to={'/mainPage'}/>
    }

}

export default AuthPage
