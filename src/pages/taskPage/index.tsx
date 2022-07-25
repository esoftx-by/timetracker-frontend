import React, {FC, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppStateType} from "../../redux/store";
import {deleteTaskThunk, SetTaskByIdThunk} from "../../redux/reducers/taskReducer";
import {useNavigate, useParams} from "react-router-dom";
// @ts-ignore
import style from "../project/Project.module.css";
import CircularIndeterminate from "../../components/Loader";
import {Box, Grid} from "@mui/material";
import OutlinedCard from "../../components/TaskCard";
import {setTracksByTaskIdThunk} from "../../redux/reducers/trackReducer";
import VirtualizedList from "../../components/Track";
import FormDialogTrack from "../../components/NewTrack";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TaskOption from "../../components/EditTask";
import {setAllUsersInProject} from "../../redux/reducers/projectsReducer";
import {DeleteTask} from "../../components/DeleteTask";
import {setIsFetchingTask, setTaskByIdSelector} from "../../redux/selectors/taskSelectors";


export const TaskPage: FC = () => {
    const params = useParams();
    let id: number = Number(params.id)

    const projectId = useSelector((state: AppStateType) => state.tasks.taskById?.project.id)
    const isFetching = useSelector(setIsFetchingTask)
    const taskById = useSelector(setTaskByIdSelector)
    const tracksByTaskId = useSelector((state: AppStateType) => state.tracks.tracksByTaskId?.reverse())
    const userId = useSelector((state: AppStateType) => state.auth.user?.id)

    const [open, setOpen] = useState(false);

    const navigate = useNavigate()

    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        if (Number.isFinite(id)) {
            dispatch(SetTaskByIdThunk(id))
            dispatch(setTracksByTaskIdThunk(id))
        }
    }, [id, dispatch])


    useEffect(() => {
        if (projectId) {
            dispatch(setAllUsersInProject(projectId as number))
        }
    }, [])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    if (isFetching) {
        return <div className={style.loader}><CircularIndeterminate/></div>
    }

    if (!taskById) {
        return <div>No such task found</div>
    }

    return (
        <Box sx={{flexGrow: 1}} style={{'padding': '2rem'}}>
            <div className={style.taskHeader}>
                <Button className={style.btnBack} onClick={() => navigate(-1)}><ArrowBackIcon/></Button>
                <div style={{display: 'flex'}}>
                    <Button style={{marginRight: '1rem'}} variant="contained" onClick={() => handleClickOpen()}>Delete Task</Button>
                    <TaskOption/>
                </div>
            </div>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    {/*<AlertDialogSlide/>*/}
                    <OutlinedCard data={taskById}/>
                    <div className={style.tracksBlock}>

                        <div style={{
                            margin: '0.5rem 1rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <h3>Tracks: </h3>
                            <FormDialogTrack userId={userId as number} taskId={taskById.id}/>
                        </div>
                        <div className={style.tracksBlockItem}>
                            {tracksByTaskId && tracksByTaskId.length ? tracksByTaskId.map(track => <VirtualizedList
                                    tracks={track}/>) :
                                <div className={style.tracksBlockNoTracks}>No tracks</div>}
                        </div>
                    </div>
                </Grid>
            </Grid>
            <DeleteTask open={open} handleClickOpen={handleClickOpen} handleClose={handleClose}/>
        </Box>
    )
}
