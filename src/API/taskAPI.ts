import {AllTask, instance, Task} from "./api";

export default class TaskAPI {
    static allTasks() {
        return instance.get<AllTask>('tasks')
            .then(response => {
                return response
            })
    }

    static newTask(name: string, description: string, estimatedHours: number, authorId: number, projectId: number) {
        return instance.post<Task>('tasks', {name, description, estimatedHours, authorId, projectId})
            .then(response => {
                return response
            })

    }

    static deleteTask(id: number) {
        return instance.delete(`tasks/${id}`)
    }

    static allTaskUserId(id: number) {
        return instance.get<AllTask>(`tasks/user/${id}`)
            .then(response => {
                return response
            })
    }

    static allTasksProject(projectId: number) {
        return instance.get<AllTask>(`tasks/project/${projectId}`)
            .then(response => {
                return response
            })
    }

    static taskById(id: number) {
        return instance.get<Task>(`tasks/${id}`)
            .then(response => {
                return response
            })
    }

    static updateTask(id: number, name?: string | null, description?: string | null, estimatedHours?: number | null, status?: string | null, currentAssigneeId?: number | null) {
        return instance.patch('tasks', null, {
            params: {
                id: id,
                name: name,
                description: description,
                estimatedHours: estimatedHours,
                status: status,
                currentAssigneeId: currentAssigneeId
            }
        })
            .then(response => {
                return response
            })
    }
}
