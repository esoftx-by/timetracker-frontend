import {AllTasksProjectType, TaskType} from "../../types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "../store";

const SET_NEW_TASK = 'tasks/SET_NEW_TASK'
const SET_ALL_TASKS = 'tasks/SET_ALL_TASK'
const SET_ALL_TASKS_PROJECT = 'tasks/SET_ALL_TASKS_PROJECT'
const SET_ALL_TASKS_USER_ID = 'tasks/SET_ALL_TASK_USER_ID'
const SET_TASK_BY_ID = 'tasks/SET_TASK_BY_ID'
const IS_FETCHING = 'task/IS_FETCHING'
const DELETE_TASK = 'task/DELETE_TASK'


export type initialStateType = {
    allTask: Array<TaskType> | null,
    taskUserId: Array<TaskType>,
    allTasksProject: Array<AllTasksProjectType>
    taskById: TaskType | null
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
            return {
                ...state,
                allTasksProject: [...state.allTasksProject, action.data]
            }
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
        case DELETE_TASK:
            return {
                ...state,
                taskById: null,
                allTasksProject: state.allTasksProject.filter(el => el.id !== action.id)
            }
        default:
            return state
    }
}


type ActionsType = InferActionTypes<typeof actions>
export type ThunkTypes = ThunkAction<void, AppStateType, unknown, ActionsType>

export const actions = {
    setAllTask: (data: Array<TaskType>) => ({type: SET_ALL_TASKS, data} as const),
    setNewTask: (data: TaskType) => ({type: SET_NEW_TASK, data} as const),
    setAllTaskUserId: (data: Array<TaskType>) => ({type: SET_ALL_TASKS_USER_ID, data} as const),
    setAllTasksProject: (data: Array<TaskType>) => ({type: SET_ALL_TASKS_PROJECT, data} as const),
    setTaskById: (taskById: TaskType) => ({type: SET_TASK_BY_ID, taskById} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: IS_FETCHING, isFetching} as const),
    deleteTask: (id: number) => ({type: DELETE_TASK, id} as const)
}

