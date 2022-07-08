import {AuthAPI} from "../../API/api";
import {userType} from "../../types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "../store";

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


export const authReducer = (state = initialState, action: ActionsTypes): initialStateType => {
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


type deleteUserType = {
    type: typeof DELETE_USER
}

type ActionsTypes = InferActionTypes<typeof actions> | deleteUserType
type ThunkTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

const actions = {
    setAllUsers: (allUsers: Array<userType>)=> ({type: SET_ALL_USERS, allUsers} as const),
    setUser: (user: userType) => ({type: SET_USER, user} as const)
}

export const deleteUser = (): deleteUserType => ({type: DELETE_USER})


export const setAllUsersThunk = (): ThunkTypes => {
    return async dispatch => {
        let response = await AuthAPI.setAllUsers()
        const allUsers: Array<userType> = response.data.response
        dispatch(actions.setAllUsers(allUsers))
    }
}

export const setUserData = (id: number): ThunkTypes => {
    return async dispatch => {
        let response = await AuthAPI.setUserData(id)
        const user: userType = response.data.response
        dispatch(actions.setUser(user))
    }
}

