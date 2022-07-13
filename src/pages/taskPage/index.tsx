import React, {FC, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppStateType} from "../../redux/store";
import {SetTaskByIdThunk} from "../../redux/reducers/taskReducer";
import {useParams} from "react-router-dom";
// @ts-ignore
import style from "../project/Project.module.css";
import CircularIndeterminate from "../../components/Loader";
import {Box, Grid} from "@mui/material";
import OutlinedCard from "../../components/TaskCard";
import {setTracksByTaskIdThunk} from "../../redux/reducers/trackReducer";
import VirtualizedList from "../../components/Track";


export const TaskPage: FC = (props) => {
    const params = useParams();
    let id: number = Number(params.id)

    const isFetching = useSelector((state: AppStateType) => state.tasks.isFetching)
    const taskById = useSelector((state: AppStateType) => state.tasks.taskById)
    const tracksByTaskId = useSelector((state: AppStateType) => state.tracks.tracksByTaskId)

    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        if (Number.isFinite(id)){
            dispatch(SetTaskByIdThunk(id))
            dispatch(setTracksByTaskIdThunk(id))
        }
    }, [id, dispatch])

    if (isFetching) {
        return <div className={style.loader}><CircularIndeterminate/></div>
    }

    if (!taskById) {
        return <div>No such task found</div>
    }

    return (
        <Box sx={{flexGrow: 1}} style={{'padding': '2rem'}}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <OutlinedCard data={taskById}/>
                    <div className={style.tracksBlock}>
                        <h3>Tracks: </h3>
                        {tracksByTaskId ? tracksByTaskId.map(track => <VirtualizedList tracks={track}/>) :
                            <div>No tracks</div>}
                    </div>
                </Grid>
            </Grid>
        </Box>
    )
}
