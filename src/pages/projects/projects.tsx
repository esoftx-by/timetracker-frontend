import React, {FC, useEffect} from 'react'
import FormDialog from "../../components/NewProject";
// @ts-ignore
import style from './Projects.module.css'
import Box from '@mui/material/Box';
import {Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setProjectByUserIdThunk, setProjectThunk} from "../../redux/reducers/projectsReducer";
import ProjectCard from "../../components/ProjectCard";
import {Helmet} from "react-helmet-async";
import {userType} from "../../types";
import {AppDispatch, AppStateType} from "../../redux/store";


type OwnToProps = {
    user: userType
}


export const Projects: FC<OwnToProps> = (props) => {

    const dispatch: AppDispatch = useDispatch()

    const projects = useSelector((state: AppStateType) => state.projectsPage.projects)
    const allUsers = useSelector((state: AppStateType) => state.auth.allUsers)
    const projectsByUser = useSelector((state: AppStateType) => state.projectsPage.projectsByUser)

    useEffect(() => {
        if (props.user.applicationRole === 'ADMIN') {
            dispatch(setProjectThunk())
        } else {
            dispatch(setProjectByUserIdThunk(props.user.id))
        }
    }, [props.user.id, props.user.applicationRole])

    return (
        <>
            <div className={style.projects}>
                <Helmet>
                    <title>Projects</title>
                </Helmet>
                <h1>Projects:</h1>
                {props.user.applicationRole === "ADMIN" && <FormDialog />}
            </div>
            <div className={style.projects__list}>
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>
                        {props.user.applicationRole === 'ADMIN' ? (projects ? projects.map(project =>
                                <ProjectCard
                                    allUsers={allUsers}
                                    project={project}
                                    key={project.id} role={props.user.applicationRole}/>) :
                            <Grid item xs={12} md={12}><h2>No projects</h2>
                            </Grid>) : (projectsByUser ? projectsByUser.map(project =>
                                <ProjectCard
                                    allUsers={allUsers}
                                    project={project}
                                    key={project.id} role={props.user.applicationRole}/>) :
                            <Grid item xs={12} md={12}><h2>No projects</h2></Grid>)}
                    </Grid>
                </Box>
            </div>
        </>
    )
}


