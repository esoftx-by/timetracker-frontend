import axios from "axios";
import {AllTracksByProjectIdType, ProjectType, TaskType, UserType} from "../types";


export const instance = axios.create({
    baseURL: (process.env.NODE_ENV !== 'production') ? 'http://localhost:8080/api/v1/' : `${window.location.origin}:8080/api/v1/`
})

export type AllProject = {
    success: boolean
    response: Array<ProjectType>
}

export type Project = {
    success: boolean
    response: ProjectType
}

export type NewUserInProject = {
    success: boolean
    response: {
        id: number
        user: UserType
        project: ProjectType
        role: string
    }
}

export type User = {
    success: boolean
    response: UserType
}

export type AllUsers = {
    success: boolean
    response: Array<UserType>
}

export type Auth = {
    token: string
    user: UserType
}

export type AllTask = {
    success: boolean
    response: Array<TaskType>
}

export type Task = {
    success: boolean
    response: TaskType
}

export type AllTracks = {
    success: boolean
    response: Array<AllTracksByProjectIdType>
}

export type Track = {
    success: boolean
    response: AllTracksByProjectIdType
}
