import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import MenuItem from "@mui/material/MenuItem";
import {useDispatch, useSelector} from "react-redux";
import {ProjectType} from "../../types";
import {FC, useLayoutEffect, useState} from "react";
import {AppDispatch} from "../../redux/store";
import {setAllUsersInProjectSelector, successMessageSelector} from "../../redux/selectors/projectSelector";
import FormControl from "@mui/material/FormControl";
import {Alert, Box, Fade, Select, SelectChangeEvent} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import {deleteUserInProjectThunk, setAllUsersInProject} from "../../redux/reducers/thunk-creators/projectThunk";
import ModalWindow from "../Modal";
import {actionsProject} from "../../redux/reducers/projectsReducer";


type OwnToProps = {
    project: ProjectType
    handleCloseBtn: (p: any) => void
}

const DeleteUserInProject: FC<OwnToProps> = ({project, handleCloseBtn}) => {

    const allUsersInProject = useSelector(setAllUsersInProjectSelector)

    const dispatch: AppDispatch = useDispatch()

    const [localUser, setLocalUser] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false);
    const [error, setError] = useState(false)
    const success = useSelector(successMessageSelector)

    const handleChange = (event: SelectChangeEvent) => {
        setLocalUser(event.target.value as string);
    };

    useLayoutEffect(() => {
        dispatch(setAllUsersInProject(project.id))
    }, [])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const sendStatus = () => {
        if (localUser){
            dispatch(deleteUserInProjectThunk(+localUser))
            setError(false)
            setTimeout(() => {
                dispatch(actionsProject.successMessage(false))
            }, 3000)
        } else {
            setError(true)
        }
    }

    return (
        <div>
            <ModalWindow title={'Delete user'}  open={open}
                         setOpen={setOpen} buttonComponent={<MenuItem onClick={handleClickOpen} disableRipple>
                <PersonRemoveIcon/>
                Delete User
            </MenuItem>}>
                <Box sx={{minWidth: 250, marginBottom: '1rem'}}>
                    <FormControl fullWidth style={{marginTop: '1rem'}} error={!localUser && error}>
                        <InputLabel id="demo-simple-select-label">User</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="User"
                            value={localUser}
                            onChange={handleChange}
                        >
                            {allUsersInProject.map((el, index) => <MenuItem key={index}
                                                                            value={el.id}>{el.email}</MenuItem>)}
                        </Select>
                        <br/>
                        <Button variant="contained" onClick={sendStatus}>Send</Button>
                    </FormControl>
                </Box>
                <Fade in={error} unmountOnExit><Alert
                    onClose={() => setError(false)} severity="error">Specify user</Alert></Fade>
                <Fade in={success} unmountOnExit><Alert
                    onClose={() => dispatch(actionsProject.successMessage(false))} severity="success">User deleted</Alert></Fade>
            </ModalWindow>
        </div>
    );
}

export default DeleteUserInProject
