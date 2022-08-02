import React, {FC} from 'react'
// @ts-ignore
import style from "../../pages/project/Project.module.css";
import {Box, Grid} from "@mui/material";
import OutlinedCardTask from "../Task";
import {AllTasksProjectType, AllTracksByProjectIdType, ProjectType} from "../../types";
import {useSelector} from "react-redux";
import {setIsFetchingTask} from "../../redux/selectors/taskSelectors";
import CircularIndeterminate from "../Loader";


type OwnToProps = {
    project: ProjectType | null
    AllTaskByProject: Array<AllTasksProjectType> | null
    userId: number
    allTracksByProjectId: Array<AllTracksByProjectIdType>
}


const TasksProject: FC<OwnToProps> = ({project, AllTaskByProject, userId, allTracksByProjectId}) => {

    const isFetching = useSelector(setIsFetchingTask)

    const STATUS_ORDER = {
        LONG_TERM: 0,
        OPEN: 1,
        IN_PROGRESS: 2,
        IN_TESTING: 3,
        IN_REVIEW: 4,
        FINISHED: 5,
        CANCELLED: 6
    }

    if (isFetching){
        return <div className={style.loader}><CircularIndeterminate/></div>
    }
    // @ts-ignore
    const comparator = (t1: AllTasksProjectType, t2: AllTasksProjectType): number => STATUS_ORDER[t1.status] - STATUS_ORDER[t2.status];

    return (
        <Box sx={{flexGrow: 1}} className={style.tasks}>
            {project && <div>
                <h1>{project.name}</h1>
                <div className={style.description}>{project.description}</div>
                <div className={style.customer}>{project.customer}</div>
            </div>}
            <h2>Project tasks: </h2>
            <Grid container spacing={3}>
                {AllTaskByProject && AllTaskByProject.length ? AllTaskByProject.sort(comparator).map(task =>
                    <OutlinedCardTask
                        allTracksByProjectId={allTracksByProjectId} key={task.id} userId={userId}
                        tasksProject={task}/>) : AllTaskByProject?.length === 0 &&
                    <h3>No tasks</h3>}
            </Grid>
        </Box>
    )
}


export default TasksProject
