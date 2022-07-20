import {AuthAPI} from "../../API/api";
import {userType} from "../../types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "../store";

const SET_USER = 'auth/SET_USER'
const SET_ALL_USERS = 'auth/SET_ALL_USERS'
const DELETE_USER = 'auth/DELETE_USER'
const ERROR_USER = 'auth/ERROR_USER'

export type initialStateType = {
    user: userType | null,
    allUsers: Array<userType> | null
    errors: string | null
}

const initialState: initialStateType = {
    user: null,
    allUsers: [],
    errors: null
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
        default:
            return state
    }
}


type deleteUserType = {
    type: typeof DELETE_USER
}

type ActionsTypes = InferActionTypes<typeof actionsUser> | deleteUserType
export type ThunkTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const actionsUser = {
    setAllUsers: (allUsers: Array<userType>)=> ({type: SET_ALL_USERS, allUsers} as const),
    setUser: (user: userType) => ({type: SET_USER, user} as const),
    errors: (error: string | null) => ({type: ERROR_USER, error} as const)
}

export const deleteUser = (): deleteUserType => ({type: DELETE_USER})


export const setAllUsersThunk = (): ThunkTypes => {
    return async dispatch => {
        let response = await AuthAPI.setAllUsers()
        const allUsers: Array<userType> = response.data.response
        dispatch(actionsUser.setAllUsers(allUsers))
    }
}

export const setUserData = (id: number ): ThunkTypes => {
    return async dispatch => {
        try {
            let response = await AuthAPI.setUserData(id)
            if(response.data.success){
                const user: userType = response.data.response
                dispatch(actionsUser.setUser(user))
            }
        } catch (e: any){
            dispatch(actionsUser.errors(e.message))
        }
    }
}

