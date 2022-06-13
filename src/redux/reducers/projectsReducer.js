import {ProjectAPI} from "../../API/api";

const SET_PROJECT = 'project/SET_PROJECT';
const SET_NEW_PROJECT = 'project/SET__NEW_PROJECT'


const initialState = {
    project: []
}

export const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROJECT:
            return {
                ...state,
                project: action.data
            }
        case SET_NEW_PROJECT:
            let stateCopy = {...state}
            stateCopy.project = [...state.project]
            stateCopy.project.push({
                id: state.project.length + 1,
                name: action.name,
                description: action.description,
                customer: action.customer
            })
            return stateCopy
        default:
            return state
    }
}
const setProjects = (data) => ({type: SET_PROJECT, data})
const setNewProject = (name, description, customer) => ({type: SET_NEW_PROJECT, name, description, customer})

export const setProjectThunk = (data) => {
    return dispatch => {
        ProjectAPI.getAllProject(data)
            .then(response => {
                if (response.data.success) {
                    let allProject = response.data.response
                    dispatch(setProjects(allProject))
                }
            })
    }
}

export const setNewProjectThunk = (name, description, customer) => {
    return dispatch => {
        ProjectAPI.newProject(name, description, customer)
            .then(response => {
                if (response.data.success) {
                    dispatch(setNewProject(name, description, customer))
                }
            })
    }
}
