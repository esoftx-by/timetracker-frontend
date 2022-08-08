import {ProjectType, UserType} from "../../types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "../store";
import ProjectAPI from "../../API/projectAPI";

const SET_PROJECTS = 'project/SET_PROJECTS';
const SET_NEW_PROJECT = 'project/SET__NEW_PROJECT'
const SET_PROJECT = 'project/SET_PROJECT'
const SET_PROJECT_BY_USER_ID = 'project/SET_PROJECT_BY_USER_ID'
const SET_ALL_USERS_IN_PROJECT = 'project/SET_ALL_USERS_IN_PROJECT'
const DELETE_PROJECT = 'project/DELETE_PROJECT'
const SUCCESS = 'project/SUCCESS'
const IS_FETCHING = 'project/IS_FETCHING'


export type initialStateType = {
    projects: Array<ProjectType>,
    projectsByUser: Array<ProjectType> | null,
    project: ProjectType | null
    isFetching: boolean
    allUsersInProject: Array<UserType>
    success: boolean
}

const initialState: initialStateType = {
    projects: [],
    projectsByUser: [],
    project: null,
    isFetching: false,
    allUsersInProject: [],
    success: false
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
        case IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case SET_ALL_USERS_IN_PROJECT:
            return {
                ...state,
                allUsersInProject: action.users
            }
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(el => el.id !== action.id)
            }
        case SUCCESS:
            return {
                ...state,
                success: action.success
            }
        default:
            return state
    }
}


type ActionsType = InferActionTypes<typeof actionsProject>
type ThunkTypes = ThunkAction<void, AppStateType, unknown, ActionsType>

export const actionsProject = {
    setProjects: (allProject: Array<ProjectType>) => ({type: SET_PROJECTS, allProject} as const),
    setNewProject: (newProject: ProjectType) => ({type: SET_NEW_PROJECT, newProject} as const),
    setProject: (project: ProjectType) => ({type: SET_PROJECT, project} as const),
    setProjectByUserId: (data: Array<ProjectType>) => ({type: SET_PROJECT_BY_USER_ID, data} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: IS_FETCHING, isFetching} as const),
    setAllUsersInProject: (users: Array<UserType>) => ({type: SET_ALL_USERS_IN_PROJECT , users} as const),
    successMessage: (success: boolean) => ({type: SUCCESS, success} as const),
    deleteProject: (id: number) => ({type: DELETE_PROJECT, id} as const)
}


export const deleteProjectThunk = (id: number): ThunkTypes => {
    return async dispatch => {
        try {
            dispatch(actionsProject.toggleIsFetching(true))
            await ProjectAPI.deleteProject(id)
            setTimeout(() => {
                dispatch(actionsProject.deleteProject(id))
                dispatch(actionsProject.toggleIsFetching(false))
            }, 500)
        } catch (e: any){
            console.log(e.message)
        }
    }
}

export const newUserInProject = (userId: number,projectId: number,  role: string): ThunkTypes => {
    return async dispatch => {
        try {
            let response = await ProjectAPI.newUserInProject(userId, projectId, role)
            if (response.data.success){
                dispatch(actionsProject.successMessage(true))
            }
        } catch (e: any){
            console.log(e.message)
        }
    }
}

export const setProjectsThunk = (): ThunkTypes => {
    return async dispatch => {
        try {
            dispatch(actionsProject.toggleIsFetching(true))
            let response = await ProjectAPI.getAllProject()
            if (response.data.success) {
                let allProject: Array<ProjectType> = response.data.response
                dispatch(actionsProject.setProjects(allProject))
            }
            dispatch(actionsProject.toggleIsFetching(false))
        } catch (e: any){

        }
    }
}

export const setAllUsersInProject = (id: number): ThunkTypes => {
    return async dispatch => {
        let response = await ProjectAPI.setUsersByTaskId(id)
        if (response.data.success){
            let usersInProject: Array<UserType> = response.data.response
            dispatch(actionsProject.setAllUsersInProject(usersInProject))
        }
    }
}

export const setNewProjectThunk = (name: string, description: string, customer: string): ThunkTypes => {
    return async dispatch => {
        try {
            dispatch(actionsProject.toggleIsFetching(true))
            let response = await ProjectAPI.newProject(name, description, customer)
            setTimeout(() => {
                if (response.data.success) {
                    let data: ProjectType = response.data.response
                    dispatch(actionsProject.setNewProject(data))
                }
                dispatch(actionsProject.toggleIsFetching(false))
            }, 500)
        } catch (e: any){
            console.log(e.message)
        }
    }
}

export const setProjectIdThunk = (id: number): ThunkTypes => {
    return async dispatch => {
        try {
            dispatch(actionsProject.toggleIsFetching(true))
            let response = await ProjectAPI.getProjectId(id)
            setTimeout(() => {
                if (response.data.success) {
                    const project: ProjectType = response.data.response
                    dispatch(actionsProject.setProject(project))
                }
                dispatch(actionsProject.toggleIsFetching(false))
            }, 500)
        } catch (e: any){
            console.log(e.message)
        }

    }
}

export const setProjectsByUserIdThunk = (id: number): ThunkTypes => {
    return async dispatch => {
        try {
            dispatch(actionsProject.toggleIsFetching(true))
            let response = await ProjectAPI.getProjectByUserId(id)
            if (response.data.success) {
                const projectByUserId: Array<ProjectType> = response.data.response
                dispatch(actionsProject.setProjectByUserId(projectByUserId))
            }
            dispatch(actionsProject.toggleIsFetching(false))
        } catch (e: any){
            console.log(e.message)
        }

    }
}

export const deleteUserInProjectThunk = (id: number): ThunkTypes => {
    return async dispatch => {
        await ProjectAPI.deleteUser(id)
    }
}
