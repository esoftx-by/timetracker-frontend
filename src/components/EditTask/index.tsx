import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {useEffect, useState} from "react";
import {updateTask} from "../../redux/reducers/thunk-creators/taskThunk";
import MenuItem from "@mui/material/MenuItem";
import {Select, SelectChangeEvent} from "@mui/material";
import {setTaskByIdSelector} from "../../redux/selectors/taskSelectors";
import {setAllUsersInProjectSelector} from "../../redux/selectors/projectSelector";
import {setAllUsersInProject} from "../../redux/reducers/thunk-creators/projectThunk";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const TaskOption = () => {


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };
    const dispatch: AppDispatch = useDispatch()

    const {name, description, estimatedHours, id, project, currentAssignee} = useSelector(setTaskByIdSelector)

    const allUsersInProject = useSelector(setAllUsersInProjectSelector)


    useEffect(() => {
        dispatch(setAllUsersInProject(project.id))
    }, [currentAssignee])


    const [data, setData] = useState({
        taskName: name,
        taskDescription: description,
        taskEstimatedHours: estimatedHours,
        activeCurrentAssignee: currentAssignee.id
    })


    const handleChange = (event: SelectChangeEvent) => {
        setData({...data, activeCurrentAssignee: event.target.value as any});
    };

    const submitFunction = () => {
        dispatch(updateTask(id, data.taskName, data.taskDescription, data.taskEstimatedHours, null, data.activeCurrentAssignee))
        handleClose()
    }


    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Edit task
            </Button>


            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Editing a task. Change data or click cancel."}</DialogTitle>
                <Box sx={{minWidth: 300}}>
                    <DialogContent>
                        <Box
                            sx={{
                                '& > :not(style)': {width: '100%', margin: '.5rem 0'},
                            }}>
                            <TextField
                                id="standard-helperText"
                                label="Name"
                                defaultValue={name}
                                variant="outlined"
                                value={data.taskName}
                                onChange={event => setData({...data, taskName: event.target.value})}
                            />
                        </Box>

                        <Box
                            sx={{
                                '& > :not(style)': {width: '100%', margin: '.5rem 0'},
                            }}>
                            <TextField
                                id="standard-helperText"
                                label="Description"
                                defaultValue={description}
                                variant="outlined"
                                value={data.taskDescription}
                                onChange={event => setData({...data, taskDescription: event.target.value})}
                            />
                        </Box>

                        <Box
                            sx={{
                                '& > :not(style)': {width: '100%', margin: '.5rem 0'},
                            }}>
                            <TextField
                                id="standard-helperText"
                                label="estimatedHours"
                                defaultValue={estimatedHours}
                                variant="outlined"
                                value={data.taskEstimatedHours}
                                onChange={event => setData({...data, taskEstimatedHours: event.target.value as any})}
                            />
                        </Box>

                        <Box
                            sx={{
                                '& > :not(style)': {width: '100%', margin: '.5rem 0'},
                            }}>
                            <Select
                                displayEmpty
                                value={data.activeCurrentAssignee as any}
                                onChange={handleChange}
                                inputProps={{'aria-label': 'Without label'}}
                                defaultValue={currentAssignee ? currentAssignee.email : ''}
                            >
                                {allUsersInProject.map((el) => <MenuItem key={el.id}
                                                                         value={el.id}>{el.email}</MenuItem>)}
                            </Select>
                        </Box>
                        <Box
                            sx={{
                                '& > :not(style)': {width: '100%', margin: '.5rem 0'},
                            }}>
                            <Button variant="outlined" onClick={submitFunction}>send</Button>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Сancel</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}

export default TaskOption
