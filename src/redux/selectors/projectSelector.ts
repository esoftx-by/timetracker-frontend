import {AppStateType} from "../store";

export const setProjectsSelector = (state: AppStateType) => {
    return state.projectsPage.projects
}

export const setProjectsByUserSelector = (state: AppStateType) => {
    return state.projectsPage.projectsByUser
}

export const setProjectSelector = (state: AppStateType) => {
    return state.projectsPage.project
}

export const setIsFetchingProjectSelector = (state: AppStateType) => {
    return state.projectsPage.isFetching
}

export const setAllUsersInProject = (state: AppStateType) => {
    return state.projectsPage.allUsersInProject
}
