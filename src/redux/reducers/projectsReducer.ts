import {ProjectAPI} from "../../API/api";
import {projectType} from "../../types";

const SET_PROJECTS = 'project/SET_PROJECTS';
const SET_NEW_PROJECT = 'project/SET__NEW_PROJECT'
const SET_PROJECT = 'project/SET_PROJECT'
const SET_PROJECT_BY_USER_ID = 'project/SET_PROJECT_BY_USER_ID'



export type initialStateType = {
    projects: Array<projectType>,
    projectsByUser: Array<projectType> | null,
    project: projectType | null
}

const initialState: initialStateType = {
    projects: [],
    projectsByUser: [],
    project: null
}

export const projectReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case SET_PROJECTS:
            return {
                ...state,
                projects: action.allProject
            }
        case SET_NEW_PROJECT:
            let stateCopy = {...state}
            stateCopy.projects = [...state.projects]
            stateCopy.projects.push(action.newProject)
            return stateCopy
        case SET_PROJECT_BY_USER_ID:
            return {
                ...state,
                projectsByUser: action.data
            }
        case SET_PROJECT:
            return {
                ...state,
                project: action.project
            }
        default:
            return state
    }
}

type setProjectsType = {
    type: typeof SET_PROJECTS,
    allProject: object
}

type setNewProjectType = {
    type: typeof SET_NEW_PROJECT,
    newProject: object
}

type setProjectType = {
    type: typeof SET_PROJECT,
    project: object
}

type setProjectByUserIdType = {
    type: typeof SET_PROJECT_BY_USER_ID,
    data: object
}



const setProjects = (allProject: object):setProjectsType => ({type: SET_PROJECTS, allProject})
const setNewProject = (newProject: object): setNewProjectType => ({type: SET_NEW_PROJECT, newProject})
const setProject = (project: object):setProjectType => ({type: SET_PROJECT, project})
const setProjectByUserId = (data: object):setProjectByUserIdType => ({type: SET_PROJECT_BY_USER_ID, data})

export const setProjectThunk = () => {
    return (dispatch:any) => {
        ProjectAPI.getAllProject()
            .then(response => {
                if (response.data.success) {
                    let allProject: object = response.data.response
                    dispatch(setProjects(allProject))
                }
            })
    }
}

export const setNewProjectThunk = (name: string, description: string, customer: string) => {
    return (dispatch:any) => {
        ProjectAPI.newProject(name, description, customer)
            .then(response => {
                if (response.data.success) {
                    let data = response.data.response
                    dispatch(setNewProject(data))
                }
            })
    }
}

export const setProjectIdThunk = (id: number) => {
    return (dispatch:any) => {
        ProjectAPI.getProjectId(id)
            .then(response => {
                if (response.data.success) {
                    const project = response.data.response
                    dispatch(setProject(project))
                }
            })
    }
}

export const setProjectByUserIdThunk = (id: number) => {
    return (dispatch:any) => {
        ProjectAPI.getProjectByUserId(id)
            .then(response => {
                if (response.data.success) {
                    const projectByUserId = response.data.response
                    dispatch(setProjectByUserId(projectByUserId))
                }
            })
    }
}
