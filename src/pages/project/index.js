import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import style from './Project.module.css'
import FormDialogTask from "../../components/NewTask";
import {setAllTasksProjectThunk, setNewTaskThunk} from "../../redux/reducers/taskReducer";
import {Helmet} from "react-helmet";
import {setProjectIdThunk} from "../../redux/reducers/projectsReducer";
import TasksProject from "../../components/TasksProject";
import {setAllTracksByProjectIdThunk, setNewTrackThunk} from "../../redux/reducers/trackReducer";


const Project = (props) => {

    const params = useParams();
    let id = Number(params.id)

    useEffect(() => {
        props.setProjectIdThunk(id)
        props.setAllTracksByProjectIdThunk(id)
        props.setAllTasksProjectThunk(id)
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
            <TasksProject project={props.project} setNewTrackThunk={props.setNewTrackThunk}
                          allTracks={props.allTracksByProjectId}
                          userId={props.userId} AllTaskByProject={props.allTasksProject}/>

        </div>
    )
}

const mapStateToProps = (state) => ({
    project: state.projectsPage.project,
    userId: state.auth.user.id,
    allTasksProject: state.tasks.allTasksProject,
    allTracksByProjectId: state.tracks.allTracksByProjectId
})

export default connect(mapStateToProps, {
    setNewTaskThunk,
    setProjectIdThunk,
    setNewTrackThunk,
    setAllTasksProjectThunk,
    setAllTracksByProjectIdThunk
})(Project)
