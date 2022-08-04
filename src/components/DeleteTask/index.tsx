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
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

type OwnToProps = {
    title: string
    id: number
    children:
        | JSX.Element
        | JSX.Element[]
        | string
        | string[];
}

export const DeleteTask: FC<OwnToProps> = ({children, id, title}) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch: AppDispatch = useDispatch()


    const deleteTask = () => {
        dispatch(deleteTaskThunk(id))
        setOpen(false)
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>{children}</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
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
