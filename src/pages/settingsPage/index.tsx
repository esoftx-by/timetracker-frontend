import React from 'react'
import style from './settings.module.css'
import {Alert, Box, Button, TextField} from "@mui/material";
import ContactPageIcon from '@mui/icons-material/ContactPage';
import {Formik} from "formik";
import {Helmet} from "react-helmet-async";
import {useDispatch, useSelector} from "react-redux";
import {isSentSelector, userDataSelector} from "../../redux/selectors/authSelectors";
import {AppDispatch} from "../../redux/store";
import {actionsUser} from "../../redux/reducers/authReducer";
import {updateProfileThunk} from "../../redux/reducers/thunk-creators/authThunk";


const SettingsPage = () => {

    const userData = useSelector(userDataSelector)
    const id = userData && userData.id
    const dispatch: AppDispatch = useDispatch()
    const isSent = useSelector(isSentSelector)

    return (
        <div className={style.settingsPage}>
            <Helmet>
                <title>Settings</title>
            </Helmet>
            <h1>Edit profile</h1>
            <p>Here you can change your personal data.</p>
            <Formik
                initialValues={userData ? {
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    password: ''
                } : {}}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    setTimeout(() => {
                        dispatch(updateProfileThunk(id as number, values.firstName, values.lastName, values.email, values.password))
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
        </div>
    )
}

export default SettingsPage
