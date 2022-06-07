import React from 'react'
import {Routes, Route} from "react-router-dom";
import AuthPage from "./pages/authPage";
import MainPage from "./pages/mainPage";


function App() {

    const isAuthenticated = true

    return (
        <div className="App">
            <Routes>
                <Route path={'/*'} element={<AuthPage isAuthenticated={isAuthenticated}/>}/>
                {isAuthenticated &&
                    <Route exact path={'/mainPage'} element={<MainPage/>}/>
                }
            </Routes>
        </div>
    );
}

export default App;
