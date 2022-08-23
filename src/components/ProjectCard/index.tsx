import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Grid} from "@mui/material";
import {Link} from "react-router-dom";
import CustomizedMenus from "../CustomizationMenu";
import style from './ProjectCard.module.css'
import {ProjectType, UserType} from "../../types";
import {FC, memo} from "react";
import {AppDispatch} from "../../redux/store";
import {useDispatch} from "react-redux";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {DeleteModal} from "../DeleteModal";
import {deleteProjectThunk} from "../../redux/reducers/thunk-creators/projectThunk";


type OwnToProps = {
    project: ProjectType
    role: string
    allUsers: Array<UserType> | null
}


export const ProjectCard: FC<OwnToProps> = memo(({project, role, allUsers}) => {

    const dispatch: AppDispatch = useDispatch()

    const {id, name, customer, description} = project

    const deleteProject = () => {
        dispatch(deleteProjectThunk(project.id))
    }

    return (
        <Grid item xs={12} md={4}>
            <Card sx={{maxWidth: 800}} style={{borderRadius: "10px"}}>
                <div className={style.mainProjectCard}>
                    <CardContent className={style.mainProjectCardBlock}>
                        <Typography className={style.projectName} variant="h5" component="div">
                            {name}
                        </Typography>
                        <Typography sx={{mb: 1.5}} color="text.secondary">
                            {customer}
                        </Typography>
                        <Typography className={style.mainProjectCardDescription} variant="body2">
                            {description}
                        </Typography>
                        <Button className={style.btn} variant="outlined" size="medium"><Link
                            to={'/projects/' + id}>More</Link>
                        </Button>
                    </CardContent>
                    {role === 'ADMIN' && <div className={style.mainProjectCardItem}>
                        <>
                            <DeleteModal callback={deleteProject}
                                         title={'Are you sure you want to delete the project?'}
                                         id={id}>
                                <DeleteOutlineOutlinedIcon/>
                            </DeleteModal>
                            <CustomizedMenus allUsers={allUsers}
                                             project={project}/>
                        </>
                    </div>}
                </div>
            </Card>
        </Grid>
    );
})
export default ProjectCard
