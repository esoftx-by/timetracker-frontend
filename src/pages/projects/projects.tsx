import React, {FC, useEffect} from 'react'
import FormDialog from "../../components/NewProject";
import style from './Projects.module.css'
import Box from '@mui/material/Box';
import {Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setProjectByUserIdThunk, setProjectThunk} from "../../redux/reducers/projectsReducer";
import ProjectCard from "../../components/ProjectCard";
import {Helmet} from "react-helmet-async";
import {UserType} from "../../types";
import {AppDispatch} from "../../redux/store";
import {setProjectsByUserSelector, setProjectsSelector} from "../../redux/selectors/projectSelector";
import {setAllUsersSelector} from "../../redux/selectors/authSelectors";


type OwnToProps = {
    user: UserType
}


export const Projects: FC<OwnToProps> = ({user}) => {

    const dispatch: AppDispatch = useDispatch()

    const projects = useSelector(setProjectsSelector)
    const allUsers = useSelector(setAllUsersSelector)
    const projectsByUser = useSelector(setProjectsByUserSelector)

    useEffect(() => {
        if (user.applicationRole === 'ADMIN') {
            dispatch(setProjectThunk())
        } else {
            dispatch(setProjectByUserIdThunk(user.id))
        }
    }, [user.id, user.applicationRole])

    return (
        <>
            <div className={style.projects}>
                <Helmet>
                    <title>Projects</title>
                </Helmet>
                <h1>Projects:</h1>
                {user.applicationRole === "ADMIN" && <FormDialog/>}
            </div>
            <div className={style.projects__list}>
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>
                        {user.applicationRole === 'ADMIN' ? (projects.length ? projects.map(project =>
                                <ProjectCard
                                    allUsers={allUsers}
                                    project={project}
                                    key={project.id} role={user.applicationRole}/>) :
                            <Grid item xs={12} md={12}><h2>No projects</h2>
                            </Grid>) : (projectsByUser?.length ? projectsByUser.map(project =>
                                <ProjectCard
                                    allUsers={allUsers}
                                    project={project}
                                    key={project.id} role={user.applicationRole}/>) :
                            <Grid item xs={12} md={12}><h2>No projects</h2></Grid>)}
                    </Grid>
                </Box>
            </div>
        </>
    )
}


