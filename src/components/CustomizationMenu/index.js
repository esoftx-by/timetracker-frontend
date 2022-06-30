import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {MyEnhancedForm} from "../NewUserInProject";
import {Formik, useFormik} from 'formik'
import Select from 'react-select';
import {AuthAPI, ProjectAPI} from "../../API/api";
import {toast} from "react-toastify";
import {setAllUsersThunk} from "../../redux/reducers/authReducer";
import {useEffect} from "react";
import SendIcon from "@mui/icons-material/Send";
import {Alert, Box} from "@mui/material";

const StyledMenu = styled((props) => (
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

export default function CustomizedMenus({project, setAllUsersThunk, allUsers}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        setAllUsersThunk()
    }, [])

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
                onClose={handleClose}
            >
                <AlertDialogSlide allUsers={allUsers} project={project}/>
            </StyledMenu>
        </div>
    );
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const CustomSelect = ({onChange, options, value, className}) => {

    const defaultValue = (options, value) => {

        return options ? options.find(option => option.value === value) : "";
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

const role = [
    {role: 'DEVELOPER', label: 'DEV'},
    {role: 'TEAM_LEAD', label: 'TEAM LEAD'},
    {role: 'PROJECT_MANAGER', label: 'PROJECT MANAGER'},
    {role: 'PROJECT_MANAGER', label: 'PROJECT MANAGER'}
]


const AlertDialogSlide = ({project, allUsers}) => {


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    let newUsers = allUsers.map(({email, ...n}) => (n.label = email, n))
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
            >
                <DialogTitle>{"Add a user to the project"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Formik
                            initialValues={{id: '', role: ''}}
                            validate={values => {
                                const errors = {};
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
                                    ProjectAPI.newUserInProject(values.id, project.id, values.role)

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
                            <form onSubmit={handleSubmit} style={{'min-height': '300px'}}>

                                <label htmlFor="id">User name</label>

                                <CustomSelect
                                    className='input'
                                    onChange={values => setFieldValue('id', values.id)}
                                    value={values.id}
                                    options={newUsers}
                                />

                                <div style={{'margin': '1rem auto'}}>{errors.id && touched.id &&
                                    <Alert severity="error">{errors.id && touched.id && errors.id}</Alert>}</div>

                                <label htmlFor="role">Role</label>

                                <CustomSelect
                                    className='input'
                                    onChange={values => setFieldValue('role', values.role)}
                                    value={values.role}
                                    options={role}
                                />

                                <div style={{'margin': '1rem auto'}}>{errors.role && touched.role &&
                                    <Alert severity="error">{errors.role && touched.role && errors.role}</Alert>}</div>


                                <Box sx={{
                                    '& > :not(style)': {width: '100%', 'margin': '0 auto'},
                                }}><Button endIcon={<SendIcon/>} variant="contained" size="large" type="submit"
                                        disabled={isSubmitting}>
                                    Send
                                </Button>
                                </Box>

                            </form>)}
                        </Formik>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

/*
const MultipleSelect = () => {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        console.log(value)
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                >
                    {names.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, personName, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
*/
