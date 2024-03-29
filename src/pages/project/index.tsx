import React, {FC, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import style from './Project.module.css'
import FormDialogTask from "../../components/NewTask";
import {setAllTasksProjectThunk} from "../../redux/reducers/thunk-creators/taskThunk";
import TasksProject from "../../components/TasksProject";
import {setAllTracksByProjectIdThunk} from "../../redux/reducers/thunk-creators/trackThunk";
import CircularIndeterminate from "../../components/Loader";
import {Helmet} from "react-helmet-async";
import {AppDispatch} from "../../redux/store";
import NotFoundPage from "../notFoundPage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import {setIsFetchingProjectSelector, setProjectSelector} from "../../redux/selectors/projectSelector";
import {setAllTracksByProjectIdSelector} from "../../redux/selectors/trackSelectors";
import {setAllTasksProjectSelector} from "../../redux/selectors/taskSelectors";
import {userDataSelector} from "../../redux/selectors/authSelectors";
import {setProjectIdThunk} from "../../redux/reducers/thunk-creators/projectThunk";


export const ProjectContainer: FC = () => {

    const dispatch: AppDispatch = useDispatch()
    const {id} = useSelector(userDataSelector)
    const isFetching = useSelector(setIsFetchingProjectSelector)
    const project = useSelector(setProjectSelector)
    const allTracksByProjectId = useSelector(setAllTracksByProjectIdSelector)
    const allTasksProject = useSelector(setAllTasksProjectSelector)

    const params = useParams();
    let projectId = Number(params.id)

    const navigate = useNavigate()

    useEffect(() => {
        if (Number.isFinite(projectId)) {
            dispatch(setProjectIdThunk(projectId))
        }

    }, [])

    useEffect(() => {
        dispatch(setAllTasksProjectThunk(projectId))
    }, [])


    useEffect(() => {
        dispatch(setAllTracksByProjectIdThunk(projectId))
    }, [])


    if (isFetching) {
        return <CircularIndeterminate/>
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
                <FormDialogTask userId={id} projectId={projectId}/>
            </div>
            <TasksProject project={project}
                          allTracksByProjectId={allTracksByProjectId}
                          userId={id} AllTaskByProject={allTasksProject}/>
        </div>

    )
}

