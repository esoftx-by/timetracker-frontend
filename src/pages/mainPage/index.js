import React from 'react'
import ResponsiveAppBar from "../../components/Navbar";
import OutlinedCard from "../../components/TaskCard";
import './mainPage.scss'

const MainPage = () => {
    return <div className="mainPage">
        <ResponsiveAppBar/>
        <div className="mainPage__item">
            <h1>Список задач:</h1>
            <OutlinedCard/>
        </div>
    </div>
}

export default MainPage
