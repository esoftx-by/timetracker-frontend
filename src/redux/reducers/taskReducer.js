import {TaskAPI} from "../../API/api";

const SET_ALL_TASKS_USER_ID = 'tasks/SET_ALL_TASK_USER_ID'
const SET_ALL_TASKS = 'tasks/SET_ALL_TASK'
const SET_ALL_TASKS_PROJECT = 'tasks/SET_ALL_TASKS_PROJECT'

const initialState = {
    allTask: [],
    taskUsedId: [],
    allTasksProject: []
}

export const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_TASKS:
            return {
                ...state,
                allTask: action.data
            }
        case SET_ALL_TASKS_USER_ID:
            return {
                ...state,
                taskUsedId: action.data
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
const setAllTask = (data) => ({type: SET_ALL_TASKS, data})
const setAllTaskUserId = (data) => ({type: SET_ALL_TASKS_USER_ID, data})
const setAllTasksProject = (data) => ({type: SET_ALL_TASKS_PROJECT, data})

export const setAllTaskThunk = (data) => {
    return dispatch => {
        TaskAPI.allTasks(data)
            .then(response => {
                let tasks = response.data.response
                dispatch(setAllTask(tasks))
            })
    }

}

export const setAllTaskUserIdThunk = (id) => {
    return dispatch => {
        TaskAPI.allTaskUserId(id)
            .then(response => {
                if (response.data.success) {
                    let data = response.data.response
                    dispatch(setAllTaskUserId(data))
                }
            })
    }
}

export const setAllTasksProjectThunk = (projectId) => {
    return dispath => {
        TaskAPI.allTasksProject(projectId)
            .then(response => {
                if (response.data.success){
                    let data = response.data.response
                    dispath(setAllTasksProject(data))
                }
            })
    }
}
