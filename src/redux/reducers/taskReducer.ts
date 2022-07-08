import {TaskAPI} from "../../API/api";
import {allTasksProjectType, taskType} from "../../types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "../store";

const SET_NEW_TASK = 'tasks/SET_NEW_TASK'
const SET_ALL_TASKS = 'tasks/SET_ALL_TASK'
const SET_ALL_TASKS_PROJECT = 'tasks/SET_ALL_TASKS_PROJECT'
const SET_ALL_TASKS_USER_ID = 'tasks/SET_ALL_TASK_USER_ID'


type initialStateType = {
    allTask: object | null,
    taskUserId: Array<taskType>,
    allTasksProject: Array<allTasksProjectType>
}

const initialState: initialStateType = {
    allTask: null,
    taskUserId: [],
    allTasksProject: []
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
    setAllTasksProject: (data: Array<taskType>) => ({type: SET_ALL_TASKS_PROJECT, data} as const)
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
