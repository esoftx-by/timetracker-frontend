import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import {setProjectIdThunk} from "../../redux/reducers/projectsReducer";
import style from './Project.module.css'
import FormDialogTask from "../../components/NewTask";
import {setAllTasksProjectThunk} from "../../redux/reducers/taskReducer";
import {Box, Grid} from "@mui/material";
import OutlinedCardTask from "../../components/Task";


const Project = (props) => {

    const params = useParams();
    let id = params.id
    useEffect(() => {
        props.setProjectIdThunk(id)
        props.setAllTasksProjectThunk(id)
    }, [])
    return (
        <>
            <div className={style.project}>
                {props.project && <div>
                    <h2>{props.project.name}</h2>
                    <div>{props.project.description}</div>
                    <div>{props.project.customer}</div>
                </div>}
                <FormDialogTask projectId={props.project && props.project.id} userId={props.userId}/>
            </div>
            <Box sx={{flexGrow: 1}} className={style.tasks}>
                <Grid container spacing={3}>
                    {props.tasksProject ? props.tasksProject.map(task => <OutlinedCardTask tasksProject={task}/>) : <h2>No tasks</h2>}
                </Grid>
            </Box>
        </>
    )
}

const mapStateToProps = (state) => ({
    project: state.projectsPage.project,
    userId: state.auth.user.id,
    tasksProject: state.tasks.allTasksProject
})

export default connect(mapStateToProps, {setProjectIdThunk, setAllTasksProjectThunk})(Project)
