import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {FC} from "react";


type OwnToProps = {
    callback: () => void
    variant?: "text" | "outlined" | "contained" | undefined
    title: string
    id?: number
    size?: "small" | "medium" | "large" | undefined
    children:
        | JSX.Element
        | JSX.Element[]
        | string
        | string[];
    endIcon?: JSX.Element
}

export const DeleteModal: FC<OwnToProps> = ({
                                                size,
                                                children,
                                                id,
                                                title
                                                , callback,
                                                endIcon,
                                                variant
                                            }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Button size={size && size} variant={variant && variant} style={{width: '100%'}} endIcon={endIcon ? endIcon : null}
                    onClick={handleClickOpen}>{children}</Button>
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
                    <Button onClick={callback} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
