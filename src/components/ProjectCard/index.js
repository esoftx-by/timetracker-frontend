import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Grid} from "@mui/material";
import {NavLink} from "react-router-dom";
import CustomizedMenus from "../CustomizationMenu";
import style from './ProjectCard.module.css'
import {setAllUsersThunk} from "../../redux/reducers/authReducer";


export default function ProjectCard({project, role, setAllUsersThunk, allUsers}) {
    return (
        <Grid item xs={12} md={4}>
            <Card sx={{maxWidth: 800}}>
                <div className={style.mainProjectCard}>
                    <CardContent>
                        <Typography variant="h5" component="div" style={{'word-break': 'break-all'}}>
                            {project.name}
                        </Typography>
                        <Typography sx={{mb: 1.5}} color="text.secondary">
                            {project.customer}
                        </Typography>
                        <Typography variant="body2">
                            {project.description}
                        </Typography>
                        <CardActions>
                            <Button variant="contained" size="large"><NavLink
                                to={'/projects/' + project.id}
                                style={{'color': '#fff', 'text-decoration': 'none'}}>More</NavLink></Button>
                        </CardActions>
                    </CardContent>
                    <div className={style.mainProjectCardItem}>
                        {role === 'ADMIN' && <CustomizedMenus setAllUsersThunk={setAllUsersThunk} allUsers={allUsers}
                                                              project={project}/>}
                    </div>
                </div>
            </Card>
        </Grid>
    );
}
