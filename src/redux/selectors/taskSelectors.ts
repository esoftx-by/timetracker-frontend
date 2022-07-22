import {AppStateType} from "../store";

export const setAllTaskSelector = (state: AppStateType) => {
    return state.tasks.allTask
}

export const setTaskUserIdSelector = (state: AppStateType) => {
    return state.tasks.taskUserId
}

export const setAllTasksProjectSelector = (state: AppStateType) => {
    return state.tasks.allTasksProject
}

export const setTaskByIdSelector = (state: AppStateType) => {
    return state.tasks.taskById
}

export const setIsFetchingTask = (state: AppStateType) => {
    return state.tasks.isFetching
}
