import React from 'react'
import style from "../../pages/project/Project.module.css";
import {Box, Grid} from "@mui/material";
import OutlinedCardTask from "../Task";

const TasksProject = ({project, AllTaskByProject, userId, setNewTrackThunk, allTracks}) => {

    return (
        <Box sx={{flexGrow: 1}} className={style.tasks}>
            {project && <div>
                <h1>{project.name}</h1>
                <div className={style.description}>{project.description}</div>
                <div className={style.customer}>{project.customer}</div>
            </div>}
            <h2>Project tasks: </h2>
            <Grid container spacing={3}>
                {AllTaskByProject ? AllTaskByProject.map(task => <OutlinedCardTask
                        allTracks={allTracks} key={task.id} userId={userId} setNewTrackThunk={setNewTrackThunk}
                        tasksProject={task}/>) :
                    <h2>No tasks</h2>}
            </Grid>
        </Box>
    )
}


export default TasksProject
