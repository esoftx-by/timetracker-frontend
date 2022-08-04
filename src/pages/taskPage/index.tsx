import React, {FC, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {SetTaskByIdThunk} from "../../redux/reducers/taskReducer";
import {useNavigate, useParams} from "react-router-dom";
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
import {setIsFetchingTask, setTaskByIdSelector} from "../../redux/selectors/taskSelectors";
import {userDataSelector} from "../../redux/selectors/authSelectors";
import {setTracksByTaskIdSelector} from "../../redux/selectors/trackSelectors";
import {DeleteTask} from "../../components/DeleteTask";
import NoTaskPage from "../noTaskPage";

export const TaskPage: FC = () => {
    const params = useParams();
    let id: number = Number(params.id)

    const isFetching = useSelector(setIsFetchingTask)
    const taskById = useSelector(setTaskByIdSelector)
    const tracksByTaskId = useSelector(setTracksByTaskIdSelector)
    const user = useSelector(userDataSelector)

    const navigate = useNavigate()

    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        if (Number.isFinite(id)) {
            dispatch(SetTaskByIdThunk(id))
            dispatch(setTracksByTaskIdThunk(id))
        }
    }, [id, dispatch])


    useEffect(() => {
        if (taskById) {
            dispatch(setAllUsersInProject(taskById.id))
        }
    }, [])


    if (isFetching) {
        return <div className={style.loader}><CircularIndeterminate/></div>
    }

    if (!taskById) {
        return <NoTaskPage/>
    }

    return (
        <Box sx={{flexGrow: 1}} style={{'padding': '2rem'}}>
            <div className={style.taskHeader}>
                <Button className={style.btnBack} onClick={() => navigate(-1)}><ArrowBackIcon/></Button>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <DeleteTask id={taskById.id} title={'Are you sure you want to delete the task?'}>
                        <Button variant="contained">Delete Task</Button>
                    </DeleteTask>
                    <TaskOption/>
                </div>
            </div>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <OutlinedCard data={taskById}/>
                    <div className={style.tracksBlock}>

                        <div style={{
                            margin: '0.5rem 1rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <h3>Tracks: </h3>
                            <FormDialogTrack userId={user && user.id} taskId={taskById.id}/>
                        </div>
                        <div className={style.tracksBlockItem}>
                            {tracksByTaskId && tracksByTaskId.length ? tracksByTaskId.map(track => <VirtualizedList
                                    key={track.id} tracks={track}/>) :
                                <div className={style.tracksBlockNoTracks}>No tracks</div>}
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Box>
    )
}
