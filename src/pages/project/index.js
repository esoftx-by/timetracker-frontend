import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import style from './Project.module.css'
import FormDialogTask from "../../components/NewTask";
import {setAllTaskThunk, setNewTaskThunk} from "../../redux/reducers/taskReducer";
import {Helmet} from "react-helmet";
import {setProjectIdThunk} from "../../redux/reducers/projectsReducer";
import TasksProject from "../../components/TasksProject";
import {SetAllTracksThunks, setNewTrackThunk} from "../../redux/reducers/trackReducer";


const Project = (props) => {
    debugger
    const params = useParams();
    let id = Number(params.id)
    let AllTaskByProject = props.allTasks.filter(tasks => tasks.project.id === id)
    useEffect(() => {
        props.setAllTaskThunk()
        props.setProjectIdThunk(id)
        props.SetAllTracksThunks()
    }, [id])

    return (
        <div>
            <Helmet>
                <title>{props.project && props.project.name}</title>
            </Helmet>
            <div className={style.project}>
                <FormDialogTask projectId={props.project && props.project.id}
                                userId={props.userId} projectId={id} setNewTaskThunk={props.setNewTaskThunk}
                                setNewTask={props.setNewTask}/>
            </div>
            <TasksProject project={props.project} setNewTrackThunk={props.setNewTrackThunk} allTracks={props.allTracks}
                          userId={props.userId} AllTaskByProject={AllTaskByProject}/>

        </div>
    )
}

const mapStateToProps = (state) => ({
    project: state.projectsPage.project,
    userId: state.auth.user.id,
    allTasks: state.tasks.allTask,
    allTracks: state.tracks.allTracks
})

export default connect(mapStateToProps, {
    setNewTaskThunk,
    setAllTaskThunk,
    setProjectIdThunk,
    setNewTrackThunk,
    SetAllTracksThunks
})(Project)
