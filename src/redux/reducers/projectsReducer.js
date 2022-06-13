import {ProjectAPI} from "../../API/api";

const SET_PROJECTS = 'project/SET_PROJECTS';
const SET_NEW_PROJECT = 'project/SET__NEW_PROJECT'
const SET_PROJECT = 'project/SET_PROJECT'


const initialState = {
    projects: [],
    project: null
}

export const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROJECTS:
            return {
                ...state,
                projects: action.data
            }
        case SET_NEW_PROJECT:
            let stateCopy = {...state}
            stateCopy.projects = [...state.project]
            stateCopy.projects.push({
                id: state.projects.length + 1,
                name: action.name,
                description: action.description,
                customer: action.customer
            })
            return stateCopy
        case SET_PROJECT:
            return {
                ...state,
                project: action.project
            }
        default:
            return state
    }
}
const setProjects = (data) => ({type: SET_PROJECTS, data})
const setNewProject = (name, description, customer) => ({type: SET_NEW_PROJECT, name, description, customer})
const setProject = (project) => ({type: SET_PROJECT, project})

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

export const setProjectIdThunk = (id) =>{
    return dispatch => {
        ProjectAPI.getProjectId(id)
            .then(response => {
                if (response.data.success){
                    const project = response.data.response
                    dispatch(setProject(project))
                }
            })
    }
}
