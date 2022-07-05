import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import style from './Project.module.css'
import FormDialogTask from "../../components/NewTask";
import {setAllTasksProjectThunk, setNewTaskThunk} from "../../redux/reducers/taskReducer";
import {Helmet} from "react-helmet";
import {setProjectIdThunk} from "../../redux/reducers/projectsReducer";
import TasksProject from "../../components/TasksProject";
import {setAllTracksByProjectIdThunk, setNewTrackThunk} from "../../redux/reducers/trackReducer";
import CircularIndeterminate from "../../components/Loader";


const Project = (props) => {

    const [loaded, setLoaded] = useState(false);

    const params = useParams();
    let id = Number(params.id)

    useEffect(() => {
        props.setProjectIdThunk(id)
        props.setAllTasksProjectThunk(id)
        props.setAllTracksByProjectIdThunk(id)
        if (!loaded) {
            setTimeout(() => setLoaded(true), 600);
        }

    }, [id])

    if (!loaded) {
        return <div className={style.loader}><CircularIndeterminate/></div>
    }

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
