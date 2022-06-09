import React from 'react'
import {useRoutes} from "./utilities/routes";


function App() {

    const isAuthenticated = true
    const routes = useRoutes(isAuthenticated)

    return (
        <div className="App">
            {routes}
        </div>
    );
}

export default App;
