import {AuthAPI} from "../../API/api";

const SET_USER = 'auth/SET_USER'
const DELETE_USER ='auth/DELETE_USER'

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
        case DELETE_USER:
            return {
                ...state,
                user: []
            }
        default:
            return state
    }
}

const setUser = (user) => ({type: SET_USER, user})
export const deleteUser = () => ({type:DELETE_USER})

export const setUserData = (id) => {
    return dispatch => {
        AuthAPI.setUserData(id)
            .then(response => {
                const user = response.data.response
                dispatch(setUser(user))
            })
    }
}

