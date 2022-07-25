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
    allTracksByProjectId: Array<allTracksByProjectIdType>
}


const TasksProject: FC<OwnToProps> = ({project, AllTaskByProject, userId, allTracksByProjectId}) => {

    const STATUS_ORDER = {
        LONG_TERM: 0,
        OPEN: 1,
        IN_PROGRESS: 2,
        IN_TESTING: 3,
        IN_REVIEW: 4,
        FINISHED: 5,
        CANCELLED: 6
    }
    // @ts-ignore
    const comparator = (t1: allTasksProjectType, t2: allTasksProjectType): number => STATUS_ORDER[t1.status] - STATUS_ORDER[t2.status];

    return (
        <Box sx={{flexGrow: 1}} className={style.tasks} >
            {project && <div>
                <h1>{project.name}</h1>
                <div className={style.description}>{project.description}</div>
                <div className={style.customer}>{project.customer}</div>
            </div>}
            <h2>Project tasks: </h2>
            <Grid container spacing={3}>
                {AllTaskByProject.length ? AllTaskByProject.sort(comparator).map(task => <OutlinedCardTask
                        allTracksByProjectId={allTracksByProjectId} key={task.id} userId={userId}
                        tasksProject={task}/>) :
                    <h3>No tasks</h3>}
            </Grid>
        </Box>
    )
}


export default TasksProject
