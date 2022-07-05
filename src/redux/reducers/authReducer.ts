import {AuthAPI} from "../../API/api";

const SET_USER = 'auth/SET_USER'
const SET_ALL_USERS = 'auth/SET_ALL_USERS'
const DELETE_USER = 'auth/DELETE_USER'

export type initialStateType = {
    user: null | object,
    allUsers: null | object
}

const initialState: initialStateType = {
    user: [],
    allUsers: []
}

export const authReducer = (state = initialState, action: any): initialStateType => {
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

type setAllUsersType = {
    type: typeof SET_ALL_USERS,
    users: object
}

type setUserType = {
    type: typeof SET_USER,
    user: object
}

type deleteUserType = {
    type: typeof DELETE_USER
}

const setAllUsers = (users: object): setAllUsersType => ({type: SET_ALL_USERS, users})
const setUser = (user: object): setUserType => ({type: SET_USER, user})
export const deleteUser = (): deleteUserType => ({type: DELETE_USER})


export const setAllUsersThunk = () => {
    return (dispatch:any) => {
        AuthAPI.setAllUsers()
            .then(response => {
                const allUsers = response.data.response
                dispatch(setAllUsers(allUsers))
            })
    }
}

export const setUserData = (id: number) => {
    return (dispatch:any) => {
        AuthAPI.setUserData(id)
            .then(response => {
                const user = response.data.response
                dispatch(setUser(user))
            })
    }
}

