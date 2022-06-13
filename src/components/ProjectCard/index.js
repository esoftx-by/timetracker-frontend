import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Grid} from "@mui/material";
import {NavLink} from "react-router-dom";


export default function ProjectCard({project}) {
    return (
        <Grid item xs={12} md={6}>
            <Card sx={{maxWidth: 800}}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {project.name}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        {project.customer}
                    </Typography>
                    <Typography variant="body2">
                        {project.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small"><NavLink
                        to={'/projects/' + project.id}>More</NavLink></Button>
                </CardActions>
            </Card>
        </Grid>
    );
}
