import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Grid} from "@mui/material";

const bull = (
    <Box
        component="span"
        sx={{display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
    >
        •
    </Box>
);


export default function OutlinedCardTask(props) {
    return (
        <Grid item xs={12} md={4}>
            <Box sx={{maxWidth: 500}}>
                <Card variant="outlined">
                    <React.Fragment>
                        <CardContent>
                            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                {'Current Assignee: ' + props.tasksProject.currentAssignee.firstName + ' ' + props.tasksProject.currentAssignee.lastName}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {'Task Name: ' + props.tasksProject.name}
                            </Typography>
                            <Typography sx={{mb: 1.5}} color="text.secondary">
                                {'Estimated time: '+ props.tasksProject.estimatedHours + ' hours'}
                            </Typography>
                            <Typography variant="body2">
                                {'Description Task: ' + props.tasksProject.description}
                            </Typography>
                        </CardContent>
                        {/*<CardActions>*/}
                        {/*    <Button size="small">Learn More</Button>*/}
                        {/*</CardActions>*/}
                    </React.Fragment>
                </Card>
            </Box>
        </Grid>
    );
}
