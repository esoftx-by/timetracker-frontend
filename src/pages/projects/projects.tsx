import React, {FC, useEffect} from 'react'
import FormDialog from "../../components/NewProject";
import style from './Projects.module.css'
import Box from '@mui/material/Box';
import {Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import ProjectCard from "../../components/ProjectCard";
import {Helmet} from "react-helmet-async";
import {AppDispatch} from "../../redux/store";
import {
    setIsFetchingProjectSelector,
    setProjectsByUserSelector,
    setProjectsSelector
} from "../../redux/selectors/projectSelector";
import {setAllUsersSelector, userDataSelector} from "../../redux/selectors/authSelectors";
import {setProjectsByUserIdThunk, setProjectsThunk} from "../../redux/reducers/thunk-creators/projectThunk";
import {ProjectType, UserType} from "../../types";
import CircularIndeterminate from "../../components/Loader";


export const Projects: FC = () => {

    const dispatch: AppDispatch = useDispatch()

    const {id, applicationRole} = useSelector(userDataSelector)
    const projects = useSelector(setProjectsSelector)
    const allUsers = useSelector(setAllUsersSelector)
    const projectsByUser = useSelector(setProjectsByUserSelector)
    const isFetching = useSelector(setIsFetchingProjectSelector)

    useEffect(() => {
        if (applicationRole === 'ADMIN') {
            dispatch(setProjectsThunk())
        } else {
            dispatch(setProjectsByUserIdThunk(id))
        }
    }, [id, applicationRole])


    return (
        <>
            <div className={style.projects}>
                <Helmet>
                    <title>Projects</title>
                </Helmet>
                <h1>Projects:</h1>
                {applicationRole === "ADMIN" && <FormDialog/>}
            </div>
            <div className={style.projects__list}>
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>
                        {isFetching ? <CircularIndeterminate/> :
                            <ProjectCardContainer object={applicationRole === 'ADMIN' ? projects : projectsByUser}
                                                  role={applicationRole} allUsers={allUsers}/>}
                    </Grid>
                </Box>
            </div>
        </>
    )
}

type OwnToProps = {
    object: Array<ProjectType>
    allUsers: Array<UserType> | null
    role: string
}

const ProjectCardContainer: FC<OwnToProps> = ({object, allUsers, role}) => {
    return (
        <>
            {object.length
                ?
                object.map(el => <ProjectCard project={el} role={role} allUsers={allUsers}/>)
                :
                <Grid item xs={12} md={12}><h2>No projects</h2></Grid>}
        </>

    )

}

