import React, {FC, useEffect} from 'react'
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {SetTaskByIdThunk} from "../../redux/reducers/taskReducer";
import {taskType} from "../../types";
import {useParams} from "react-router-dom";
// @ts-ignore
import style from "../project/Project.module.css";
import CircularIndeterminate from "../../components/Loader";
import {Box, Grid} from "@mui/material";
import OutlinedCard from "../../components/TaskCard";


type TStateProps = {
    taskById: taskType | null
    isFetching: boolean
}

type TDispatchProps = {
    SetTaskByIdThunk: (id: number) => void
}

type OwnToProps = {}

type PropsType = TStateProps & TDispatchProps & OwnToProps

const TaskPage: FC<PropsType> = (props) => {
    const params = useParams();
    let id: number = Number(params.id)

    useEffect(() => {
        props.SetTaskByIdThunk(id)
    }, [id])

    if (props.isFetching) {
        return <div className={style.loader}><CircularIndeterminate/></div>
    }

    if (!props.taskById) {
        return <div>No such task found</div>
    }

    return (
        <Box sx={{flexGrow: 1}} style={{'padding': '2rem'}}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <OutlinedCard data={props.taskById}/>
                </Grid>
            </Grid>
        </Box>
    )
}

let mapStateToProps = (state: AppStateType): TStateProps => ({
    taskById: state.tasks.taskById,
    isFetching: state.tasks.isFetching
})

export default connect<TStateProps, TDispatchProps, OwnToProps, AppStateType>(mapStateToProps, {SetTaskByIdThunk})(TaskPage)
