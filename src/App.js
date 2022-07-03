import React, {useEffect} from 'react'
import {useRoutes} from "./utilities/routes";
import {useAuth} from "./Hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {connect} from "react-redux";
import {deleteUser, setUserData} from "./redux/reducers/authReducer";
import {useNavigate} from "react-router-dom";



function App(props) {

    const {token, login, logout, userId, lastName} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated, userId, props.userData, props.deleteUser)

    useEffect(() => {
        {userId && props.setUserData(userId)}
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

let mapStateToProps = (state) => ({
    userData: state.auth.user
})

export default connect(mapStateToProps, {setUserData, deleteUser})(App);
