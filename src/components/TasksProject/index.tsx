import React, {FC} from 'react'
// @ts-ignore
import style from "../../pages/project/Project.module.css";
import {Box, Grid} from "@mui/material";
import OutlinedCardTask from "../Task";
import {allTasksProjectType, allTracksByProjectIdType, projectType} from "../../types";


type OwnToProps = {
    project: projectType | null
    AllTaskByProject: Array<allTasksProjectType>
    userId: number
    setNewTrackThunk: (userId: number, taskId: number, startTime: number, hours: number) => void
    allTracks: Array<allTracksByProjectIdType>
}


const TasksProject: FC<OwnToProps> = ({project, AllTaskByProject, userId, setNewTrackThunk, allTracks}) => {

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
