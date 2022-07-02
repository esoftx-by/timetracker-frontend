import React, {lazy, useEffect, Suspense} from 'react'
import FormDialog from "../../components/NewProject";
import style from './Projects.module.css'
import Box from '@mui/material/Box';
import {Grid} from "@mui/material";
import {connect} from "react-redux";
import {setNewProjectThunk, setProjectByUserIdThunk, setProjectThunk} from "../../redux/reducers/projectsReducer";
import {Helmet} from "react-helmet";
import ProjectCard from "../../components/ProjectCard";
import {setAllUsersThunk} from "../../redux/reducers/authReducer";


const Projects = (props) => {

    useEffect(() => {
        {
            props.role === 'ADMIN' && props.setProjectThunk()
        }
        props.setProjectByUserIdThunk(props.userData.id)
    }, [props.userData.id])

    return (
        <>
            <div className={style.projects}>
                <Helmet>
                    <title>Projects</title>
                </Helmet>
                <h1>Projects:</h1>
                {props.role === "ADMIN" && <FormDialog setNewProjectThunk={props.setNewProjectThunk}/>}
            </div>
            <div className={style.projects__list}>
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>
                        {props.role === 'ADMIN' ? (props.projects.length !== 0 ? props.projects.map(project =>
                                <ProjectCard
                                    allUsers={props.allUsers}
                                    setAllUsersThunk={props.setAllUsersThunk}
                                    project={project}
                                    key={props.projects.id} role={props.role}/>) :
                            <Grid item xs={12} md={12}><h2>No projects</h2>
                            </Grid>) : (props.projectsByUser.length !== 0 ? props.projectsByUser.map(project =>
                                <ProjectCard
                                    allUsers={props.allUsers}
                                    setAllUsersThunk={props.setAllUsersThunk}
                                    project={project}
                                    key={props.projectsByUser.id} role={props.role}/>) :
                            <Grid item xs={12} md={12}><h2>No projects</h2></Grid>)}
                    </Grid>
                </Box>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    projects: state.projectsPage.projects,
    projectsByUser: state.projectsPage.projectsByUser,
    role: state.auth.user.applicationRole,
    userData: state.auth.user,
    allUsers: state.auth.allUsers
})


export default connect(mapStateToProps, {
    setProjectThunk,
    setNewProjectThunk,
    setProjectByUserIdThunk,
    setAllUsersThunk
})(Projects)
