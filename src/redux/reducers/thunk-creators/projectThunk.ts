import ProjectAPI from "../../../API/projectAPI";
import {ProjectType, UserType} from "../../../types";
import {actionsProject, ThunkTypes} from "../projectsReducer";
import {appErrorThunk} from "./authThunk";

export const deleteProjectThunk = (id: number): ThunkTypes => {
    return async dispatch => {
        try {
            dispatch(actionsProject.toggleIsFetching(true))
            await ProjectAPI.deleteProject(id)
            setTimeout(() => {
                dispatch(actionsProject.deleteProject(id))
                dispatch(actionsProject.toggleIsFetching(false))
            }, 500)
        } catch (e: any) {
            dispatch(appErrorThunk(e.message))
            dispatch(actionsProject.toggleIsFetching(false))
        }
    }
}

export const newUserInProject = (userId: number, projectId: number, role: string): ThunkTypes => {
    return async dispatch => {
        try {
            let response = await ProjectAPI.newUserInProject(userId, projectId, role)
            if (response.data.success) {
                dispatch(actionsProject.successMessage(true))
            }
        } catch (e: any) {
            dispatch(appErrorThunk(e.message))
            dispatch(actionsProject.toggleIsFetching(false))
        }
    }
}

export const setProjectsThunk = (): ThunkTypes => {
    return async dispatch => {
        try {
            dispatch(actionsProject.toggleIsFetching(true))
            let response = await ProjectAPI.getAllProject()
            if (response.data.success) {
                let allProject: Array<ProjectType> = response.data.response
                dispatch(actionsProject.setProjects(allProject))
            }
            dispatch(actionsProject.toggleIsFetching(false))
        } catch (e: any) {
            dispatch(appErrorThunk(e.message))
            dispatch(actionsProject.toggleIsFetching(false))
        }
    }
}

export const setAllUsersInProject = (id: number): ThunkTypes => {
    return async dispatch => {
        let response = await ProjectAPI.setUsersByTaskId(id)
        if (response.data.success) {
            let usersInProject: Array<UserType> = response.data.response
            dispatch(actionsProject.setAllUsersInProject(usersInProject))
        }
    }
}

export const setNewProjectThunk = (name: string, description: string, customer: string): ThunkTypes => {
    return async dispatch => {
        try {
            dispatch(actionsProject.toggleIsFetching(true))
            let response = await ProjectAPI.newProject(name, description, customer)
            setTimeout(() => {
                if (response.data.success) {
                    let data: ProjectType = response.data.response
                    dispatch(actionsProject.setNewProject(data))
                }
                dispatch(actionsProject.toggleIsFetching(false))
            }, 500)
        } catch (e: any) {
            dispatch(appErrorThunk(e.message))
            dispatch(actionsProject.toggleIsFetching(false))
        }
    }
}

export const setProjectIdThunk = (id: number): ThunkTypes => {
    return async dispatch => {
        try {
            dispatch(actionsProject.toggleIsFetching(true))
            let response = await ProjectAPI.getProjectId(id)
            setTimeout(() => {
                if (response.data.success) {
                    const project: ProjectType = response.data.response
                    dispatch(actionsProject.setProject(project))
                }
                dispatch(actionsProject.toggleIsFetching(false))
            }, 500)
        } catch (e: any) {
            dispatch(appErrorThunk(e.message))
            dispatch(actionsProject.toggleIsFetching(false))
        }

    }
}

export const setProjectsByUserIdThunk = (id: number): ThunkTypes => {
    return async dispatch => {
        try {
            dispatch(actionsProject.toggleIsFetching(true))
            let response = await ProjectAPI.getProjectByUserId(id)
            if (response.data.success) {
                const projectByUserId: Array<ProjectType> = response.data.response
                dispatch(actionsProject.setProjectByUserId(projectByUserId))
            }
            dispatch(actionsProject.toggleIsFetching(false))
        } catch (e: any) {
            dispatch(appErrorThunk(e.message))
            // console.log(e.message)
            dispatch(actionsProject.toggleIsFetching(false))
        }

    }
}

export const deleteUserInProjectThunk = (id: number): ThunkTypes => {
    return async dispatch => {
        try {
            await ProjectAPI.deleteUser(id)
            dispatch(actionsProject.successMessage(true))
        } catch (e: any) {
            dispatch(appErrorThunk(e.message))
        }
    }
}

export const UpdateProjectThunk = (id: number, name: string, description: string, customer: string): ThunkTypes => {
    return async dispatch => {
        try {
            let response = await ProjectAPI.updateProject(id, name, description, customer)
            if (response.data.success){
                dispatch(actionsProject.updateProject(response.data.response))
            }
        } catch (e: any){
            dispatch(appErrorThunk(e.message))
        }
    }
}
