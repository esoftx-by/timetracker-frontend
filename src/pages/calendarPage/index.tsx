import React, {useEffect} from "react";
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

const CalendarPage = () => {

    const dispatch: AppDispatch = useDispatch()
    const {id} = useSelector(userDataSelector)
    const isFetching = useSelector(isFetchingTrackSelector)

    useEffect(() => {
        dispatch(setAllTracksByUserIdThunk(id))
    }, [])

    const allTracksByUserId = useSelector(allTracksByUserIdSelector)

    const events: Array<object> = allTracksByUserId.map(function (obj) {
        return {'id': obj.id, 'title': obj.task.name, 'start': new Date(obj.startTime).setMilliseconds(3 * 60 * 60 * 1000), 'end': new Date(obj.endTime).setMilliseconds(3 * 60 * 60 * 1000)}
    })

    if (isFetching){
        return <CircularIndeterminate/>
    }

    return (
        <div className={style.calendarPage}>

            <FullCalendar
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
