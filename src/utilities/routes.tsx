import React, {lazy, Suspense} from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import MainPage from "../pages/mainPage";
import {Container} from "@mui/material";
import Projects from "../pages/projects/projects";
import ResponsiveAppBar from "../components/Navbar";
import Project from "../pages/project";
import {userType} from "../types";
import CircularIndeterminate from "../components/Loader";
import NotFoundPage from "../pages/notFoundPage";

let MainRoutes = lazy(() => import('./mainRoutes/mainRoutes'))

export const useRoutes = (isAuthenticated: boolean, userId: any, userData: userType | null, deleteUser: () => void) => {

    if (isAuthenticated && userData) {
        return (
            <>
                <ResponsiveAppBar deleteUser={deleteUser} user={userData}/>
                <Routes>
                    <Route path={'/login'} element={<Navigate to={'/home'}/>}/>
                    <Route path={'/home'} element={<MainPage user={userData} userId={userId}/>}/>
                    <Route path={'/projects'} element={<Projects user={userData}/>}/>
                    <Route path={'/projects/:id'} element={<Project userId={userId}/>}/>
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
