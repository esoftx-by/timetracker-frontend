import React, {useEffect, useState} from "react";
import FullCalendar, {EventSourceInput} from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/timegrid";
import {useDispatch, useSelector} from "react-redux";
import {setAllUsersSelector, userDataSelector} from "../../redux/selectors/authSelectors";
import {setAllTracksByUserIdThunk, SetAllTracksThunks} from "../../redux/reducers/thunk-creators/trackThunk";
import {
    allTracksByUserIdSelector,
    isFetchingTrackSelector,
    setAllTracksSelector
} from "../../redux/selectors/trackSelectors";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import style from './CalendarPage.module.css'
import CircularIndeterminate from "../../components/Loader";
import {AppDispatch} from "../../redux/store";
import {setProjectsByUserIdThunk, setProjectsThunk} from "../../redux/reducers/thunk-creators/projectThunk";
import {setProjectsByUserSelector, setProjectsSelector} from "../../redux/selectors/projectSelector";
import MenuItem from "@mui/material/MenuItem";
import {Select} from "@mui/material";
import {Helmet} from "react-helmet-async";
import Utilities from "../../utilities";
import {useNavigate} from "react-router-dom";
import {AllTracksByProjectIdType, Events} from "../../types";
import {useProjectSorted, UseSortedTracks, useUsersFilet} from "../../Hooks/calendar.hooks";
import {setAllUsersThunk} from "../../redux/reducers/thunk-creators/authThunk";


import bootstrap5Plugin from '@fullcalendar/bootstrap5';

const CalendarPage = () => {

    const [projectName, setProjectName] = useState<string>('')
    const [userName, setUserName] = useState<string>('')

    const {id, applicationRole} = useSelector(userDataSelector)
    const isFetching = useSelector(isFetchingTrackSelector)
    const allProjects = useSelector(setProjectsSelector)
    const allProjectsByUser = useSelector(setProjectsByUserSelector)
    const allTracks = useSelector(setAllTracksSelector)
    const allTracksByUserId = useSelector(allTracksByUserIdSelector)
    const allUsers = useSelector(setAllUsersSelector)

    const projectSorted = useProjectSorted(allProjects, allProjectsByUser, applicationRole)
    const sortedTracks = UseSortedTracks(allTracks as AllTracksByProjectIdType[], allTracksByUserId, applicationRole, projectName)
    const sortedByUserName = useUsersFilet(userName, sortedTracks)
    const navigate = useNavigate()

    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        if (applicationRole === 'ADMIN') {
            dispatch(setProjectsThunk())
        } else {
            dispatch(setProjectsByUserIdThunk(id))
        }
    }, [])

    useEffect(() => {
        if (applicationRole === 'ADMIN') {
            dispatch(SetAllTracksThunks())
        } else {
            dispatch(setAllTracksByUserIdThunk(id))
        }
    }, [projectName])

    useEffect(() => {
        if (applicationRole === 'ADMIN') {
            dispatch(setAllUsersThunk())
        }
    }, [])

    const eventClick = (info: any) => {
        info.jsEvent.preventDefault();

        if (info.event.url) {
            navigate(`/${info.event.url}`);
        }
    }

    const events: Events[] = sortedByUserName.map(function (obj) {
        return {
            'id': obj.id,
            'title': obj.task.name,
            'start': Utilities.timeZone(obj.startTime),
            'end': Utilities.timeZone(obj.endTime),
            'url': `task/${obj.task.id}`,
            'backgroundColor': Utilities.stringToColor(obj.task.project.name)
        }
    })

    if (isFetching) {
        return <CircularIndeterminate/>
    }

    return (
        <div className={style.calendarPage}>
            <Helmet>
                <title>Calendar</title>
            </Helmet>
            <div className={style.select}>
                <Select
                    displayEmpty
                    value={projectName}
                    onChange={(event) => {
                        setProjectName(event.target.value)
                    }}
                    inputProps={{'aria-label': 'Without label'}}
                >
                    <MenuItem value="">
                        <em>All projects</em>
                    </MenuItem>
                    {projectSorted.map((el, index) => <MenuItem key={index}
                                                                value={el}><em>{el}</em></MenuItem>)}
                </Select>
                {applicationRole === 'ADMIN' && <Select
                    displayEmpty
                    value={userName}
                    onChange={(event) => {
                        setUserName(event.target.value)
                    }}
                    inputProps={{'aria-label': 'Without label'}}
                    style={{marginLeft: '1rem'}}
                >
                    <MenuItem value="">
                        <em>All users</em>
                    </MenuItem>
                    {allUsers && allUsers.map((el) => <MenuItem key={el.id}
                                                                value={el.email}><em>{el.email}</em></MenuItem>)}
                </Select>}
            </div>
            <FullCalendar
                height={700}
                navLinks={true}
                eventClick={eventClick}
                schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
                initialView="timeGridWeek"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay"
                }}
                nowIndicator={true}
                plugins={[dayGridPlugin,
                    interactionPlugin,
                    timeGridPlugin,
                    resourceTimeGridPlugin,
                    bootstrap5Plugin]}
                themeSystem="standard"
                events={events as EventSourceInput}

            />
        </div>
    );
};

export default CalendarPage;
