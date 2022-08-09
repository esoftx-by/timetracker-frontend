import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Grid, Select, SelectChangeEvent} from "@mui/material";
import VirtualizedList from "../Track";
import FormDialogTrack from "../NewTrack";
import {AllTasksProjectType, AllTracksByProjectIdType} from "../../types";
import style from './Task.module.css'
import {FC, useState} from "react";
import {NavLink} from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import {deleteTaskThunk, updateTask} from "../../redux/reducers/taskReducer";
import {AppDispatch} from "../../redux/store";
import {useDispatch} from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {DeleteModal} from "../DeleteModal";
import {TransitionGroup,  CSSTransition} from "react-transition-group";
import Utilities from "../../utilities";


type OwnToProps = {
    allTracksByProjectId: Array<AllTracksByProjectIdType>
    tasksProject: AllTasksProjectType
    userId: number
}

const OutlinedCardTask: FC<OwnToProps> = ({allTracksByProjectId, tasksProject, userId}) => {

    let projectTracks = allTracksByProjectId.filter(tracks => tracks.task.id === tasksProject.id)

    const [localStatus, setLocalStatus] = useState(tasksProject.status)

    const [editMode, setEditMode] = useState(false)

    const dispatch: AppDispatch = useDispatch()

    const deleteTask = () => {
        dispatch(deleteTaskThunk(tasksProject.id))
    }


    return (
        <Grid item xs={12} md={4}>
            <Box sx={{maxWidth: 500}}>
                <Card variant="outlined" style={{borderRadius: "10px"}}>
                    <React.Fragment>
                        <CardContent>
                            <div className={style.cardContent}>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        {tasksProject.currentAssignee.firstName + ' ' + tasksProject.currentAssignee.lastName}
                                    </Typography>

                                </div>
                                {!editMode ? <div style={{cursor: 'pointer'}} className={localStatus}
                                                  onClick={() => setEditMode(true)}>{localStatus.replace('_', ' ')}</div> :
                                    <BasicSelect setLocalStatus={setLocalStatus} activeStatus={localStatus}
                                                 taskId={tasksProject.id}
                                                 setEditMode={setEditMode}/>}

                            </div>
                            <Typography variant="h5" component="div">
                                {tasksProject.name}
                            </Typography>
                            <Typography sx={{mb: 1.5}} color="text.secondary">
                                Estimated time: <em className={style.time}>{Utilities.getTimeFromMins(tasksProject.estimatedHours * 60)}</em>
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
                    <div className={style.tracks}>
                    <TransitionGroup className="todo-list">
                    {projectTracks && projectTracks.reverse().map(tracks =>
                        <CSSTransition
                            key={tracks.id}
                            timeout={500}
                            classNames="tracks"
                        >
                            <VirtualizedList tracks={tracks}/></CSSTransition>)}
                    </TransitionGroup>
                        </div>
                    <div className={style.taskDelete}>
                        <DeleteModal callback={deleteTask} id={tasksProject.id} title={'Are you sure you want to delete the task?'}>
                            <DeleteOutlineOutlinedIcon/>
                        </DeleteModal>
                    </div>
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

const BasicSelect: FC<OwnPropsType> = ({setEditMode, activeStatus, setLocalStatus, taskId}) => {

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
