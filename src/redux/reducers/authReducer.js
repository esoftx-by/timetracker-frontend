import {AuthAPI} from "../../API/api";

const SET_USER = 'auth/SET_USER'
const SET_ALL_USERS = 'auth/SET_ALL_USERS'
const DELETE_USER = 'auth/DELETE_USER'

const initialState = {
    user: [],
    allUsers: []
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user
            }
        case SET_ALL_USERS:
            return {
                ...state,
                allUsers: action.users
            }
        case DELETE_USER:
            return {
                ...state,
                user: []
            }
        default:
            return state
    }
}
const setAllUsers = (users) => ({type: SET_ALL_USERS, users})
const setUser = (user) => ({type: SET_USER, user})
export const deleteUser = () => ({type: DELETE_USER})


export const setAllUsersThunk = () => {
    return dispatch => {
        AuthAPI.setAllUsers()
            .then(response => {
                const allUsers = response.data.response
                dispatch(setAllUsers(allUsers))
            })
    }
}

export const setUserData = (id) => {
    return dispatch => {
        AuthAPI.setUserData(id)
            .then(response => {
                const user = response.data.response
                dispatch(setUser(user))
            })
    }
}

