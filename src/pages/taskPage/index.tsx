import React, {FC, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppStateType} from "../../redux/store";
import {SetTaskByIdThunk} from "../../redux/reducers/taskReducer";
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
import {userType} from "../../types";
import {ProjectAPI} from "../../API/api";
import {setAllUsersInProject} from "../../redux/reducers/projectsReducer";



export const TaskPage: FC = (props) => {
    const params = useParams();
    let id: number = Number(params.id)
    const projectId = useSelector((state: AppStateType) => state.tasks.taskById?.project.id)
    const isFetching = useSelector((state: AppStateType) => state.tasks.isFetching)
    const taskById = useSelector((state: AppStateType) => state.tasks.taskById)
    const tracksByTaskId = useSelector((state: AppStateType) => state.tracks.tracksByTaskId?.reverse())
    const userId = useSelector((state: AppStateType) => state.auth.user?.id)


    const navigate = useNavigate()

    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        if (Number.isFinite(id)){
            dispatch(SetTaskByIdThunk(id))
            dispatch(setTracksByTaskIdThunk(id))
        }
    }, [id, dispatch])


    useEffect(() => {
        if (projectId) {
            dispatch(setAllUsersInProject(projectId as number))
        }
    }, [])



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
                <TaskOption/>
            </div>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    {/*<AlertDialogSlide/>*/}
                    <OutlinedCard data={taskById}/>
                    <div className={style.tracksBlock} style={{borderRadius:"10px" }}>

                        <div style={{margin: '0.5rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
                            <h3>Tracks: </h3>
                            <FormDialogTrack userId={userId as number} taskId={taskById.id}/>
                        </div>
                        <div className={style.tracksBlockItem}>
                            {tracksByTaskId && tracksByTaskId.length ? tracksByTaskId.map(track => <VirtualizedList tracks={track}/>) :
                                <div className={style.tracksBlockNoTracks}>No tracks</div>}
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Box>
    )
}
