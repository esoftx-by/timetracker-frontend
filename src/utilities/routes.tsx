import React from 'react'
import {Navigate, NavLink, Route, Routes} from "react-router-dom";
import MainPage from "../pages/mainPage";
import LoginForm from "../components/LoginForm";
import {Container} from "@mui/material";
import Projects from "../pages/projects/projects";
import ResponsiveAppBar from "../components/Navbar";
import Project from "../pages/project";
import {userType} from "../types";


export const useRoutes = (isAuthenticated: boolean, userId: any, userData: userType | null, deleteUser: () => void) => {

    if (isAuthenticated && userData) {
        return (
            <>
                <ResponsiveAppBar deleteUser={deleteUser} user={userData}/>
                <Routes>
                    <Route path={'/*'} element={<Navigate to={userData ? '/' + userId + '-' + userData.lastName : '/'}/>}/>
                    <Route path={userData ? '/' + userId + '-' + userData.lastName : '/'} element={<MainPage user={userData} userId={userId}/>}/>
                    <Route path={'/projects'} element={<Projects user={userData}/>}/>
                    <Route path={'/projects/:id'} element={<Project userId={userId}/>}/>
                    <Route path="*" element={<div>Page not found<br/><NavLink to={'/'}>MainPage</NavLink></div>} />
                </Routes>
                {/*<SpeedDialTooltipOpen/>*/}
            </>
        )
    }
    return (
        <Container maxWidth="sm">
            <Routes>
                <Route path="/" element={<Navigate to={'/login'} replace/>}/>
                <Route path="/login" element={<LoginForm/>}/>
            </Routes>
        </Container>
    )

}
