import {UserType} from "../../types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "../store";

const SET_USER = 'auth/SET_USER'
const SET_ALL_USERS = 'auth/SET_ALL_USERS'
const DELETE_USER = 'auth/DELETE_USER'
const ERROR_USER = 'auth/ERROR_USER'
const IS_SENT = 'auth/IS_SENT'
const ERROR_APP = 'auth/ERROR_APP'


export type initialStateType = {
    isSent: boolean
    user: UserType | null,
    allUsers: Array<UserType> | null
    errors: string | null
    errorApp: string | null
}

const initialState: initialStateType = {
    user: null,
    allUsers: [],
    errors: null,
    isSent: false,
    errorApp: ''
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
        case ERROR_USER:
            return {
                ...state,
                errors: action.error
            }
        case IS_SENT:
            return {
                ...state,
                isSent: action.isSent
            }
        case ERROR_APP:
            return {
                ...state,
                errorApp: action.errorApp
            }
        default:
            return state
    }
}

type ActionsTypes = InferActionTypes<typeof actionsUser>
export type ThunkTypes = ThunkAction<void, AppStateType, unknown, ActionsTypes>

export const actionsUser = {
    setAllUsers: (allUsers: Array<UserType>) => ({type: SET_ALL_USERS, allUsers} as const),
    setUser: (user: UserType) => ({type: SET_USER, user} as const),
    errors: (error: string | null) => ({type: ERROR_USER, error} as const),
    isSent: (isSent: boolean) => ({type: IS_SENT, isSent} as const),
    deleteUser: () => ({type: DELETE_USER} as const),
    errorApp: (errorApp: string | null) => ({type: ERROR_APP, errorApp} as const)
}


