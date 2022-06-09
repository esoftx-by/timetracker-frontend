import React from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import MainPage from "../pages/mainPage";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import {Container} from "@mui/material";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route exact path={'/login'} element={<Navigate to={'/'}/>}/>
                <Route exact path={'/*'} element={<MainPage/>}/>
            </Routes>
        )
    }
    return (
        <Container maxWidth="sm">
            <Routes>
                <Route exact path="/*" element={<Navigate to={'/login'} replace/>}/>
                <Route exact path="/login" element={<LoginForm/>}/>
                <Route exact path="/registration" element={<RegistrationForm/>}/>
            </Routes>
        </Container>
    )
}
