import React, {FC} from 'react'
import style from "../../pages/project/Project.module.css";
import {Box, Grid} from "@mui/material";
import OutlinedCardTask from "../Task";
import {AllTasksProjectType, AllTracksByProjectIdType, ProjectType} from "../../types";
import {useSelector} from "react-redux";
import {setIsFetchingTask} from "../../redux/selectors/taskSelectors";
import CircularIndeterminate from "../Loader";
import {usePinnedSorted, useStatusOrderSort} from "../../Hooks/statusOrder.hook";


type OwnToProps = {
    project: ProjectType | null
    AllTaskByProject: Array<AllTasksProjectType> | null
    userId: number
    allTracksByProjectId: Array<AllTracksByProjectIdType>
}


const TasksProject: FC<OwnToProps> = ({project, AllTaskByProject, userId, allTracksByProjectId}) => {

    const isFetching = useSelector(setIsFetchingTask)

    const {name, description, customer} = project as ProjectType

    const sortTasks = usePinnedSorted(AllTaskByProject)

    return (
        <Box sx={{flexGrow: 1}} className={style.tasks}>
            {project && <div>
                <h1>{name}</h1>
                <div className={style.description}>{description}</div>
                <div className={style.customer}>{customer}</div>
            </div>}
            <h2>Project tasks: </h2>
            <Grid container spacing={3}>
                {isFetching ? <CircularIndeterminate/> :
                    sortTasks && sortTasks.length ? sortTasks.map(task =>
                        <OutlinedCardTask
                            key={task.id}
                            allTracksByProjectId={allTracksByProjectId} userId={userId}
                            tasksProject={task}/>
                    ) : AllTaskByProject?.length === 0 &&
                        <h3>No tasks</h3>}
            </Grid>
        </Box>
    )
}


export default TasksProject
