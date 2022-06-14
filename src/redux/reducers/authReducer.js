import {AuthAPI} from "../../API/api";

const SET_USER = 'auth/SET_USER'

const initialState = {
    user: []
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.user
            }
        default:
            return state
    }
}

const setUser = (user) => ({type: SET_USER, user})

export const setUserData = (id) => {
    return dispatch => {
        AuthAPI.setUserData(id)
            .then(response => {
                const user = response.data.response
                dispatch(setUser(user))
            })
    }
}

