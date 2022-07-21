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
import {AppDispatch, AppStateType} from "../../redux/store";
import {useEffect, useState} from "react";
import {updateTask} from "../../redux/reducers/taskReducer";
import MenuItem from "@mui/material/MenuItem";
import {Select, SelectChangeEvent} from "@mui/material";
import {setAllUsersInProject} from "../../redux/reducers/projectsReducer";

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
    // const projectId = useSelector((state: AppStateType) => state.tasks.taskById?.project.id)
    const taskId = useSelector((state: AppStateType) => state.tasks.taskById?.id)

    const taskName = useSelector((state: AppStateType) => state.tasks.taskById?.name)
    const taskDescription = useSelector((state: AppStateType) => state.tasks.taskById?.description)
    const taskEstimatedHours = useSelector((state: AppStateType) => state.tasks.taskById?.estimatedHours)
    const activeCurrentAssignee = useSelector((state: AppStateType) => state.tasks.taskById?.currentAssignee)
    const allUsersInProject = useSelector((state: AppStateType) => state.projectsPage.allUsersInProject)

    const projectId = useSelector((state: AppStateType) => state.tasks.taskById?.project.id)

    useEffect(() => {
        if (projectId) {
            dispatch(setAllUsersInProject(projectId as number))
        }
    }, [activeCurrentAssignee])


    const [name, setName] = useState(taskName)
    const [description, setDescription] = useState(taskDescription)
    const [estimatedHours, setEstimatedHours] = useState(taskEstimatedHours)
    const [currentAssignee, setCurrentAssigneeId] = React.useState(activeCurrentAssignee && activeCurrentAssignee.id);


    const handleChange = (event: SelectChangeEvent) => {
        setCurrentAssigneeId(event.target.value as any);
    };

    const submitFunction = () => {
        dispatch(updateTask(taskId as number, name, description, estimatedHours, null, currentAssignee))
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
                                value={name}
                                onChange={event => setName(event.target.value)}
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
                                value={description}
                                onChange={event => setDescription(event.target.value)}
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
                                value={estimatedHours}
                                onChange={event => setEstimatedHours(event.target.value as any)}
                            />
                        </Box>

                        <Box
                            sx={{
                                '& > :not(style)': {width: '100%', margin: '.5rem 0'},
                            }}>
                            <Select
                                displayEmpty
                                value={currentAssignee as any}
                                onChange={handleChange}
                                inputProps={{'aria-label': 'Without label'}}
                                defaultValue={activeCurrentAssignee && activeCurrentAssignee.email}
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
