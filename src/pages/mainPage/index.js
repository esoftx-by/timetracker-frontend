import React, {Suspense, lazy, useEffect} from 'react'
import './mainPage.scss'
import {Grid} from "@mui/material";
import Box from "@mui/material/Box";
import {Helmet} from "react-helmet";
import CircularIndeterminate from "../../components/Loader";
import {connect} from "react-redux";
import {setAllTaskThunk, setAllTaskUserIdThunk} from "../../redux/reducers/taskReducer";
import {setAllTracksByUserIdThunk, setTracksByTaskIdThunk} from "../../redux/reducers/trackReducer";
import OutlinedCard from "../../components/TaskCard";

const MainPage = (props) => {

    useEffect(() => {
        props.setAllTaskUserIdThunk(props.userId)
        // props.setAllTracksByUserIdThunk(props.userId)
    }, [])


    // let AllTasksByUserId = props.allTasks.filter(tasks => tasks.currentAssignee.id === props.userId)

    return <div className="mainPage">
        <Helmet>
            <title>{props.user.firstName + ' ' + props.user.lastName}</title>
        </Helmet>
        <div className="mainPage__item">
            <h1>List of my tasks:</h1>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={3}>
                    {props.allTasksUserId.length ? props.allTasksUserId.map(data => <OutlinedCard key={data.id}  data={data}/>) :
                        <Grid item xs={12} md={12}><h2>No Tasks</h2></Grid>}
                </Grid>
            </Box>
        </div>
    </div>
}

let mapStateToProps = (state) => ({
    allTasksUserId: state.tasks.taskUsedId,
    allTracksByUserId: state.tracks.allTrackByUserId,
    user: state.auth.user
})


export default connect(mapStateToProps, {
    setAllTaskThunk,
    setAllTaskUserIdThunk,
    setAllTracksByUserIdThunk,
    setTracksByTaskIdThunk
})(MainPage)
