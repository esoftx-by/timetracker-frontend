import React, {FC, useEffect, useMemo, useState} from 'react'
import './mainPage.scss'
import {Grid, Select, SelectChangeEvent} from "@mui/material";
import Box from "@mui/material/Box";
import CircularIndeterminate from "../../components/Loader";
import {useDispatch, useSelector} from "react-redux";
import {setAllTaskUserIdThunk} from "../../redux/reducers/thunk-creators/taskThunk";
import OutlinedCard from "../../components/TaskCard";
import {AppDispatch} from "../../redux/store";
import {AllTasksProjectType} from "../../types";
import {Helmet} from "react-helmet-async";
import {NavLink} from "react-router-dom";
import style from "../project/Project.module.css";
import {setIsFetchingTask, setTaskUserIdSelector} from "../../redux/selectors/taskSelectors";
import {setProjectsByUserSelector} from "../../redux/selectors/projectSelector";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import {userDataSelector} from "../../redux/selectors/authSelectors";
import {setProjectsByUserIdThunk} from "../../redux/reducers/thunk-creators/projectThunk";


export const MainPage: FC = () => {

    const {id, firstName, lastName} = useSelector(userDataSelector)

    useEffect(() => {
        dispatch(setProjectsByUserIdThunk(id))
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
    const filterTasksStatuses = allTasksUserId.filter(task => !FILTER_STATUSES.includes(task.status))

    const [projectName, setProjectName] = useState<string>('')
    const [searchQuery, setSearchQuery] = useState<string>('')

    const allTasksUserIdFilter = useMemo(() => {
        return [...filterTasksStatuses]
            .sort((a, b) => a.project.name.localeCompare(b.project.name))
            .sort((t1: AllTasksProjectType, t2: AllTasksProjectType): number => STATUS_ORDER[t1.status] - STATUS_ORDER[t2.status])
    }, [projectName, allTasksUserId])


    useEffect(() => {
        dispatch(setAllTaskUserIdThunk(id))
    }, [id])


    const newAllTasksUserId = allTasksUserIdFilter.filter((el) => projectName === '' ? el : el.project.name === projectName)

    const sortedAndSearchedPost = useMemo(() => {
        return newAllTasksUserId.filter(el => el.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [searchQuery, allTasksUserIdFilter])

    if (isFetching) {
        return <CircularIndeterminate/>

    }
    if (!allTasksUserId) {
        return <Box sx={{flexGrow: 1}}><Grid container spacing={3}><CircularIndeterminate/></Grid></Box>
    }

    const handleChange = (event: SelectChangeEvent) => {
        setProjectName(event.target.value);
    };

    return <div className="mainPage">
        <Helmet>
            <title>{firstName + ' ' + lastName}</title>
        </Helmet>
        <div className="mainPage__item">
            <div className="mainPage__item_header">
                <h1>List of my tasks:</h1>
                {allTasksUserId.length ? <div className="mainPage__item_filter">
                    <TextField style={{marginRight: '.5rem'}} id="outlined-basic" label="Task Name" variant="outlined"
                               value={searchQuery}
                               onChange={event => setSearchQuery(event.target.value)}/>
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
                </div> : ''}
            </div>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={3}>
                    {sortedAndSearchedPost.length ? sortedAndSearchedPost.map(data => <Grid item xs={12}
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




