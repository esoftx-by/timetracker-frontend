import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Grid} from "@mui/material";
import {NavLink} from "react-router-dom";
import CustomizedMenus from "../CustomizationMenu";
import style from './ProjectCard.module.css'
import {ProjectType, UserType} from "../../types";
import {FC} from "react";
import {AppDispatch} from "../../redux/store";
import {useDispatch} from "react-redux";
import {deleteProjectThunk} from "../../redux/reducers/projectsReducer";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {DeleteTask} from "../DeleteTask";


type OwnToProps = {
    project: ProjectType
    role: string
    allUsers: Array<UserType> | null
}


export const ProjectCard: FC<OwnToProps> = ({project, role, allUsers}) => {

    const dispatch: AppDispatch = useDispatch()

    const deleteProject = () => {
        dispatch(deleteProjectThunk(project.id))
    }

    return (
        <Grid item xs={12} md={4}>
            <Card sx={{maxWidth: 800}} style={{borderRadius: "10px"}}>
                <div className={style.mainProjectCard}>
                    <CardContent>
                        <Typography className={style.projectName} variant="h5" component="div">
                            {project.name}
                        </Typography>
                        <Typography sx={{mb: 1.5}} color="text.secondary">
                            {project.customer}
                        </Typography>
                        <Typography variant="body2">c
                            {project.description}
                        </Typography>
                        <Button className={style.btn} variant="contained" size="large"><NavLink
                            to={'/projects/' + project.id}>More</NavLink>
                        </Button>
                    </CardContent>
                    <div className={style.mainProjectCardItem}>
                        {role === 'ADMIN' && <>
                            <DeleteTask callback={deleteProject} title={'Are you sure you want to delete the project?'} id={project.id}>
                                <DeleteOutlineOutlinedIcon/>
                            </DeleteTask>
                            <CustomizedMenus allUsers={allUsers}
                                             project={project}/>
                        </>}
                    </div>
                </div>
            </Card>
        </Grid>
    );
}
export default ProjectCard
