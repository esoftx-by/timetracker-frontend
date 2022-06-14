// import * as React from 'react';
// import SpeedDial from '@mui/material/SpeedDial';
// import SpeedDialIcon from '@mui/material/SpeedDialIcon';
// import SpeedDialAction from '@mui/material/SpeedDialAction';
// import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import style from "../NewProject/NewTask.module.css";
// import DialogActions from "@mui/material/DialogActions";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import {connect} from "react-redux";
// import {setNewProjectThunk} from "../../redux/reducers/projectsReducer";
//
//  function BasicSpeedDial(props) {
//
//
//     const actions = [
//         { icon: <CreateNewFolderIcon />, name: 'NewProject', function: () => handleClickOpen() },
//     ];
//
//     const [open, setOpen] = React.useState(false);
//
//     const handleClickOpen = () => {
//         setOpen(true);
//     };
//
//     const handleClose = () => {
//         setOpen(false);
//     };
//
//     const [values, setValues] = React.useState({
//         name: '',
//         description: '',
//         customer: ''
//     });
//
//     const handleChange = (prop) => (event) => {
//         setValues({...values, [prop]: event.target.value});
//     };
//
//     const handleSubmit = async () => {
//         props.setNewProjectThunk(values.name, values.description, values.customer)
//         //console.log(values.name, values.description, values.customer)
//         setOpen(false)
//     }
//     return (
//         <>
//             <SpeedDial
//                 ariaLabel="SpeedDial basic example"
//                 sx={{ position: 'fixed', bottom: 25, right: 25 }}
//                 icon={<SpeedDialIcon />}
//             >
//                 {actions.map((action) => (
//                     <SpeedDialAction
//                         key={action.name}
//                         icon={action.icon}
//                         tooltipTitle={action.name}
//                         onClick={action.function}
//                     />
//                 ))}
//             </SpeedDial>
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>New Project</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText>
//                         Create a new project. Please indicate the name of the project, description and customer.
//                     </DialogContentText><br/>
//                     <Box sx={{
//                         '& > :not(style)': {width: '100%'},
//                     }}>
//                         <TextField
//                             id="outlined-name"
//                             label="project name"
//                             value={values.name}
//                             onChange={handleChange('name')}
//                             className={style.field}
//                         />
//                         <TextField
//                             id="outlined-name"
//                             label="description"
//                             value={values.description}
//                             onChange={handleChange('description')}
//                             className={style.field}
//                         />
//                         <TextField
//                             id="outlined-name"
//                             label="customer"
//                             value={values.customer}
//                             onChange={handleChange('customer')}
//                             className={style.field}
//                         />
//                     </Box>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose}>Cancel</Button>
//                     <Button onClick={handleSubmit}>Create</Button>
//                 </DialogActions>
//             </Dialog>
//         </>
//
//     );
// }
//
//
// const mapStateToProps = (state) => ({
//
// })
//
// export default connect(mapStateToProps, {setNewProjectThunk})(BasicSpeedDial)
