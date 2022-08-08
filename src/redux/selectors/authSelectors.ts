import {AppStateType} from "../store";
import {UserType} from "../../types";

export const tokenExpiredSelector = (state: AppStateType) => {
    return state.auth.errors
}

export const userDataSelector = (state: AppStateType) => {
    return state.auth.user as UserType
}

export const setAllUsersSelector = (state: AppStateType) => {
    return state.auth.allUsers
}

export const isSentSelector = (state: AppStateType) => {
    return state.auth.isSent
}
