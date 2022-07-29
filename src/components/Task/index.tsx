import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Grid, Select, SelectChangeEvent} from "@mui/material";
import VirtualizedList from "../Track";
import FormDialogTrack from "../NewTrack";
import {allTasksProjectType, allTracksByProjectIdType} from "../../types";
// @ts-ignore
import style from './Task.module.css'
import {FC, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import {setAllTasksProjectThunk, updateTask} from "../../redux/reducers/taskReducer";
import {AppDispatch} from "../../redux/store";
import {useDispatch} from "react-redux";
import MenuItem from "@mui/material/MenuItem";


type OwnToProps = {
    allTracksByProjectId: Array<allTracksByProjectIdType>
    tasksProject: allTasksProjectType
    userId: number
}

const OutlinedCardTask: FC<OwnToProps> = ({allTracksByProjectId, tasksProject, userId}) => {


    let projectTracks = allTracksByProjectId.filter(tracks => tracks.task.id === tasksProject.id)

    const [localStatus, setLocalStatus] = useState(tasksProject.status)

    const [editMode, setEditMode] = useState(false)


    return (
        <Grid item xs={12} md={4}>
            <Box sx={{maxWidth: 500}}>
                <Card variant="outlined" style={{borderRadius: "10px"}}>
                    <React.Fragment>
                        <CardContent>
                            <div className={style.cardContent}>
                                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                    {tasksProject.currentAssignee.firstName + ' ' + tasksProject.currentAssignee.lastName}
                                </Typography>
                                {!editMode ? <div style={{cursor: 'pointer'}} className={localStatus}
                                                  onClick={() => setEditMode(true)}>{localStatus.replace('_', ' ')}</div> :
                                    <BasicSelect setLocalStatus={setLocalStatus} activeStatus={localStatus} taskId={tasksProject.id}
                                                 setEditMode={setEditMode}/>}

                                {/*<div className={tasksProject.status}>{tasksProject.status.replace('_', ' ')}</div>*/}
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
                            <div style={{display: 'flex', marginTop: '1rem'}}>
                                <FormDialogTrack userId={userId} taskId={tasksProject.id}/>
                                <Button style={{marginLeft: '1rem'}} variant="outlined"><NavLink
                                    style={{'color': '#1976d2', 'textDecoration': 'none'}}
                                    to={`/task/${tasksProject.id}`}>More...</NavLink></Button>
                            </div>
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

type OwnPropsType = {
    taskId: number
    activeStatus: string
    setEditMode: (p: boolean) => void
    setLocalStatus: (p: string) => void
}

const BasicSelect: FC<OwnPropsType> = ({setEditMode, activeStatus,setLocalStatus, taskId}) => {
    // const activeStatus = useSelector((state: AppStateType) => state.tasks.taskById?.status)
    // const taskId = useSelector((state: AppStateType) => state.tasks.taskById?.id)


    const handleChange = (event: SelectChangeEvent) => {
        setLocalStatus(event.target.value as string);
    };

    const dispatch: AppDispatch = useDispatch()

    const statusValue: Array<string> = ['OPEN', 'IN_PROGRESS', 'IN_REVIEW', 'IN_TESTING', 'FINISHED', 'CANCELLED', 'LONG_TERM']

    const sendStatus = () => {

        dispatch(updateTask(taskId as number, null, null, null, activeStatus, null))
        setEditMode(false)
        // @ts-ignore
        handleClose(false)
    }

    return (
        <Box sx={{minWidth: 80}}>
            <FormControl fullWidth>
                <Select
                    onBlur={sendStatus}
                    displayEmpty
                    value={activeStatus}
                    onChange={handleChange}
                    inputProps={{'aria-label': 'Without label'}}
                    defaultValue={activeStatus}
                >
                    {statusValue.map((el, index) => <MenuItem key={index} value={el}>{el.replace('_', ' ')}</MenuItem>)}
                </Select>
            </FormControl>
        </Box>
    );
}
