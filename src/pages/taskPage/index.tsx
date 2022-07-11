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


export const TaskPage: FC = (props) => {
    const params = useParams();
    let id: number = Number(params.id)

    const isFetching = useSelector((state: AppStateType) => state.tasks.isFetching)
    const taskById = useSelector((state: AppStateType) => state.tasks.taskById)

    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(SetTaskByIdThunk(id))
    }, [id])

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
                </Grid>
            </Grid>
        </Box>
    )
}
