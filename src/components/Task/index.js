import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Grid} from "@mui/material";
import VirtualizedList from "../Track";
import FormDialogTrack from "../NewTrack";


export default function OutlinedCardTask(props) {
    let projectTracks = props.allTracks.filter(tracks => tracks.task.id === props.tasksProject.id)
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
                            <FormDialogTrack userId={props.userId} taskId={props.tasksProject.id} setNewTrackThunk={props.setNewTrackThunk}/>
                        </CardContent>
                        {/*<CardActions>*/}
                        {/*    <Button size="small">Learn More</Button>*/}
                        {/*</CardActions>*/}
                    </React.Fragment>
                    {projectTracks && projectTracks.reverse().map(tracks => <VirtualizedList traks={tracks}/>)}
                </Card>
            </Box>
        </Grid>
    );
}
