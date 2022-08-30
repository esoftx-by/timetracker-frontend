import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Checkbox, Grid} from "@mui/material";
import VirtualizedList from "../Track";
import FormDialogTrack from "../NewTrack";
import {AllTasksProjectType, AllTracksByProjectIdType} from "../../types";
import style from './Task.module.css'
import {FC, useState} from "react";
import {NavLink} from "react-router-dom";
import Button from "@mui/material/Button";
import {deleteTaskThunk, updateTask} from "../../redux/reducers/thunk-creators/taskThunk";
import {AppDispatch} from "../../redux/store";
import {useDispatch} from "react-redux";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {DeleteModal} from "../DeleteModal";
import {TransitionGroup,  CSSTransition} from "react-transition-group";
import Utilities from "../../utilities";
import SelectStatus from "../SelectStatus";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';


type OwnToProps = {
    allTracksByProjectId: Array<AllTracksByProjectIdType>
    tasksProject: AllTasksProjectType
    userId: number
}

const OutlinedCardTask: FC<OwnToProps> = ({allTracksByProjectId, tasksProject, userId}) => {

    const {id, currentAssignee, description, status, estimatedHours, pinned, name} = tasksProject

    let projectTracks = allTracksByProjectId.filter(tracks => tracks.task.id === id)

    const [localStatus, setLocalStatus] = useState(status)

    const [editMode, setEditMode] = useState(false)

    const [localPinned, setLocalPinned] = useState(pinned)

    let updatePinnded = () => {
        setLocalPinned(!pinned)
        dispatch(updateTask(id, null, null, null, null, null, !pinned))
    }


    const dispatch: AppDispatch = useDispatch()

    const deleteTask = () => {
        dispatch(deleteTaskThunk(tasksProject.id))
    }
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <Grid item xs={12} md={4}>
            <Box sx={{maxWidth: 500}}>
                <Card variant="outlined" style={{borderRadius: "10px"}}>
                    <React.Fragment>
                        <CardContent>
                            <div className={style.cardContent}>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        {currentAssignee.firstName + ' ' + currentAssignee.lastName}
                                        {/*<Checkbox {...label} icon={<FavoriteBorder />} value={localPinned} onChange={() => setLocalPinned(!localPinned)} checkedIcon={<Favorite />} />*/}
                                        <Checkbox
                                            sx={{
                                                color: '#ffc400',
                                                '&.Mui-checked': {
                                                    color: '#ffc400',
                                                },
                                            }}
                                            checked={localPinned}
                                            {...label}
                                            onChange={updatePinnded}
                                            icon={<BookmarkBorderIcon />}
                                            checkedIcon={<BookmarkIcon />}
                                        />
                                    </Typography>

                                </div>

                                {!editMode ? <div style={{cursor: 'pointer'}} className={localStatus}
                                                  onClick={() => setEditMode(true)}>{localStatus.replace('_', ' ')}</div> :
                                    <SelectStatus setLocalStatus={setLocalStatus} activeStatus={localStatus}
                                                 taskId={id}
                                                 setEditMode={setEditMode}/>}

                            </div>
                            <Typography variant="h5" component="div">
                                {name}
                            </Typography>
                            <Typography sx={{mb: 1.5}} color="text.secondary">
                                Estimated time: <em className={style.time}>{Utilities.getTimeFromMins(estimatedHours * 60)}</em>
                            </Typography>
                            <Typography variant="body2">
                                {description}
                            </Typography>
                            <div style={{display: 'flex', marginTop: '1rem'}}>
                                <FormDialogTrack userId={userId} taskId={id}/>
                                <Button style={{marginLeft: '1rem'}} variant="outlined"><NavLink
                                    style={{'color': '#1976d2', 'textDecoration': 'none'}}
                                    to={`/task/${id}`}>More...</NavLink></Button>
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
                        <DeleteModal callback={deleteTask} id={id} title={'Are you sure you want to delete the task?'}>
                            <DeleteOutlineOutlinedIcon/>
                        </DeleteModal>
                    </div>
                </Card>
            </Box>
        </Grid>
    );
}

export default OutlinedCardTask
