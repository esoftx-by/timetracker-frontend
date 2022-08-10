import TaskAPI from "../../../API/taskAPI";
import {TaskType} from "../../../types";
import {actions, ThunkTypes} from "../taskReducer";

export const SetTaskByIdThunk = (id: number): ThunkTypes => {
    return async dispatch => {
        try {
            dispatch(actions.toggleIsFetching(true))
            let response = await TaskAPI.taskById(id)
            setTimeout(() => {
                if (response.data.success) {
                    let data: TaskType = response.data.response
                    dispatch(actions.setTaskById(data))
                }
                dispatch(actions.toggleIsFetching(false))
            }, 500)

        } catch (e: any) {
            console.log(e.message)
        }
    }
}

export const updateTask = (id: number, name?: string | null, description?: string | null, estimatedHours?: number | null, status?: string | null, currentAssigneeId?: number | null): ThunkTypes => {
    return async dispatch => {
        let response = await TaskAPI.updateTask(id, name, description, estimatedHours, status, currentAssigneeId)
        if (response.data.success) {
            let data: TaskType = response.data.response
            dispatch(actions.setTaskById(data))
            dispatch(setAllTasksProjectThunk(data.project.id))
        }
    }
}


export const setNewTaskThunk = (name: string, description: string, estimatedHours: number, authorId: number, projectId: number): ThunkTypes => {
    return async dispatch => {
        try {
            dispatch(actions.toggleIsFetching(true))
            let response = await TaskAPI.newTask(name, description, estimatedHours, authorId, projectId)
            setTimeout(() => {
                if (response.data.success) {
                    let data = response.data.response
                    dispatch(actions.setNewTask(data))
                }
                dispatch(actions.toggleIsFetching(false))
            }, 500)

        } catch (e: any) {
            console.log(e.message)
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
        try {
            dispatch(actions.toggleIsFetching(true))
            let response = await TaskAPI.allTaskUserId(id)
            setTimeout(() => {
                if (response.data.success) {
                    let data: Array<TaskType> = response.data.response
                    dispatch(actions.setAllTaskUserId(data))
                }
                dispatch(actions.toggleIsFetching(false))
            }, 500)
        } catch (e: any) {
            console.log(e.message)
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
        try {
            dispatch(actions.toggleIsFetching(true))
            await TaskAPI.deleteTask(id)
            setTimeout(() => {
                dispatch(actions.deleteTask(id))
                dispatch(actions.toggleIsFetching(false))
            }, 500)
        } catch (e: any) {
            console.log(e.message)
        }
    }
}
