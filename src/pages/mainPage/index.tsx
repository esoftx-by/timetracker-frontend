import React, {FC, useEffect} from 'react'
import './mainPage.scss'
import {Grid} from "@mui/material";
import Box from "@mui/material/Box";
import CircularIndeterminate from "../../components/Loader";
import {useDispatch, useSelector} from "react-redux";
import {setAllTaskUserIdThunk} from "../../redux/reducers/taskReducer";
import OutlinedCard from "../../components/TaskCard";
import {AppDispatch, AppStateType} from "../../redux/store";
import {userType} from "../../types";
import {Helmet} from "react-helmet-async";
import {NavLink} from "react-router-dom";



type OwnToProps = {
    userId: number
    user: userType | null
}

export const MainPage: FC<OwnToProps> = (props) => {

    const dispatch: AppDispatch = useDispatch()

    const allTasksUserId = useSelector((state: AppStateType) => state.tasks.taskUserId)

    useEffect(() => {
        dispatch(setAllTaskUserIdThunk(props.userId))
    }, [])

    if (!allTasksUserId) {
        return <Box sx={{flexGrow: 1}}><Grid container spacing={3}><CircularIndeterminate/></Grid></Box>
    }

    return <div className="mainPage">
        <Helmet>
            <title>{props.user && props.user.firstName + ' ' + props.user.lastName}</title>
        </Helmet>
        <div className="mainPage__item">
            <h1>List of my tasks:</h1>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={3}>
                    {allTasksUserId.length ? allTasksUserId.map(data => <Grid item xs={12}
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




