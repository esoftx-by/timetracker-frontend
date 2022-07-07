import {AuthAPI} from "../../API/api";
import {userType} from "../../types";

const SET_USER = 'auth/SET_USER'
const SET_ALL_USERS = 'auth/SET_ALL_USERS'
const DELETE_USER = 'auth/DELETE_USER'

export type initialStateType = {
    user: userType | null,
    allUsers: Array<userType> | null
}

const initialState: initialStateType = {
    user: null,
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
                allUsers: action.allUsers
            }
        case DELETE_USER:
            return {
                ...state,
                user: null
            }
        default:
            return state
    }
}

type setAllUsersType = {
    type: typeof SET_ALL_USERS,
    allUsers: Array<userType>
}

type setUserType = {
    type: typeof SET_USER,
    user: userType
}

type deleteUserType = {
    type: typeof DELETE_USER
}

const setAllUsers = (allUsers: Array<userType>): setAllUsersType => ({type: SET_ALL_USERS, allUsers})
const setUser = (user: userType): setUserType => ({type: SET_USER, user})
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
                const user: userType = response.data.response
                dispatch(setUser(user))
            })
    }
}

