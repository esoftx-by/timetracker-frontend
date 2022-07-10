import React, {FC, useEffect, useState} from 'react'
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
// @ts-ignore
import style from './Project.module.css'
import FormDialogTask from "../../components/NewTask";
import {setAllTasksProjectThunk, setNewTaskThunk} from "../../redux/reducers/taskReducer";
import {setProjectIdThunk} from "../../redux/reducers/projectsReducer";
import TasksProject from "../../components/TasksProject";
import {setAllTracksByProjectIdThunk, setNewTrackThunk} from "../../redux/reducers/trackReducer";
import CircularIndeterminate from "../../components/Loader";
import {allTasksProjectType, allTracksByProjectIdType, projectType} from "../../types";
import {Helmet} from "react-helmet-async";
import {AppStateType} from "../../redux/store";
import NotFoundPage from "../notFoundPage";


type TStateProps = {
    project: projectType | null
    allTasksProject: Array<allTasksProjectType>
    allTracksByProjectId: Array<allTracksByProjectIdType>
    isFetching: boolean
}

type TDispatchProps = {
    setNewTaskThunk: (name: string, description: string, estimatedHours: number, authorId: number, projectId: number) => void
    setProjectIdThunk:(id: number) => void
    setNewTrackThunk:(userId: number, taskId: number, startTime: string, hours: number) => void
    setAllTasksProjectThunk:(id: number) => void
    setAllTracksByProjectIdThunk:(id: number) => void
}

type OwnToProps = {
    userId: number
}

type PropsType = TStateProps & TDispatchProps & OwnToProps


const Project:FC<PropsType> = (props) => {

    const params = useParams();
    let id:number = Number(params.id)

    useEffect(() => {
        props.setProjectIdThunk(id)
        props.setAllTasksProjectThunk(id)
        props.setAllTracksByProjectIdThunk(id)

    }, [id])

    if (props.isFetching) {
        return <div className={style.loader}><CircularIndeterminate/></div>
    }

    if (!props.project){
        return <NotFoundPage/>
    }

    return (
        <div>
            <Helmet>
                <title>{props.project && props.project.name}</title>
            </Helmet>
            <div className={style.project}>
                <FormDialogTask userId={props.userId} projectId={id} setNewTaskThunk={props.setNewTaskThunk}/>
            </div>
            <TasksProject project={props.project} setNewTrackThunk={props.setNewTrackThunk}
                          allTracksByProjectId={props.allTracksByProjectId}
                          userId={props.userId} AllTaskByProject={props.allTasksProject}/>

        </div>
    )
}

const mapStateToProps = (state: AppStateType): TStateProps => ({
    project: state.projectsPage.project,
    allTasksProject: state.tasks.allTasksProject,
    allTracksByProjectId: state.tracks.allTracksByProjectId,
    isFetching: state.projectsPage.isFetching
})

export default connect(mapStateToProps, {
    setNewTaskThunk,
    setProjectIdThunk,
    setNewTrackThunk,
    setAllTasksProjectThunk,
    setAllTracksByProjectIdThunk
})(Project)
