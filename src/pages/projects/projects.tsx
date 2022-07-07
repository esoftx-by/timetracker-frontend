import React, {FC, useEffect} from 'react'
import FormDialog from "../../components/NewProject";
// @ts-ignore
import style from './Projects.module.css'
import Box from '@mui/material/Box';
import {Grid} from "@mui/material";
import {connect} from "react-redux";
import {setNewProjectThunk, setProjectByUserIdThunk, setProjectThunk} from "../../redux/reducers/projectsReducer";

import ProjectCard from "../../components/ProjectCard";
import {setAllUsersThunk} from "../../redux/reducers/authReducer";
import {Helmet} from "react-helmet-async";
import {projectType, userType} from "../../types";
import {AppStateType} from "../../redux/store";

type TStateProps = {
    projects: Array<projectType> | null
    projectsByUser: Array<projectType> | null
    allUsers: Array<userType> | null
}

type TDispatchProps = {
    setProjectThunk: () => void
    setProjectByUserIdThunk: (id: number) => void
    setNewProjectThunk: (name: string, description: string, customer: string) => void
    setAllUsersThunk: () => void
}

type OwnToProps = {
    user: userType
}

type PropsType = TStateProps & TDispatchProps & OwnToProps


const Projects: FC<PropsType> = (props) => {

    useEffect(() => {
        if (props.user.applicationRole === 'ADMIN') {
            props.setProjectThunk()
        }
        props.setProjectByUserIdThunk(props.user.id)
    }, [props.user.id, props.user.applicationRole])

    return (
        <>
            <div className={style.projects}>
                <Helmet>
                    <title>Projects</title>
                </Helmet>
                <h1>Projects:</h1>
                {props.user.applicationRole === "ADMIN" && <FormDialog setNewProjectThunk={props.setNewProjectThunk}/>}
            </div>
            <div className={style.projects__list}>
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>
                        {props.user.applicationRole === 'ADMIN' ? (props.projects ? props.projects.map(project =>
                                <ProjectCard
                                    allUsers={props.allUsers}
                                    setAllUsersThunk={props.setAllUsersThunk}
                                    project={project}
                                    key={project.id} role={props.user.applicationRole}/>) :
                            <Grid item xs={12} md={12}><h2>No projects</h2>
                            </Grid>) : (props.projectsByUser ? props.projectsByUser.map(project =>
                                <ProjectCard
                                    allUsers={props.allUsers}
                                    setAllUsersThunk={props.setAllUsersThunk}
                                    project={project}
                                    key={project.id} role={props.user.applicationRole}/>) :
                            <Grid item xs={12} md={12}><h2>No projects</h2></Grid>)}
                    </Grid>
                </Box>
            </div>
        </>
    )
}

const mapStateToProps = (state: AppStateType):TStateProps  => ({
    projects: state.projectsPage.projects,
    projectsByUser: state.projectsPage.projectsByUser,
    allUsers: state.auth.allUsers
})


export default connect<TStateProps, TDispatchProps, OwnToProps, AppStateType>(mapStateToProps, {
    setProjectThunk,
    setNewProjectThunk,
    setProjectByUserIdThunk,
    setAllUsersThunk
})(Projects)
