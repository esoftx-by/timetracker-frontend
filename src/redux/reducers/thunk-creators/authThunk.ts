import AuthAPI from "../../../API/authAPI";
import {UserType} from "../../../types";
import {actionsUser, ThunkTypes} from "../authReducer";


export const setAllUsersThunk = (): ThunkTypes => {
    return async dispatch => {
        let response = await AuthAPI.setAllUsers()
        const allUsers: Array<UserType> = response.data.response
        dispatch(actionsUser.setAllUsers(allUsers))
    }
}

export const setUserData = (id: number): ThunkTypes => {
    return async dispatch => {
        try {
            let response = await AuthAPI.setUserData(id)
            if (response.data.success) {
                const user: UserType = response.data.response
                dispatch(actionsUser.setUser(user))
            }
        } catch (e: any) {
            dispatch(actionsUser.errors(e.message))
        }
    }
}

export const updateProfileThunk = (id: number, firstName?: string | null, lastName?: string | null, email?: string | null, password?: string | null): ThunkTypes => {
    return async dispatch => {
        try {
            let response = await AuthAPI.updateProfile(id, firstName, lastName, email, password)
            if (response.data.success) {
                dispatch(actionsUser.setUser(response.data.response))
                dispatch(actionsUser.isSent(true))
            }
        } catch (e: any) {
            console.log(e.message)
        }
    }
}
