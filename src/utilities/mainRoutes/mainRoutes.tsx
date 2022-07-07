import React, {FC, lazy, Suspense} from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import CircularIndeterminate from "../../components/Loader";

const LoginForm = lazy(() => import('../../components/LoginForm'))

const MainRoutes: FC<{}> = () => {
    return (
        <Suspense fallback={<CircularIndeterminate/>}>
            <Routes>
                <Route path="/" element={<Navigate to={'/login'} replace/>}/>
                <Route path="/login" element={<LoginForm/>}/>
            </Routes>
        </Suspense>
    )
}

export default MainRoutes
