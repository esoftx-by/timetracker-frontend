import {TaskAPI} from "../../API/api";
import {allTasksProjectType, taskType} from "../../types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "../store";
import {actionsProject} from "./projectsReducer";

const SET_NEW_TASK = 'tasks/SET_NEW_TASK'
const SET_ALL_TASKS = 'tasks/SET_ALL_TASK'
const SET_ALL_TASKS_PROJECT = 'tasks/SET_ALL_TASKS_PROJECT'
const SET_ALL_TASKS_USER_ID = 'tasks/SET_ALL_TASK_USER_ID'
const SET_TASK_BY_ID = 'tasks/SET_TASK_BY_ID'
const IS_FETCHING = 'project/IS_FETCHING'


type initialStateType = {
    allTask: Array<taskType> | null,
    taskUserId: Array<taskType>,
    allTasksProject: Array<allTasksProjectType>
    taskById: taskType | null
    isFetching: boolean
}

const initialState: initialStateType = {
    allTask: null,
    taskUserId: [],
    allTasksProject: [],
    taskById: null,
    isFetching: false
}

export const taskReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case SET_ALL_TASKS:
            return {
                ...state,
                allTask: action.data
            }
        case SET_NEW_TASK:
            let stateCopy = {...state}
            stateCopy.allTasksProject = [...state.allTasksProject]
            stateCopy.allTasksProject.push(action.data)
            return stateCopy
        case SET_ALL_TASKS_USER_ID:
            return {
                ...state,
                taskUserId: action.data
            }
        case SET_ALL_TASKS_PROJECT:
            return {
                ...state,
                allTasksProject: action.data
            }
        case SET_TASK_BY_ID:
            return {
                ...state,
                taskById: action.taskById
            }
        case IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state
    }
}


type ActionsType = InferActionTypes<typeof actions>
type ThunkTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

const actions = {
    setAllTask: (data: Array<taskType>) => ({type: SET_ALL_TASKS, data} as const),
    setNewTask: (data: taskType) => ({type: SET_NEW_TASK, data} as const),
    setAllTaskUserId: (data: Array<taskType>) => ({type: SET_ALL_TASKS_USER_ID, data} as const),
    setAllTasksProject: (data: Array<taskType>) => ({type: SET_ALL_TASKS_PROJECT, data} as const),
    setTaskById: (taskById: taskType) => ({type: SET_TASK_BY_ID, taskById} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: IS_FETCHING, isFetching} as const)
}

export const SetTaskByIdThunk = ( id: number): ThunkTypes => {
    return async dispatch => {
        dispatch(actionsProject.toggleIsFetching(true))
        let response = await TaskAPI.taskById(id)
        if (response.data.success){
            let data: taskType = response.data.response
            dispatch(actions.setTaskById(data))
        }
        dispatch(actionsProject.toggleIsFetching(false))
    }
}


export const setNewTaskThunk = (name: string, description: string, estimatedHours: number, authorId: number, projectId: number): ThunkTypes => {
    return async dispatch => {
        let response = await TaskAPI.newTask(name, description, estimatedHours, authorId, projectId)
        if (response.data.success) {
            let data = response.data.response
            dispatch(actions.setNewTask(data))
        }
    }
}

export const setAllTaskThunk = (): ThunkTypes => {
    return async dispatch => {
        let response = await TaskAPI.allTasks()
        let tasks: Array<taskType> = response.data.response
        dispatch(actions.setAllTask(tasks))
    }

}

export const setAllTaskUserIdThunk = (id: number): ThunkTypes => {
    return async dispatch => {
        let response = await TaskAPI.allTaskUserId(id)
        if (response.data.success) {
            let data: Array<taskType> = response.data.response
            dispatch(actions.setAllTaskUserId(data))
        }
    }
}

export const setAllTasksProjectThunk = (projectId: number): ThunkTypes => {
    return async dispatch => {
        let response = await TaskAPI.allTasksProject(projectId)
        if (response.data.success) {
            let data: Array<taskType> = response.data.response
            dispatch(actions.setAllTasksProject(data))
        }
    }
}
