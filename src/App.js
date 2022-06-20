import React, {useEffect} from 'react'
import {useRoutes} from "./utilities/routes";
import {useAuth} from "./Hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {connect} from "react-redux";
import {setUserData} from "./redux/reducers/authReducer";



function App(props) {

    const {token, login, logout, userId} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated, userId, props.userData)
    useEffect(() => {
        {
            userId && props.setUserData(userId)
        }
    }, [userId])
    return (
        <AuthContext.Provider value={{
            token, login, logout, isAuthenticated, userId
        }}>
            <div className="App">
                {routes}
            </div>
        </AuthContext.Provider>
    );
}

let mapStateToProps = (state) => ({
    userData: state.auth.user
})

export default connect(mapStateToProps, {setUserData})(App);
