import * as React from 'react';
import style from './Track.module.css'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {AllTracksByProjectIdType} from "../../types";
import {FC, useState} from "react";
import {deleteTrackThunk} from "../../redux/reducers/thunk-creators/trackThunk";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {DeleteModal} from "../DeleteModal";
import Utilities from "../../utilities";
import ModalWindow from "../Modal";
import {DateTimeValidation} from "../EditTrack/index";
import moment from 'moment';

type OwnToProps = {
    tracks: AllTracksByProjectIdType
}

const VirtualizedList: FC<OwnToProps> = ({tracks}) => {

    const dispatch: AppDispatch = useDispatch()

    const [open, setOpen] = React.useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function getTimeISO(date: string) {
        return moment(Utilities.timeZone(new Date(date))).format('MMMM Do YYYY, h:mm a')
    }

    let endTime: number = +(new Date(tracks.endTime))
    let startTime: number = +(new Date(tracks.startTime))
    let timeInMinutes = (endTime - startTime) / 1000 / 60

    let deleteTrack = () => {
        dispatch(deleteTrackThunk(tracks.id))
        setOpen(false);
    }
    return (
        <>
            <div onClick={handleClickOpen} className={style.newTrack}>
                <div>{tracks.user.firstName + ' ' + tracks.user.lastName}</div>
                <div>{Utilities.getTimeFromMins(timeInMinutes)}</div>
            </div>

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
                        <b>{getTimeISO(tracks.startTime)}</b>
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        {Utilities.getTimeFromMins(timeInMinutes)}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        {tracks.user.firstName + ' ' + tracks.user.lastName}
                    </DialogContentText>
                    <div className={style.trackModalBtn}>
                        <ModalWindow title="Edit track. Please indicate the time." btnName="Edit Track"
                                     btnType="outlined" open={openModal} setOpen={setOpenModal}>
                            <DateTimeValidation setOpen={setOpenModal} tracks={tracks} id={tracks.id}/>
                        </ModalWindow>
                        <DeleteModal callback={deleteTrack} title={'Are you sure you want to delete the track?'}>
                            <Button variant="contained">Delete track</Button>
                        </DeleteModal>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default VirtualizedList
