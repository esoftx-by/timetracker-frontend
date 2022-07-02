import * as React from 'react';
import style from './Track.module.css'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function VirtualizedList(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function getTimeFromMins(mins) {
        let hours = Math.trunc(mins / 60);
        let minutes = mins % 60;
        if (!minutes) {
            return hours + 'h '
        }
        return hours + 'h ' + minutes + 'm';
    };

    function getTimeISO(date){
        let time = new Date(date).toLocaleDateString()
        return time
    }
    let timeInMinutes = (new Date(props.traks.endTime) - new Date(props.traks.startTime)) / 1000 / 60



    return (
        <>
            <div onClick={handleClickOpen} className={style.newTrack}>
                <div>{props.traks.user.firstName + ' ' + props.traks.user.lastName}</div>
                <div>{getTimeFromMins(timeInMinutes)}</div>
            </div>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Track information"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {getTimeISO(props.traks.startTime)}
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description">
                            {getTimeFromMins(timeInMinutes)}
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description">
                            {props.traks.user.firstName + ' ' + props.traks.user.lastName}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}
