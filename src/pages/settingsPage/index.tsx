import React, {useContext} from 'react'
import style from './settings.module.css'
import {Alert, Box, Button, TextField} from "@mui/material";
import ContactPageIcon from '@mui/icons-material/ContactPage';
import {Formik} from "formik";
import {Helmet} from "react-helmet-async";
import {useDispatch, useSelector} from "react-redux";
import {isSentSelector, userDataSelector} from "../../redux/selectors/authSelectors";
import {AppDispatch} from "../../redux/store";
import {actionsUser} from "../../redux/reducers/authReducer";
import {deleteUserThunk, updateProfileThunk} from "../../redux/reducers/thunk-creators/authThunk";
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import {DeleteModal} from "../../components/DeleteModal";


const SettingsPage = () => {

    const {firstName, lastName, email, id} = useSelector(userDataSelector)
    const isSent = useSelector(isSentSelector)
    const navigate = useNavigate()

    const dispatch: AppDispatch = useDispatch()
    const auth = useContext(AuthContext)

    const deleteUser = () => {
        dispatch(deleteUserThunk(id))
        auth.logout()
        setTimeout(() => {
            navigate('/')
        }, 3000)
    }

    return (
        <div className={style.settingsPage}>
            <Helmet>
                <title>Settings</title>
            </Helmet>
            <h1>Edit profile</h1>
            <p>Here you can change your personal data.</p>
            <Formik
                initialValues={{
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: ''
                }}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    dispatch(updateProfileThunk(id, values.firstName, values.lastName, values.email, values.password ? values.password : undefined))
                    setTimeout(() => {
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      /* and other goodies */
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <p><b>First name:</b></p>
                        <Box
                            sx={{
                                '& > :not(style)': {width: '100%'},
                            }}>
                            <TextField
                                type="text"
                                name="firstName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstName}
                            />
                        </Box>
                        <p><b>Last name:</b></p>
                        <Box sx={{
                            '& > :not(style)': {width: '100%'},
                        }}>
                            <TextField
                                type="text"
                                name="lastName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastName}
                            />
                        </Box>
                        <p><b>E-mail:</b></p>
                        <Box sx={{
                            '& > :not(style)': {width: '100%'},
                        }}>
                            <TextField
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                        </Box>
                        <p><b>Password:</b></p>
                        <Box sx={{
                            '& > :not(style)': {width: '100%'},
                        }}>
                            <TextField
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                        </Box>
                        {isSent && <div style={{'width': '100%', 'margin': '1rem 0'}}><Alert
                            onClose={() => dispatch(actionsUser.isSent(false))} severity="success">Profile
                            updated</Alert></div>}
                        <Box sx={{
                            '& > :not(style)': {width: '100%'},
                        }} style={{margin: '1rem 0'}}><Button endIcon={<ContactPageIcon/>} variant="contained"
                                                              size="large" type="submit"
                                                              disabled={isSubmitting}>
                            Update profile
                        </Button>
                        </Box>
                    </form>
                )}
            </Formik>
            <Box sx={{
                '& > :not(style)': {width: '100%'},
            }} style={{margin: '1rem 0'}}>
            <DeleteModal size="large"
                         variant="outlined"
                         callback={deleteUser}
                         title={'Are you sure you want to delete the profile?'}
                         endIcon={<PersonRemoveIcon/>}>
                Delete profile
            </DeleteModal>
            </Box>
        </div>
    )
}

export default SettingsPage
