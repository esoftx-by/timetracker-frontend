import React, {FC, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
// @ts-ignore
import style from './Project.module.css'
import FormDialogTask from "../../components/NewTask";
import {setAllTasksProjectThunk} from "../../redux/reducers/taskReducer";
import {setProjectIdThunk} from "../../redux/reducers/projectsReducer";
import TasksProject from "../../components/TasksProject";
import {setAllTracksByProjectIdThunk} from "../../redux/reducers/trackReducer";
import CircularIndeterminate from "../../components/Loader";
import {Helmet} from "react-helmet-async";
import {AppStateType} from "../../redux/store";
import NotFoundPage from "../notFoundPage";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

type OwnToProps = {
    userId: number
}

export const ProjectContainer: FC<OwnToProps> = (props) => {

    type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction>;
    const dispatch: AppDispatch = useDispatch()

    const isFetching = useSelector((state: AppStateType) => state.projectsPage.isFetching)
    const project = useSelector((state: AppStateType) => state.projectsPage.project)
    const allTracksByProjectId = useSelector((state: AppStateType) => state.tracks.allTracksByProjectId)
    const allTasksProject = useSelector((state: AppStateType) => state.tasks.allTasksProject)

    const params = useParams();
    let id: number = Number(params.id)

    useEffect(() => {
        if (Number.isFinite(id)){
            dispatch(setProjectIdThunk(id))
            dispatch(setAllTasksProjectThunk(id))
            dispatch(setAllTracksByProjectIdThunk(id))
        }

    }, [id])
    

    if (isFetching) {
        return <div className={style.loader}><CircularIndeterminate/></div>
    }

    if (!project) {
        return <NotFoundPage/>
    }

    return (
        <div>
            <Helmet>
                <title>{project && project.name}</title>
            </Helmet>
            <div className={style.project}>
                <FormDialogTask userId={props.userId} projectId={id}/>
            </div>
            <TasksProject project={project}
                          allTracksByProjectId={allTracksByProjectId}
                          userId={props.userId} AllTaskByProject={allTasksProject}/>
        </div>

    )
}

