import {ProjectType, UserType} from "../../types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "../store";

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
            return {
                ...state,
                projects: [...state.projects, action.newProject]
            }
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
export type ThunkTypes = ThunkAction<void, AppStateType, unknown, ActionsType>

export const actionsProject = {
    setProjects: (allProject: Array<ProjectType>) => ({type: SET_PROJECTS, allProject} as const),
    setNewProject: (newProject: ProjectType) => ({type: SET_NEW_PROJECT, newProject} as const),
    setProject: (project: ProjectType) => ({type: SET_PROJECT, project} as const),
    setProjectByUserId: (data: Array<ProjectType>) => ({type: SET_PROJECT_BY_USER_ID, data} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: IS_FETCHING, isFetching} as const),
    setAllUsersInProject: (users: Array<UserType>) => ({type: SET_ALL_USERS_IN_PROJECT, users} as const),
    successMessage: (success: boolean) => ({type: SUCCESS, success} as const),
    deleteProject: (id: number) => ({type: DELETE_PROJECT, id} as const)
}


