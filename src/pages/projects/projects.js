import React, {useEffect} from 'react'
import FormDialog from "../../components/NewTask";
import style from './Projects.module.css'
import ProjectCard from "../../components/ProjectCard";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {Grid} from "@mui/material";
import {connect} from "react-redux";
import {setNewProjectThunk, setProjectThunk} from "../../redux/reducers/projectsReducer";


const Projects = (props) => {

    useEffect(() => {
        props.setProjectThunk()
    }, [])

    return (
        <>
            <div className={style.projects}>
                <h1>Projects:</h1>
                <FormDialog setNewProjectThunk={props.setNewProjectThunk}/>
            </div>
            <div className={style.projects__list}>
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>
                        {props.project.length !== 0 ? props.project.map(project => <ProjectCard project={project}
                                                                                                key={props.project.id}/>) :
                            /*<div className={style.preloader}><CircularIndeterminate/></div>*/ <h2>No projects</h2>}
                    </Grid>
                </Box>
            </div>
        </>
    )
}

function CircularIndeterminate() {
    return (
        <Box sx={{display: 'flex'}}>
            <CircularProgress/>
        </Box>
    );
}

const mapStateToProps = (state) => ({
    project: state.project.project
})


export default connect(mapStateToProps, {setProjectThunk, setNewProjectThunk})(Projects)
