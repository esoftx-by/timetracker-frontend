import {AppStateType} from "../store";
import {TaskType} from "../../types";

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
    return state.tasks.taskById as TaskType
}

export const setIsFetchingTask = (state: AppStateType) => {
    return state.tasks.isFetching
}
