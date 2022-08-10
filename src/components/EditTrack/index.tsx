import * as React from 'react';
import TextField from '@mui/material/TextField';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import Stack from '@mui/material/Stack';
import Utilities from "../../utilities";
import {Button} from '@mui/material';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import {FC} from "react";
import {AppDispatch} from "../../redux/store";
import {useDispatch} from "react-redux";
import {updateTrackThunk} from "../../redux/reducers/thunk-creators/trackThunk";

type OwnToProps = {
    id: number
}

export const DateTimeValidation: FC<OwnToProps> = ({id}) => {
    const [firstValue, setFirstValue] = React.useState<Date | null>(new Date());
    const [secondValue, setSecondValue] = React.useState<Date | null>(null);
    const dispatch: AppDispatch = useDispatch()
    const sendDate = () => {
        if (firstValue && secondValue) {
            dispatch(updateTrackThunk(id, Utilities.formatDateTime(firstValue), Utilities.formatDateTime(secondValue)))
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
        </LocalizationProvider>
    );
}
