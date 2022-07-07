import {TaskAPI} from "../../API/api";
import {allTasksProjectType, taskType} from "../../types";

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

export const taskReducer = (state = initialState, action: any): initialStateType => {
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
type setAllTaskType = {
    type: typeof SET_ALL_TASKS,
    data: object
}

type setNewTaskType = {
    type: typeof SET_NEW_TASK,
    data: object
}

type setAllTaskUserIdType = {
    type: typeof SET_ALL_TASKS_USER_ID,
    data: object
}

type setAllTasksProjectType = {
    type: typeof SET_ALL_TASKS_PROJECT,
    data: object
}

const setAllTask = (data: object): setAllTaskType => ({type: SET_ALL_TASKS, data})
const setNewTask = (data: object): setNewTaskType => ({type: SET_NEW_TASK, data})
const setAllTaskUserId = (data: object): setAllTaskUserIdType => ({type: SET_ALL_TASKS_USER_ID, data})
const setAllTasksProject = (data: object): setAllTasksProjectType => ({type: SET_ALL_TASKS_PROJECT, data})


export const setNewTaskThunk = (name: string, description: string, estimatedHours: number, authorId: number, projectId: number) => {
    return (dispatch: any) => {
        TaskAPI.newTask(name, description, estimatedHours, authorId, projectId)
            .then(response => {
                if (response.data.success) {
                    let data = response.data.response
                    dispatch(setNewTask(data))
                }
            })
    }
}

export const setAllTaskThunk = () => {
    return (dispatch: any) => {
        TaskAPI.allTasks()
            .then(response => {
                let tasks = response.data.response
                dispatch(setAllTask(tasks))
            })
    }

}

export const setAllTaskUserIdThunk = (id: number) => {
    return (dispatch: any) => {
        TaskAPI.allTaskUserId(id)
            .then(response => {
                if (response.data.success) {
                    let data = response.data.response
                    dispatch(setAllTaskUserId(data))
                }
            })
    }
}

export const setAllTasksProjectThunk = (projectId: number) => {
    return (dispatch: any) => {
        TaskAPI.allTasksProject(projectId)
            .then(response => {
                if (response.data.success) {
                    let data = response.data.response
                    dispatch(setAllTasksProject(data))
                }
            })
    }
}
