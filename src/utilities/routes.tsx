import React, {lazy, Suspense} from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import {MainPage} from "../pages/mainPage";
import {Container} from "@mui/material";
import {Projects} from "../pages/projects/projects";
import ResponsiveAppBar from "../components/Navbar";
import {ProjectContainer} from "../pages/project";
import {UserType} from "../types";
import CircularIndeterminate from "../components/Loader";
import NotFoundPage from "../pages/notFoundPage";
import {TaskPage} from "../pages/taskPage";
import SettingsPage from "../pages/settingsPage";

let MainRoutes = lazy(() => import('./mainRoutes/mainRoutes'))

export const useRoutes = (isAuthenticated: boolean, userId: any, userData: UserType | null) => {

    if (isAuthenticated && userData) {
        return (
            <>
                <ResponsiveAppBar user={userData}/>
                <Routes>
                    <Route path={`//login`} element={<Navigate to={'/home'}/>}/>
                    <Route path={'/home'} element={<MainPage user={userData} userId={userId}/>}/>
                    <Route path={'/projects'} element={<Projects user={userData}/>}/>
                    <Route path={'/projects/:id'} element={<ProjectContainer userId={userId}/>}/>
                    <Route path={'/task/:id'} element={<TaskPage/>}/>
                    <Route path={'/settings'} element={<SettingsPage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </>
        )
    }

    return (
        <Container maxWidth="sm">
            <Suspense fallback={<CircularIndeterminate/>}>
                <MainRoutes/>
            </Suspense>
        </Container>
    )

}
