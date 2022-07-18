import React, {FC, useEffect} from 'react'
import './mainPage.scss'
import {Grid} from "@mui/material";
import Box from "@mui/material/Box";
import CircularIndeterminate from "../../components/Loader";
import {useDispatch, useSelector} from "react-redux";
import {setAllTaskUserIdThunk} from "../../redux/reducers/taskReducer";
import OutlinedCard from "../../components/TaskCard";
import {AppDispatch, AppStateType} from "../../redux/store";
import {allTasksProjectType, userType} from "../../types";
import {Helmet} from "react-helmet-async";
import {NavLink} from "react-router-dom";
// @ts-ignore
import style from "../project/Project.module.css";



type OwnToProps = {
    userId: number
    user: userType | null
}

export const MainPage: FC<OwnToProps> = (props) => {

    const FILTER_STATUSES = ['FINISHED', 'CANCELLED', 'LONG_TERM']

    const dispatch: AppDispatch = useDispatch()
    const isFetching = useSelector((state: AppStateType) => state.tasks.isFetching)
    const allTasksUserId = useSelector((state: AppStateType) => state.tasks.taskUserId).filter(task => !FILTER_STATUSES.includes(task.status))

    useEffect(() => {
        dispatch(setAllTaskUserIdThunk(props.userId))
    }, [props.userId])
    if (isFetching) {
        return <div className={style.loader}><CircularIndeterminate/></div>

    }
    if (!allTasksUserId) {
        return <Box sx={{flexGrow: 1}}><Grid container spacing={3}><CircularIndeterminate/></Grid></Box>
    }

    // @ts-ignore
    const comparator = (t1: allTasksProjectType, t2: allTasksProjectType): number => STATUS_ORDER[t1.status] - STATUS_ORDER[t2.status];

    return <div className="mainPage">
        <Helmet>
            <title>{props.user && props.user.firstName + ' ' + props.user.lastName}</title>
        </Helmet>
        <div className="mainPage__item">
            <h1>List of my tasks:</h1>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={3}>
                    {allTasksUserId.length ? allTasksUserId.sort(comparator).map(data => <Grid item xs={12}
                                                                              md={4}><Box
                            sx={{maxWidth: 500}}><NavLink to={`/task/${data.id}`}><OutlinedCard
                            key={data.id}
                            data={data}/></NavLink></Box></Grid>) :
                        <Grid item xs={12} md={12}><h2>No Tasks</h2></Grid>}
                </Grid>
            </Box>
        </div>
    </div>
}




