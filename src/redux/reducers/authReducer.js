const SET_USER = 'auth/SET_USER'

const initialState = {
    user: []
}

export const authReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_USER:
            return{
                ...state,
                user: action.user
            }
        default:
            return state
    }
}

export const setUser = (user) => ({type: SET_USER, user})
