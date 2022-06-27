import React from 'react'
import style from "../../pages/project/Project.module.css";
import {Box, Grid} from "@mui/material";
import OutlinedCardTask from "../Task";

const TasksProject = (props) => {
    return (
        <Box sx={{flexGrow: 1}} className={style.tasks}>
            {props.project ? <div>
                <h2 style={{'word-break': 'break-all'}}>{props.project.name}</h2>
                <div>{props.project.description}</div>
                <div>{props.project.customer}</div>
            </div> : <div></div>}
            <h1>Project tasks: </h1>
            <Grid container spacing={3}>
                {props.AllTaskByProject ? props.AllTaskByProject.map(task => <OutlinedCardTask
                        allTracks={props.allTracks} userId={props.userId} setNewTrackThunk={props.setNewTrackThunk}
                        tasksProject={task}/>) :
                    <h2>No tasks</h2>}
            </Grid>
        </Box>
    )
}


export default TasksProject
