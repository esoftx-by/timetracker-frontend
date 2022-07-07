import * as React from 'react';
// @ts-ignore
import style from './Track.module.css'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {allTasksProjectType, allTracksByProjectIdType, projectType} from "../../types";
import {FC} from "react";

type OwnToProps = {
    tracks: allTracksByProjectIdType
}

const VirtualizedList:FC<OwnToProps> = ({tracks}) => {

    const [open, setOpen] = React.useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function getTimeFromMins(mins: number) {
        let hours = Math.trunc(mins / 60);
        let minutes = mins % 60;
        if (!minutes) {
            return hours + 'h '
        } else if (!hours) {
            return minutes + 'm'
        }
        return hours + 'h ' + minutes + 'm';
    };

    function getTimeISO(date: string) {
        return new Date(date).toLocaleDateString()
    }

    let endTime: number = +(new Date(tracks.endTime))
    let startTime: number = +(new Date(tracks.startTime))


    let timeInMinutes = (endTime - startTime) / 1000 / 60


    return (
        <>
            <div onClick={handleClickOpen} className={style.newTrack}>
                <div>{tracks.user.firstName + ' ' + tracks.user.lastName}</div>
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
                            {getTimeISO(tracks.startTime)}
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description">
                            {getTimeFromMins(timeInMinutes)}
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description">
                            {tracks.user.firstName + ' ' + tracks.user.lastName}
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

export default VirtualizedList