import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import MenuItem from "@mui/material/MenuItem";
import {useDispatch, useSelector} from "react-redux";
import {projectType} from "../../types";
import {FC, useLayoutEffect, useState} from "react";
import {AppDispatch} from "../../redux/store";
import {deleteUserInProjectThunk, setAllUsersInProject} from "../../redux/reducers/projectsReducer";
import {setAllUsersInProjectSelector} from "../../redux/selectors/projectSelector";
import FormControl from "@mui/material/FormControl";
import {Box, Select, SelectChangeEvent} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";


type OwnToProps = {
    project: projectType
    handleCloseBtn: (p: any) => void
}

const DeleteUserInProject: FC<OwnToProps> = ({project,handleCloseBtn}) => {

    const allUsersInProject = useSelector(setAllUsersInProjectSelector)

    const [localUser, setLocalUser] = useState('')

    const handleChange = (event: SelectChangeEvent) => {
        setLocalUser(event.target.value as string);
    };

    const dispatch: AppDispatch = useDispatch()

    useLayoutEffect(() => {
        dispatch(setAllUsersInProject(project.id))
    }, [])


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const sendStatus = () => {
        dispatch(deleteUserInProjectThunk(+localUser))
        setOpen(false);
        handleCloseBtn(null)
    }

    return (
        <div>
            <MenuItem onClick={handleClickOpen} disableRipple>
                <PersonRemoveIcon/>
                Delete User
            </MenuItem>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete user"}
                </DialogTitle>
                <DialogContent>

                    <Box sx={{minWidth: 250}}>
                        <FormControl fullWidth style={{marginTop:'1rem'}}>
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
                        </FormControl>
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={sendStatus} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DeleteUserInProject
