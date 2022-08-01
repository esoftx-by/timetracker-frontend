import React, {FC, useLayoutEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import {setIsFetchingProjectSelector, setProjectSelector} from "../../redux/selectors/projectSelector";
import {setAllTracksByProjectIdSelector} from "../../redux/selectors/trackSelectors";
import {setAllTasksProjectSelector} from "../../redux/selectors/taskSelectors";

type OwnToProps = {
    userId: number
}

export const ProjectContainer: FC<OwnToProps> = (props) => {

    type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction>;
    const dispatch: AppDispatch = useDispatch()

    const isFetching = useSelector(setIsFetchingProjectSelector)
    const project = useSelector(setProjectSelector)
    const allTracksByProjectId = useSelector(setAllTracksByProjectIdSelector)
    const allTasksProject = useSelector(setAllTasksProjectSelector)

    const params = useParams();
    let id: number = Number(params.id)

    const navigate = useNavigate()

    useLayoutEffect(() => {
        dispatch(setAllTasksProjectThunk(id))
    }, [])

    useLayoutEffect(() => {
        if (Number.isFinite(id)) {
            dispatch(setProjectIdThunk(id))
        }

    }, [])


    useLayoutEffect(() => {
        dispatch(setAllTracksByProjectIdThunk(id))
    }, [])


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
                <Button className={style.btnBack} onClick={() => navigate(-1)}><ArrowBackIcon/></Button>
                <FormDialogTask userId={props.userId} projectId={id}/>
            </div>
            <TasksProject project={project}
                          allTracksByProjectId={allTracksByProjectId}
                          userId={props.userId} AllTaskByProject={allTasksProject}/>
        </div>

    )
}

