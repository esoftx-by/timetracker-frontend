import axios from "axios";
import {allTracksByProjectIdType, projectType, taskType, userType} from "../types";


export const instance = axios.create({
    baseURL: `http://localhost:8080/api/v1/`
})

type AllProject = {
    success: boolean
    response: Array<projectType>
}

type Project = {
    success: boolean
    response: projectType
}

type NewUserInProject = {
    success: boolean
    response: {
        id: number
        user: userType
        project: projectType
        role: string
    }
}

type User = {
    success: boolean
    response: userType
}

type AllUsers = {
    success: boolean
    response: Array<userType>
}

type Auth = {
    token: string
    user: userType
}

type AllTask = {
    success: boolean
    response: Array<taskType>
}

type Task = {
    success: boolean
    response: taskType
}

type AllTracks = {
    success: boolean
    response: Array<allTracksByProjectIdType>
}

type Track = {
    success: boolean
    response: allTracksByProjectIdType
}


export const ProjectAPI = {
    getAllProject() {
        return instance.get<AllProject>('projects')
            .then(response => {
                return response
            })
    },
    newProject(name: string, description: string, customer: string) {
        return instance.post<Project>('projects', {name, description, customer})
            .then(response => {
                return response
            })
    },
    getProjectId(id: number) {
        return instance.get<Project>(`projects/${id}`)
            .then(response => {
                return response
            })
    },
    getProjectByUserId(id: number) {
        return instance.get<AllProject>(`project-users/user/${id}`)
            .then(response => {
                return response
            })
    },
    newUserInProject(userId: number, projectId: number, role: string) {
        return instance.post<NewUserInProject>('project-users', {userId, projectId, role})
            .then(response => {
                return response
            })
    }
}

export const AuthAPI = {
    newUser(email: string, firstName: string, lastName: string, password: string | number) {
        return instance.post<User>('users', {email, firstName, lastName, password})
            .then(response => {
                return response
            })
    },
    auth(email: string, password: string | number) {
        return instance.post<Auth>('login', {email, password})
            .then(response => {
                return response
            })
    },
    setUserData(id: number) {
        return instance.get<User>(`users/${id}`)
            .then(response => {
                return response
            })
    },
    setAllUsers() {
        return instance.get<AllUsers>('users')
            .then(response => {
                return response
            })
    }
}

export const TaskAPI = {
    allTasks() {
        return instance.get<AllTask>('tasks')
            .then(response => {
                return response
            })
    },
    newTask(name: string, description: string, estimatedHours: number, authorId: number, projectId: number) {
        return instance.post<Task>('tasks', {name, description, estimatedHours, authorId, projectId})
            .then(response => {
                return response
            })

    },
    allTaskUserId(id: number) {
        return instance.get<AllTask>(`tasks/user/${id}`)
            .then(response => {
                return response
            })
    },
    allTasksProject(projectId: number) {
        return instance.get<AllTask>(`tasks/project/${projectId}`)
            .then(response => {
                return response
            })
    },
    taskById(id: number) {
        return instance.get<Task>(`tasks/${id}`)
            .then(response => {
                return response
            })
    },
    updateTask(id: number, name?: string | null, description?: string | null, estimatedHours?: number | null, status?: string | null, currentAssigneeId?: number | null) {
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

export const TracksAPI = {
    newTrack(userId: number, taskId: number, startTime: string, hours: number) {
        return instance.post<Track>('tracks', {userId, taskId, startTime, hours})
            .then(response => {
                return response
            })
    },
    setAllTracks() {
        return instance.get<AllTracks>('tracks')
            .then(response => {
                return response
            })
    },
    setAllTracksByUserId(userId: number) {
        return instance.get<AllTracks>(`tracks/user/${userId}`)
            .then(response => {
                return response
            })
    },
    setTracksByTaskId(taskId: number) {
        return instance.get<AllTracks>(`tracks/task/${taskId}`)
            .then(response => {
                return response
            })
    },
    setAllTracksByProjectId(projectId: number) {
        return instance.get<AllTracks>(`tracks/project/${projectId}`)
            .then(response => {
                return response
            })
    }
}
