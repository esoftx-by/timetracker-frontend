import React from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import ResponsiveAppBar from "../components/Navbar";
import {UserType} from "../types";
import {privateRoutes, publicRoutes} from "./indexRoutes";

export const useRoutes = (isAuthenticated: boolean, userId: any, userData: UserType | null) => {

    if (isAuthenticated && userData) {
        return (
            <>
                <ResponsiveAppBar/>
                <div className="content">
                    <Routes>
                        {privateRoutes.map(el => <Route path={el.path} element={<el.element/>}/>)}
                        <Route path={`//login`} element={<Navigate to={'/home'}/>}/>
                    </Routes>
                </div>
            </>
        )
    }

    return (
        <>
            <Routes>
                {publicRoutes.map(el => <Route path={el.path} element={<el.element/>}/>)}
                <Route path="/" element={<Navigate to={'/login'} replace/>}/>
            </Routes>
        </>
    )

}
