import React from 'react'
import {useRoutes} from "./utilities/routes";
import {useAuth} from "./Hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";


function App() {


    const {token, login, logout, userId} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)
debugger
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

export default App;
