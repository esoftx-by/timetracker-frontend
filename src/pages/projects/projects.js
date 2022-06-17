import React, {lazy, useEffect, Suspense} from 'react'
import FormDialog from "../../components/NewProject";
import style from './Projects.module.css'
import Box from '@mui/material/Box';
import {Grid} from "@mui/material";
import {connect} from "react-redux";
import {setNewProjectThunk, setProjectThunk} from "../../redux/reducers/projectsReducer";
import {Helmet} from "react-helmet";
import CircularIndeterminate from "../../components/Loader";


const Projects = (props) => {

    useEffect(() => {
        props.setProjectThunk()
    }, [])

    const ProjectCard = lazy(() => import('../../components/ProjectCard'))

    return (
        <>
            <div className={style.projects}>
                <Helmet>
                    <title>Projects</title>
                </Helmet>
                <h1>Projects:</h1>
                <FormDialog setNewProjectThunk={props.setNewProjectThunk}/>
            </div>
            <div className={style.projects__list}>
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={2}>
                        {props.projects.length !== 0 && props.projects.map(project => <Suspense fallback={<CircularIndeterminate/>}><ProjectCard
                                project={project}
                                key={props.projects.id}/></Suspense>)}
                    </Grid>
                </Box>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    projects: state.projectsPage.projects
})


export default connect(mapStateToProps, {setProjectThunk, setNewProjectThunk})(Projects)
