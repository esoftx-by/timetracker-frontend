import {ProjectAPI} from "../../API/api";
import {projectType} from "../../types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "../store";

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

export const projectReducer = (state = initialState, action: ActionsType): initialStateType => {
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


type ActionsType = InferActionTypes<typeof actions>
type ThunkTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

const actions = {
    setProjects: (allProject: Array<projectType>) => ({type: SET_PROJECTS, allProject} as const),
    setNewProject: (newProject: projectType) => ({type: SET_NEW_PROJECT, newProject} as const),
    setProject: (project: projectType) => ({type: SET_PROJECT, project} as const),
    setProjectByUserId: (data: Array<projectType>) => ({type: SET_PROJECT_BY_USER_ID, data} as const)
}


export const setProjectThunk = (): ThunkTypes => {
    return async dispatch => {
        let response = await ProjectAPI.getAllProject()
        if (response.data.success) {
            let allProject: Array<projectType> = response.data.response
            dispatch(actions.setProjects(allProject))
        }
    }
}

export const setNewProjectThunk = (name: string, description: string, customer: string): ThunkTypes => {
    return async dispatch => {
        let response = await ProjectAPI.newProject(name, description, customer)
        if (response.data.success) {
            let data: projectType = response.data.response
            dispatch(actions.setNewProject(data))
        }

    }
}

export const setProjectIdThunk = (id: number): ThunkTypes => {
    return async dispatch => {
        let response = await ProjectAPI.getProjectId(id)
        if (response.data.success) {
            const project: projectType = response.data.response
            dispatch(actions.setProject(project))
        }

    }
}

export const setProjectByUserIdThunk = (id: number): ThunkTypes => {
    return async dispatch => {
        let response = await ProjectAPI.getProjectByUserId(id)
        if (response.data.success) {
            const projectByUserId: Array<projectType> = response.data.response
            dispatch(actions.setProjectByUserId(projectByUserId))
        }
    }
}
