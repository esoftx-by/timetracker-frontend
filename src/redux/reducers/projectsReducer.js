const SET_PROJECT = 'project/GET_PROJECT'


const initialState = {
    project: null
}

export const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROJECT:
            return {
                ...state,
                project: action.data
            }
        default:
            return state
    }
}

export const setProjects = (data) => ({type: SET_PROJECT, data})
