import React, {FC} from 'react';
import {useDispatch} from "react-redux";
import {Box, Select, SelectChangeEvent} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import {updateTask} from "../../redux/reducers/thunk-creators/taskThunk";
import {AppDispatch} from "../../redux/store";


type OwnPropsType = {
    taskId: number
    activeStatus: string
    setEditMode: (p: boolean) => void
    setLocalStatus: (p: string) => void
}

const SelectStatus: FC<OwnPropsType> = ({activeStatus, setLocalStatus, taskId, setEditMode}) => {

    const statusValue: string[] = ['OPEN', 'IN_PROGRESS', 'IN_REVIEW', 'IN_TESTING', 'FINISHED', 'CANCELLED', 'LONG_TERM']

    const handleChange = (event: SelectChangeEvent) => {
        setLocalStatus(event.target.value as string);
    };

    const dispatch: AppDispatch = useDispatch()

    const sendStatus = () => {
        dispatch(updateTask(taskId, null, null, null, activeStatus, null))
        setEditMode(false)
    }

    return (
        <Box sx={{minWidth: 80}}>
            <FormControl fullWidth>
                <Select
                    onBlur={sendStatus}
                    displayEmpty
                    value={activeStatus}
                    onChange={handleChange}
                    inputProps={{'aria-label': 'Without label'}}
                    defaultValue={activeStatus}
                >
                    {statusValue.map((el, index) => <MenuItem key={index} value={el}>{el.replace('_', ' ')}</MenuItem>)}
                </Select>
            </FormControl>
        </Box>
    );
};

export default SelectStatus;
