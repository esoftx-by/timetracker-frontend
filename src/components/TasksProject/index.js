import React from 'react'
import style from "../../pages/project/Project.module.css";
import {Box, Grid} from "@mui/material";
import OutlinedCardTask from "../Task";

const TasksProject = (props) => {
    return (
        <Box sx={{flexGrow: 1}} className={style.tasks}>
            {props.project && <div>
                <h1>{props.project.name}</h1>
                <div className={style.description}>{props.project.description}</div>
                <div className={style.customer}>{props.project.customer}</div>
            </div>}
            <h2>Project tasks: </h2>
            <Grid container spacing={3}>
                {props.AllTaskByProject ? props.AllTaskByProject.map(task => <OutlinedCardTask
                        allTracks={props.allTracks} key={task.id} userId={props.userId} setNewTrackThunk={props.setNewTrackThunk}
                        tasksProject={task}/>) :
                    <h2>No tasks</h2>}
            </Grid>
        </Box>
    )
}


export default TasksProject
