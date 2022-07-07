import React, {FC, useEffect} from 'react'
import {useRoutes} from "./utilities/routes";
import {useAuth} from "./Hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {connect} from "react-redux";
import {deleteUser, setUserData} from "./redux/reducers/authReducer";
import {userType} from "./types";
import {AppStateType} from "./redux/store";


type TStateProps = {
    userData: userType | null
}

type TDispatchProps = {
    setUserData: (userId: number) => void
    deleteUser: () => void
}

type OwnToProps = {}

type PropsType = TStateProps & TDispatchProps & OwnToProps


const App: FC<PropsType> = (props) => {

    const {token, login, logout, userId, lastName} = useAuth()
    const isAuthenticated: boolean = !!token
    const routes = useRoutes(isAuthenticated, userId, props.userData, props.deleteUser)

    useEffect(() => {

        if (userId) {
            props.setUserData(userId)
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

let mapStateToProps = (state: AppStateType): TStateProps => ({
    userData: state.auth.user
})

export default connect<TStateProps, TDispatchProps, OwnToProps, AppStateType>(mapStateToProps, {
    setUserData,
    deleteUser
})(App);
