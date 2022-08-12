import React, {useEffect, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/timegrid";
import {useDispatch, useSelector} from "react-redux";
import {userDataSelector} from "../../redux/selectors/authSelectors";
import {setAllTracksByUserIdThunk} from "../../redux/reducers/thunk-creators/trackThunk";
import {allTracksByUserIdSelector, isFetchingTrackSelector} from "../../redux/selectors/trackSelectors";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import style from './CalendarPage.module.css'
import CircularIndeterminate from "../../components/Loader";
import {AppDispatch} from "../../redux/store";
import {setProjectsByUserIdThunk} from "../../redux/reducers/thunk-creators/projectThunk";
import {setProjectsByUserSelector} from "../../redux/selectors/projectSelector";
import MenuItem from "@mui/material/MenuItem";
import {Select} from "@mui/material";
import {Helmet} from "react-helmet-async";

const CalendarPage = () => {

    const [projectName, setProjectName] = useState<string>('')

    const {id} = useSelector(userDataSelector)
    const isFetching = useSelector(isFetchingTrackSelector)

    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(setProjectsByUserIdThunk(id))
    }, [])

    const allProjectsByUser = useSelector(setProjectsByUserSelector)
    // @ts-ignore
    const newArrayProjects = [...new Set(allProjectsByUser.map(hs => hs.name))];


    useEffect(() => {
        dispatch(setAllTracksByUserIdThunk(id))
    }, [projectName])

    const allTracksByUserId = useSelector(allTracksByUserIdSelector)

    const newAllTracksUserId = allTracksByUserId.filter((el) => projectName === '' ? el : el.task.project.name === projectName)

    const events: Array<object> = newAllTracksUserId.map(function (obj) {
        return {
            'id': obj.id,
            'title': obj.task.name,
            'start': new Date(obj.startTime).setMilliseconds(3 * 60 * 60 * 1000),
            'end': new Date(obj.endTime).setMilliseconds(3 * 60 * 60 * 1000)
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
                        <em>All</em>
                    </MenuItem>
                    {newArrayProjects.map((el, index) => <MenuItem key={index}
                                                                   value={el}><em>{el}</em></MenuItem>)}
                </Select>
            </div>
            <FullCalendar
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
                    resourceTimeGridPlugin]}
                themeSystem="bootstrap"
                events={events}

            />
        </div>
    );
};

export default CalendarPage;
