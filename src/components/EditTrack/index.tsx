import * as React from 'react';
import TextField from '@mui/material/TextField';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import Stack from '@mui/material/Stack';
import Utilities from "../../utilities";
import {Alert, Button, Fade} from '@mui/material';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import {FC, useState} from "react";
import {AppDispatch} from "../../redux/store";
import {useDispatch} from "react-redux";
import {updateTrackThunk} from "../../redux/reducers/thunk-creators/trackThunk";
import {AllTracksByProjectIdType} from "../../types";

type OwnToProps = {
    id: number
    handleClose: () => void
    tracks: AllTracksByProjectIdType
}

export const DateTimeValidation: FC<OwnToProps> = ({id, handleClose, tracks}) => {
    const [firstValue, setFirstValue] = useState<Date | null>(new Date(tracks.startTime));
    const [secondValue, setSecondValue] = useState<Date | null>(new Date(tracks.endTime));
    const [error, setError] = useState<boolean>(false)
    const dispatch: AppDispatch = useDispatch()
    const sendDate = () => {
        if (firstValue && secondValue) {
            dispatch(updateTrackThunk(id, Utilities.formatDateTime(firstValue), Utilities.formatDateTime(secondValue)))
            handleClose()
            setError(false)
        } else {
            setError(true)
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3} style={{marginTop: '.5rem'}}>
                <DateTimePicker
                    renderInput={(params) => <TextField {...params} />}
                    label="Enter date"
                    value={firstValue}
                    onChange={(newValue) => {
                        setFirstValue(newValue);
                    }}
                />
                <DateTimePicker
                    renderInput={(params) => <TextField {...params} />}
                    label="Enter date"
                    value={secondValue}
                    onChange={(newValue) => {
                        setSecondValue(newValue)
                    }}
                    minDateTime={firstValue}
                />
            </Stack>
            <div style={{marginTop: '1rem'}}>
                <Button endIcon={<ScheduleSendIcon/>} variant="contained" onClick={sendDate}>Send</Button>
            </div>
            <br/>
            <Fade in={error} unmountOnExit><Alert
                onClose={() => setError(false)} severity="error">
                Fill in the fields</Alert></Fade>
        </LocalizationProvider>
    );
}
