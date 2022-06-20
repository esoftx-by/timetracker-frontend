import React from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import MainPage from "../pages/mainPage";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import {Container} from "@mui/material";
import Projects from "../pages/projects/projects";
import ResponsiveAppBar from "../components/Navbar";
import Project from "../pages/project";



export const useRoutes = (isAuthenticated, userId, props) => {
    debugger
    if (isAuthenticated && props.lastName) {
        return (
            <>
                <ResponsiveAppBar user={props}/>
                <Routes>
                    <Route exact path={'/login'} element={<Navigate to={'/' + userId + '-' + props.lastName}/>}/>
                    <Route exact path={'/' + userId + '-' + props.lastName} element={<MainPage userId = {userId}/>}/>
                    <Route exact path={'/projects/'} element={<Projects/>}/>
                    <Route exact path={'/projects/:id'} element={<Project/>}/>
                </Routes>
                {/*<SpeedDialTooltipOpen/>*/}
            </>
        )
    }
    return (
            <Container maxWidth="sm">
                <Routes>
                    <Route exact path="/" element={<Navigate to={'/login'} replace/>}/>
                    <Route exact path="/login" element={<LoginForm/>}/>
                    <Route exact path="/registration" element={<RegistrationForm/>}/>
                </Routes>
            </Container>
        )

}
