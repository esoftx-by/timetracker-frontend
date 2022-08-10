import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setAllUsersSelector} from "../../redux/selectors/authSelectors";
import {AppDispatch} from "../../redux/store";
import InputLabel from "@mui/material/InputLabel";
import {Alert, Fade, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import {successMessageSelector} from "../../redux/selectors/projectSelector";
import {actionsProject} from "../../redux/reducers/projectsReducer";
import {setAllUsersThunk} from "../../redux/reducers/thunk-creators/authThunk";
import {newUserInProject} from "../../redux/reducers/thunk-creators/projectThunk";


type OwnToProps = {
    newUser: boolean
    projectId: number
}

export const NewUser: FC<OwnToProps> = ({newUser, projectId}) => {

    const [values, setValues] = useState({userId: '', userRole: ''})

    const [error, setError] = useState(false)

    const success = useSelector(successMessageSelector)

    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(setAllUsersThunk())
    }, [newUser])


    const role = [
        {role: 'DEVELOPER', label: 'DEV'},
        {role: 'TEAM_LEAD', label: 'TEAM LEAD'},
        {role: 'PROJECT_MANAGER', label: 'PROJECT MANAGER'},
        {role: 'ACCOUNTANT', label: 'ACCOUNTANT'}
    ]

    const allUser = useSelector(setAllUsersSelector)

    const addUser = () => {
        if (values.userId && values.userRole) {
            dispatch(newUserInProject(+values.userId, projectId, values.userRole))
            setValues({userId: '', userRole: ''})
            setError(false)
            setTimeout(() => {
                dispatch(actionsProject.successMessage(false))
            }, 3000)
        } else {
            setError(true)
        }
    }

    return (
        <div>
            <FormControl fullWidth style={{marginTop: '1rem'}} error={!values.userId && error && true}>
                <InputLabel id="demo-simple-select-label">E-mail</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="E-mail"
                    value={values.userId}
                    onChange={(event) => setValues({...values, userId: event.target.value as string})}
                >
                    {allUser && allUser.map((el) => <MenuItem key={el.id}
                                                              value={el.id}>{el.email}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl fullWidth style={{marginTop: '1rem'}} error={!values.userRole && error && true}>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Role"
                    value={values.userRole}
                    onChange={(event) => setValues({...values, userRole: event.target.value})}
                >
                    {role.map((el, index) => <MenuItem key={index}
                                                       value={el.role}>{el.label}</MenuItem>)}
                </Select>
            </FormControl>
            <Button style={{margin: '1rem 0'}} variant="contained" onClick={addUser}>Add User</Button>
            <Fade in={error} unmountOnExit><Alert
                onClose={() => setError(false)} severity="error">Fields are not filled</Alert></Fade>
            <Fade in={success} unmountOnExit><Alert
                onClose={() => dispatch(actionsProject.successMessage(false))} severity="success">User added to the project</Alert></Fade>
        </div>
    );
};

export default NewUser;
