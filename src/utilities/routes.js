import React from 'react'
import {Navigate, NavLink, Route, Routes} from "react-router-dom";
import MainPage from "../pages/mainPage";
import LoginForm from "../components/LoginForm";
import {Container} from "@mui/material";
import Projects from "../pages/projects/projects";
import ResponsiveAppBar from "../components/Navbar";
import Project from "../pages/project";


export const useRoutes = (isAuthenticated, userId, props, deleteUser) => {


    if (isAuthenticated && props.lastName) {

        return (
            <>
                <ResponsiveAppBar deleteUser={deleteUser} user={props}/>
                <Routes>
                    <Route exact path={'/*'} element={<Navigate to={'/' + userId + '-' + props.lastName}/>}/>
                    <Route exact path={'/' + userId + '-' + props.lastName} element={<MainPage user={props} userId={userId}/>}/>
                    <Route exact path={'/projects'} element={<Projects/>}/>
                    <Route exact path={'/projects/:id'} element={<Project/>}/>
                    <Route path="*" element={<div>Page not found<br/><NavLink to={'/'}>MainPage</NavLink></div>} />
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
            </Routes>
        </Container>
    )

}
