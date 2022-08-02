import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {deleteTaskThunk} from "../../redux/reducers/taskReducer";
import {useNavigate} from "react-router-dom";
import {setTaskByIdSelector} from "../../redux/selectors/taskSelectors";

type OwnToProps = {
    open: boolean
    handleClickOpen: () => void
    handleClose: () => void

}

export const DeleteTask: FC<OwnToProps> = ({handleClickOpen, open, handleClose}) => {

    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useSelector(setTaskByIdSelector)

    const deleteTask = () => {
        dispatch(deleteTaskThunk(id))
        navigate(-1)
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete the task?"}
                </DialogTitle>
                <DialogContent>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={deleteTask} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
