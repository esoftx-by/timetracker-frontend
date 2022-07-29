import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, {MenuProps} from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import Dialog, {DialogProps} from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {Formik} from 'formik'
import Select from 'react-select';
import {ProjectAPI} from "../../API/api";
import {FC, useEffect, useState} from "react";
import SendIcon from "@mui/icons-material/Send";
import {Alert, Box} from "@mui/material";
import RegistrationForm from "../RegistrationForm";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {projectType, userType} from "../../types";
import {TransitionProps} from "@mui/material/transitions";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {setAllUsersThunk} from "../../redux/reducers/authReducer";
import DeleteUserInProject from "../DeleteUserInProject";

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
))(({ theme }) => ({
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
    project: projectType
    allUsers: Array<userType> | null
}

export const CustomizedMenus:FC<OwnToPropsCustomizedMenus> = ({project, allUsers}) => {
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
                <AlertDialogSlide handleCloseBtn={handleCloseBtn} allUsers={allUsers} project={project}/>
                <DeleteUserInProject handleCloseBtn={handleCloseBtn} project={project}/>
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


// @ts-ignore
const CustomSelect = ({onChange, options, value, className}) => {

    const defaultValue = (options: any, value: any) => {

        return options ? options.find((option: { value: any; }) => option.value === value) : "";
    };


    return (
        <div className={className}>
            <Select
                value={defaultValue(options, value)}
                onChange={value => {
                    onChange(value)

                }} options={options}/>
        </div>

    )
}

type roleType = {
    role: string
    label: string
}

const role: Array<roleType> = [
    {role: 'DEVELOPER', label: 'DEV'},
    {role: 'TEAM_LEAD', label: 'TEAM LEAD'},
    {role: 'PROJECT_MANAGER', label: 'PROJECT MANAGER'},
    {role: 'ACCOUNTANT', label: 'ACCOUNTANT'}
]


type OwnToPropsAlertDialogSlide = {
    project: projectType
    allUsers: Array<userType> | null
    handleCloseBtn: (p: any) => void
}


const AlertDialogSlide:FC<OwnToPropsAlertDialogSlide> = ({project, allUsers, handleCloseBtn}) => {
    const [newUser, setNewUser] = useState(false)

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    // @ts-ignore
    let newUsers = allUsers.map(({email, ...n}) => (n.label = email, n))

   const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(setAllUsersThunk())
    }, [newUser])

    const handleClose = () => {
        setOpen(false);
        handleCloseBtn(null)
    };

    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');
    return (
        <div>
            <MenuItem onClick={handleClickOpen} disableRipple>
                <AddIcon/>
                Add User
            </MenuItem>
            <Dialog
                open={open}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >{newUser ? <><RegistrationForm/><Button onClick={() => {
                    setNewUser(false)
                }}>Back</Button></> :
                <>
                    <div style={{'display': 'flex', 'justifyContent': 'space-between', 'alignItems': 'center'}}>
                        <DialogTitle>{"Add a user to the project"}</DialogTitle>
                        <Box sx={{
                            '& > :not(style)': {width: '20ch', 'margin': '0 auto'},
                        }}><Button style={{'margin': '0 1rem'}} onClick={() => setNewUser(true)}
                                   endIcon={<PersonAddIcon/>} variant="contained" size="small" type="submit">
                            New User
                        </Button>
                        </Box>
                    </div>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <Formik
                                initialValues={{id: '', role: ''}}
                                validate={values => {
                                    const errors: any = {};
                                    if (!values.id) {
                                        errors.id = 'Required';
                                    }
                                    if (!values.role) {
                                        errors.role = 'Required'
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, {setSubmitting, resetForm}) => {
                                    setTimeout(() => {
                                        setSubmitting(false);
                                        ProjectAPI.newUserInProject(+values.id, project.id, values.role)

                                        handleClose()
                                        resetForm()
                                    }, 400);
                                }}
                            >{({
                                   values,
                                   errors,
                                   touched,
                                   handleChange,
                                   handleBlur,
                                   handleSubmit,
                                   setFieldValue,
                                   isSubmitting,
                                   /* and other goodies */
                               }) => (
                                <form onSubmit={handleSubmit} style={{'minHeight': '300px'}}>

                                    <label htmlFor="id">User name</label>

                                    <CustomSelect
                                        className='input'
                                        onChange={(values: any) => setFieldValue('id', values.id)}
                                        value={values.id}
                                        options={newUsers}
                                    />

                                    <div style={{'margin': '1rem auto'}}>{errors.id && touched.id &&
                                        <Alert severity="error">{errors.id && touched.id && errors.id}</Alert>}</div>

                                    <label htmlFor="role">Role</label>

                                    <CustomSelect
                                        className='input'
                                        onChange={(values: any) => setFieldValue('role', values.role)}
                                        value={values.role}
                                        options={role}
                                    />

                                    <div style={{'margin': '1rem auto'}}>{errors.role && touched.role &&
                                        <Alert
                                            severity="error">{errors.role && touched.role && errors.role}</Alert>}</div>


                                    <Box sx={{
                                        '& > :not(style)': {width: '100%', 'margin': '1rem auto'},
                                    }}><Button endIcon={<SendIcon/>} variant="contained" size="medium" type="submit"
                                               disabled={isSubmitting}>
                                        Send
                                    </Button>
                                    </Box>

                                </form>)}
                            </Formik>
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






