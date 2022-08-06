import {AllProject, AllUsers, instance, NewUserInProject, Project} from "./api";

export default class ProjectAPI {
    static getAllProject() {
        return instance.get<AllProject>('projects')
            .then(response => {
                return response
            })
    }

    static newProject(name: string, description: string, customer: string) {
        return instance.post<Project>('projects', {name, description, customer})
            .then(response => {
                return response
            })
    }

    static getProjectId(id: number) {
        return instance.get<Project>(`projects/${id}`)
            .then(response => {
                return response
            })
    }

    static getProjectByUserId(id: number) {
        return instance.get<AllProject>(`project-users/user/${id}`)
            .then(response => {
                return response
            })
    }

    static newUserInProject(userId: number, projectId: number, role: string) {
        return instance.post<NewUserInProject>('project-users', {userId, projectId, role})
            .then(response => {
                return response
            })
    }

    static setUsersByTaskId(id: number) {
        return instance.get<AllUsers>(`project-users/project/${id}`)
            .then(response => {
                return response
            })
    }

    static deleteUser(id: number) {
        return instance.delete(`project-users/${id}`)
    }

    static deleteProject(id: number) {
        return instance.delete(`projects/${id}`)
    }
}
