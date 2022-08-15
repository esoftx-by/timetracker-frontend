import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, {MenuProps} from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {FC, useState} from "react";
import {Box} from "@mui/material";
import RegistrationForm from "../RegistrationForm";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {ProjectType, UserType} from "../../types";
import {TransitionProps} from "@mui/material/transitions";
import DeleteUserInProject from "../DeleteUserInProject";
import NewUser from "../NewUser";
import UpdateProject from "../UpdateProject";

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({theme}) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

type OwnToPropsCustomizedMenus = {
    project: ProjectType
    allUsers: Array<UserType> | null
}

export const CustomizedMenus: FC<OwnToPropsCustomizedMenus> = ({project, allUsers}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseBtn = () => {
        setAnchorEl(null);
    };


    return (
        <div>
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon/>}
            >
                Options
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseBtn}
            >
                <AlertDialogSlide project={project}/>
                <DeleteUserInProject project={project}/>
                <UpdateProject project={project}/>
            </StyledMenu>
        </div>
    );
}

export default CustomizedMenus

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


type OwnToPropsAlertDialogSlide = {
    project: ProjectType
}


const AlertDialogSlide: FC<OwnToPropsAlertDialogSlide> = ({project}) => {
    const [newUser, setNewUser] = useState(false)

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <MenuItem onClick={handleClickOpen} disableRipple>
                <AddIcon/>
                Add User
            </MenuItem>
            <Dialog
                open={open}
                fullWidth={true}
                maxWidth={'sm'}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >{newUser ? <><RegistrationForm/><Button onClick={() => {
                    setNewUser(false)
                }}>Back</Button></> :
                <>
                    <div className="modalUser">
                        <DialogTitle>{"Add a user to the project"}</DialogTitle>
                        <Box sx={{
                            '& > :not(style)': {width: '20ch', 'margin': '0 auto'},
                        }}><Button className="newUserBtn" onClick={() => setNewUser(true)}
                                   endIcon={<PersonAddIcon/>} variant="contained" size="small" type="submit">
                            New User
                        </Button>
                        </Box>
                    </div>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <NewUser projectId={project.id} newUser={newUser}/>
                        </DialogContentText>
                    </DialogContent>
                </>
            }
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}






