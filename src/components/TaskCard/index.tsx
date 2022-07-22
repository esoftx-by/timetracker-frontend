import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {taskType} from "../../types";
// @ts-ignore
import style from './TaskCard.module.css'
import {FC, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppStateType} from "../../redux/store";
import {Select, SelectChangeEvent} from "@mui/material";
import {updateTask} from "../../redux/reducers/taskReducer";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";


type OwnToProps = {
    data: taskType
}

const OutlinedCard: FC<OwnToProps> = ({data}) => {

    const [editMode, setEditMode] = useState(false)

    const [localStatus, setLocalStatus] = useState(data.status)

    return (
        <Card variant="outlined" style={{borderRadius: "10px", margin:"1rem 0"}}>
            <React.Fragment>
                <CardContent>
                    <div className={style.taskCard}>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            {data.currentAssignee.firstName + ' ' + data.currentAssignee.lastName}
                        </Typography>
                        {!editMode ? <div style={{cursor: 'pointer'}} className={localStatus}
                                          onClick={() => setEditMode(true)}>{localStatus.replace('_', ' ')}</div> :
                            <BasicSelect setLocalStatus={setLocalStatus} setEditMode={setEditMode}/>}
                    </div>
                    <Typography variant="h5" component="div">
                        {data.name}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        {'Estimated time: ' + data.estimatedHours + ' hours'}
                    </Typography>
                    <Typography variant="body2">
                        {data.description}
                    </Typography>
                </CardContent>
            </React.Fragment>
        </Card>
    );
}

export default OutlinedCard


type OwnPropsType = {
    setEditMode: (p: boolean) => void
    setLocalStatus: (p: string) => void
}

const BasicSelect: FC<OwnPropsType> = ({setEditMode, setLocalStatus}) => {
    const activeStatus = useSelector((state: AppStateType) => state.tasks.taskById?.status)
    const taskId = useSelector((state: AppStateType) => state.tasks.taskById?.id)

    const [status, setStatus] = React.useState(activeStatus);

    const handleChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
    };

    const dispatch: AppDispatch = useDispatch()

    const statusValue: Array<string> = ['OPEN', 'IN_PROGRESS', 'IN_REVIEW', 'IN_TESTING', 'FINISHED', 'CANCELLED', 'LONG_TERM']

    const sendStatus = () => {
        setLocalStatus(status as string)
        dispatch(updateTask(taskId as number, null, null, null, status, null))
        setEditMode(false)
        // @ts-ignore
        // handleClose(false)
    }

    return (
        <Box sx={{minWidth: 80}}>
            <FormControl fullWidth>
                <Select
                    onBlur={sendStatus}
                    displayEmpty
                    value={status}
                    onChange={handleChange}
                    inputProps={{'aria-label': 'Without label'}}
                    defaultValue={activeStatus}
                >
                    {statusValue.map((el, index) => <MenuItem key={index} value={el}>{el.replace('_', ' ')}</MenuItem>)}
                </Select>
            </FormControl>
        </Box>
    );
}
