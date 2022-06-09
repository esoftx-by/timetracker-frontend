import React from 'react'
import ResponsiveAppBar from "../../components/Navbar";
import OutlinedCard from "../../components/TaskCard";
import './mainPage.scss'
import {Grid} from "@mui/material";
import Box from "@mui/material/Box";

const MainPage = () => {

    let tasks = [
        {
            taskNumber: '1',
            taskName: 'Fixed',
            projectName: 'e-arenda',
            description: 'bla  bla bla'
        },
        {
            taskNumber: '2',
            taskName: 'Refactoring',
            projectName: 'chat',
            description: 'bla  bla bla'
        },
        {
            taskNumber: '3',
            taskName: 'add func',
            projectName: 'bank',
            description: 'bla  bla bla'
        },
    ]

    return <div className="mainPage">
        <ResponsiveAppBar/>
        <div className="mainPage__item">
            <h1>Список задач:</h1>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={3}>
                    {tasks && tasks.map(data => <OutlinedCard data={data}/>)}
                </Grid>
            </Box>
        </div>
    </div>
}

export default MainPage
