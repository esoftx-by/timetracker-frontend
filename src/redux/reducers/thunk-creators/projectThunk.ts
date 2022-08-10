import ProjectAPI from "../../../API/projectAPI";
import {ProjectType, UserType} from "../../../types";
import {actionsProject, ThunkTypes} from "../projectsReducer";

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
            console.log(e.message)
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
            console.log(e.message)
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
            console.log(e.message)
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
            console.log(e.message)
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
            console.log(e.message)
        }

    }
}

export const deleteUserInProjectThunk = (id: number): ThunkTypes => {
    return async dispatch => {
        await ProjectAPI.deleteUser(id)
    }
}
