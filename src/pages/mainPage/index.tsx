import React, {FC, useEffect, useState} from 'react'
import './mainPage.scss'
import {Grid, Select, SelectChangeEvent} from "@mui/material";
import Box from "@mui/material/Box";
import CircularIndeterminate from "../../components/Loader";
import {useDispatch, useSelector} from "react-redux";
import {setAllTaskUserIdThunk} from "../../redux/reducers/taskReducer";
import OutlinedCard from "../../components/TaskCard";
import {AppDispatch} from "../../redux/store";
import {AllTasksProjectType, UserType} from "../../types";
import {Helmet} from "react-helmet-async";
import {NavLink} from "react-router-dom";
import style from "../project/Project.module.css";
import {setIsFetchingTask, setTaskUserIdSelector} from "../../redux/selectors/taskSelectors";
import {setProjectByUserIdThunk} from "../../redux/reducers/projectsReducer";
import {setProjectsByUserSelector} from "../../redux/selectors/projectSelector";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";


type OwnToProps = {
    userId: number
    user: UserType | null
}

export const MainPage: FC<OwnToProps> = ({user, userId}) => {


    useEffect(() => {
        dispatch(setProjectByUserIdThunk(userId))

    }, [])


    const allProjectsByUser = useSelector(setProjectsByUserSelector)
    // @ts-ignore
    const newArrayProjects = [...new Set(allProjectsByUser.map(hs => hs.name))];

    const FILTER_STATUSES = ['FINISHED', 'CANCELLED', 'LONG_TERM']
    const STATUS_ORDER: any = {
        LONG_TERM: 0,
        OPEN: 1,
        IN_PROGRESS: 2,
        IN_TESTING: 3,
        IN_REVIEW: 4,
        FINISHED: 5,
        CANCELLED: 6
    }

    const dispatch: AppDispatch = useDispatch()
    const isFetching = useSelector(setIsFetchingTask)
    const allTasksUserId = useSelector(setTaskUserIdSelector)
        .filter(task => !FILTER_STATUSES.includes(task.status))
        .sort((a, b) => a.project.name.localeCompare(b.project.name))
        .sort((t1: AllTasksProjectType, t2: AllTasksProjectType): number => STATUS_ORDER[t1.status] - STATUS_ORDER[t2.status])


    useEffect(() => {
        dispatch(setAllTaskUserIdThunk(userId))
    }, [userId])


    const [projectName, setProjectName] = useState<string>('')

    const newAllTasksUserId = allTasksUserId.filter((el) => projectName === '' ? el : el.project.name === projectName)

    if (isFetching) {
        return <div className={style.loader}><CircularIndeterminate/></div>

    }
    if (!allTasksUserId) {
        return <Box sx={{flexGrow: 1}}><Grid container spacing={3}><CircularIndeterminate/></Grid></Box>
    }

    const handleChange = (event: SelectChangeEvent) => {
        setProjectName(event.target.value);
    };

    return <div className="mainPage">
        <Helmet>
            <title>{user && user.firstName + ' ' + user.lastName}</title>
        </Helmet>
        <div className="mainPage__item">
            <div className="mainPage__item_header">
                <h1>List of my tasks:</h1>
                <FormControl fullWidth style={{marginTop: '1rem', width: '100px'}}>
                    <Select
                        displayEmpty
                        value={projectName}
                        onChange={handleChange}
                        inputProps={{'aria-label': 'Without label'}}
                    >
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        {newArrayProjects.map((el, index) => <MenuItem key={index}
                                                                       value={el}><em>{el}</em></MenuItem>)}
                    </Select>
                </FormControl>
            </div>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={3}>
                    {newAllTasksUserId.length ? newAllTasksUserId.map(data => <Grid item xs={12}
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




