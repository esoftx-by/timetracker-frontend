import React, {useEffect, Suspense, lazy} from 'react'
import './mainPage.scss'
import {Grid} from "@mui/material";
import Box from "@mui/material/Box";
import {connect} from "react-redux";
import {setAllTaskThunk} from "../../redux/reducers/taskReducer";
import {Helmet} from "react-helmet";
import CircularIndeterminate from "../../components/Loader";

const MainPage = (props) => {

    useEffect(()=>{
        props.setAllTaskThunk()
    },[])
    let AllTasksByUserId = props.allTasks.filter(tasks => tasks.currentAssignee.id === props.userId)
    const OutlinedCard = lazy(()=> import('../../components/TaskCard'))



    return <div className="mainPage">
        <Helmet>
            <title>{props.user.firstName + ' ' + props.user.lastName}</title>
        </Helmet>
        <div className="mainPage__item">
            <h1>List of my tasks:</h1>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={3}>
                    {AllTasksByUserId && AllTasksByUserId.map(data => <Suspense fallback={<CircularIndeterminate/>}><OutlinedCard data={data}/></Suspense>)}
                </Grid>
            </Box>
        </div>
    </div>
}

let mapStateToProps = (state) => ({
    allTasks: state.tasks.allTask,
    user: state.auth.user
})

export default connect(mapStateToProps, {setAllTaskThunk})(MainPage)
