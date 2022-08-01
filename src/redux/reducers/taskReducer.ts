import {TaskAPI} from "../../API/api";
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


type initialStateType = {
    allTask: Array<TaskType> | null,
    taskUserId: Array<TaskType>,
    allTasksProject: Array<AllTasksProjectType> | null
    taskById: TaskType | null
    isFetching: boolean
}

const initialState: initialStateType = {
    allTask: null,
    taskUserId: [],
    allTasksProject: null,
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
            stateCopy.allTasksProject = [...state.allTasksProject as Array<TaskType>]
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
        case DELETE_TASK:
            return{
                ...state,
                taskById: null
            }
        default:
            return state
    }
}


type ActionsType = InferActionTypes<typeof actions>
export type ThunkTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

const actions = {
    setAllTask: (data: Array<TaskType>) => ({type: SET_ALL_TASKS, data} as const),
    setNewTask: (data: TaskType) => ({type: SET_NEW_TASK, data} as const),
    setAllTaskUserId: (data: Array<TaskType>) => ({type: SET_ALL_TASKS_USER_ID, data} as const),
    setAllTasksProject: (data: Array<TaskType>) => ({type: SET_ALL_TASKS_PROJECT, data} as const),
    setTaskById: (taskById: TaskType) => ({type: SET_TASK_BY_ID, taskById} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: IS_FETCHING, isFetching} as const),
    deleteTask: () => ({type: DELETE_TASK} as const)
}

export const SetTaskByIdThunk = ( id: number): ThunkTypes => {
    return async dispatch => {
        dispatch(actions.toggleIsFetching(true))
        let response = await TaskAPI.taskById(id)
        if (response.data.success){
            let data: TaskType = response.data.response
            dispatch(actions.setTaskById(data))
        }
        dispatch(actions.toggleIsFetching(false))
    }
}

export const updateTask = (id: number, name?: string | null, description?: string | null, estimatedHours?: number | null, status?: string | null, currentAssigneeId?: number | null):ThunkTypes => {
    return async dispatch => {
        let response = await TaskAPI.updateTask(id, name, description, estimatedHours, status, currentAssigneeId)
        if (response.data.success){
            let data: TaskType = response.data.response
            dispatch(actions.setTaskById(data))
            dispatch(setAllTasksProjectThunk(data.project.id))
        }
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
        let tasks: Array<TaskType> = response.data.response
        dispatch(actions.setAllTask(tasks))
    }

}

export const setAllTaskUserIdThunk = (id: number): ThunkTypes => {
    return async dispatch => {
        let response = await TaskAPI.allTaskUserId(id)
        if (response.data.success) {
            let data: Array<TaskType> = response.data.response
            dispatch(actions.setAllTaskUserId(data))
        }
    }
}

export const setAllTasksProjectThunk = (projectId: number): ThunkTypes => {
    return async dispatch => {
        let response = await TaskAPI.allTasksProject(projectId)
        if (response.data.success) {
            let data: Array<TaskType> = response.data.response
            dispatch(actions.setAllTasksProject(data))
        }
    }
}

export const deleteTaskThunk = (id: number): ThunkTypes => {
    return async dispatch => {
        dispatch(actions.toggleIsFetching(true))
        try {
            await TaskAPI.deleteTask(id)
            dispatch(actions.deleteTask())
        } catch (e: any){
            console.log(e.message)
        }
        dispatch(actions.toggleIsFetching(false))
    }
}
