import React, {FC, useEffect} from 'react'
import {useRoutes} from "./utilities/routes";
import {useAuth} from "./Hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";

import {AppStateType} from "./redux/store";
import {actionsUser} from "./redux/reducers/authReducer";
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {useNavigate} from "react-router-dom";
import {tokenExpiredSelector, userDataSelector} from "./redux/selectors/authSelectors";
import { setUserData } from './redux/reducers/thunk-creators/authThunk';



export const App: FC = () => {

    const {token, login, logout, userId, lastName} = useAuth()

    const userData = useSelector(userDataSelector)
    type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction>;
    const dispatch: AppDispatch = useDispatch()

    const isAuthenticated: boolean = !!token
    const routes = useRoutes(isAuthenticated, userId, userData)

    const tokenExpired = useSelector(tokenExpiredSelector)
    const navigate = useNavigate()

    if (tokenExpired) {
        navigate('/login')
        dispatch(actionsUser.errors(null))
    }

    useEffect(() => {

        if (userId) {
            dispatch(setUserData(userId))
        }
    }, [userId, token])


    return (
        <AuthContext.Provider value={{
            token, login, logout, isAuthenticated, userId, lastName
        }}>
            <div className="App">
                {routes}
            </div>
        </AuthContext.Provider>
    );
}

