import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import {FC, useState} from "react";
import {Alert, Select, SelectChangeEvent} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppStateType} from "../../redux/store";
import {TaskAPI} from "../../API/api";
import {updateTask} from "../../redux/reducers/taskReducer";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "flex-end", margin: "0 0 1rem"}}>
            <Button variant="outlined" onClick={handleClickOpen}>
                Change status
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Change status"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <BasicSelect handleClose={handleClose}/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


type OwnPropsType = {
    handleClose: () => void
}

const BasicSelect:FC<OwnPropsType> = ({handleClose}) => {
    const activeStatus = useSelector((state: AppStateType) => state.tasks.taskById?.status)
    const taskId = useSelector((state: AppStateType) => state.tasks.taskById?.id)

    const [error, setError] = useState<boolean>(false)
    const [status, setStatus] = React.useState('');
    const [viewBtn, setViewBtn] = useState<boolean>(false)

    const handleChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
        setViewBtn(true)
    };

    const dispatch: AppDispatch = useDispatch()

    const sendStatus = () => {
        if (activeStatus === status){
            setError(true)
        } else {
            setError(false)
            // TaskAPI.updateTaskStatus(taskId as number, null, null, null, status, null)
            dispatch(updateTask(taskId as number, null, null, null, status, null))
            console.log(status)
            // @ts-ignore
            handleClose(false)
        }
    }

    return (
        <Box sx={{ minWidth: 220, marginTop: 1 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Status"
                    onChange={handleChange}
                >
                    <MenuItem value={'OPEN'}>OPEN</MenuItem>
                    <MenuItem value={'IN_PROGRESS'}>IN PROGRESS</MenuItem>
                    <MenuItem value={'IN_REVIEW'}>IN REVIEW</MenuItem>
                    <MenuItem value={'IN_TESTING'}>IN TESTING</MenuItem>
                    <MenuItem value={'FINISHED'}>FINISHED</MenuItem>
                    <MenuItem value={'CANCELLED'}>CANCELLED</MenuItem>
                    <MenuItem value={'LONG_TERM'}>LONG_TERM</MenuItem>
                </Select>
                <div>{error && <Alert severity="error">Status has not changed</Alert>}</div>
            </FormControl>
            <div style={{marginTop: 10}}>{viewBtn && <Button size="medium" variant="contained" onClick={sendStatus}>Send</Button>}</div>
        </Box>
    );
}
