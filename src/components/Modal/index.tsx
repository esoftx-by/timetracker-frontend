import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import {FC} from "react";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


type OwnToProps = {
    title: string
    btnName?: string
    btnType?: "text" | "contained" | "outlined" | undefined
    children:
        | JSX.Element
        | JSX.Element[]
        | string
        | string[];
    open: boolean
    setOpen: (p: boolean) => void
    buttonComponent?: ReactJSXElement
    description?: string
}

const ModalWindow: FC<OwnToProps> = ({
                                         title,
                                         description,
                                         btnName,
                                         children,
                                         open,
                                         setOpen,
                                         btnType,
                                         buttonComponent
                                     }) => {

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {buttonComponent ? buttonComponent : <Button variant={btnType} onClick={handleClickOpen}>
                {btnName}
            </Button>}
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {description && description}
                    </DialogContentText>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ModalWindow
