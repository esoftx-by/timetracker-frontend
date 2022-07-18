import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Alert, Grid} from "@mui/material";
import VirtualizedList from "../Track";
import FormDialogTrack from "../NewTrack";
import {allTasksProjectType, allTracksByProjectIdType} from "../../types";
// @ts-ignore
import style from './Task.module.css'
import {FC} from "react";


type OwnToProps = {
    allTracksByProjectId: Array<allTracksByProjectIdType>
    tasksProject: allTasksProjectType
    userId: number
}

const OutlinedCardTask: FC<OwnToProps> = ({allTracksByProjectId, tasksProject, userId}) => {

    let projectTracks = allTracksByProjectId.filter(tracks => tracks.task.id === tasksProject.id)

    return (
        <Grid item xs={12} md={4}>
            <Box sx={{maxWidth: 500}}>
                <Card variant="outlined">
                    <React.Fragment>
                        <CardContent>
                            <div className={style.cardContent}>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    {tasksProject.currentAssignee.firstName + ' ' + tasksProject.currentAssignee.lastName}
                                </Typography>
                                <div className={tasksProject.status}>{tasksProject.status}</div>
                            </div>
                            <Typography variant="h5" component="div">
                                {tasksProject.name}
                            </Typography>
                            <Typography sx={{mb: 1.5}} color="text.secondary">
                                {'Estimated time: ' + tasksProject.estimatedHours + ' hours'}
                            </Typography>
                            <Typography variant="body2">
                                {tasksProject.description}
                            </Typography>
                            <FormDialogTrack userId={userId} taskId={tasksProject.id}/>
                        </CardContent>
                    </React.Fragment>
                    <div className={style.tracks}>{projectTracks && projectTracks.reverse().map(tracks =>
                        <VirtualizedList tracks={tracks}/>)}</div>
                </Card>
            </Box>
        </Grid>
    );
}

export default OutlinedCardTask
