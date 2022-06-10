import React, {useEffect} from 'react'
import FormDialog from "../../components/NewTask";
import style from './Projects.module.css'
import ProjectCard from "../../components/ProjectCard";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {Grid} from "@mui/material";
import {connect} from "react-redux";
import {setProjects} from "../../redux/reducers/projectsReducer";


const Projects = (props) => {
    useEffect(() => {
        axios.get('http://localhost:8080/api/projects/')
            .then(response => {
                if (response.data.success) {
                    let data = response.data.response
                    props.setProjects(data)
                }
            })
    }, [props.project])

    return (
        <>
            <div className={style.projects}>
                <h1>Projects:</h1>
                <FormDialog/>
            </div>
            <div className={style.projects__list}>
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>
                        {props.project ? props.project.map(project => <ProjectCard project={project}
                                                                                   key={props.project.id}/>) :
                            <div className={style.preloader}><CircularIndeterminate/></div>}
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


export default connect(mapStateToProps, {setProjects})(Projects)
